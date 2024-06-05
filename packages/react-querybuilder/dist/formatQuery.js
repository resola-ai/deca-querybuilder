"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/formatQuery/index.ts
var formatQuery_exports = {};
__export(formatQuery_exports, {
  defaultCELValueProcessor: () => defaultCELValueProcessor,
  defaultMongoDBValueProcessor: () => defaultMongoDBValueProcessor,
  defaultRuleProcessorCEL: () => defaultRuleProcessorCEL,
  defaultRuleProcessorElasticSearch: () => defaultRuleProcessorElasticSearch,
  defaultRuleProcessorJSONata: () => defaultRuleProcessorJSONata,
  defaultRuleProcessorJsonLogic: () => defaultRuleProcessorJsonLogic,
  defaultRuleProcessorMongoDB: () => defaultRuleProcessorMongoDB,
  defaultRuleProcessorParameterized: () => defaultRuleProcessorParameterized,
  defaultRuleProcessorSQL: () => defaultRuleProcessorSQL,
  defaultRuleProcessorSpEL: () => defaultRuleProcessorSpEL,
  defaultSpELValueProcessor: () => defaultSpELValueProcessor,
  defaultValueProcessor: () => defaultValueProcessor,
  defaultValueProcessorByRule: () => defaultValueProcessorByRule,
  defaultValueProcessorCELByRule: () => defaultValueProcessorCELByRule,
  defaultValueProcessorMongoDBByRule: () => defaultValueProcessorMongoDBByRule,
  defaultValueProcessorSpELByRule: () => defaultValueProcessorSpELByRule,
  formatQuery: () => formatQuery,
  jsonLogicAdditionalOperators: () => jsonLogicAdditionalOperators
});
module.exports = __toCommonJS(formatQuery_exports);

// src/defaults.ts
var placeholderName = "~";
var defaultPlaceholderFieldName = placeholderName;
var defaultPlaceholderOperatorName = placeholderName;
var defaultJoinChar = ",";
var defaultCombinators = [
  { name: "and", value: "and", label: "AND" },
  { name: "or", value: "or", label: "OR" }
];
var defaultCombinatorsExtended = [
  ...defaultCombinators,
  { name: "xor", value: "xor", label: "XOR" }
];

// src/utils/arrayUtils.ts
var splitBy = (str, splitChar = defaultJoinChar) => typeof str === "string" ? str.split(`\\${splitChar}`).map((c) => c.split(splitChar)).reduce((prev, curr, idx) => {
  if (idx === 0) {
    return curr;
  }
  return [
    ...prev.slice(0, prev.length - 1),
    `${prev[prev.length - 1]}${splitChar}${curr[0]}`,
    ...curr.slice(1)
  ];
}, []) : [];
var trimIfString = (val) => typeof val === "string" ? val.trim() : val;
var toArray = (v) => Array.isArray(v) ? v.map(trimIfString) : typeof v === "string" ? splitBy(v, defaultJoinChar).filter((s) => !/^\s*$/.test(s)).map((s) => s.trim()) : typeof v === "number" ? [v] : [];

// src/utils/parseNumber.ts
var import_numeric_quantity = require("numeric-quantity");
var parseNumber = (v, pno = {}) => {
  if (!pno.parseNumbers || typeof v === "bigint" || typeof v === "number") {
    return v;
  }
  if (pno.parseNumbers === "native") {
    return parseFloat(v);
  }
  const n = (
    // TODO: Should these options be configurable?
    (0, import_numeric_quantity.numericQuantity)(v, {
      allowTrailingInvalid: pno.parseNumbers === "enhanced",
      romanNumerals: true,
      round: false
    })
  );
  return isNaN(n) ? v : n;
};

// src/utils/misc.ts
var import_numeric_quantity2 = require("numeric-quantity");
var numericRegex = new RegExp(
  import_numeric_quantity2.numericRegex.source.replace(/^\^/, "^\\s*").replace(/\$$/, "\\s*$")
);
var isPojo = (obj) => obj === null || typeof obj !== "object" ? false : Object.getPrototypeOf(obj) === Object.prototype;

// src/utils/isRuleGroup.ts
var isRuleGroup = (rg) => isPojo(rg) && "rules" in rg && Array.isArray(rg.rules);
var isRuleGroupType = (rg) => isRuleGroup(rg) && typeof rg.combinator === "string";

// src/utils/formatQuery/utils.ts
var mapSQLOperator = (op) => {
  switch (op.toLowerCase()) {
    case "null":
      return "is null";
    case "notnull":
      return "is not null";
    case "notin":
      return "not in";
    case "notbetween":
      return "not between";
    case "contains":
    case "beginswith":
    case "endswith":
      return "like";
    case "doesnotcontain":
    case "doesnotbeginwith":
    case "doesnotendwith":
      return "not like";
    default:
      return op;
  }
};
var mongoOperators = {
  "=": "$eq",
  "!=": "$ne",
  "<": "$lt",
  "<=": "$lte",
  ">": "$gt",
  ">=": "$gte",
  in: "$in",
  notIn: "$nin"
};
var celCombinatorMap = {
  and: "&&",
  or: "||"
};
var jsonLogicAdditionalOperators = {
  startsWith: (a, b) => typeof a === "string" && a.startsWith(b),
  endsWith: (a, b) => typeof a === "string" && a.endsWith(b)
};
var numerifyValues = (rg) => ({
  ...rg,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error TS doesn't keep track of odd/even indexes here
  rules: rg.rules.map((r) => {
    if (typeof r === "string") {
      return r;
    }
    if (isRuleGroup(r)) {
      return numerifyValues(r);
    }
    let { value } = r;
    if (typeof value === "string") {
      value = parseNumber(value, { parseNumbers: true });
    }
    return { ...r, value };
  })
});
var isValidValue = (v) => typeof v === "string" && v.length > 0 || typeof v === "number" && !isNaN(v) || typeof v !== "string" && typeof v !== "number";
var shouldRenderAsNumber = (v, parseNumbers) => parseNumbers && (typeof v === "number" || typeof v === "bigint" || typeof v === "string" && numericRegex.test(v));
var isValueProcessorLegacy = (vp) => vp.length >= 3;
var quoteFieldNamesWithArray = (quoteFieldNamesWith = ["", ""]) => Array.isArray(quoteFieldNamesWith) ? quoteFieldNamesWith : typeof quoteFieldNamesWith === "string" ? [quoteFieldNamesWith, quoteFieldNamesWith] : quoteFieldNamesWith ?? ["", ""];
var nullOrUndefinedOrEmpty = (v) => v === null || typeof v === "undefined" || v === "";

