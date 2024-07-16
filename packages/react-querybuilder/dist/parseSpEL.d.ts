import { D as DefaultRuleGroupType, a as DefaultRuleGroupTypeIC } from './basic-CtWU1IF_.js';
import { h as ParseSpELOptions } from './importExport-cuWXStV6.js';
import 'type-fest';
import 'json-logic-js';

/**
 * Converts a SpEL string expression into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
declare function parseSpEL(spel: string): DefaultRuleGroupType;
/**
 * Converts a SpEL string expression into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
declare function parseSpEL(spel: string, options: Omit<ParseSpELOptions, 'independentCombinators'> & {
    independentCombinators?: false;
}): DefaultRuleGroupType;
/**
 * Converts a SpEL string expression into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupTypeIC}).
 */
declare function parseSpEL(spel: string, options: Omit<ParseSpELOptions, 'independentCombinators'> & {
    independentCombinators: true;
}): DefaultRuleGroupTypeIC;

export { parseSpEL };
