import { D as DefaultRuleGroupType, a as DefaultRuleGroupTypeIC } from './basic-CtWU1IF_.js';
import { g as ParseMongoDbOptions } from './importExport-BGZJ1jGu.js';
import 'type-fest';
import 'json-logic-js';

/**
 * Converts a MongoDB query object or parseable string into a query suitable
 * for the {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
declare function parseMongoDB(mongoDbRules: string | Record<string, any>): DefaultRuleGroupType;
/**
 * Converts a MongoDB query object or parseable string into a query suitable
 * for the {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupType}).
 */
declare function parseMongoDB(mongoDbRules: string | Record<string, any>, options: Omit<ParseMongoDbOptions, 'independentCombinators'> & {
    independentCombinators?: false;
}): DefaultRuleGroupType;
/**
 * Converts a MongoDB query object or parseable string into a query suitable
 * for the {@link QueryBuilder} component's `query` or `defaultQuery` props
 * ({@link DefaultRuleGroupTypeIC}).
 */
declare function parseMongoDB(mongoDbRules: string | Record<string, any>, options: Omit<ParseMongoDbOptions, 'independentCombinators'> & {
    independentCombinators: true;
}): DefaultRuleGroupTypeIC;

export { parseMongoDB };