// src/utils/formatQuery/defaultRuleProcessorCEL.ts
var shouldNegate = (op) => /^(does)?not/i.test(op);
var escapeDoubleQuotes = (v, escapeQuotes) => typeof v !== "string" || !escapeQuotes ? v : v.replaceAll(`"`, `\\"`);
var defaultRuleProcessorCEL = ({ field, operator, value, valueSource }, { escapeQuotes, parseNumbers } = {}) => {
  const valueIsField = valueSource === "field";
  const operatorTL = operator.replace(/^=$/, "==");
  const useBareValue = typeof value === "number" || typeof value === "boolean" || typeof value === "bigint" || shouldRenderAsNumber(value, parseNumbers);
  switch (operatorTL) {
    case "<":
    case "<=":
    case "==":
    case "!=":
    case ">":
    case ">=":
      return `${field} ${operatorTL} ${valueIsField || useBareValue ? trimIfString(value) : `"${escapeDoubleQuotes(value, escapeQuotes)}"`}`;
    case "contains":
    case "doesNotContain": {
      const negate2 = shouldNegate(operatorTL) ? "!" : "";
      return `${negate2}${field}.contains(${valueIsField ? trimIfString(value) : `"${escapeDoubleQuotes(value, escapeQuotes)}"`})`;
    }
    case "beginsWith":
    case "doesNotBeginWith": {
      const negate2 = shouldNegate(operatorTL) ? "!" : "";
      return `${negate2}${field}.startsWith(${valueIsField ? trimIfString(value) : `"${escapeDoubleQuotes(value, escapeQuotes)}"`})`;
    }
    case "endsWith":
    case "doesNotEndWith": {
      const negate2 = shouldNegate(operatorTL) ? "!" : "";
      return `${negate2}${field}.endsWith(${valueIsField ? trimIfString(value) : `"${escapeDoubleQuotes(value, escapeQuotes)}"`})`;
    }
    case "null":
      return `${field} == null`;
    case "notNull":
      return `${field} != null`;
    case "in":
    case "notIn": {
      const negate2 = shouldNegate(operatorTL);
      const valueAsArray = toArray(value);
      return `${negate2 ? "!(" : ""}${field} in [${valueAsArray.map(
        (val) => valueIsField || shouldRenderAsNumber(val, parseNumbers) ? `${trimIfString(val)}` : `"${escapeDoubleQuotes(val, escapeQuotes)}"`
      ).join(", ")}]${negate2 ? ")" : ""}`;
    }
    case "between":
    case "notBetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && !nullOrUndefinedOrEmpty(valueAsArray[0]) && !nullOrUndefinedOrEmpty(valueAsArray[1])) {
        const [first, second] = valueAsArray;
        const firstNum = shouldRenderAsNumber(first, true) ? parseNumber(first, { parseNumbers: true }) : NaN;
        const secondNum = shouldRenderAsNumber(second, true) ? parseNumber(second, { parseNumbers: true }) : NaN;
        let firstValue = isNaN(firstNum) ? valueIsField ? `${first}` : `"${escapeDoubleQuotes(first, escapeQuotes)}"` : firstNum;
        let secondValue = isNaN(secondNum) ? valueIsField ? `${second}` : `"${escapeDoubleQuotes(second, escapeQuotes)}"` : secondNum;
        if (firstValue === firstNum && secondValue === secondNum && secondNum < firstNum) {
          const tempNum = secondNum;
          secondValue = firstNum;
          firstValue = tempNum;
        }
        if (operator === "between") {
          return `(${field} >= ${firstValue} && ${field} <= ${secondValue})`;
        } else {
          return `(${field} < ${firstValue} || ${field} > ${secondValue})`;
        }
      } else {
        return "";
      }
    }
  }
  return "";
};

// src/utils/formatQuery/defaultRuleProcessorMongoDB.ts
var escapeDoubleQuotes2 = (v) => typeof v !== "string" ? v : v.replaceAll("\\", "\\\\").replaceAll(`"`, `\\"`);
var defaultRuleProcessorMongoDB = ({ field, operator, value, valueSource }, { parseNumbers } = {}) => {
  const valueIsField = valueSource === "field";
  const useBareValue = typeof value === "number" || typeof value === "boolean" || typeof value === "bigint" || shouldRenderAsNumber(value, parseNumbers);
  if (operator === "=" && !valueIsField) {
    return `{"${field}":${useBareValue ? trimIfString(value) : `"${escapeDoubleQuotes2(value)}"`}}`;
  }
  switch (operator) {
    case "<":
    case "<=":
    case "=":
    case "!=":
    case ">":
    case ">=": {
      const mongoOperator = mongoOperators[operator];
      return valueIsField ? `{"$expr":{"${mongoOperator}":["$${field}","$${value}"]}}` : `{"${field}":{"${mongoOperator}":${useBareValue ? trimIfString(value) : `"${escapeDoubleQuotes2(value)}"`}}}`;
    }
    case "contains":
      return valueIsField ? `{"$where":"this.${field}.includes(this.${value})"}` : `{"${field}":{"$regex":"${escapeDoubleQuotes2(value)}"}}`;
    case "beginsWith":
      return valueIsField ? `{"$where":"this.${field}.startsWith(this.${value})"}` : `{"${field}":{"$regex":"^${escapeDoubleQuotes2(value)}"}}`;
    case "endsWith":
      return valueIsField ? `{"$where":"this.${field}.endsWith(this.${value})"}` : `{"${field}":{"$regex":"${escapeDoubleQuotes2(value)}$"}}`;
    case "doesNotContain":
      return valueIsField ? `{"$where":"!this.${field}.includes(this.${value})"}` : `{"${field}":{"$not":{"$regex":"${escapeDoubleQuotes2(value)}"}}}`;
    case "doesNotBeginWith":
      return valueIsField ? `{"$where":"!this.${field}.startsWith(this.${value})"}` : `{"${field}":{"$not":{"$regex":"^${escapeDoubleQuotes2(value)}"}}}`;
    case "doesNotEndWith":
      return valueIsField ? `{"$where":"!this.${field}.endsWith(this.${value})"}` : `{"${field}":{"$not":{"$regex":"${escapeDoubleQuotes2(value)}$"}}}`;
    case "null":
      return `{"${field}":null}`;
    case "notNull":
      return `{"${field}":{"$ne":null}}`;
    case "in":
    case "notIn": {
      const valueAsArray = toArray(value);
      return valueIsField ? `{"$where":"${operator === "notIn" ? "!" : ""}[${valueAsArray.map((val) => `this.${val}`).join(",")}].includes(this.${field})"}` : `{"${field}":{"${mongoOperators[operator]}":[${valueAsArray.map(
        (val) => shouldRenderAsNumber(val, parseNumbers) ? `${trimIfString(val)}` : `"${escapeDoubleQuotes2(val)}"`
      ).join(",")}]}}`;
    }
    case "between":
    case "notBetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && isValidValue(valueAsArray[0]) && isValidValue(valueAsArray[1])) {
        const [first, second] = valueAsArray;
        const firstNum = shouldRenderAsNumber(first, true) ? parseNumber(first, { parseNumbers: true }) : NaN;
        const secondNum = shouldRenderAsNumber(second, true) ? parseNumber(second, { parseNumbers: true }) : NaN;
        const firstValue = valueIsField || !isNaN(firstNum) ? `${first}` : `"${escapeDoubleQuotes2(first)}"`;
        const secondValue = valueIsField || !isNaN(secondNum) ? `${second}` : `"${escapeDoubleQuotes2(second)}"`;
        if (operator === "between") {
          return valueIsField ? `{"$and":[{"$expr":{"$gte":["$${field}","$${firstValue}"]}},{"$expr":{"$lte":["$${field}","$${secondValue}"]}}]}` : `{"${field}":{"$gte":${firstValue},"$lte":${secondValue}}}`;
        } else {
          return valueIsField ? `{"$or":[{"$expr":{"$lt":["$${field}","$${firstValue}"]}},{"$expr":{"$gt":["$${field}","$${secondValue}"]}}]}` : `{"$or":[{"${field}":{"$lt":${firstValue}}},{"${field}":{"$gt":${secondValue}}}]}`;
        }
      } else {
        return "";
      }
    }
  }
  return "";
};

