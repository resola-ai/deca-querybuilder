import { D as DefaultRuleGroupType, a as DefaultRuleGroupTypeIC } from './basic-CtWU1IF_.js';
import { i as ParseSQLOptions } from './importExport-BGZJ1jGu.js';
import 'type-fest';
import 'json-logic-js';

/**
 * Converts a SQL `SELECT` statement into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
declare function parseSQL(sql: string): DefaultRuleGroupType;
/**
 * Converts a SQL `SELECT` statement into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
declare function parseSQL(sql: string, options: Omit<ParseSQLOptions, 'independentCombinators'> & {
    independentCombinators?: false;
}): DefaultRuleGroupType;
/**
 * Converts a SQL `SELECT` statement into a query suitable for the
 * {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
declare function parseSQL(sql: string, options: Omit<ParseSQLOptions, 'independentCombinators'> & {
    independentCombinators: true;
}): DefaultRuleGroupTypeIC;

export { parseSQL };
