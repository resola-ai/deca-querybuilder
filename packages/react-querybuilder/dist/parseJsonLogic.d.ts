import { D as DefaultRuleGroupType, a as DefaultRuleGroupTypeIC } from './basic-CtWU1IF_.js';
import { b as RQBJsonLogic, f as ParseJsonLogicOptions } from './importExport-BGZJ1jGu.js';
import 'type-fest';
import 'json-logic-js';

/**
 * Converts a JsonLogic object into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
declare function parseJsonLogic(rqbJsonLogic: string | RQBJsonLogic): DefaultRuleGroupType;
/**
 * Converts a JsonLogic object into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
declare function parseJsonLogic(rqbJsonLogic: string | RQBJsonLogic, options: Omit<ParseJsonLogicOptions, 'independentCombinators'> & {
    independentCombinators?: false;
}): DefaultRuleGroupType;
/**
 * Converts a JsonLogic object into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupTypeIC}).
 */
declare function parseJsonLogic(rqbJsonLogic: string | RQBJsonLogic, options: Omit<ParseJsonLogicOptions, 'independentCombinators'> & {
    independentCombinators: true;
}): DefaultRuleGroupTypeIC;

export { parseJsonLogic };