// src/utils/formatQuery/defaultRuleProcessorSpEL.ts
var shouldNegate2 = (op) => /^(does)?not/i.test(op);
var wrapInNegation = (clause, negate2) => negate2 ? `!(${clause})` : `${clause}`;
var escapeSingleQuotes = (v, escapeQuotes) => typeof v !== "string" || !escapeQuotes ? v : v.replaceAll(`'`, `\\'`);
var defaultRuleProcessorSpEL = ({ field, operator, value, valueSource }, { escapeQuotes, parseNumbers } = {}) => {
  const valueIsField = valueSource === "field";
  const operatorTL = operator.replace(/^=$/, "==");
  const useBareValue = typeof value === "number" || typeof value === "boolean" || typeof value === "bigint" || shouldRenderAsNumber(value, parseNumbers);
  switch (operatorTL) {
    case "<":
    case "<=":
    case "==":
    case "!=":
    case ">":
    case ">=":
      return `${field} ${operatorTL} ${valueIsField || useBareValue ? trimIfString(value) : `'${escapeSingleQuotes(value, escapeQuotes)}'`}`;
    case "contains":
    case "doesNotContain":
      return wrapInNegation(
        `${field} matches ${valueIsField || useBareValue ? trimIfString(value) : `'${escapeSingleQuotes(value, escapeQuotes)}'`}`,
        shouldNegate2(operatorTL)
      );
    case "beginsWith":
    case "doesNotBeginWith": {
      const valueTL = valueIsField ? `'^'.concat(${trimIfString(value)})` : `'${typeof value === "string" && !value.startsWith("^") || useBareValue ? "^" : ""}${escapeSingleQuotes(value, escapeQuotes)}'`;
      return wrapInNegation(`${field} matches ${valueTL}`, shouldNegate2(operatorTL));
    }
    case "endsWith":
    case "doesNotEndWith": {
      const valueTL = valueIsField ? `${trimIfString(value)}.concat('$')` : `'${escapeSingleQuotes(value, escapeQuotes)}${typeof value === "string" && !value.endsWith("$") || useBareValue ? "$" : ""}'`;
      return wrapInNegation(`${field} matches ${valueTL}`, shouldNegate2(operatorTL));
    }
    case "null":
      return `${field} == null`;
    case "notNull":
      return `${field} != null`;
    case "in":
    case "notIn": {
      const negate2 = shouldNegate2(operatorTL) ? "!" : "";
      const valueAsArray = toArray(value);
      if (valueAsArray.length > 0) {
        return `${negate2}(${valueAsArray.map(
          (val) => `${field} == ${valueIsField || shouldRenderAsNumber(val, parseNumbers) ? `${trimIfString(val)}` : `'${escapeSingleQuotes(val, escapeQuotes)}'`}`
        ).join(" or ")})`;
      } else {
        return "";
      }
    }
    case "between":
    case "notBetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && !nullOrUndefinedOrEmpty(valueAsArray[0]) && !nullOrUndefinedOrEmpty(valueAsArray[1])) {
        const [first, second] = valueAsArray;
        const firstNum = shouldRenderAsNumber(first, true) ? parseNumber(first, { parseNumbers: true }) : NaN;
        const secondNum = shouldRenderAsNumber(second, true) ? parseNumber(second, { parseNumbers: true }) : NaN;
        let firstValue = isNaN(firstNum) ? valueIsField ? `${first}` : `'${escapeSingleQuotes(first, escapeQuotes)}'` : firstNum;
        let secondValue = isNaN(secondNum) ? valueIsField ? `${second}` : `'${escapeSingleQuotes(second, escapeQuotes)}'` : secondNum;
        if (firstValue === firstNum && secondValue === secondNum && secondNum < firstNum) {
          const tempNum = secondNum;
          secondValue = firstNum;
          firstValue = tempNum;
        }
        if (operator === "between") {
          return `(${field} >= ${firstValue} and ${field} <= ${secondValue})`;
        } else {
          return `(${field} < ${firstValue} or ${field} > ${secondValue})`;
        }
      } else {
        return "";
      }
    }
  }
  return "";
};

// src/utils/formatQuery/defaultValueProcessorByRule.ts
var escapeStringValueQuotes = (v, quoteChar, escapeQuotes) => escapeQuotes && typeof v === "string" ? v.replaceAll(`${quoteChar}`, `${quoteChar}${quoteChar}`) : v;
var defaultValueProcessorByRule = ({ operator, value, valueSource }, { escapeQuotes, parseNumbers, quoteFieldNamesWith, quoteValuesWith } = {}) => {
  const valueIsField = valueSource === "field";
  const [qfnwPre, qfnwPost] = quoteFieldNamesWithArray(quoteFieldNamesWith);
  const operatorLowerCase = operator.toLowerCase();
  const quoteChar = quoteValuesWith || "'";
  const escapeValue = (v) => escapeStringValueQuotes(v, quoteChar, escapeQuotes);
  const wrapAndEscape = (v) => `${quoteChar}${escapeValue(v)}${quoteChar}`;
  const wrapFieldName = (f) => `${qfnwPre}${f}${qfnwPost}`;
  switch (operatorLowerCase) {
    case "null":
    case "notnull": {
      return "";
    }
    case "in":
    case "notin": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length > 0) {
        return `(${valueAsArray.map(
          (v) => valueIsField ? wrapFieldName(v) : shouldRenderAsNumber(v, parseNumbers) ? `${trimIfString(v)}` : `${wrapAndEscape(v)}`
        ).join(", ")})`;
      }
      return "";
    }
    case "between":
    case "notbetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && isValidValue(valueAsArray[0]) && isValidValue(valueAsArray[1])) {
        const [first, second] = valueAsArray;
        return valueIsField ? `${wrapFieldName(first)} and ${wrapFieldName(second)}` : shouldRenderAsNumber(first, parseNumbers) && shouldRenderAsNumber(second, parseNumbers) ? `${trimIfString(first)} and ${trimIfString(second)}` : `${wrapAndEscape(first)} and ${wrapAndEscape(second)}`;
      }
      return "";
    }
    case "contains":
    case "doesnotcontain":
      return valueIsField ? `${quoteChar}%${quoteChar} || ${wrapFieldName(value)} || ${quoteChar}%${quoteChar}` : `${quoteChar}%${escapeValue(value)}%${quoteChar}`;
    case "beginswith":
    case "doesnotbeginwith":
      return valueIsField ? `${wrapFieldName(value)} || ${quoteChar}%${quoteChar}` : `${quoteChar}${escapeValue(value)}%${quoteChar}`;
    case "endswith":
    case "doesnotendwith":
      return valueIsField ? `${quoteChar}%${quoteChar} || ${wrapFieldName(value)}` : `${quoteChar}%${escapeValue(value)}${quoteChar}`;
  }
  if (typeof value === "boolean") {
    return value ? "TRUE" : "FALSE";
  }
  return valueIsField ? wrapFieldName(value) : shouldRenderAsNumber(value, parseNumbers) ? `${trimIfString(value)}` : `${wrapAndEscape(value)}`;
};

