import { defaultOperatorNegationMap } from '../../defaults';
import type {
  DefaultOperatorName,
  DefaultRuleGroupType,
  DefaultRuleGroupTypeAny,
  DefaultRuleGroupTypeIC,
  DefaultRuleType,
  ParseMongoDbOptions,
} from '../../types/index.noReact';
import { joinWith } from '../arrayUtils';
import { convertToIC } from '../convertQuery';
import { isRuleGroupType } from '../isRuleGroup';
import { isPojo } from '../misc';
import { objectKeys } from '../objectUtils';
import { fieldIsValidUtil, getFieldsArray } from '../parserUtils';
import type { MongoDbSupportedOperators } from './types';
import { getRegExStr, isPrimitive, mongoDbToRqbOperatorMap } from './utils';

const emptyRuleGroup: DefaultRuleGroupType = { combinator: 'and', rules: [] };

/**
 * Converts a MongoDB query object or parseable string into a query suitable
 * for the {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseMongoDB(mongoDbRules: string | Record<string, any>): DefaultRuleGroupType;
/**
 * Converts a MongoDB query object or parseable string into a query suitable
 * for the {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
function parseMongoDB(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mongoDbRules: string | Record<string, any>,
  options: Omit<ParseMongoDbOptions, 'independentCombinators'> & {
    independentCombinators?: false;
  }
): DefaultRuleGroupType;
/**
 * Converts a MongoDB query object or parseable string into a query suitable
 * for the {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupTypeIC}).
 */
