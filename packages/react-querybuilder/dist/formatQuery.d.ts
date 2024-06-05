import { R as RuleProcessor, V as ValueProcessorByRule, F as FormatQueryOptions, P as ParameterizedSQL, a as ParameterizedNamedSQL, b as RQBJsonLogic, E as ExportFormat, c as ValueProcessorLegacy } from './importExport-BGZJ1jGu.js';
import { R as RuleGroupTypeAny } from './basic-CtWU1IF_.js';
import 'json-logic-js';
import 'type-fest';

/**
 * Default rule processor used by {@link formatQuery} for "cel" format.
 */
declare const defaultRuleProcessorCEL: RuleProcessor;

/**
 * Default rule processor used by {@link formatQuery} for "mongodb" format.
 */
declare const defaultRuleProcessorMongoDB: RuleProcessor;

/**
 * Default rule processor used by {@link formatQuery} for "spel" format.
 */
declare const defaultRuleProcessorSpEL: RuleProcessor;

/**
 * Default value processor used by {@link formatQuery} for "sql" format.
 */
declare const defaultValueProcessorByRule: ValueProcessorByRule;

/**
 * Default rule processor used by {@link formatQuery} for "elasticsearch" format.
 */
declare const defaultRuleProcessorElasticSearch: RuleProcessor;

/**
 * Default rule processor used by {@link formatQuery} for "jsonata" format.
 */
declare const defaultRuleProcessorJSONata: RuleProcessor;

/**
 * Default rule processor used by {@link formatQuery} for "jsonlogic" format.
 */
declare const defaultRuleProcessorJsonLogic: RuleProcessor;

/**
 * Default rule processor used by {@link formatQuery} for "sql" format.
 */
declare const defaultRuleProcessorParameterized: RuleProcessor;

/**
 * Default rule processor used by {@link formatQuery} for "sql" format.
 */
declare const defaultRuleProcessorSQL: RuleProcessor;

/**
 * Generates a formatted (indented two spaces) JSON string from a query object.
 */
declare function formatQuery(ruleGroup: RuleGroupTypeAny): string;
/**
 * Generates a {@link ParameterizedSQL} object from a query object.
 */
declare function formatQuery(ruleGroup: RuleGroupTypeAny, options: 'parameterized' | (Omit<FormatQueryOptions, 'format'> & {
    format: 'parameterized';
})): ParameterizedSQL;
/**
 * Generates a {@link ParameterizedNamedSQL} object from a query object.
 */
declare function formatQuery(ruleGroup: RuleGroupTypeAny, options: 'parameterized_named' | (Omit<FormatQueryOptions, 'format'> & {
    format: 'parameterized_named';
})): ParameterizedNamedSQL;
/**
 * Generates a {@link JsonLogic} object from a query object.
 */
declare function formatQuery(ruleGroup: RuleGroupTypeAny, options: 'jsonlogic' | (Omit<FormatQueryOptions, 'format'> & {
    format: 'jsonlogic';
})): RQBJsonLogic;
/**
 * Generates an ElasticSearch query object from an RQB query object.
 *
 * NOTE: Support for the ElasticSearch format is experimental.
 * You may have better results exporting "sql" format then using
 * [ElasticSearch SQL](https://www.elastic.co/guide/en/elasticsearch/reference/current/xpack-sql.html).
 */
declare function formatQuery(ruleGroup: RuleGroupTypeAny, options: 'elasticsearch' | (Omit<FormatQueryOptions, 'format'> & {
    format: 'elasticsearch';
})): Record<string, any>;
/**
 * Generates a JSONata query string from an RQB query object.
 *
 * NOTE: The `parseNumbers` option is recommended for this format.
 */
declare function formatQuery(ruleGroup: RuleGroupTypeAny, options: 'jsonata' | (Omit<FormatQueryOptions, 'format'> & {
    format: 'jsonata';
})): string;
/**
 * Generates a formatted (indented two spaces) JSON string from a query object.
 */
declare function formatQuery(ruleGroup: RuleGroupTypeAny, options: Omit<FormatQueryOptions, 'format'>): string;
/**
 * Generates a query string in the requested format.
 */
declare function formatQuery(ruleGroup: RuleGroupTypeAny, options: Exclude<ExportFormat, 'parameterized' | 'parameterized_named' | 'jsonlogic' | 'elasticsearch' | 'jsonata'>): string;
/**
 * Generates a query string in the requested format.
 */
declare function formatQuery(ruleGroup: RuleGroupTypeAny, options: Omit<FormatQueryOptions, 'format'> & {
    format: Exclude<ExportFormat, 'parameterized' | 'parameterized_named' | 'jsonlogic' | 'elasticsearch' | 'jsonata'>;
}): string;

/**
 * Register these operators with `jsonLogic` before applying the result
 * of `formatQuery(query, 'jsonlogic')`.
 *
 * @example
 * ```
 * for (const [op, func] of Object.entries(jsonLogicAdditionalOperators)) {
 *   jsonLogic.add_operation(op, func);
 * }
 * jsonLogic.apply({ "startsWith": [{ "var": "firstName" }, "Stev"] }, data);
 * ```
 */
declare const jsonLogicAdditionalOperators: {
    startsWith: (a: string, b: string) => boolean;
    endsWith: (a: string, b: string) => boolean;
};

/**
 * Default value processor used by {@link formatQuery} for "sql" format.
 */
declare const defaultValueProcessor: ValueProcessorLegacy;
/**
 * @deprecated Prefer {@link defaultRuleProcessorMongoDB}.
 */
declare const defaultMongoDBValueProcessor: ValueProcessorLegacy;
/**
 * @deprecated Prefer {@link defaultRuleProcessorCEL}.
 */
declare const defaultCELValueProcessor: ValueProcessorLegacy;
/**
 * @deprecated Prefer {@link defaultRuleProcessorSpEL}.
 */
declare const defaultSpELValueProcessor: ValueProcessorLegacy;

/**
 * @deprecated Renamed to {@link defaultRuleProcessorCEL}.
 */
declare const defaultValueProcessorCELByRule: RuleProcessor;
/**
 * @deprecated Renamed to {@link defaultRuleProcessorMongoDB}.
 */
declare const defaultValueProcessorMongoDBByRule: RuleProcessor;
/**
 * @deprecated Renamed to {@link defaultRuleProcessorSpEL}.
 */
declare const defaultValueProcessorSpELByRule: RuleProcessor;

export { defaultCELValueProcessor, defaultMongoDBValueProcessor, defaultRuleProcessorCEL, defaultRuleProcessorElasticSearch, defaultRuleProcessorJSONata, defaultRuleProcessorJsonLogic, defaultRuleProcessorMongoDB, defaultRuleProcessorParameterized, defaultRuleProcessorSQL, defaultRuleProcessorSpEL, defaultSpELValueProcessor, defaultValueProcessor, defaultValueProcessorByRule, defaultValueProcessorCELByRule, defaultValueProcessorMongoDBByRule, defaultValueProcessorSpELByRule, formatQuery, jsonLogicAdditionalOperators };