// src/utils/formatQuery/defaultRuleProcessorElasticSearch.ts
var rangeOperatorMap = { "<": "lt", "<=": "lte", ">": "gt", ">=": "gte" };
var negateIfNotOp = (op, elasticSearchRule) => /^(does)?not/i.test(op) ? { bool: { must_not: elasticSearchRule } } : elasticSearchRule;
var escapeSQ = (s) => s?.replace(/('|\\)/g, `\\$1`);
var textFunctionMap = {
  beginsWith: "startsWith",
  doesNotContain: "contains",
  doesNotBeginWith: "startsWith",
  doesNotEndWith: "endsWith"
};
var getTextScript = (f, o, v) => {
  const script = `doc['${f}'].${textFunctionMap[o] ?? o}(doc['${v}'])`;
  return o.startsWith("d") ? `!${script}` : script;
};
var valueRenderer = (v, parseNumbers) => typeof v === "boolean" ? v : shouldRenderAsNumber(v, parseNumbers) ? parseNumber(v, { parseNumbers }) : v;
var defaultRuleProcessorElasticSearch = ({ field, operator, value, valueSource }, { parseNumbers } = {}) => {
  if (valueSource === "field") {
    if (toArray(value).some((v) => typeof v !== "string"))
      return false;
    const fieldForScript = escapeSQ(field);
    switch (operator) {
      case "=":
      case "!=":
      case ">":
      case ">=":
      case "<":
      case "<=": {
        const operatorForScript = operator === "=" ? "==" : operator;
        const valueForScript = escapeSQ(value);
        return !valueForScript ? false : {
          bool: {
            filter: {
              script: {
                script: `doc['${fieldForScript}'] ${operatorForScript} doc['${valueForScript}']`
              }
            }
          }
        };
      }
      case "in":
      case "notIn": {
        const valueAsArray = toArray(value);
        if (valueAsArray.length > 0) {
          const arr = valueAsArray.map((v) => ({
            bool: { filter: { script: { script: `doc['${fieldForScript}'] == doc['${v}']` } } }
          }));
          return { bool: operator === "in" ? { should: arr } : { must_not: arr } };
        }
        return false;
      }
      case "between":
      case "notBetween": {
        const valueAsArray = toArray(value);
        if (valueAsArray.length >= 2 && valueAsArray[0] && valueAsArray[1]) {
          const script = `doc['${fieldForScript}'] >= doc['${valueAsArray[0]}'] && doc['${fieldForScript}'] <= doc['${valueAsArray[1]}']`;
          return {
            bool: {
              filter: { script: { script: operator === "notBetween" ? `!(${script})` : script } }
            }
          };
        }
        return false;
      }
      case "contains":
      case "doesNotContain":
      case "beginsWith":
      case "doesNotBeginWith":
      case "endsWith":
      case "doesNotEndWith": {
        const valueForScript = escapeSQ(value);
        if (!valueForScript)
          return false;
        const script = getTextScript(fieldForScript, operator, valueForScript);
        return {
          bool: {
            filter: {
              script: {
                script
              }
            }
          }
        };
      }
    }
  }
  switch (operator) {
    case "<":
    case "<=":
    case ">":
    case ">=":
      return {
        range: {
          [field]: {
            [rangeOperatorMap[operator]]: valueRenderer(value, parseNumbers)
          }
        }
      };
    case "=":
      return { term: { [field]: valueRenderer(value, parseNumbers) } };
    case "!=":
      return { bool: { must_not: { term: { [field]: valueRenderer(value, parseNumbers) } } } };
    case "null":
      return { bool: { must_not: { exists: { field } } } };
    case "notNull":
      return { exists: { field } };
    case "in":
    case "notIn": {
      const valueAsArray = toArray(value).map((v) => valueRenderer(v, parseNumbers));
      if (valueAsArray.length > 0) {
        const arr = valueAsArray.map((v) => ({ term: { [field]: valueRenderer(v, parseNumbers) } }));
        return { bool: operator === "in" ? { should: arr } : { must_not: arr } };
      }
      return false;
    }
    case "between":
    case "notBetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && isValidValue(valueAsArray[0]) && isValidValue(valueAsArray[1])) {
        let [first, second] = valueAsArray;
        if (shouldRenderAsNumber(first, true) && shouldRenderAsNumber(second, true)) {
          const firstNum = parseNumber(first, { parseNumbers: true });
          const secondNum = parseNumber(second, { parseNumbers: true });
          if (secondNum < firstNum) {
            const tempNum = secondNum;
            second = firstNum;
            first = tempNum;
          } else {
            first = firstNum;
            second = secondNum;
          }
        }
        return negateIfNotOp(operator, { range: { [field]: { gte: first, lte: second } } });
      }
      return false;
    }
    case "contains":
    case "doesNotContain":
      return negateIfNotOp(operator, { regexp: { [field]: { value } } });
    case "beginsWith":
    case "doesNotBeginWith":
      return negateIfNotOp(operator, { regexp: { [field]: { value: `^${value}` } } });
    case "endsWith":
    case "doesNotEndWith":
      return negateIfNotOp(operator, { regexp: { [field]: { value: `${value}$` } } });
  }
  return false;
};

// src/utils/formatQuery/defaultRuleProcessorJSONata.ts
var shouldNegate3 = (op) => /^(does)?not/i.test(op);
var quote = (v, escapeQuotes) => `"${typeof v !== "string" || !escapeQuotes ? v : v.replaceAll(`"`, `\\"`)}"`;
var negate = (clause, negate2) => negate2 ? `$not(${clause})` : `${clause}`;
var escapeStringRegex = (s) => `${s}`.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
var defaultRuleProcessorJSONata = ({ field, operator, value, valueSource }, { escapeQuotes, parseNumbers = true, quoteFieldNamesWith = ["", ""] } = {}) => {
  const valueIsField = valueSource === "field";
  const useBareValue = typeof value === "number" || typeof value === "boolean" || typeof value === "bigint" || shouldRenderAsNumber(value, parseNumbers);
  const [qPre, qPost] = quoteFieldNamesWithArray(quoteFieldNamesWith);
  const qfn = (f) => `${qPre}${f}${qPost}`;
  switch (operator) {
    case "<":
    case "<=":
    case "=":
    case "!=":
    case ">":
    case ">=":
      return `${qfn(field)} ${operator} ${valueIsField ? qfn(trimIfString(value)) : useBareValue ? trimIfString(value) : quote(value, escapeQuotes)}`;
    case "contains":
    case "doesNotContain":
      return negate(
        `$contains(${qfn(field)}, ${valueIsField ? qfn(trimIfString(value)) : quote(value, escapeQuotes)})`,
        shouldNegate3(operator)
      );
    case "beginsWith":
    case "doesNotBeginWith":
      return negate(
        valueIsField ? `$substring(${qfn(field)}, 0, $length(${qfn(trimIfString(value))})) = ${qfn(trimIfString(value))}` : `$contains(${qfn(field)}, /^${escapeStringRegex(value)}/)`,
        shouldNegate3(operator)
      );
    case "endsWith":
    case "doesNotEndWith":
      return negate(
        valueIsField ? `$substring(${qfn(field)}, $length(${qfn(field)}) - $length(${qfn(trimIfString(value))})) = ${qfn(trimIfString(value))}` : `$contains(${qfn(field)}, /${escapeStringRegex(value)}$/)`,
        shouldNegate3(operator)
      );
    case "null":
      return `${qfn(field)} = null`;
    case "notNull":
      return `${qfn(field)} != null`;
    case "in":
    case "notIn": {
      const valueAsArray = toArray(value);
      return negate(
        `${qfn(field)} in [${valueAsArray.map(
          (val) => valueIsField ? `${qfn(trimIfString(val))}` : shouldRenderAsNumber(val, parseNumbers) ? `${trimIfString(val)}` : quote(val, escapeQuotes)
        ).join(", ")}]`,
        shouldNegate3(operator)
      );
    }
    case "between":
    case "notBetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && !nullOrUndefinedOrEmpty(valueAsArray[0]) && !nullOrUndefinedOrEmpty(valueAsArray[1])) {
        const [first, second] = valueAsArray;
        const firstNum = shouldRenderAsNumber(first, true) ? parseNumber(first, { parseNumbers: true }) : NaN;
        const secondNum = shouldRenderAsNumber(second, true) ? parseNumber(second, { parseNumbers: true }) : NaN;
        let firstValue = isNaN(firstNum) ? valueIsField ? `${first}` : first : firstNum;
        let secondValue = isNaN(secondNum) ? valueIsField ? `${second}` : second : secondNum;
        if (firstValue === firstNum && secondValue === secondNum && secondNum < firstNum) {
          const tempNum = secondNum;
          secondValue = firstNum;
          firstValue = tempNum;
        }
        const renderAsNumbers = shouldRenderAsNumber(first, parseNumbers) && shouldRenderAsNumber(second, parseNumbers);
        const expression = `${qfn(field)} >= ${valueIsField ? qfn(first) : renderAsNumbers ? firstValue : quote(firstValue, escapeQuotes)} and ${qfn(field)} <= ${valueIsField ? qfn(second) : renderAsNumbers ? secondValue : quote(secondValue, escapeQuotes)}`;
        return operator === "between" ? `(${expression})` : negate(expression, true);
      } else {
        return "";
      }
    }
  }
  return "";
};

