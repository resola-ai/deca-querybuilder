import { D as DefaultRuleGroupType, a as DefaultRuleGroupTypeIC } from './basic-CtWU1IF_.js';
import { d as ParseCELOptions } from './importExport-BGZJ1jGu.js';
import 'type-fest';
import 'json-logic-js';

/**
 * Converts a CEL string expression into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
declare function parseCEL(cel: string): DefaultRuleGroupType;
/**
 * Converts a CEL string expression into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
declare function parseCEL(cel: string, options: Omit<ParseCELOptions, 'independentCombinators'> & {
    independentCombinators?: false;
}): DefaultRuleGroupType;
/**
 * Converts a CEL string expression into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupTypeIC}).
 */
declare function parseCEL(cel: string, options: Omit<ParseCELOptions, 'independentCombinators'> & {
    independentCombinators: true;
}): DefaultRuleGroupTypeIC;

export { parseCEL };
