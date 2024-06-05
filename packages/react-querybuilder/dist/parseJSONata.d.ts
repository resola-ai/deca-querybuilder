import { D as DefaultRuleGroupType, a as DefaultRuleGroupTypeIC } from './basic-CtWU1IF_.js';
import { e as ParseJSONataOptions } from './importExport-BGZJ1jGu.js';
import 'type-fest';
import 'json-logic-js';

/**
 * Converts a JSONata string expression into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
declare function parseJSONata(jsonataInput: string): DefaultRuleGroupType;
/**
 * Converts a JSONata string expression into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
declare function parseJSONata(jsonataInput: string, options: Omit<ParseJSONataOptions, 'independentCombinators'> & {
    independentCombinators?: false;
}): DefaultRuleGroupType;
/**
 * Converts a JSONata string expression into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupTypeIC}).
 */
declare function parseJSONata(jsonataInput: string, options: Omit<ParseJSONataOptions, 'independentCombinators'> & {
    independentCombinators: true;
}): DefaultRuleGroupTypeIC;

export { parseJSONata };