// src/utils/formatQuery/defaultRuleProcessorJsonLogic.ts
var convertOperator = (op) => op.replace(/^(=)$/, "$1=").replace(/^notNull$/i, "!=").replace(/^null$/i, "==");
var negateIfNotOp2 = (op, jsonRule) => /^(does)?not/i.test(op) ? { "!": jsonRule } : jsonRule;
var defaultRuleProcessorJsonLogic = ({ field, operator, value, valueSource }, { parseNumbers } = {}) => {
  const valueIsField = valueSource === "field";
  const fieldObject = { var: field };
  const fieldOrNumberRenderer = (v) => valueIsField ? { var: `${v}` } : shouldRenderAsNumber(v, parseNumbers) ? parseNumber(v, { parseNumbers }) : v;
  switch (operator) {
    case "<":
    case "<=":
    case "=":
    case "!=":
    case ">":
    case ">=":
      return {
        [convertOperator(operator)]: [fieldObject, fieldOrNumberRenderer(value)]
      };
    case "null":
    case "notNull": {
      return {
        [`${operator === "notNull" ? "!" : "="}=`]: [fieldObject, null]
      };
    }
    case "in":
    case "notIn": {
      const valueAsArray = toArray(value).map(fieldOrNumberRenderer);
      return negateIfNotOp2(operator, { in: [fieldObject, valueAsArray] });
    }
    case "between":
    case "notBetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && isValidValue(valueAsArray[0]) && isValidValue(valueAsArray[1])) {
        let [first, second] = valueAsArray;
        if (!valueIsField && shouldRenderAsNumber(first, true) && shouldRenderAsNumber(second, true)) {
          const firstNum = parseNumber(first, { parseNumbers: true });
          const secondNum = parseNumber(second, { parseNumbers: true });
          if (secondNum < firstNum) {
            const tempNum = secondNum;
            second = firstNum;
            first = tempNum;
          } else {
            first = firstNum;
            second = secondNum;
          }
        } else if (valueIsField) {
          first = { var: first };
          second = { var: second };
        }
        const jsonRule = { "<=": [first, fieldObject, second] };
        return negateIfNotOp2(operator, jsonRule);
      }
      return false;
    }
    case "contains":
    case "doesNotContain": {
      const jsonRule = {
        in: [fieldOrNumberRenderer(value), fieldObject]
      };
      return negateIfNotOp2(operator, jsonRule);
    }
    case "beginsWith":
    case "doesNotBeginWith": {
      const jsonRule = {
        startsWith: [fieldObject, fieldOrNumberRenderer(value)]
      };
      return negateIfNotOp2(operator, jsonRule);
    }
    case "endsWith":
    case "doesNotEndWith": {
      const jsonRule = {
        endsWith: [fieldObject, fieldOrNumberRenderer(value)]
      };
      return negateIfNotOp2(operator, jsonRule);
    }
  }
  return false;
};

// src/utils/formatQuery/defaultRuleProcessorParameterized.ts
var defaultRuleProcessorParameterized = (rule, opts, meta) => {
  const {
    fieldData,
    format,
    getNextNamedParam,
    parseNumbers,
    paramPrefix,
    paramsKeepPrefix,
    numberedParams,
    quoteFieldNamesWith = ["", ""],
    valueProcessor = defaultValueProcessorByRule
  } = opts ?? {};
  const { processedParams = [] } = meta ?? {};
  const parameterized = format === "parameterized";
  const params = [];
  const paramsNamed = {};
  const finalize = (sql) => {
    if (parameterized) {
      return { sql, params };
    }
    return { sql, params: paramsNamed };
  };
  const value = valueProcessor(rule, {
    parseNumbers,
    quoteFieldNamesWith,
    fieldData,
    format
  });
  const sqlOperator = mapSQLOperator(rule.operator);
  const sqlOperatorLowerCase = sqlOperator.toLowerCase();
  if ((sqlOperatorLowerCase === "in" || sqlOperatorLowerCase === "not in" || sqlOperatorLowerCase === "between" || sqlOperatorLowerCase === "not between") && !value) {
    return finalize("");
  } else if (sqlOperatorLowerCase === "is null" || sqlOperatorLowerCase === "is not null") {
    return finalize(
      `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator}`
    );
  } else if (rule.valueSource === "field") {
    return finalize(
      `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator} ${value}`.trim()
    );
  }
  if (sqlOperatorLowerCase === "in" || sqlOperatorLowerCase === "not in") {
    const splitValue = toArray(rule.value);
    if (parameterized) {
      splitValue.forEach(
        (v) => params.push(shouldRenderAsNumber(v, parseNumbers) ? parseNumber(v, { parseNumbers }) : v)
      );
      return finalize(
        `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator} (${splitValue.map(
          (_v, i) => numberedParams ? `${paramPrefix}${processedParams.length + 1 + splitValue.length - (splitValue.length - i)}` : "?"
        ).join(", ")})`
      );
    }
    const inParams = [];
    splitValue.forEach((v) => {
      const thisParamName = getNextNamedParam(rule.field);
      inParams.push(`${paramPrefix}${thisParamName}`);
      paramsNamed[`${paramsKeepPrefix ? paramPrefix : ""}${thisParamName}`] = shouldRenderAsNumber(
        v,
        parseNumbers
      ) ? parseNumber(v, { parseNumbers }) : v;
    });
    return finalize(
      `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator} (${inParams.join(", ")})`
    );
  } else if (sqlOperatorLowerCase === "between" || sqlOperatorLowerCase === "not between") {
    const valueAsArray = toArray(rule.value);
    const [first, second] = valueAsArray.slice(0, 2).map((v) => shouldRenderAsNumber(v, parseNumbers) ? parseNumber(v, { parseNumbers }) : v);
    if (parameterized) {
      params.push(first);
      params.push(second);
      return finalize(
        `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator} ${numberedParams ? `${paramPrefix}${processedParams.length + 1}` : "?"} and ${numberedParams ? `${paramPrefix}${processedParams.length + 2}` : "?"}`
      );
    }
    const firstParamName = getNextNamedParam(rule.field);
    const secondParamName = getNextNamedParam(rule.field);
    paramsNamed[`${paramsKeepPrefix ? paramPrefix : ""}${firstParamName}`] = first;
    paramsNamed[`${paramsKeepPrefix ? paramPrefix : ""}${secondParamName}`] = second;
    return finalize(
      `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator} ${paramPrefix}${firstParamName} and ${paramPrefix}${secondParamName}`
    );
  }
  let paramValue = rule.value;
  if (typeof rule.value === "string") {
    if (shouldRenderAsNumber(rule.value, parseNumbers)) {
      paramValue = parseNumber(rule.value, { parseNumbers });
    } else {
      paramValue = /^'.*'$/g.test(value) ? value.replace(/(^'|'$)/g, "") : (
        /* istanbul ignore next */
        value
      );
    }
  }
  let paramName = "";
  if (parameterized) {
    params.push(paramValue);
  } else {
    paramName = getNextNamedParam(rule.field);
    paramsNamed[`${paramsKeepPrefix ? paramPrefix : ""}${paramName}`] = paramValue;
  }
  return finalize(
    `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator} ${parameterized ? numberedParams ? `${paramPrefix}${processedParams.length + 1}` : "?" : `${paramPrefix}${paramName}`}`.trim()
  );
};

// src/utils/formatQuery/defaultRuleProcessorSQL.ts
var defaultRuleProcessorSQL = (rule, opts) => {
  const {
    parseNumbers,
    escapeQuotes,
    quoteFieldNamesWith = ["", ""],
    quoteValuesWith = `'`,
    valueProcessor = defaultValueProcessorByRule
  } = opts ?? {};
  const value = valueProcessor(rule, {
    parseNumbers,
    escapeQuotes,
    quoteFieldNamesWith,
    quoteValuesWith
  });
  const operator = mapSQLOperator(rule.operator);
  const operatorLowerCase = operator.toLowerCase();
  if ((operatorLowerCase === "in" || operatorLowerCase === "not in" || operatorLowerCase === "between" || operatorLowerCase === "not between") && !value) {
    return "";
  }
  const [qPre, qPost] = quoteFieldNamesWithArray(quoteFieldNamesWith);
  return `${qPre}${rule.field}${qPost} ${operator} ${value}`.trim();
};