function parseMongoDB(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mongoDbRules: string | Record<string, any>,
  options: Omit<ParseMongoDbOptions, 'independentCombinators'> & {
    independentCombinators: true;
  }
): DefaultRuleGroupTypeIC;
function parseMongoDB(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mongoDbRules: string | Record<string, any>,
  options: ParseMongoDbOptions = {}
): DefaultRuleGroupTypeAny {
  const listsAsArrays = !!options.listsAsArrays;
  const fieldsFlat = getFieldsArray(options.fields);
  const getValueSources = options.getValueSources;
  const additionalOperators = options.additionalOperators ?? {};
  const preventOperatorNegation = !!options.preventOperatorNegation;
  const { additionalOperators: _ao, ...otherOptions } = options;

  const fieldIsValid = (
    fieldName: string,
    operator: DefaultOperatorName,
    subordinateFieldName?: string
  ) =>
    fieldIsValidUtil({
      fieldName,
      fieldsFlat,
      operator,
      subordinateFieldName,
      getValueSources,
    });

  function processMongoDbQueryBooleanOperator(
    field: string,
    mdbOperator: MongoDbSupportedOperators,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    keyValue: any
  ): DefaultRuleType | false {
    let operator: DefaultOperatorName = '=';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = '';

    // istanbul ignore else
    if (
      mdbOperator === '$eq' ||
      mdbOperator === '$ne' ||
      mdbOperator === '$gt' ||
      mdbOperator === '$gte' ||
      mdbOperator === '$lt' ||
      mdbOperator === '$lte'
    ) {
      if (mdbOperator === '$ne' && keyValue === null) {
        if (fieldIsValid(field, 'notNull')) {
          return { field, operator: 'notNull', value: null };
        }
      } else {
        operator = mongoDbToRqbOperatorMap[mdbOperator]!;
        if (fieldIsValid(field, operator)) {
          return { field, operator, value: keyValue };
        }
      }
    } else if (mdbOperator === '$regex' && /^[^^$]$|^[^^].*[^$]$/.test(getRegExStr(keyValue))) {
      if (fieldIsValid(field, 'contains')) {
        return {
          field,
          operator: 'contains',
          value: getRegExStr(keyValue),
        };
      }
    } else if (mdbOperator === '$regex' && /^\^.*[^$]/.test(getRegExStr(keyValue))) {
      if (fieldIsValid(field, 'beginsWith')) {
        return {
          field,
          operator: 'beginsWith',
          value: getRegExStr(keyValue).replace(/^\^/, ''),
        };
      }
    } else if (mdbOperator === '$regex' && /[^^].*\$/.test(getRegExStr(keyValue))) {
      if (fieldIsValid(field, 'endsWith')) {
        return {
          field,
          operator: 'endsWith',
          value: getRegExStr(keyValue).replace(/\$$/, ''),
        };
      }
    } else if (mdbOperator === '$in' && Array.isArray(keyValue)) {
      if (fieldIsValid(field, 'in')) {
        if (listsAsArrays) {
          value = keyValue;
        } else {
          value = joinWith(
            keyValue.map(v => `${v}`),
            ','
          );
        }
        return { field, operator: 'in', value };
      }
    } else if (mdbOperator === '$nin' && Array.isArray(keyValue)) {
      if (fieldIsValid(field, 'notIn')) {
        if (listsAsArrays) {
          value = keyValue;
        } else {
          value = joinWith(
            keyValue.map(v => `${v}`),
            ','
          );
        }
        return { field, operator: 'notIn', value };
      }
    }

    return false;
  }

  function processMongoDbQueryObjectKey(
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    keyValue: any
  ): DefaultRuleType | DefaultRuleGroupType | false {
    let field = '';

    // istanbul ignore else
    if (key === '$and') {
      if (!Array.isArray(keyValue) || keyValue.length === 0 || !keyValue.every(isPojo)) {
        return false;
      }

      // Check if this should result in a "between" clause
      if (keyValue.length === 2 && keyValue.every(kv => objectKeys(kv).length === 1)) {
        const [rule1, rule2] = keyValue;
        const [ruleKey1, ruleKey2] = keyValue.map(kv => objectKeys(kv)[0]);
        if (
          ruleKey1 === ruleKey2 &&
          isPojo(rule1[ruleKey1]) &&
          objectKeys(rule1[ruleKey1]).length === 1 &&
          isPojo(rule2[ruleKey2]) &&
          objectKeys(rule2[ruleKey2]).length === 1 &&
          (('$gte' in rule1[ruleKey1] &&
            '$lte' in rule2[ruleKey2] &&
            rule2[ruleKey2].$lte >= rule1[ruleKey1].$gte) ||
            ('$lte' in rule1[ruleKey1] &&
              '$gte' in rule2[ruleKey2] &&
              rule1[ruleKey1].$lte >= rule2[ruleKey2].$gte))
        ) {
          const [val1, val2] = [
            rule1[ruleKey1].$gte ?? rule1[ruleKey1].$lte,
            rule2[ruleKey2].$lte ?? rule2[ruleKey2].$gte,
          ];
          let value = listsAsArrays ? [val1, val2] : joinWith([val1, val2], ',');
          if (val1 > val2) {
            value = listsAsArrays ? [val2, val1] : joinWith([val2, val1], ',');
          }
          return { field: ruleKey1, operator: 'between', value };
        }
      }

      const rules = keyValue.map(l => processMongoDbQueryObject(l)).filter(Boolean) as (
        | DefaultRuleType
        | DefaultRuleGroupType
      )[];

      return rules.length > 0 ? { combinator: 'and', rules } : false;
    } else if (key === '$or') {
      if (!Array.isArray(keyValue) || keyValue.length === 0 || !keyValue.every(isPojo)) {
        return false;
      }

      // Check if this should result in "notBetween"
      if (keyValue.length === 2 && keyValue.every(kv => objectKeys(kv).length === 1)) {
        const [rule1, rule2] = keyValue;
        const [ruleKey1, ruleKey2] = keyValue.map(kv => objectKeys(kv)[0]);
        if (
          ruleKey1 === ruleKey2 &&
          isPojo(rule1[ruleKey1]) &&
          objectKeys(rule1[ruleKey1]).length === 1 &&
          isPojo(rule2[ruleKey2]) &&
          objectKeys(rule2[ruleKey2]).length === 1 &&
          (('$gt' in rule1[ruleKey1] &&
            '$lt' in rule2[ruleKey2] &&
            rule1[ruleKey1].$gt >= rule2[ruleKey2].$lt) ||
            ('$lt' in rule1[ruleKey1] &&
              '$gt' in rule2[ruleKey2] &&
              rule2[ruleKey2].$gt >= rule1[ruleKey1].$lt))
        ) {
          const [val1, val2] = [
            rule1[ruleKey1].$gt ?? rule1[ruleKey1].$lt,
            rule2[ruleKey2].$lt ?? rule2[ruleKey2].$gt,
          ];
          let value = listsAsArrays ? [val1, val2] : `${val1},${val2}`;
          if (val1 > val2) {
            value = listsAsArrays ? [val2, val1] : `${val2},${val1}`;
          }
          return { field: ruleKey1, operator: 'notBetween', value };
        }
      }

      const rules = keyValue.map(l => processMongoDbQueryObject(l)).filter(Boolean) as (
        | DefaultRuleType
        | DefaultRuleGroupType
      )[];

      return rules.length > 0 ? { combinator: 'or', rules } : false;
    } else if (key === '$not' && isPojo(keyValue)) {
      const ruleOrGroup = processMongoDbQueryObject(keyValue);
      if (ruleOrGroup) {
        if (isRuleGroupType(ruleOrGroup)) {
          return ruleOrGroup.not
            ? { combinator: 'and', rules: [ruleOrGroup], not: true }
            : { ...ruleOrGroup, not: true };
        }
        return preventOperatorNegation
          ? { combinator: 'and', rules: [ruleOrGroup], not: true }
          : { ...ruleOrGroup, operator: defaultOperatorNegationMap[ruleOrGroup.operator] };
      }
      return false;
    } else if (key === '$expr') {
      const op = objectKeys(keyValue)[0] as MongoDbSupportedOperators;
      if (/^\$(eq|gte?|lte?|n?in)$/.test(op)) {
        if (
          Array.isArray(keyValue[op]) &&
          keyValue[op].length === 2 &&
          typeof keyValue[op][0] === 'string' &&
          /^\$/.test(keyValue[op][0])
        ) {
          field = keyValue[op][0].replace(/^\$/, '');
          const val = keyValue[op][1];
          if (
            (typeof val === 'string' && /^\$/.test(val)) ||
            (Array.isArray(val) &&
              val.every(v => typeof v === 'string') &&
              val.every(v => /^\$/.test(v)))
          ) {
            const valForProcessing = Array.isArray(val)
              ? val.map(v => v.replace(/^\$/, ''))
              : val.replace(/^\$/, '');
            const tempRule = processMongoDbQueryBooleanOperator(field, op, valForProcessing);
            if (tempRule) {
              if (
                typeof tempRule.value === 'string' &&
                !fieldIsValid(field, tempRule.operator, tempRule.value)
              ) {
                return false;
              }
              return { ...tempRule, valueSource: 'field' };
            }
          }
          return processMongoDbQueryBooleanOperator(field, op, keyValue[op][1]);
        }
      }
    } else if (/^[^$]/.test(key)) {
      field = key;

      if (isPrimitive(keyValue)) {
        if (fieldIsValid(field, '=')) {
          return { field, operator: '=', value: keyValue };
        }
      } else if (keyValue === null) {
        if (fieldIsValid(field, 'null')) {
          return { field, operator: 'null', value: keyValue };
        }
      } else if (isPojo(keyValue)) {
        let betweenRule: DefaultRuleType | false = false;
        let notRule: DefaultRuleType | DefaultRuleGroupType | false = false;
        const additionalOpKeys = objectKeys(additionalOperators).map(o => o.replace(/^\$/, ''));
        const allOps = ['eq', 'ne', 'gte?', 'lte?', 'n?in', 'regex', 'not', ...additionalOpKeys];
        const acceptedOpsRegExp = new RegExp(`^\\$(${allOps.join('|')})$`);

        const operators = objectKeys<Record<MongoDbSupportedOperators, unknown>>(keyValue)
          .filter(o => acceptedOpsRegExp.test(o))
          .sort();

        if (operators.length === 0) {
          return false;
        }

        if ('$not' in keyValue && isPojo(keyValue.$not)) {
          const invertedNotRule = processMongoDbQueryObject({ [field]: keyValue.$not });
          if (invertedNotRule) {
            if (isRuleGroupType(invertedNotRule)) {
              notRule = { ...invertedNotRule, not: true };
            } else {
              notRule = preventOperatorNegation
                ? { combinator: 'and', rules: [invertedNotRule], not: true }
                : {
                    ...invertedNotRule,
                    operator: defaultOperatorNegationMap[invertedNotRule.operator],
                  };
            }
          }
        }

        if ('$gte' in keyValue && '$lte' in keyValue) {
          // This is (at least) a compact "between" clause
          betweenRule = {
            field,
            operator: 'between',
            value: listsAsArrays
              ? [keyValue.$gte, keyValue.$lte]
              : `${keyValue.$gte},${keyValue.$lte}`,
          };
        }

        const rules = operators
          // filter out $not
          .filter(op => !(notRule && op === '$not'))
          // filter out $gte and $lte if they were both present
          .filter(op => !(betweenRule && (op === '$gte' || op === '$lte')))
          .map(op =>
            op in additionalOperators && typeof additionalOperators[op] === 'function'
              ? additionalOperators[op](field, op, keyValue[op], otherOptions)
              : processMongoDbQueryBooleanOperator(field, op, keyValue[op])
          )
          .filter(Boolean) as (DefaultRuleGroupType | DefaultRuleType)[];

        if (notRule) {
          rules.unshift(notRule);
        }

        if (betweenRule) {
          rules.unshift(betweenRule);
        }

        if (rules.length === 0) {
          return false;
        }
        if (rules.length === 1) {
          return rules[0];
        }
        return { combinator: 'and', rules };
      }
    }

    return false;
  }

  function processMongoDbQueryObject(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mongoDbQueryObject: Record<string, any>
  ): DefaultRuleGroupType | DefaultRuleType | false {
    const rules = objectKeys(mongoDbQueryObject)
      .map(k => processMongoDbQueryObjectKey(k, mongoDbQueryObject[k]))
      .filter(Boolean) as DefaultRuleGroupType[];
    return rules.length === 1 ? rules[0] : rules.length > 1 ? { combinator: 'and', rules } : false;
  }

  let mongoDbPOJO = mongoDbRules;
  if (typeof mongoDbRules === 'string') {
    try {
      mongoDbPOJO = JSON.parse(mongoDbRules);
    } catch (err) {
      return emptyRuleGroup;
    }
  }

  // Bail if the mongoDbPOJO is not actually a POJO
  if (!isPojo(mongoDbPOJO)) {
    return emptyRuleGroup;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = processMongoDbQueryObject(mongoDbPOJO as Record<string, any>);
  const finalQuery: DefaultRuleGroupType = result
    ? isRuleGroupType(result)
      ? result
      : { combinator: 'and', rules: [result] }
    : emptyRuleGroup;
  return options.independentCombinators
    ? convertToIC<DefaultRuleGroupTypeIC>(finalQuery)
    : finalQuery;
}

export { parseMongoDB };