// src/utils/convertQuery.ts
var processRuleOrStringOrRuleGroupIC = (r) => isRuleGroup(r) ? generateRuleGroupICWithConsistentCombinators(r) : r;
var generateRuleGroupICWithConsistentCombinators = (rg) => {
  const returnArray = [];
  const push = (r) => returnArray.push(processRuleOrStringOrRuleGroupIC(r));
  let startIndex = 0;
  for (let i = 0; i < rg.rules.length; i += 2) {
    if (rg.rules.length === 1) {
      push(rg.rules[0]);
    } else if (rg.rules[i + 1] === "and") {
      startIndex = i;
      let j = 1;
      while (rg.rules[startIndex + j] === "and") {
        i += 2;
        j += 2;
      }
      returnArray.push({
        // @ts-expect-error Too complicated to keep track of odd/even indexes in TS
        rules: rg.rules.slice(startIndex, i + 1).map(processRuleOrStringOrRuleGroupIC)
      });
      i -= 2;
    } else if (rg.rules[i + 1] === "or") {
      if (i === 0 || i === rg.rules.length - 3) {
        if (i === 0 || rg.rules[i - 1] === "or") {
          push(rg.rules[i]);
        }
        push(rg.rules[i + 1]);
        if (i === rg.rules.length - 3) {
          push(rg.rules[i + 2]);
        }
      } else {
        if (rg.rules[i - 1] === "and") {
          push(rg.rules[i + 1]);
        } else {
          push(rg.rules[i]);
          push(rg.rules[i + 1]);
        }
      }
    }
  }
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error TS still thinks returnArray has length 0
    returnArray.length === 1 && typeof returnArray[0] === "object" && isRuleGroup(returnArray[0])
  ) {
    return { ...rg, ...returnArray[0] };
  }
  return { ...rg, rules: returnArray };
};
var convertFromIC = (rg) => {
  if (isRuleGroupType(rg)) {
    return rg;
  }
  const processedRG = generateRuleGroupICWithConsistentCombinators(rg);
  const rulesAsMixedList = processedRG.rules.map(
    (r) => typeof r === "string" || !isRuleGroup(r) ? r : convertFromIC(r)
  );
  const combinator = rulesAsMixedList.length < 2 ? "and" : rulesAsMixedList[1];
  const rules = rulesAsMixedList.filter((r) => typeof r !== "string");
  return { ...processedRG, combinator, rules };
};

// src/utils/isRuleOrGroupValid.ts
var isValidationResult = (vr) => isPojo(vr) && typeof vr.valid === "boolean";
var isRuleOrGroupValid = (rg, validationResult, validator) => {
  if (typeof validationResult === "boolean") {
    return validationResult;
  }
  if (isValidationResult(validationResult)) {
    return validationResult.valid;
  }
  if (typeof validator === "function" && !isRuleGroup(rg)) {
    const vr = validator(rg);
    if (typeof vr === "boolean") {
      return vr;
    }
    if (isValidationResult(vr)) {
      return vr.valid;
    }
  }
  return true;
};

// src/utils/toFullOption.ts
var import_immer = require("immer");
var isOptionWithName = (opt) => isPojo(opt) && "name" in opt && typeof opt.name === "string";
var isOptionWithValue = (opt) => isPojo(opt) && "value" in opt && typeof opt.value === "string";
function toFullOption(opt, baseProperties) {
  const recipe = (0, import_immer.produce)((draft) => {
    const idObj = {};
    let needsUpdating = !!baseProperties;
    if (isOptionWithName(draft) && !isOptionWithValue(draft)) {
      idObj.value = draft.name;
      needsUpdating = true;
    } else if (!isOptionWithName(draft) && isOptionWithValue(draft)) {
      idObj.name = draft.value;
      needsUpdating = true;
    }
    if (needsUpdating) {
      return Object.assign({}, baseProperties, draft, idObj);
    }
  });
  return recipe(opt);
}
function toFullOptionList(optList, baseProperties) {
  if (!Array.isArray(optList)) {
    return [];
  }
  const recipe = (0, import_immer.produce)((draft) => {
    if (isFlexibleOptionGroupArray(draft)) {
      for (const optGroup of draft) {
        optGroup.options.forEach(
          (opt, idx) => optGroup.options[idx] = toFullOption(opt, baseProperties)
        );
      }
    } else {
      draft.forEach((opt, idx) => draft[idx] = toFullOption(opt, baseProperties));
    }
  });
  return recipe(optList);
}

// src/utils/uniq.ts
var uniqByIdentifier = (originalArray) => {
  const names = /* @__PURE__ */ new Set();
  const newArray = [];
  originalArray.forEach((el) => {
    if (!names.has(el.value ?? el.name)) {
      names.add(el.value ?? el.name);
      newArray.push(el);
    }
  });
  return originalArray.length === newArray.length ? originalArray : newArray;
};

// src/utils/optGroupUtils.ts
var isOptionGroupArray = (arr) => Array.isArray(arr) && arr.length > 0 && isPojo(arr[0]) && "options" in arr[0];
var isFlexibleOptionGroupArray = (arr) => Array.isArray(arr) && arr.length > 0 && isPojo(arr[0]) && "options" in arr[0] && isPojo(arr[0].options[0]) && ("name" in arr[0].options[0] || "value" in arr[0].options[0]);
var getOption = (arr, name) => (isOptionGroupArray(arr) ? arr.flatMap((og) => og.options) : arr).find((op) => op.name === name);
var toFlatOptionArray = (arr) => uniqByIdentifier(isOptionGroupArray(arr) ? arr.flatMap((og) => og.options) : arr);

// src/utils/formatQuery/formatQuery.ts
function formatQuery(ruleGroup, options = {}) {
  let format = "json";
  let valueProcessorInternal = defaultValueProcessorByRule;
  let ruleProcessorInternal = null;
  let quoteFieldNamesWith = ["", ""];
  let validator = () => true;
  let fields = [];
  let validationMap = {};
  let fallbackExpression = "";
  let paramPrefix = ":";
  let paramsKeepPrefix = false;
  let numberedParams = false;
  let parseNumbers = false;
  let placeholderFieldName = defaultPlaceholderFieldName;
  let placeholderOperatorName = defaultPlaceholderOperatorName;
  let quoteValuesWith = "'";
  if (typeof options === "string") {
    format = options.toLowerCase();
    if (format === "mongodb") {
      ruleProcessorInternal = defaultRuleProcessorMongoDB;
    } else if (format === "parameterized") {
      ruleProcessorInternal = defaultRuleProcessorParameterized;
    } else if (format === "parameterized_named") {
      ruleProcessorInternal = defaultRuleProcessorParameterized;
    } else if (format === "cel") {
      ruleProcessorInternal = defaultRuleProcessorCEL;
    } else if (format === "spel") {
      ruleProcessorInternal = defaultRuleProcessorSpEL;
    } else if (format === "jsonlogic") {
      ruleProcessorInternal = defaultRuleProcessorJsonLogic;
    } else if (format === "elasticsearch") {
      ruleProcessorInternal = defaultRuleProcessorElasticSearch;
    } else if (format === "jsonata") {
      ruleProcessorInternal = defaultRuleProcessorJSONata;
    }
  } else {
    format = (options.format ?? "json").toLowerCase();
    const { valueProcessor = null, ruleProcessor = null } = options;
    if (typeof ruleProcessor === "function") {
      ruleProcessorInternal = ruleProcessor;
    }
    valueProcessorInternal = typeof valueProcessor === "function" ? (r, opts) => isValueProcessorLegacy(valueProcessor) ? valueProcessor(r.field, r.operator, r.value, r.valueSource) : valueProcessor(r, opts) : format === "mongodb" ? ruleProcessorInternal ?? defaultRuleProcessorMongoDB : format === "cel" ? ruleProcessorInternal ?? defaultRuleProcessorCEL : format === "spel" ? ruleProcessorInternal ?? defaultRuleProcessorSpEL : format === "jsonlogic" ? ruleProcessorInternal ?? defaultRuleProcessorJsonLogic : format === "elasticsearch" ? ruleProcessorInternal ?? defaultRuleProcessorElasticSearch : format === "jsonata" ? ruleProcessorInternal ?? defaultRuleProcessorJSONata : defaultValueProcessorByRule;
    quoteFieldNamesWith = quoteFieldNamesWithArray(options.quoteFieldNamesWith);
    validator = options.validator ?? (() => true);
    fields = toFullOptionList(options.fields ?? []);
    fallbackExpression = options.fallbackExpression ?? "";
    paramPrefix = options.paramPrefix ?? ":";
    paramsKeepPrefix = !!options.paramsKeepPrefix;
    numberedParams = !!options.numberedParams;
    parseNumbers = !!options.parseNumbers;
    placeholderFieldName = options.placeholderFieldName ?? defaultPlaceholderFieldName;
    placeholderOperatorName = options.placeholderOperatorName ?? defaultPlaceholderOperatorName;
    quoteValuesWith = options.quoteValuesWith ?? "'";
  }
  if (!fallbackExpression) {
    fallbackExpression = format === "mongodb" ? '"$and":[{"$expr":true}]' : format === "cel" || format === "spel" ? "1 == 1" : "(1 = 1)";
  }
  if (format === "json" || format === "json_without_ids") {
    const rg = parseNumbers ? numerifyValues(ruleGroup) : ruleGroup;
    if (format === "json") {
      return JSON.stringify(rg, null, 2);
    }
    return JSON.stringify(
      rg,
      (key, value) => (
        // Remove `id` and `path` keys; leave everything else unchanged.
        key === "id" || key === "path" ? void 0 : value
      )
    );
  }
  if (typeof validator === "function") {
    const validationResult = validator(ruleGroup);
    if (typeof validationResult === "boolean") {
      if (validationResult === false) {
        return format === "parameterized" ? { sql: fallbackExpression, params: [] } : format === "parameterized_named" ? { sql: fallbackExpression, params: {} } : format === "mongodb" ? `{${fallbackExpression}}` : format === "jsonlogic" ? false : format === "elasticsearch" ? {} : fallbackExpression;
      }
    } else {
      validationMap = validationResult;
    }
  }
  const validatorMap = {};
  const uniqueFields = toFlatOptionArray(fields);
  uniqueFields.forEach((f) => {
    if (typeof f.validator === "function") {
      validatorMap[f.value ?? /* istanbul ignore next */
      f.name] = f.validator;
    }
  });
  const validateRule = (rule) => {
    let validationResult = void 0;
    let fieldValidator = void 0;
    if (rule.id) {
      validationResult = validationMap[rule.id];
    }
    if (uniqueFields.length) {
      const fieldArr = uniqueFields.filter((f) => f.name === rule.field);
      if (fieldArr.length) {
        const field = fieldArr[0];
        if (typeof field.validator === "function") {
          fieldValidator = field.validator;
        }
      }
    }
    return [validationResult, fieldValidator];
  };
  if (format === "sql") {
    const processRuleGroup = (rg, outermostOrLonelyInGroup) => {
      if (!isRuleOrGroupValid(rg, validationMap[rg.id ?? /* istanbul ignore next */
      ""])) {
        return outermostOrLonelyInGroup ? fallbackExpression : (
          /* istanbul ignore next */
          ""
        );
      }
      const processedRules = rg.rules.map((rule) => {
        if (typeof rule === "string") {
          return rule;
        }
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule, rg.rules.length === 1);
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return "";
        }
        const escapeQuotes = (rule.valueSource ?? "value") === "value";
        const fieldData = getOption(fields, rule.field);
        if (typeof ruleProcessorInternal === "function") {
          return ruleProcessorInternal(rule, {
            parseNumbers,
            escapeQuotes,
            quoteFieldNamesWith,
            fieldData,
            format,
            quoteValuesWith
          });
        }
        return defaultRuleProcessorSQL(rule, {
          parseNumbers,
          escapeQuotes,
          valueProcessor: valueProcessorInternal,
          quoteFieldNamesWith,
          fieldData,
          format,
          quoteValuesWith
        });
      });
      if (processedRules.length === 0) {
        return fallbackExpression;
      }
      return `${rg.not ? "NOT " : ""}(${processedRules.filter(Boolean).join(isRuleGroupType(rg) ? ` ${rg.combinator} ` : " ")})`;
    };
    return processRuleGroup(ruleGroup, true);
  }
  if (format === "parameterized" || format === "parameterized_named") {
    const parameterized = format === "parameterized";
    const params = [];
    const paramsNamed = {};
    const fieldParams = /* @__PURE__ */ new Map();
    const getNextNamedParam = (field) => {
      if (!fieldParams.has(field)) {
        fieldParams.set(field, /* @__PURE__ */ new Set());
      }
      const nextNamedParam = `${field}_${fieldParams.get(field).size + 1}`;
      fieldParams.get(field).add(nextNamedParam);
      return nextNamedParam;
    };
    const processRule = (rule) => {
      const [validationResult, fieldValidator] = validateRule(rule);
      if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
        return "";
      }
      const fieldData = getOption(fields, rule.field);
      const fieldParamNames = Object.fromEntries(
        Array.from(fieldParams.entries()).map(([f, s]) => [
          f,
          Array.from(s)
        ])
      );
      const processedRule = (typeof ruleProcessorInternal === "function" ? ruleProcessorInternal : defaultRuleProcessorParameterized)(
        rule,
        {
          getNextNamedParam,
          fieldParamNames,
          parseNumbers,
          quoteFieldNamesWith,
          fieldData,
          format,
          paramPrefix,
          paramsKeepPrefix,
          numberedParams,
          fallbackExpression,
          valueProcessor: valueProcessorInternal,
          fields,
          placeholderFieldName,
          placeholderOperatorName,
          validator
        },
        {
          processedParams: params
        }
      );
      if (!isPojo(processedRule)) {
        return "";
      }
      const { sql, params: customParams } = processedRule;
      if (typeof sql !== "string" || !sql) {
        return "";
      }
      if (format === "parameterized" && Array.isArray(customParams)) {
        params.push(...customParams);
      } else if (format === "parameterized_named" && isPojo(customParams)) {
        Object.assign(paramsNamed, customParams);
        Object.keys(customParams).forEach((p) => fieldParams.get(rule.field)?.add(p));
      }
      return sql;
    };
    const processRuleGroup = (rg, outermostOrLonelyInGroup) => {
      if (!isRuleOrGroupValid(rg, validationMap[rg.id ?? /* istanbul ignore next */
      ""])) {
        return outermostOrLonelyInGroup ? fallbackExpression : (
          /* istanbul ignore next */
          ""
        );
      }
      const processedRules = rg.rules.map((rule) => {
        if (typeof rule === "string") {
          return rule;
        }
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule, rg.rules.length === 1);
        }
        return processRule(rule);
      });
      if (processedRules.length === 0) {
        return fallbackExpression;
      }
      return `${rg.not ? "NOT " : ""}(${processedRules.filter(Boolean).join(isRuleGroupType(rg) ? ` ${rg.combinator} ` : " ")})`;
    };
    if (parameterized) {
      return { sql: processRuleGroup(ruleGroup, true), params };
    }
    return { sql: processRuleGroup(ruleGroup, true), params: paramsNamed };
  }
  if (format === "mongodb") {
    const processRuleGroup = (rg, outermost) => {
      if (!isRuleOrGroupValid(rg, validationMap[rg.id ?? /* istanbul ignore next */
      ""])) {
        return outermost ? fallbackExpression : "";
      }
      const combinator = `"$${rg.combinator.toLowerCase()}"`;
      let hasChildRules = false;
      const expressions = rg.rules.map((rule) => {
        if (isRuleGroup(rule)) {
          const processedRuleGroup = processRuleGroup(rule);
          if (processedRuleGroup) {
            hasChildRules = true;
            return /^\{.+\}$/.test(processedRuleGroup) ? processedRuleGroup : `{${processedRuleGroup}}`;
          }
          return "";
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return "";
        }
        const fieldData = getOption(fields, rule.field);
        return (ruleProcessorInternal ?? valueProcessorInternal)(rule, {
          parseNumbers,
          fieldData,
          format
        });
      }).filter(Boolean);
      return expressions.length > 0 ? expressions.length === 1 && !hasChildRules ? expressions[0] : `${combinator}:[${expressions.join(",")}]` : fallbackExpression;
    };
    const rgStandard = isRuleGroupType(ruleGroup) ? ruleGroup : convertFromIC(ruleGroup);
    const processedQuery = processRuleGroup(rgStandard, true);
    return /^\{.+\}$/.test(processedQuery) ? processedQuery : `{${processedQuery}}`;
  }
  if (format === "cel") {
    const processRuleGroup = (rg, outermost) => {
      if (!isRuleOrGroupValid(rg, validationMap[rg.id ?? /* istanbul ignore next */
      ""])) {
        return outermost ? fallbackExpression : "";
      }
      const expression = rg.rules.map((rule) => {
        if (typeof rule === "string") {
          return celCombinatorMap[rule];
        }
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule);
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return "";
        }
        const fieldData = getOption(fields, rule.field);
        return (ruleProcessorInternal ?? valueProcessorInternal)(rule, {
          parseNumbers,
          escapeQuotes: (rule.valueSource ?? "value") === "value",
          fieldData,
          format
        });
      }).filter(Boolean).join(
        isRuleGroupType(rg) ? ` ${celCombinatorMap[rg.combinator]} ` : " "
      );
      const [prefix, suffix] = rg.not || !outermost ? [`${rg.not ? "!" : ""}(`, ")"] : ["", ""];
      return expression ? `${prefix}${expression}${suffix}` : fallbackExpression;
    };
    return processRuleGroup(ruleGroup, true);
  }
  if (format === "spel") {
    const processRuleGroup = (rg, outermost) => {
      if (!isRuleOrGroupValid(rg, validationMap[rg.id ?? /* istanbul ignore next */
      ""])) {
        return outermost ? fallbackExpression : "";
      }
      const expression = rg.rules.map((rule) => {
        if (typeof rule === "string") {
          return rule;
        }
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule);
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return "";
        }
        const fieldData = getOption(fields, rule.field);
        return (ruleProcessorInternal ?? valueProcessorInternal)(rule, {
          parseNumbers,
          escapeQuotes: (rule.valueSource ?? "value") === "value",
          fieldData,
          format
        });
      }).filter(Boolean).join(isRuleGroupType(rg) ? ` ${rg.combinator} ` : " ");
      const [prefix, suffix] = rg.not || !outermost ? [`${rg.not ? "!" : ""}(`, ")"] : ["", ""];
      return expression ? `${prefix}${expression}${suffix}` : fallbackExpression;
    };
    return processRuleGroup(ruleGroup, true);
  }
  if (format === "jsonata") {
    const processRuleGroup = (rg, outermost) => {
      if (!isRuleOrGroupValid(rg, validationMap[rg.id ?? /* istanbul ignore next */
      ""])) {
        return outermost ? fallbackExpression : "";
      }
      const expression = rg.rules.map((rule) => {
        if (typeof rule === "string") {
          return rule;
        }
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule);
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return "";
        }
        const fieldData = getOption(fields, rule.field);
        return (ruleProcessorInternal ?? valueProcessorInternal)(rule, {
          parseNumbers,
          escapeQuotes: (rule.valueSource ?? "value") === "value",
          fieldData,
          format,
          quoteFieldNamesWith
        });
      }).filter(Boolean).join(isRuleGroupType(rg) ? ` ${rg.combinator} ` : " ");
      const [prefix, suffix] = rg.not || !outermost ? [`${rg.not ? "$not" : ""}(`, ")"] : ["", ""];
      return expression ? `${prefix}${expression}${suffix}` : fallbackExpression;
    };
    return processRuleGroup(ruleGroup, true);
  }
  if (format === "jsonlogic") {
    const query = isRuleGroupType(ruleGroup) ? ruleGroup : convertFromIC(ruleGroup);
    const processRuleGroup = (rg, _outermost) => {
      if (!isRuleOrGroupValid(rg, validationMap[rg.id ?? /* istanbul ignore next */
      ""])) {
        return false;
      }
      const processedRules = rg.rules.map((rule) => {
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule);
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return false;
        }
        const fieldData = getOption(fields, rule.field);
        return (ruleProcessorInternal ?? valueProcessorInternal)(rule, {
          parseNumbers,
          fieldData,
          format
        });
      }).filter(Boolean);
      if (processedRules.length === 0) {
        return false;
      }
      const jsonRuleGroup = { [rg.combinator]: processedRules };
      return rg.not ? { "!": jsonRuleGroup } : jsonRuleGroup;
    };
    return processRuleGroup(query, true);
  }
  if (format === "elasticsearch") {
    const query = isRuleGroupType(ruleGroup) ? ruleGroup : convertFromIC(ruleGroup);
    const processRuleGroup = (rg) => {
      if (!isRuleOrGroupValid(rg, validationMap[rg.id ?? /* istanbul ignore next */
      ""])) {
        return false;
      }
      const processedRules = rg.rules.map((rule) => {
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule);
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return false;
        }
        const fieldData = getOption(fields, rule.field);
        return (ruleProcessorInternal ?? valueProcessorInternal)(rule, {
          parseNumbers,
          fieldData,
          format
        });
      }).filter(Boolean);
      if (processedRules.length === 0) {
        return false;
      }
      return {
        bool: rg.not ? {
          must_not: rg.combinator === "or" ? { bool: { should: processedRules } } : processedRules
        } : { [rg.combinator === "or" ? "should" : "must"]: processedRules }
      };
    };
    const processedRuleGroup = processRuleGroup(query);
    return processedRuleGroup === false ? {} : processedRuleGroup;
  }
  return "";
}

// src/utils/formatQuery/index.ts
var internalValueProcessors = {
  default: defaultValueProcessorByRule,
  mongodb: defaultRuleProcessorMongoDB,
  cel: defaultRuleProcessorCEL,
  spel: defaultRuleProcessorSpEL
};
var generateValueProcessor = (format) => (field, operator, value, valueSource) => internalValueProcessors[format](
  { field, operator, value, valueSource },
  { parseNumbers: false }
);
var defaultValueProcessor = generateValueProcessor("default");
var defaultMongoDBValueProcessor = generateValueProcessor("mongodb");
var defaultCELValueProcessor = generateValueProcessor("cel");
var defaultSpELValueProcessor = generateValueProcessor("spel");
var defaultValueProcessorCELByRule = defaultRuleProcessorCEL;
var defaultValueProcessorMongoDBByRule = defaultRuleProcessorMongoDB;
var defaultValueProcessorSpELByRule = defaultRuleProcessorSpEL;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaultCELValueProcessor,
  defaultMongoDBValueProcessor,
  defaultRuleProcessorCEL,
  defaultRuleProcessorElasticSearch,
  defaultRuleProcessorJSONata,
  defaultRuleProcessorJsonLogic,
  defaultRuleProcessorMongoDB,
  defaultRuleProcessorParameterized,
  defaultRuleProcessorSQL,
  defaultRuleProcessorSpEL,
  defaultSpELValueProcessor,
  defaultValueProcessor,
  defaultValueProcessorByRule,
  defaultValueProcessorCELByRule,
  defaultValueProcessorMongoDBByRule,
  defaultValueProcessorSpELByRule,
  formatQuery,
  jsonLogicAdditionalOperators
});
//# sourceMappingURL=formatQuery.js.map