import * as react from 'react';
import { ReactNode, MouseEvent, ComponentType, ForwardRefExoticComponent, RefAttributes, Ref, ChangeEvent } from 'react';
import * as type_fest from 'type-fest';
import { SetOptional, RequireAtLeastOne, SetRequired, Except, SetNonNullable } from 'type-fest';
import * as _reduxjs_toolkit from '@reduxjs/toolkit';
import { UnknownAction } from '@reduxjs/toolkit';
import * as redux from 'redux';
import * as redux_thunk from 'redux-thunk';
import { ReactReduxContextValue, TypedUseSelectorHook } from 'react-redux';
import { RulesLogic } from 'json-logic-js';
export { JsonLogicAnd, JsonLogicDoubleNegation, JsonLogicEqual, JsonLogicGreaterThan, JsonLogicGreaterThanOrEqual, JsonLogicInArray, JsonLogicInString, JsonLogicLessThan, JsonLogicLessThanOrEqual, JsonLogicNegation, JsonLogicNotEqual, JsonLogicOr, ReservedOperations as JsonLogicReservedOperations, RulesLogic as JsonLogicRulesLogic, JsonLogicStrictEqual, JsonLogicStrictNotEqual, JsonLogicVar } from 'json-logic-js';

/**
 * Extracts the {@link Option} type from a {@link FlexibleOptionList}.
 */
type GetOptionType<OL extends FlexibleOptionList<FullOption>> = OL extends FlexibleOptionList<infer Opt> ? Opt : never;
/**
 * Extracts the type of the identifying property from a {@link BaseOption}.
 */
type GetOptionIdentifierType<Opt extends BaseOption> = Opt extends Option<infer NameType> | ValueOption<infer NameType> ? NameType : string;
/**
 * Adds an `unknown` index property to an interface.
 */
type WithUnknownIndex<T> = T & {
    [key: string]: unknown;
};
/**
 * Do not use this type directly. Use {@link Option}, {@link ValueOption},
 * {@link FullOption}, or {@link BaseOption} instead. For specific
 * option lists, you can use {@link FullField}, {@link FullOperator}, or
 * {@link FullCombinator}, all of which extend {@link FullOption}.
 */
interface BaseOption<N extends string = string> {
    name?: N;
    value?: N;
    label: string;
    disabled?: boolean;
}
/**
 * A generic option. Used directly in {@link OptionList} or
 * as the child element of an {@link OptionGroup}.
 */
interface Option<N extends string = string> extends SetOptional<FullOption<N>, 'value'> {
}
/**
 * Like {@link Option} but requiring `value` instead of `name`.
 */
interface ValueOption<N extends string = string> extends SetOptional<FullOption<N>, 'name'> {
}
/**
 * A generic {@link Option} with either a `name` or `value` as its primary identifier.
 * {@link OptionList}-type props on the {@link QueryBuilder} component accept this type,
 * but corresponding props passed down to subcomponents will always be translated
 * to {@link FullOption} first.
 */
type FlexibleOption<N extends string = string> = WithUnknownIndex<RequireAtLeastOne<BaseOption<N>, 'name' | 'value'>>;
/**
 * Utility type to turn an {@link Option} into a {@link BaseOption}.
 */
type ToFlexibleOption<Opt extends BaseOption> = WithUnknownIndex<RequireAtLeastOne<Opt, 'name' | 'value'>>;
/**
 * A generic {@link Option} requiring both `name` _and_ `value` properties.
 * Props that extend {@link OptionList} accept {@link BaseOption}, but
 * corresponding props sent to subcomponents will always be translated to this
 * type first to ensure both `name` and `value` are available.
 *
 * NOTE: Do not extend from this type directly. Use {@link BaseFullOption}
 * (optionally wrappped in {@link WithUnknownIndex}) instead, otherwise
 * the `unknown` index property will cause issues.
 */
interface FullOption<N extends string = string> extends WithUnknownIndex<SetRequired<BaseOption<N>, 'name' | 'value'>> {
}
/**
 * This type is identical to {@link FullOption} but without the `unknown` index
 * property. Extend from this type instead of {@link FullOption} directly.
 */
interface BaseFullOption<N extends string = string> extends SetRequired<BaseOption<N>, 'name' | 'value'> {
}
/**
 * Utility type to turn an {@link Option}, {@link ValueOption} or
 * {@link BaseOption} into a {@link FullOption}.
 */
type ToFullOption<Opt extends BaseOption> = Opt extends BaseFullOption ? Opt : Opt extends BaseOption<infer IdentifierType> ? WithUnknownIndex<Opt & FullOption<IdentifierType>> : never;
/**
 * @deprecated Renamed to `Option`.
 */
interface NameLabelPair<N extends string = string> extends Option<N> {
}
/**
 * An {@link Option} group within an {@link OptionList}.
 */
interface OptionGroup<Opt extends BaseOption = FlexibleOption> {
    label: string;
    options: WithUnknownIndex<Opt>[];
}
/**
 * A {@link BaseOption} group within a {@link FlexibleOptionList}.
 */
type FlexibleOptionGroup<Opt extends BaseOption = BaseOption> = {
    label: string;
    options: (Opt extends BaseFullOption ? Opt : ToFlexibleOption<Opt>)[];
};
/**
 * Either an array of {@link Option} or an array of {@link OptionGroup}.
 */
type OptionList<Opt extends Option = Option> = Opt[] | OptionGroup<Opt>[];
/**
 * An array of options or option groups, like {@link OptionList}, but each member may
 * use either `name` or `value` as the primary identifier.
 */
type FlexibleOptionList<Opt extends BaseOption> = ToFlexibleOption<Opt>[] | FlexibleOptionGroup<ToFlexibleOption<Opt>>[];
/**
 * An array of options or option groups, like {@link OptionList}, but using
 * {@link FullOption} instead of {@link Option}. This means that every member is
 * guaranteed to have both `name` and `value`.
 */
type FullOptionList<Opt extends BaseOption> = Opt extends BaseFullOption ? Opt[] | OptionGroup<Opt>[] : ToFullOption<Opt>[] | OptionGroup<ToFullOption<Opt>>[];
/**
 * Map of option identifiers to their respective {@link Option}.
 */
type BaseOptionMap<V extends BaseOption = BaseOption, K extends string = GetOptionIdentifierType<V>> = {
    [k in K]?: ToFlexibleOption<V>;
};
/**
 * Map of option identifiers to their respective {@link FullOption}.
 */
type FullOptionMap<V extends BaseFullOption, K extends string = GetOptionIdentifierType<V>> = {
    [k in K]?: V;
};
/**
 * Map of option identifiers to their respective {@link FullOption}.
 * Must include all possible strings from the identifier type.
 */
type FullOptionRecord<V extends BaseFullOption, K extends string = GetOptionIdentifierType<V>> = Record<K, V>;

/**
 * Properties common to both rules and groups.
 */
interface CommonRuleAndGroupProperties {
    path?: Path;
    id?: string;
    disabled?: boolean;
}
/**
 * The main rule type. The `field`, `operator`, and `value` properties
 * can be narrowed with generics.
 */
interface RuleType<F extends string = string, O extends string = string, V = any, C extends string = string> extends CommonRuleAndGroupProperties {
    field: F;
    operator: O;
    value: V;
    valueSource?: ValueSource;
    /**
     * Only used when adding a rule to a query that uses independent combinators.
     */
    combinatorPreceding?: C;
}
/**
 * The main rule group type. This type is used for query definitions as well as
 * all sub-groups of queries.
 */
interface RuleGroupType<R extends RuleType = RuleType, C extends string = string> extends CommonRuleAndGroupProperties {
    combinator: C;
    rules: RuleGroupArray<RuleGroupType<R, C>, R>;
    not?: boolean;
}
/**
 * The type of the `rules` array in a {@link RuleGroupType}.
 */
type RuleGroupArray<RG extends RuleGroupType = RuleGroupType, R extends RuleType = RuleType> = (R | RG)[];
/**
 * All updateable properties of rules and groups (everything except
 * `id`, `path`, and `rules`).
 */
type UpdateableProperties = Exclude<keyof (RuleType & RuleGroupType), 'id' | 'path' | 'rules'>;
/**
 * The type of the `rules` array in a {@link DefaultRuleGroupType}.
 */
type DefaultRuleGroupArray<F extends string = string> = RuleGroupArray<DefaultRuleGroupType, DefaultRuleType<F>>;
/**
 * {@link RuleGroupType} with the `combinator` property limited to
 * {@link DefaultCombinatorNameExtended} and `rules` limited to {@link DefaultRuleType}.
 */
type DefaultRuleGroupType<F extends string = string> = RuleGroupType<DefaultRuleType<F>, DefaultCombinatorNameExtended> & {
    rules: DefaultRuleGroupArray<F>;
};
/**
 * {@link RuleType} with the `operator` property limited to {@link DefaultOperatorName}.
 */
type DefaultRuleType<F extends string = string> = RuleType<F, DefaultOperatorName>;
/**
 * Default allowed values for the `combinator` property.
 */
type DefaultCombinatorName = 'and' | 'or';
/**
 * Default allowed values for the `combinator` property, plus `"xor"`.
 */
type DefaultCombinatorNameExtended = DefaultCombinatorName | 'xor';
/**
 * Default values for the `operator` property.
 */
type DefaultOperatorName = '=' | '!=' | '<' | '>' | '<=' | '>=' | 'contains' | 'beginsWith' | 'endsWith' | 'doesNotContain' | 'doesNotBeginWith' | 'doesNotEndWith' | 'null' | 'notNull' | 'in' | 'notIn' | 'between' | 'notBetween';
/**
 * A {@link FullCombinator} definition with a {@link DefaultCombinatorName} `name` property.
 */
type DefaultCombinator = FullCombinator<DefaultCombinatorName>;
/**
 * A {@link FullCombinator} definition with a {@link DefaultCombinatorNameExtended} `name` property.
 */
type DefaultCombinatorExtended = FullCombinator<DefaultCombinatorNameExtended>;
/**
 * An {@link FullOperator} definition with a {@link DefaultOperatorName} `name` property.
 */
type DefaultOperator = FullOperator<DefaultOperatorName>;

type MAXIMUM_ALLOWED_BOUNDARY = 80;
type MappedTuple<Tuple extends Array<unknown>, Result extends Array<unknown> = [], Count extends ReadonlyArray<number> = []> = Count['length'] extends MAXIMUM_ALLOWED_BOUNDARY ? Result : Tuple extends [] ? [] : Result extends [] ? MappedTuple<Tuple, Tuple, [...Count, 1]> : MappedTuple<Tuple, Result | [...Result, ...Tuple], [...Count, 1]>;

/**
 * The main rule group interface when using independent combinators. This type is used
 * for query definitions as well as all sub-groups of queries.
 */
interface RuleGroupTypeIC<R extends RuleType = RuleType, C extends string = string> extends Except<RuleGroupType<R, C>, 'combinator' | 'rules'> {
    combinator?: undefined;
    rules: RuleGroupICArray<RuleGroupTypeIC<R, C>, R, C>;
    /**
     * Only used when adding a rule to a query that uses independent combinators
     */
    combinatorPreceding?: C;
}
/**
 * Shorthand for "either {@link RuleGroupType} or {@link RuleGroupTypeIC}".
 */
type RuleGroupTypeAny<R extends RuleType = RuleType, C extends string = string> = RuleGroupType<R, C> | RuleGroupTypeIC<R, C>;
/**
 * The type of the `rules` array in a {@link RuleGroupTypeIC}.
 */
type RuleGroupICArray<RG extends RuleGroupTypeIC = RuleGroupTypeIC, R extends RuleType = RuleType, C extends string = string> = [R | RG] | [R | RG, ...MappedTuple<[C, R | RG]>] | ((R | RG)[] & {
    length: 0;
});
/**
 * Shorthand for "either {@link RuleGroupArray} or {@link RuleGroupICArray}".
 */
type RuleOrGroupArray = RuleGroupArray | RuleGroupICArray;
/**
 * The type of the `rules` array in a {@link DefaultRuleGroupTypeIC}.
 */
type DefaultRuleGroupICArray<F extends string = string> = RuleGroupICArray<DefaultRuleGroupTypeIC<F>, DefaultRuleType<F>, DefaultCombinatorName>;
/**
 * Shorthand for "either {@link DefaultRuleGroupArray} or {@link DefaultRuleGroupICArray}".
 */
type DefaultRuleOrGroupArray<F extends string = string> = DefaultRuleGroupArray<F> | DefaultRuleGroupICArray<F>;
/**
 * {@link RuleGroupTypeIC} with combinators limited to
 * {@link DefaultCombinatorName} and rules limited to {@link DefaultRuleType}.
 */
interface DefaultRuleGroupTypeIC<F extends string = string> extends RuleGroupTypeIC<DefaultRuleType<F>> {
    rules: DefaultRuleGroupICArray<F>;
}
/**
 * Shorthand for "either {@link DefaultRuleGroupType} or {@link DefaultRuleGroupTypeIC}".
 */
type DefaultRuleGroupTypeAny<F extends string = string> = DefaultRuleGroupType<F> | DefaultRuleGroupTypeIC<F>;
/**
 * Determines if a type extending {@link RuleGroupTypeAny} is actually
 * {@link RuleGroupType} or {@link RuleGroupTypeIC}.
 */
type GetRuleGroupType<RG> = RG extends {
    combinator: string;
} ? RuleGroupType : RuleGroupTypeIC;
/**
 * Determines the {@link RuleType} of a given {@link RuleGroupType}
 * or {@link RuleGroupTypeIC}. If the field and operator name types of
 * the rule type extend the identifier types of the provided Field and
 * Operator types, the given rule type is returned as is. Otherwise,
 * the rule type has its field and operator types narrowed to the
 * identifier types of the provided Field and Operator types.
 */
type GetRuleTypeFromGroupWithFieldAndOperator<RG extends RuleGroupTypeAny, F extends BaseOption, O extends BaseOption> = RG extends RuleGroupType<infer RT> | RuleGroupTypeIC<infer RT> ? RT extends RuleType<infer RuleFieldName, infer RuleOperatorName, infer RuleValueName, infer RuleCombinatorName> ? RuleFieldName extends GetOptionIdentifierType<F> ? RuleOperatorName extends GetOptionIdentifierType<O> ? RuleType<RuleFieldName, RuleOperatorName, RuleValueName, RuleCombinatorName> : RuleType<RuleFieldName, GetOptionIdentifierType<O>, RuleValueName, RuleCombinatorName> : RuleOperatorName extends GetOptionIdentifierType<O> ? RuleType<GetOptionIdentifierType<F>, RuleOperatorName, RuleValueName, RuleCombinatorName> : RuleType<GetOptionIdentifierType<F>, GetOptionIdentifierType<O>, RuleValueName, RuleCombinatorName> : never : never;

/**
 * Object with a `valid` boolean value and optional `reasons`.
 */
interface ValidationResult {
    valid: boolean;
    reasons?: any[];
}
/**
 * Map of rule/group `id` to its respective {@link ValidationResult}.
 */
type ValidationMap = Record<string, boolean | ValidationResult>;
/**
 * Function that validates a query.
 */
type QueryValidator = (query: RuleGroupTypeAny) => boolean | ValidationMap;
/**
 * Function that validates a rule.
 */
type RuleValidator = (rule: RuleType) => boolean | ValidationResult;

/**
 * @see https://react-querybuilder.js.org/docs/tips/path
 */
type Path = number[];
/**
 * String of classnames, array of classname strings, or object where the
 * keys are classnames and those with truthy values will be included.
 * Suitable for passing to the `clsx` package.
 */
type Classname = string | string[] | Record<string, any>;
/**
 * A source for the `value` property of a rule.
 */
type ValueSource = 'value' | 'field';
/**
 * Type of {@link ValueEditor} that will be displayed.
 */
type ValueEditorType = 'text' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'switch' | 'multiselect' | null;
/**
 * A valid array of potential value sources.
 *
 * @see {@link ValueSource}
 */
type ValueSources = ['value'] | ['value', 'field'] | ['field', 'value'] | ['field'];
interface HasOptionalClassName {
    className?: Classname;
}
/**
 * HTML5 input types
 */
type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week' | (string & {});
/**
 * Base for all Field types/interfaces.
 */
interface BaseFullField<FieldName extends string = string, OperatorName extends string = string, ValueName extends string = string, OperatorObj extends Option = Option<OperatorName>, ValueObj extends Option = Option<ValueName>> extends BaseFullOption<FieldName>, HasOptionalClassName {
    id?: string;
    operators?: FlexibleOptionList<OperatorObj>;
    valueEditorType?: ValueEditorType | ((operator: OperatorName) => ValueEditorType);
    valueSources?: ValueSources | ((operator: OperatorName) => ValueSources);
    inputType?: InputType | null;
    values?: FlexibleOptionList<ValueObj>;
    defaultOperator?: OperatorName;
    defaultValue?: any;
    placeholder?: string;
    validator?: RuleValidator;
    comparator?: string | ((f: FullField, operator: string) => boolean);
}
/**
 * Full field definition used in the `fields` prop of {@link QueryBuilder}.
 * This type requires both `name` and `value`, but the `fields` prop itself
 * can use a {@link FlexibleOption} where only one of `name` or `value` is
 * required (along with `label`), or {@link Field} where only `name` and
 * `label` are required.
 *
 * The `name`/`value`, `operators`, and `values` properties of this interface
 * can be narrowed with generics.
 */
interface FullField<FieldName extends string = string, OperatorName extends string = string, ValueName extends string = string, OperatorObj extends Option = Option<OperatorName>, ValueObj extends Option = Option<ValueName>> extends FullOption<FieldName>, BaseFullField<FieldName, OperatorName, ValueName, OperatorObj, ValueObj> {
}
/**
 * Field definition used in the `fields` prop of {@link QueryBuilder}.
 * This type is an extension of {@link FullField} where only `name` and
 * `label` are required.
 *
 * The `name`/`value`, `operators`, and `values` properties of this interface
 * can be narrowed with generics.
 */
type Field<FieldName extends string = string, OperatorName extends string = string, ValueName extends string = string, OperatorObj extends Option = Option<OperatorName>> = WithUnknownIndex<{
    value?: FieldName;
} & Pick<BaseFullField<FieldName, OperatorName, ValueName, OperatorObj>, Exclude<keyof BaseFullField, 'value'>>>;
/**
 * Field definition used in the `fields` prop of {@link QueryBuilder}.
 * This type is an extension of {@link FullField} where only `value` and
 * `label` are required.
 *
 * The `name`/`value`, `operators`, and `values` properties of this interface
 * can be narrowed with generics.
 */
type FieldByValue<FieldName extends string = string, OperatorName extends string = string, ValueName extends string = string, OperatorObj extends Option = Option<OperatorName>> = WithUnknownIndex<{
    name?: FieldName;
} & Pick<BaseFullField<FieldName, OperatorName, ValueName, OperatorObj>, Exclude<keyof BaseFullField, 'name'>>>;
/**
 * Utility type to make one or more properties required.
 */
type WithRequired<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};
/**
 * Allowed values of the {@link FullOperator} property `arity`. A value of `"unary"` or
 * a number less than two will cause the default {@link ValueEditor} to render `null`.
 */
type Arity = number | 'unary' | 'binary' | 'ternary';
/**
 * Full operator definition used in the `operators`/`getOperators` props of
 * {@link QueryBuilder}. This type requires both `name` and `value`, but the
 * `operators`/`getOperators` props themselves can use a {@link FlexibleOption}
 * where only one of `name` or `value` is required, or {@link FullOperator} where
 * only `name` is required.
 *
 * The `name`/`value` properties of this interface can be narrowed with generics.
 */
interface FullOperator<N extends string = string> extends FullOption<N>, HasOptionalClassName {
    arity?: Arity;
}
/**
 * Operator definition used in the `operators`/`getOperators` props of
 * {@link QueryBuilder}. This type is an extension of {@link FullOperator}
 * where only `name` and `label` are required.
 *
 * The `name`/`value` properties of this interface can be narrowed with generics.
 */
type Operator<N extends string = string> = WithUnknownIndex<SetOptional<BaseFullOption<N>, 'value'> & HasOptionalClassName & {
    arity?: Arity;
}>;
/**
 * Operator definition used in the `operators`/`getOperators` props of
 * {@link QueryBuilder}. This type is an extension of {@link FullOperator}
 * where only `value` and `label` are required.
 *
 * The `name`/`value` properties of this interface can be narrowed with generics.
 */
type OperatorByValue<N extends string = string> = WithUnknownIndex<SetOptional<BaseFullOption<N>, 'name'> & HasOptionalClassName & {
    arity?: Arity;
}>;
/**
 * Full combinator definition used in the `combinators` prop of {@link QueryBuilder}.
 * This type requires both `name` and `value`, but the `combinators` prop itself
 * can use a {@link FlexibleOption} where only one of `name` or `value` is required,
 * or {@link Combinator} where only `name` is required.
 *
 * The `name`/`value` properties of this interface can be narrowed with generics.
 */
interface FullCombinator<N extends string = string> extends FullOption<N>, HasOptionalClassName {
}
/**
 * Combinator definition used in the `combinators` prop of {@link QueryBuilder}.
 * This type is an extension of {@link FullCombinator} where only `name` and
 * `label` are required.
 *
 * The `name`/`value` properties of this interface can be narrowed with generics.
 */
type Combinator<N extends string = string> = WithUnknownIndex<SetOptional<BaseFullOption<N>, 'value'> & HasOptionalClassName>;
/**
 * Combinator definition used in the `combinators` prop of {@link QueryBuilder}.
 * This type is an extension of {@link FullCombinator} where only `value` and
 * `label` are required.
 *
 * The `name`/`value` properties of this interface can be narrowed with generics.
 */
type CombinatorByValue<N extends string = string> = WithUnknownIndex<SetOptional<BaseFullOption<N>, 'name'> & HasOptionalClassName>;
/**
 * Methods used by {@link parseNumbers}.
 * - `false` avoids parsing
 * - `true`/`"enhanced"` (default) uses `numeric-quantity`
 * - `"strict"` is the same as `true`, but bails out when trailing invalid characters are present
 * - `"native"` forces the use of `parseFloat`, returning `NaN` when parsing fails
 */
type ParseNumbersMethod = boolean | 'enhanced' | 'native' | 'strict';
/**
 * Signature of `accessibleDescriptionGenerator` prop, used by {@link QueryBuilder} to generate
 * accessible descriptions for each {@link RuleGroup}.
 */
type AccessibleDescriptionGenerator = (props: {
    path: Path;
    qbId: string;
}) => string;

type DndDropTargetType = 'rule' | 'ruleGroup' | 'inlineCombinator';
type DraggedItem = (RuleType & {
    path: Path;
}) | (RuleGroupTypeAny & {
    path: Path;
});
type DropEffect = 'move' | 'copy';
interface DropResult {
    path: Path;
    type: DndDropTargetType;
    dropEffect?: DropEffect;
}
interface DragCollection {
    isDragging: boolean;
    dragMonitorId: string | symbol;
}
interface DropCollection {
    isOver: boolean;
    dropMonitorId: string | symbol;
    dropEffect?: DropEffect;
}

/**
 * Available export formats for {@link formatQuery}.
 */
type ExportFormat = 'json' | 'sql' | 'json_without_ids' | 'parameterized' | 'parameterized_named' | 'mongodb' | 'cel' | 'jsonlogic' | 'spel' | 'elasticsearch' | 'jsonata';
/**
 * Options object shape for {@link formatQuery}.
 */
interface FormatQueryOptions {
    /**
     * The {@link ExportFormat}.
     */
    format?: ExportFormat;
    /**
     * This function will be used to process the `value` from each rule
     * for query language formats. If not defined, the appropriate
     * `defaultValueProcessor` for the format will be used.
     */
    valueProcessor?: ValueProcessorLegacy | ValueProcessorByRule;
    /**
     * This function will be used to process each rule for query language
     * formats. If not defined, the appropriate `defaultRuleProcessor`
     * for the format will be used.
     */
    ruleProcessor?: RuleProcessor;
    /**
     * In the "sql"/"parameterized"/"parameterized_named" export formats,
     * field names will be bracketed by this string. If an array of strings
     * is passed, field names will be preceded by the first element and
     * succeeded by the second element. A common value for this option is
     * the backtick (```'`'```).
     *
     * @default '' // the empty string
     *
     * @example
     * formatQuery(query, { format: 'sql', quoteFieldNamesWith: '`' })
     * // "`First name` = 'Steve'"
     *
     * @example
     * formatQuery(query, { format: 'sql', quoteFieldNamesWith: ['[', ']'] })
     * // "[First name] = 'Steve'"
     */
    quoteFieldNamesWith?: string | [string, string];
    /**
     * Character to use for quoting string values in the SQL format.
     * @default `'`
     */
    quoteValuesWith?: string;
    /**
     * Validator function for the entire query. Can be the same function passed
     * as `validator` prop to {@link QueryBuilder}.
     */
    validator?: QueryValidator;
    /**
     * This can be the same {@link FullField} array passed to {@link QueryBuilder}, but
     * really all you need to provide is the `name` and `validator` for each field.
     *
     * The full field object from this array, where the field's identifying property
     * matches the rule's `field`, will be passed to the rule processor.
     */
    fields?: FlexibleOptionList<FullField>;
    /**
     * This string will be inserted in place of invalid groups for non-JSON formats.
     * Defaults to `'(1 = 1)'` for "sql"/"parameterized"/"parameterized_named" and
     * `'$and:[{$expr:true}]'` for "mongodb".
     */
    fallbackExpression?: string;
    /**
     * This string will be placed in front of named parameters (aka bind variables)
     * when using the "parameterized_named" export format.
     *
     * @default ":"
     */
    paramPrefix?: string;
    /**
     * Maintains the parameter prefix in the `params` object keys when using the
     * "parameterized_named" export format. Recommended when using SQLite.
     *
     * @default false
     *
     * @example
     * console.log(formatQuery(query, {
     *   format: "parameterized_named",
     *   paramPrefix: "$",
     *   paramsKeepPrefix: true
     * }).params)
     * // { $firstName: "Stev" }
     * // Default (`paramsKeepPrefix` is `false`):
     * // { firstName: "Stev" }
     */
    paramsKeepPrefix?: boolean;
    /**
     * Renders parameter placeholders as a series of sequential numbers
     * instead of '?' like the default. This option will respect the
     * `paramPrefix` option like the 'parameterized_named' format.
     *
     * @default false
     */
    numberedParams?: boolean;
    /**
     * Renders values as either `number`-types or unquoted strings, as
     * appropriate and when possible. Each `string`-type value is evaluated
     * against {@link numericRegex} to determine if it can be represented as a
     * plain numeric value. If so, `parseFloat` is used to convert it to a number.
     */
    parseNumbers?: boolean;
    /**
     * Any rules where the field is equal to this value will be ignored.
     *
     * @default '~'
     */
    placeholderFieldName?: string;
    /**
     * Any rules where the operator is equal to this value will be ignored.
     *
     * @default '~'
     */
    placeholderOperatorName?: string;
}
/**
 * Options object for {@link ValueProcessorByRule} functions.
 */
interface ValueProcessorOptions extends FormatQueryOptions {
    valueProcessor?: ValueProcessorByRule;
    escapeQuotes?: boolean;
    /**
     * The full field object, if `fields` was provided in the
     * {@link formatQuery} options parameter.
     */
    fieldData?: FullField;
    /**
     * Included for the "parameterized" format only. Represents the total number of
     * parameters for all query rules processed up to that point.
     */
    /**
     * Included for the "parameterized_named" format only. Keys of this object represent
     * field names and values represent the current list of parameter names for that
     * field based on the query rules processed up to that point. Use this list to
     * ensure that parameter names generated by the custom rule processor are unique.
     */
    fieldParamNames?: Record<string, string[]>;
    /**
     * Included for the "parameterized_named" format only. Call this function with a
     * field name to get a unique parameter name, as yet unused during query processing.
     */
    getNextNamedParam?: (field: string) => string;
}
/**
 * Function that produces a processed value for a given {@link RuleType}.
 */
type ValueProcessorByRule = (rule: RuleType, options?: ValueProcessorOptions) => string;
/**
 * Function that produces a processed value for a given `field`, `operator`, `value`,
 * and `valueSource`.
 */
type ValueProcessorLegacy = (field: string, operator: string, value: any, valueSource?: ValueSource) => string;
type ValueProcessor = ValueProcessorLegacy;
/**
 * Function to produce a result that {@link formatQuery} uses when processing a
 * {@link RuleType} object.
 *
 * See the default rule processor for each format to know what type to return.
 * | Format                | Default rule processor                    |
 * | --------------------- | ----------------------------------------- |
 * | `sql`                 | {@link defaultRuleProcessorSQL}           |
 * | `parameterized`       | {@link defaultRuleProcessorParameterized} |
 * | `parameterized_named` | {@link defaultRuleProcessorParameterized} |
 * | `mongodb`             | {@link defaultRuleProcessorMongoDB}       |
 * | `cel`                 | {@link defaultRuleProcessorCEL}           |
 * | `spel`                | {@link defaultRuleProcessorSpEL}          |
 * | `jsonlogic`           | {@link defaultRuleProcessorJsonLogic}     |
 * | `elasticsearch`       | {@link defaultRuleProcessorElasticSearch} |
 * | `jsonata`             | {@link defaultRuleProcessorJSONata} |
 */
type RuleProcessor = (rule: RuleType, options?: ValueProcessorOptions, meta?: {
    processedParams?: Record<string, any> | any[];
}) => any;
/**
 * Object produced by {@link formatQuery} for the `"parameterized"` format.
 */
interface ParameterizedSQL {
    /** The SQL `WHERE` clause fragment with `?` placeholders for each value. */
    sql: string;
    /**
     * Parameter values in the same order their respective placeholders
     * appear in the `sql` string.
     */
    params: any[];
}
/**
 * Object produced by {@link formatQuery} for the `"parameterized_named"` format.
 */
interface ParameterizedNamedSQL {
    /** The SQL `WHERE` clause fragment with bind variable placeholders for each value. */
    sql: string;
    /**
     * Map of bind variable names from the `sql` string to the associated values.
     */
    params: Record<string, any>;
}
interface RQBJsonLogicStartsWith {
    startsWith: [RQBJsonLogic, RQBJsonLogic, ...RQBJsonLogic[]];
}
interface RQBJsonLogicEndsWith {
    endsWith: [RQBJsonLogic, RQBJsonLogic, ...RQBJsonLogic[]];
}
interface RQBJsonLogicVar {
    var: string;
}
/**
 * JsonLogic rule object with additional operators generated by {@link formatQuery}
 * and accepted by {@link parseJsonLogic}.
 */
type RQBJsonLogic = RulesLogic<RQBJsonLogicStartsWith | RQBJsonLogicEndsWith>;
/**
 * Options common to all parsers.
 */
interface ParserCommonOptions {
    fields?: OptionList<FullField> | Record<string, FullField>;
    getValueSources?: (field: string, operator: string) => ValueSources;
    listsAsArrays?: boolean;
    independentCombinators?: boolean;
}
/**
 * Options object for {@link parseSQL}.
 */
interface ParseSQLOptions extends ParserCommonOptions {
    paramPrefix?: string;
    params?: any[] | Record<string, any>;
}
/**
 * Options object for {@link parseCEL}.
 */
interface ParseCELOptions extends ParserCommonOptions {
}
/**
 * Options object for {@link parseSpEL}.
 */
interface ParseSpELOptions extends ParserCommonOptions {
}
/**
 * Options object for {@link parseJSONata}.
 *
 * Note: `listsAsArrays` is ignored by `parseJSONata`; lists are _always_ arrays.
 */
interface ParseJSONataOptions extends ParserCommonOptions {
}
/**
 * Options object for {@link parseJsonLogic}.
 */
interface ParseJsonLogicOptions extends ParserCommonOptions {
    jsonLogicOperations?: Record<string, (value: any) => RuleType | RuleGroupTypeAny>;
}
/**
 * Options object for {@link parseMongoDB}.
 */
interface ParseMongoDbOptions extends ParserCommonOptions {
    /**
     * When `true`, MongoDB rules in the form of `{ fieldName: { $not: { <...rule> } } }`
     * will be parsed into a rule group with the `not` attribute set to `true`. By default
     * (i.e., when this attribute is `false`), such "`$not`" rules will be parsed into a
     * rule with a negated operator.
     *
     * For example, with `preventOperatorNegation` set to `true`, a MongoDB rule like this...
     *
     * ```ts
     * { fieldName: { $not: { $eq: 1 } } }
     * ```
     *
     * ...would yield a rule group like this:
     *
     * ```ts
     * {
     *   combinator: 'and',
     *   not: true,
     *   rules: [{ field: 'fieldName', operator: '=', value: 1 }]
     * }
     * ```
     *
     * By default, the same MongoDB rule would yield a rule like this:
     *
     * ```ts
     * { field: 'fieldName', operator: '!=', value: 1 }
     * //              negated operator ^
     * ```
     *
     * @default false
     */
    preventOperatorNegation?: boolean;
    /**
     * Map of additional operators to their respective processing functions. Operators
     * must begin with `"$"`. Processing functions should return either a {@link RuleType}
     * or {@link RuleGroupType}.
     *
     * (The functions should _not_ return {@link RuleGroupTypeIC}, even if using independent
     * combinators. If the `independentCombinators` option is `true`, `parseMongoDB`
     * will convert the final query to {@link RuleGroupTypeIC} before returning it.)
     *
     * @default {}
     */
    additionalOperators?: Record<`$${string}`, (field: string, operator: string, value: any, options: ParserCommonOptions) => RuleType | RuleGroupType>;
}

/**
 * A translation for a component with `title` and `label`.
 */
interface TranslationWithLabel extends Translation {
    label?: ReactNode;
}
/**
 * Props passed to every action component (rendered as `<button>` by default).
 */
interface ActionProps extends CommonSubComponentProps {
    /** Visible text. */
    label?: ReactNode;
    /** Call this function to trigger the action. */
    handleOnClick(e?: MouseEvent): void;
    /**
     * Translation which overrides the regular `label`/`title` props when
     * the element is disabled.
     */
    disabledTranslation?: TranslationWithLabel;
    /**
     * The {@link RuleType} or {@link RuleGroupType}/{@link RuleGroupTypeIC}
     * associated with this element.
     */
    ruleOrGroup: RuleGroupTypeAny | RuleType;
}
/**
 * Props passed to every group action component.
 */
interface ActionWithRulesProps extends ActionProps {
    /**
     * Rules already present for this group.
     */
    rules?: RuleOrGroupArray;
}
/**
 * Props passed to every action component that adds a rule or group.
 */
interface ActionWithRulesAndAddersProps extends ActionWithRulesProps {
    /**
     * Triggers the addition of a new rule or group. The second parameter will
     * be forwarded to the `onAddRule` or `onAddGroup` callback, appropriately.
     */
    handleOnClick(e: MouseEvent, context?: any): void;
}
/**
 * Props for `notToggle` components.
 */
interface NotToggleProps extends CommonSubComponentProps {
    checked?: boolean;
    handleOnChange(checked: boolean): void;
    label?: ReactNode;
    ruleGroup: RuleGroupTypeAny;
}
/**
 * Props passed to `shiftActions` components.
 */
interface ShiftActionsProps extends CommonSubComponentProps {
    /**
     * Visible text for "shift up"/"shift down" elements.
     */
    labels?: {
        shiftUp?: ReactNode;
        shiftDown?: ReactNode;
    };
    /**
     * Tooltips for "shift up"/"shift down" elements.
     */
    titles?: {
        shiftUp?: string;
        shiftDown?: string;
    };
    /**
     * The {@link RuleType} or {@link RuleGroupType}/{@link RuleGroupTypeIC}
     * associated with this element.
     */
    ruleOrGroup: RuleGroupTypeAny | RuleType;
    /**
     * Method to shift the rule/group up one place.
     */
    shiftUp?: () => void;
    /**
     * Method to shift the rule/group down one place.
     */
    shiftDown?: () => void;
    /**
     * Whether shifting the rule/group up is disallowed.
     */
    shiftUpDisabled?: boolean;
    /**
     * Whether shifting the rule/group down is disallowed.
     */
    shiftDownDisabled?: boolean;
}
/**
 * Props for `dragHandle` components.
 */
interface DragHandleProps extends CommonSubComponentProps {
    label?: ReactNode;
    ruleOrGroup: RuleGroupTypeAny | RuleType;
}
/**
 * Props passed to `inlineCombinator` components.
 */
interface InlineCombinatorProps extends CombinatorSelectorProps {
    component: ComponentType<CombinatorSelectorProps>;
}
/**
 * Props passed to `valueEditor` components.
 */
interface ValueEditorProps<F extends FullField = FullField, O extends string = string> extends SelectorOrEditorProps<F, O>, CommonRuleSubComponentProps {
    field: GetOptionIdentifierType<F>;
    operator: O;
    value?: any;
    valueSource: ValueSource;
    /** The entire {@link FullField} object. */
    fieldData: F;
    type?: ValueEditorType;
    inputType?: InputType | null;
    values?: any[];
    listsAsArrays?: boolean;
    parseNumbers?: ParseNumbersMethod;
    separator?: ReactNode;
    selectorComponent?: ComponentType<ValueSelectorProps>;
    /**
     * Only pass `true` if the {@link useValueEditor} hook has already run
     * in a parent/ancestor component. See usage in the compatibility packages.
     */
    skipHook?: boolean;
    schema: Schema<F, O>;
}
/**
 * Subcomponents.
 */
type Controls<F extends FullField, O extends string> = Required<SetNonNullable<ControlElementsProp<F, O>, keyof ControlElementsProp<F, O>>>;
type ControlElementsProp<F extends FullField, O extends string> = Partial<{
    /**
     * Default component for all button-type controls.
     *
     * @default ActionElement
     */
    actionElement: ComponentType<ActionProps>;
    /**
     * Adds a sub-group to the current group.
     *
     * @default ActionElement
     */
    addGroupAction: ComponentType<ActionWithRulesAndAddersProps> | null;
    /**
     * Adds a rule to the current group.
     *
     * @default ActionElement
     */
    addRuleAction: ComponentType<ActionWithRulesAndAddersProps> | null;
    /**
     * Clones the current group.
     *
     * @default ActionElement
     */
    cloneGroupAction: ComponentType<ActionWithRulesProps> | null;
    /**
     * Clones the current rule.
     *
     * @default ActionElement
     */
    cloneRuleAction: ComponentType<ActionProps> | null;
    /**
     * Selects the `combinator` property for the current group, or the current independent combinator value.
     *
     * @default ValueSelector
     */
    combinatorSelector: ComponentType<CombinatorSelectorProps> | null;
    /**
     * Provides a draggable handle for reordering rules and groups.
     *
     * @default DragHandle
     */
    dragHandle: ForwardRefExoticComponent<DragHandleProps & RefAttributes<HTMLElement>> | null;
    /**
     * Selects the `field` property for the current rule.
     *
     * @default ValueSelector
     */
    fieldSelector: ComponentType<FieldSelectorProps<F>> | null;
    /**
     * A small wrapper around the `combinatorSelector` component.
     *
     * @default InlineCombinator
     */
    inlineCombinator: ComponentType<InlineCombinatorProps> | null;
    /**
     * Locks the current group (sets the `disabled` property to `true`).
     *
     * @default ActionElement
     */
    lockGroupAction: ComponentType<ActionWithRulesProps> | null;
    /**
     * Locks the current rule (sets the `disabled` property to `true`).
     *
     * @default ActionElement
     */
    lockRuleAction: ComponentType<ActionWithRulesProps> | null;
    /**
     * Toggles the `not` property of the current group between `true` and `false`.
     *
     * @default NotToggle
     */
    notToggle: ComponentType<NotToggleProps> | null;
    /**
     * Selects the `operator` property for the current rule.
     *
     * @default ValueSelector
     */
    operatorSelector: ComponentType<OperatorSelectorProps> | null;
    /**
     * Removes the current group from its parent group's `rules` array.
     *
     * @default ActionElement
     */
    removeGroupAction: ComponentType<ActionWithRulesProps> | null;
    /**
     * Removes the current rule from its parent group's `rules` array.
     *
     * @default ActionElement
     */
    removeRuleAction: ComponentType<ActionProps> | null;
    /**
     * Rule layout component.
     *
     * @default Rule
     */
    rule: ComponentType<RuleProps>;
    /**
     * Rule group layout component.
     *
     * @default RuleGroup
     */
    ruleGroup: ComponentType<RuleGroupProps<F, O>>;
    /**
     * Shifts the current rule/group up or down in the query hierarchy.
     *
     * @default ShiftActions
     */
    shiftActions: ComponentType<ShiftActionsProps> | null;
    /**
     * Updates the `value` property for the current rule.
     *
     * @default ValueEditor
     */
    valueEditor: ComponentType<ValueEditorProps<F, O>> | null;
    /**
     * Default component for all value selector controls.
     *
     * @default ValueSelector
     */
    valueSelector: ComponentType<ValueSelectorProps>;
    /**
     * Selects the `valueSource` property for the current rule.
     *
     * @default ValueSelector
     */
    valueSourceSelector: ComponentType<ValueSourceSelectorProps> | null;
}>;
/**
 * Configuration options passed in the `schema` prop from
 * {@link QueryBuilder} to each subcomponent.
 */
interface Schema<F extends FullField, O extends string> {
    qbId: string;
    fields: FullOptionList<F>;
    fieldMap: Partial<Record<GetOptionIdentifierType<F>, F>>;
    classNames: Classnames;
    combinators: FullOptionList<FullCombinator>;
    controls: Controls<F, O>;
    createRule(): RuleType;
    createRuleGroup(ic?: boolean): RuleGroupTypeAny;
    dispatchQuery(query: RuleGroupTypeAny): void;
    getQuery(): RuleGroupTypeAny | undefined;
    getOperators(field: string, meta: {
        fieldData: F;
    }): FullOptionList<FullOperator>;
    getValueEditorType(field: string, operator: string, meta: {
        fieldData: F;
    }): ValueEditorType;
    getValueEditorSeparator(field: string, operator: string, meta: {
        fieldData: F;
    }): ReactNode;
    getValueSources(field: string, operator: string, meta: {
        fieldData: F;
    }): ValueSources;
    getInputType(field: string, operator: string, meta: {
        fieldData: F;
    }): InputType | null;
    getValues(field: string, operator: string, meta: {
        fieldData: F;
    }): FullOptionList<Option>;
    getRuleClassname(rule: RuleType, misc: {
        fieldData: F;
    }): Classname;
    getRuleGroupClassname(ruleGroup: RuleGroupTypeAny): Classname;
    accessibleDescriptionGenerator: AccessibleDescriptionGenerator;
    showCombinatorsBetweenRules: boolean;
    showNotToggle: boolean;
    showShiftActions: boolean;
    showCloneButtons: boolean;
    showLockButtons: boolean;
    autoSelectField: boolean;
    autoSelectOperator: boolean;
    addRuleToNewGroups: boolean;
    enableDragAndDrop: boolean;
    validationMap: ValidationMap;
    independentCombinators: boolean;
    listsAsArrays: boolean;
    parseNumbers: ParseNumbersMethod;
    disabledPaths: Path[];
}
/**
 * Common props between {@link Rule} and {@link RuleGroup}.
 */
interface CommonRuleAndGroupProps<F extends FullField = FullField, O extends string = string> {
    id?: string;
    path: Path;
    parentDisabled?: boolean;
    translations: Translations;
    schema: Schema<F, O>;
    actions: QueryActions;
    disabled?: boolean;
    shiftUpDisabled?: boolean;
    shiftDownDisabled?: boolean;
    context?: any;
    combinator?: ReactNode;
}
/**
 * Return type of {@link useRuleGroupDnD} hook.
 */
interface UseRuleGroupDnD {
    isDragging: boolean;
    dragMonitorId: string | symbol;
    isOver: boolean;
    dropMonitorId: string | symbol;
    previewRef: Ref<HTMLDivElement>;
    dragRef: Ref<HTMLSpanElement>;
    dropRef: Ref<HTMLDivElement>;
    /** `"move"` by default; `"copy"` if the modifier key is pressed. */
    dropEffect?: DropEffect;
}
/**
 * {@link RuleGroup} props.
 */
interface RuleGroupProps<F extends FullOption = FullOption, O extends string = string> extends CommonRuleAndGroupProps<F, O>, Partial<UseRuleGroupDnD> {
    ruleGroup: RuleGroupTypeAny<RuleType<GetOptionIdentifierType<F>, O>>;
    /**
     * @deprecated Use the `combinator` property of the `ruleGroup` prop instead
     */
    combinator?: string;
    /**
     * @deprecated Use the `rules` property of the `ruleGroup` prop instead
     */
    rules?: RuleOrGroupArray;
    /**
     * @deprecated Use the `not` property of the `ruleGroup` prop instead
     */
    not?: boolean;
}
/**
 * Return type of {@link useRuleDnD} hook.
 */
interface UseRuleDnD {
    isDragging: boolean;
    dragMonitorId: string | symbol;
    isOver: boolean;
    dropMonitorId: string | symbol;
    dragRef: Ref<HTMLSpanElement>;
    dndRef: Ref<HTMLDivElement>;
    /** `"move"` by default; `"copy"` if the modifier key is pressed. */
    dropEffect?: DropEffect;
}
/**
 * {@link Rule} props.
 */
interface RuleProps<F extends string = string, O extends string = string> extends CommonRuleAndGroupProps<FullOption<F>, O>, Partial<UseRuleDnD> {
    rule: RuleType<F, O>;
    /**
     * @deprecated Use the `field` property of the `rule` prop instead
     */
    field?: string;
    /**
     * @deprecated Use the `operator` property of the `rule` prop instead
     */
    operator?: string;
    /**
     * @deprecated Use the `value` property of the `rule` prop instead
     */
    value?: any;
    /**
     * @deprecated Use the `valueSource` property of the `rule` prop instead
     */
    valueSource?: ValueSource;
}
/**
 * Props passed down through context from a {@link QueryBuilderContextProvider}.
 */
interface QueryBuilderContextProps<F extends FullField, O extends string> {
    /**
     * Defines replacement components.
     */
    controlElements?: ControlElementsProp<F, O>;
    /**
     * Set to `false` to avoid calling the `onQueryChange` callback
     * when the component mounts.
     *
     * @default true
     */
    enableMountQueryChange?: boolean;
    /**
     * This can be used to assign specific CSS classes to various controls
     * that are rendered by {@link QueryBuilder}.
     */
    controlClassnames?: Partial<Classnames>;
    /**
     * This can be used to override translatable texts applied to the various
     * controls that are rendered by {@link QueryBuilder}.
     */
    translations?: Partial<Translations>;
    /**
     * Enables drag-and-drop features.
     *
     * @default false
     */
    enableDragAndDrop?: boolean;
    /**
     * Enables debug logging for {@link QueryBuilder} (and React DnD when applicable).
     *
     * @default false
     */
    debugMode?: boolean;
}
type QueryBuilderContextProviderProps = QueryBuilderContextProps<FullField, string> & {
    children?: ReactNode;
};
type QueryBuilderContextProvider<ExtraProps extends object = Record<string, any>> = ComponentType<QueryBuilderContextProviderProps & ExtraProps>;
/**
 * Props for {@link QueryBuilder}.
 *
 * Notes:
 * - Only one of `query` or `defaultQuery` should be provided. If `query` is present,
 * then `defaultQuery` should be undefined and vice versa.
 * - If rendered initially with a `query` prop, then `query` must be defined in every
 * subsequent render or warnings will be logged (in non-production modes only).
 *
 * @typeParam RG - The type of the query object, inferred from either the `query` or `defaultQuery` prop.
 * Must extend {@link RuleGroupType} or {@link RuleGroupTypeIC}.
 * @typeParam F - The field type (see {@link Field}).
 * @typeParam O - The operator type (see {@link Operator}).
 * @typeParam C - The combinator type (see {@link Combinator}).
 */
type QueryBuilderProps<RG extends RuleGroupTypeAny, F extends FullField, O extends FullOperator, C extends FullCombinator> = RG extends RuleGroupType<infer R> | RuleGroupTypeIC<infer R> ? QueryBuilderContextProps<F, GetOptionIdentifierType<O>> & {
    /**
     * Initial query object for uncontrolled components.
     */
    defaultQuery?: RG;
    /**
     * Query object for controlled components.
     */
    query?: RG;
    /**
     * List of valid {@link FullField}s.
     *
     * @default []
     */
    fields?: FlexibleOptionList<F> | BaseOptionMap<F, GetOptionIdentifierType<F>>;
    /**
     * List of valid {@link FullOperator}s.
     *
     * @see {@link DefaultOperatorName}
     *
     * @default
     * [
     *   { name: '=', label: '=' },
     *   { name: '!=', label: '!=' },
     *   { name: '<', label: '<' },
     *   { name: '>', label: '>' },
     *   { name: '<=', label: '<=' },
     *   { name: '>=', label: '>=' },
     *   { name: 'contains', label: 'contains' },
     *   { name: 'beginsWith', label: 'begins with' },
     *   { name: 'endsWith', label: 'ends with' },
     *   { name: 'doesNotContain', label: 'does not contain' },
     *   { name: 'doesNotBeginWith', label: 'does not begin with' },
     *   { name: 'doesNotEndWith', label: 'does not end with' },
     *   { name: 'null', label: 'is null' },
     *   { name: 'notNull', label: 'is not null' },
     *   { name: 'in', label: 'in' },
     *   { name: 'notIn', label: 'not in' },
     *   { name: 'between', label: 'between' },
     *   { name: 'notBetween', label: 'not between' },
     * ]
     */
    operators?: FlexibleOptionList<O>;
    /**
     * List of valid {@link FullCombinator}s.
     *
     * @see {@link DefaultCombinatorName}
     *
     * @default
     * [
     *   {name: 'and', label: 'AND'},
     *   {name: 'or', label: 'OR'},
     * ]
     */
    combinators?: FlexibleOptionList<C>;
    /**
     * Default properties applied to all objects in the `fields` prop. Properties on
     * individual field definitions will override these.
     */
    baseField?: Record<string, unknown>;
    /**
     * Default properties applied to all objects in the `operators` prop. Properties on
     * individual operator definitions will override these.
     */
    baseOperator?: Record<string, unknown>;
    /**
     * Default properties applied to all objects in the `combinators` prop. Properties on
     * individual combinator definitions will override these.
     */
    baseCombinator?: Record<string, unknown>;
    /**
     * The default `field` value for new rules. This can be the field `name`
     * itself or a function that returns a valid {@link FullField} `name` given
     * the `fields` list.
     */
    getDefaultField?: GetOptionIdentifierType<F> | ((fieldsData: FullOptionList<F>) => string);
    /**
     * The default `operator` value for new rules. This can be the operator
     * `name` or a function that returns a valid {@link FullOperator} `name` for
     * a given field name.
     */
    getDefaultOperator?: GetOptionIdentifierType<O> | ((field: GetOptionIdentifierType<F>, misc: {
        fieldData: F;
    }) => string);
    /**
     * Returns the default `value` for new rules.
     */
    getDefaultValue?(rule: R, misc: {
        fieldData: F;
    }): any;
    /**
     * This function should return the list of allowed {@link FullOperator}s
     * for the given {@link FullField} `name`. If `null` is returned, the
     * {@link DefaultOperator}s are used.
     */
    getOperators?(field: GetOptionIdentifierType<F>, misc: {
        fieldData: F;
    }): FlexibleOptionList<FullOperator> | null;
    /**
     * This function should return the type of {@link ValueEditor} (see
     * {@link ValueEditorType}) for the given field `name` and operator `name`.
     */
    getValueEditorType?(field: GetOptionIdentifierType<F>, operator: GetOptionIdentifierType<O>, misc: {
        fieldData: F;
    }): ValueEditorType;
    /**
     * This function should return the separator element for a given field
     * `name` and operator `name`. The element can be any valid React element,
     * including a bare string (e.g., "and" or "to") or an HTML element like
     * `<span />`. It will be placed in between value editors when multiple
     * editors are rendered, such as when the `operator` is `"between"`.
     */
    getValueEditorSeparator?(field: GetOptionIdentifierType<F>, operator: GetOptionIdentifierType<O>, misc: {
        fieldData: F;
    }): ReactNode;
    /**
     * This function should return the list of valid {@link ValueSources}
     * for a given field `name` and operator `name`. The return value must
     * be an array that includes at least one valid {@link ValueSource}
     * (i.e. `["value"]`, `["field"]`, `["value", "field"]`, or
     * `["field", "value"]`).
     */
    getValueSources?(field: GetOptionIdentifierType<F>, operator: GetOptionIdentifierType<O>, misc: {
        fieldData: F;
    }): ValueSources;
    /**
     * This function should return the `type` of `<input />`
     * for the given field `name` and operator `name` (only applicable when
     * `getValueEditorType` returns `"text"` or a falsy value). If no
     * function is provided, `"text"` is used as the default.
     */
    getInputType?(field: GetOptionIdentifierType<F>, operator: GetOptionIdentifierType<O>, misc: {
        fieldData: F;
    }): InputType | null;
    /**
     * This function should return the list of allowed values for the
     * given field `name` and operator `name` (only applicable when
     * `getValueEditorType` returns `"select"` or `"radio"`). If no
     * function is provided, an empty array is used as the default.
     */
    getValues?(field: GetOptionIdentifierType<F>, operator: GetOptionIdentifierType<O>, misc: {
        fieldData: F;
    }): FlexibleOptionList<Option>;
    /**
     * The return value of this function will be used to apply classnames to the
     * outer `<div>` of the given {@link Rule}.
     */
    getRuleClassname?(rule: R, misc: {
        fieldData: F;
    }): Classname;
    /**
     * The return value of this function will be used to apply classnames to the
     * outer `<div>` of the given {@link RuleGroup}.
     */
    getRuleGroupClassname?(ruleGroup: RG): Classname;
    /**
     * This callback is invoked before a new rule is added. The function should either manipulate
     * the rule and return the new object, or return `false` to cancel the addition of the rule.
     */
    onAddRule?(rule: R, parentPath: Path, query: RG, context?: any): RuleType | false;
    /**
     * This callback is invoked before a new group is added. The function should either manipulate
     * the group and return the new object, or return `false` to cancel the addition of the group.
     */
    onAddGroup?(ruleGroup: RG, parentPath: Path, query: RG, context?: any): RG | false;
    /**
     * This callback is invoked before a rule or group is removed. The function should return
     * `true` if the rule or group should be removed or `false` if it should not be removed.
     */
    onRemove?(ruleOrGroup: R | RG, path: Path, query: RG, context?: any): boolean;
    /**
     * This callback is invoked anytime the query state is updated.
     */
    onQueryChange?(query: RG): void;
    /**
     * Each log object will be passed to this function when `debugMode` is `true`.
     *
     * @default console.log
     */
    onLog?(obj: any): void;
    /**
     * Show group combinator selectors in the body of the group, between each child rule/group,
     * instead of in the group header.
     *
     * @default false
     */
    showCombinatorsBetweenRules?: boolean;
    /**
     * @deprecated As of v7, this prop is ignored. To enable independent combinators, use
     * {@link RuleGroupTypeIC} for the `query` or `defaultQuery` prop. The query builder
     * will detect the query type and behave accordingly.
     */
    independentCombinators?: boolean;
    /**
     * Show the "not" (aka inversion) toggle for rule groups.
     *
     * @default false
     */
    showNotToggle?: boolean;
    /**
     * Show the "Shift up"/"Shift down" actions.
     *
     * @default false
     */
    showShiftActions?: boolean;
    /**
     * Show the "Clone rule" and "Clone group" buttons.
     *
     * @default false
     */
    showCloneButtons?: boolean;
    /**
     * Show the "Lock rule" and "Lock group" buttons.
     *
     * @default false
     */
    showLockButtons?: boolean;
    /**
     * Reset the `operator` and `value` when the `field` changes.
     *
     * @default true
     */
    resetOnFieldChange?: boolean;
    /**
     * Reset the `value` when the `operator` changes.
     *
     * @default false
     */
    resetOnOperatorChange?: boolean;
    /**
     * Select the first field in the array automatically.
     *
     * @default true
     */
    autoSelectField?: boolean;
    /**
     * Select the first operator in the array automatically.
     *
     * @default true
     */
    autoSelectOperator?: boolean;
    /**
     * Adds a new default rule automatically to each new group.
     *
     * @default false
     */
    addRuleToNewGroups?: boolean;
    /**
     * Store list-type values as native arrays instead of comma-separated strings.
     *
     * @default false
     */
    listsAsArrays?: boolean;
    /**
     * Store values as numbers if possible.
     *
     * @default false
     */
    parseNumbers?: ParseNumbersMethod;
    /**
     * Disables the entire query builder if true, or the rules and groups at
     * the specified paths (as well as all child rules/groups and subcomponents)
     * if an array of paths is provided. If the root path is specified (`disabled={[[]]}`),
     * no changes to the query are allowed.
     *
     * @default false
     */
    disabled?: boolean | Path[];
    /**
     * Query validation function.
     */
    validator?: QueryValidator;
    /**
     * `id` generator function. Should always produce a unique/random value.
     *
     * @default crypto.randomUUID
     */
    idGenerator?: () => string;
    /**
     * Generator function for the `title` attribute applied to the outermost `<div>` of each
     * rule group. As this is intended to help with accessibility, the text output from this
     * function should be meaningful, descriptive, and unique within the page.
     */
    accessibleDescriptionGenerator?: AccessibleDescriptionGenerator;
    /**
     * Container for custom props that are passed to all components.
     */
    context?: any;
} : never;

/**
 * Base interface for all subcomponents.
 */
interface CommonSubComponentProps<F extends FullOption = FullField, O extends string = string> {
    /**
     * CSS classNames to be applied.
     *
     * This is `string` and not {@link Classname} because the {@link Rule}
     * and {@link RuleGroup} components run `clsx()` to produce the `className`
     * that gets passed to each subcomponent.
     */
    className?: string;
    /**
     * Path to this subcomponent's rule/group within the query.
     */
    path: Path;
    /**
     * The level of the current group. Always equal to `path.length`.
     */
    level: number;
    /**
     * The title/tooltip for this control.
     */
    title?: string;
    /**
     * Disables the control.
     */
    disabled?: boolean;
    /**
     * Container for custom props that are passed to all components.
     */
    context?: any;
    /**
     * Validation result of the parent rule/group.
     */
    validation?: boolean | ValidationResult;
    /**
     * Test ID for this component.
     */
    testID?: string;
    /**
     * All subcomponents receive the configuration schema as a prop.
     */
    schema: Schema<F, O>;
}
/**
 * Base interface for selectors and editors.
 */
interface SelectorOrEditorProps<F extends FullOption = FullField, O extends string = string> extends CommonSubComponentProps<F, O> {
    value?: string;
    handleOnChange(value: any): void;
}
/**
 * Base interface for all rule subcomponents.
 */
interface CommonRuleSubComponentProps {
    rule: RuleType;
}
/**
 * Base interface for selector components.
 */
interface BaseSelectorProps<OptType extends Option> extends SelectorOrEditorProps<ToFullOption<OptType>> {
    options: FullOptionList<OptType>;
}
/**
 * Props for all `value` selector components.
 */
interface ValueSelectorProps<OptType extends Option = FullOption> extends BaseSelectorProps<OptType> {
    multiple?: boolean;
    listsAsArrays?: boolean;
}
/**
 * Props for `combinatorSelector` components.
 */
interface CombinatorSelectorProps extends BaseSelectorProps<FullOption> {
    options: FullOptionList<FullCombinator>;
    rules?: RuleOrGroupArray;
}
/**
 * Props for `fieldSelector` components.
 */
interface FieldSelectorProps<F extends FullField = FullField> extends BaseSelectorProps<F>, CommonRuleSubComponentProps {
    operator?: F extends FullField<string, infer OperatorName> ? OperatorName : string;
}
/**
 * Props for `operatorSelector` components.
 */
interface OperatorSelectorProps extends BaseSelectorProps<FullOption>, CommonRuleSubComponentProps {
    options: FullOptionList<FullOperator>;
    field: string;
    fieldData: FullField;
}
/**
 * Props for `valueSourceSelector` components.
 */
interface ValueSourceSelectorProps extends BaseSelectorProps<FullOption>, CommonRuleSubComponentProps {
    options: FullOptionList<FullOption<ValueSource>>;
    field: string;
    fieldData: FullField;
}
/**
 * Utility type representing props for selector components
 * that could potentially be any of the standard selector types.
 */
type VersatileSelectorProps = ValueSelectorProps & Partial<FieldSelectorProps<FullField>> & Partial<OperatorSelectorProps> & Partial<CombinatorSelectorProps>;
/**
 * Classnames applied to each component.
 */
interface Classnames {
    /**
     * Classnames applied to the root `<div>` element.
     */
    queryBuilder: Classname;
    /**
     * Classnames applied to the `<div>` containing the RuleGroup.
     */
    ruleGroup: Classname;
    /**
     * Classnames applied to the `<div>` containing the RuleGroup header controls.
     */
    header: Classname;
    /**
     * Classnames applied to the `<div>` containing the RuleGroup child rules/groups.
     */
    body: Classname;
    /**
     * Classnames applied to the `<select>` control for combinators.
     */
    combinators: Classname;
    /**
     * Classnames applied to the `<button>` to add a Rule.
     */
    addRule: Classname;
    /**
     * Classnames applied to the `<button>` to add a RuleGroup.
     */
    addGroup: Classname;
    /**
     * Classnames applied to the `<button>` to clone a Rule.
     */
    cloneRule: Classname;
    /**
     * Classnames applied to the `<button>` to clone a RuleGroup.
     */
    cloneGroup: Classname;
    /**
     * Classnames applied to the `<button>` to remove a RuleGroup.
     */
    removeGroup: Classname;
    /**
     * Classnames applied to the `<div>` containing the Rule.
     */
    rule: Classname;
    /**
     * Classnames applied to the `<select>` control for fields.
     */
    fields: Classname;
    /**
     * Classnames applied to the `<select>` control for operators.
     */
    operators: Classname;
    /**
     * Classnames applied to the `<input>` for the rule value.
     */
    value: Classname;
    /**
     * Classnames applied to the `<button>` to remove a Rule.
     */
    removeRule: Classname;
    /**
     * Classnames applied to the `<label>` on the "not" toggle.
     */
    notToggle: Classname;
    /**
     * Classnames applied to the `<span>` handle for dragging rules/groups.
     */
    shiftActions: Classname;
    /**
     * Classnames applied to the `<span>` handle for dragging rules/groups.
     */
    dragHandle: Classname;
    /**
     * Classnames applied to the `<button>` to lock/disable a Rule.
     */
    lockRule: Classname;
    /**
     * Classnames applied to the `<button>` to lock/disable a RuleGroup.
     */
    lockGroup: Classname;
    /**
     * Classnames applied to the `<select>` control for value sources.
     */
    valueSource: Classname;
    /**
     * Classnames applied to all action elements.
     */
    actionElement: Classname;
    /**
     * Classnames applied to all select elements.
     */
    valueSelector: Classname;
}
/**
 * Functions included in the `actions` prop passed to every subcomponent.
 */
interface QueryActions {
    onGroupAdd(group: RuleGroupTypeAny, parentPath: Path, context?: any): void;
    onGroupRemove(path: Path): void;
    onPropChange(prop: Exclude<keyof RuleType | keyof RuleGroupType, 'id' | 'path'>, value: any, path: Path): void;
    onRuleAdd(rule: RuleType, parentPath: Path, context?: any): void;
    onRuleRemove(path: Path): void;
    moveRule(oldPath: Path, newPath: Path | 'up' | 'down', clone?: boolean): void;
}
/**
 * A translation for a component with `title` only.
 */
interface Translation {
    title?: string;
}
/**
 * A translation for a component with `title` and a placeholder.
 */
interface TranslationWithPlaceholders extends Translation {
    /**
     * Value for the placeholder field option if autoSelectField is false,
     * or the placeholder operator option if autoSelectOperator is false.
     */
    placeholderName?: string;
    /**
     * Label for the placeholder field option if autoSelectField is false,
     * or the placeholder operator option if autoSelectOperator is false.
     */
    placeholderLabel?: string;
    /**
     * Label for the placeholder field optgroup if autoSelectField is false,
     * or the placeholder operator optgroup if autoSelectOperator is false.
     */
    placeholderGroupLabel?: string;
}
/**
 * The shape of the `translations` prop.
 */
interface Translations {
    fields: TranslationWithPlaceholders;
    operators: TranslationWithPlaceholders;
    value: Translation;
    removeRule: TranslationWithLabel;
    removeGroup: TranslationWithLabel;
    addRule: TranslationWithLabel;
    addGroup: TranslationWithLabel;
    combinators: Translation;
    notToggle: TranslationWithLabel;
    cloneRule: TranslationWithLabel;
    cloneRuleGroup: TranslationWithLabel;
    shiftActionUp: TranslationWithLabel;
    shiftActionDown: TranslationWithLabel;
    dragHandle: TranslationWithLabel;
    lockRule: TranslationWithLabel;
    lockGroup: TranslationWithLabel;
    lockRuleDisabled: TranslationWithLabel;
    lockGroupDisabled: TranslationWithLabel;
    valueSourceSelector: Translation;
}
/**
 * The full `translations` interface with all properties required.
 */
type TranslationsFull = {
    [K in keyof Translations]: {
        [T in keyof Translations[K]]-?: string;
    };
};

/**
 * Default `<button>` component used by {@link QueryBuilder}.
 */
declare const ActionElement: (props: ActionProps) => react.JSX.Element;

/**
 * Defaut drag handle component used by {@link QueryBuilder} when
 * `enableDragAndDrop` is `true`.
 */
declare const DragHandle: react.ForwardRefExoticComponent<DragHandleProps & react.RefAttributes<HTMLSpanElement>>;

/**
 * Default `inlineCombinator` component used by {@link QueryBuilder}. A small `<div>`
 * wrapper around the `combinatorSelector` component, used when either
 * `showCombinatorsBetweenRules` or `independentCombinators` are `true`.
 */
declare const InlineCombinator: (allProps: InlineCombinatorProps) => react.JSX.Element;

/**
 * Default `notToggle` (aka inversion) component used by {@link QueryBuilder}.
 */
declare const NotToggle: (props: NotToggleProps) => react.JSX.Element;

/**
 * The {@link Path} of the root group.
 */
declare const rootPath: never[];
/**
 * Context provider for the `{@link QueryBuilder}` state store.
 */
declare const QueryBuilderStateProvider: (props: {
    children: react.ReactNode;
}) => react.JSX.Element;
/**
 * The query builder component for React.
 *
 * See https://react-querybuilder.js.org/ for demos and documentation.
 */
declare const QueryBuilder: <RG extends RuleGroupTypeAny, F extends FullField<string, string, string, Option<string>, Option<string>>, O extends FullOperator<string>, C extends FullCombinator<string>>(props: QueryBuilderProps<RG, F, O, C>) => react.JSX.Element;

/**
 * Context provider for {@link QueryBuilder}. Any descendant query builders
 * will inherit the props from a context provider.
 */
declare const QueryBuilderContext: react.Context<QueryBuilderContextProps<any, any>>;

interface UseControlledOrUncontrolledParams {
    defaultQuery?: RuleGroupTypeAny;
    queryProp?: RuleGroupTypeAny;
}
/**
 * Logs a warning when the component changes from controlled to uncontrolled,
 * vice versa, or both `query` and `defaultQuery` are provided.
 */
declare const useControlledOrUncontrolled: (params: UseControlledOrUncontrolledParams) => void;

/**
 * Logs an error to the console if any of the following are true:
 * - `QueryBuilder` is rendered with an `independentCombinators` prop
 * - `RuleGroup` is rendered with `combinator` or `rules` props (deprecated in favor of `ruleGroup`)
 * - `Rule` is rendered with `field`, `operator`, or `value` props (deprecated in favor of `rule`)
 */
declare function useDeprecatedProps(type: 'independentCombinators', logWarning: boolean, otherParams: 'invalid' | 'unnecessary'): void;
declare function useDeprecatedProps(type: 'rule' | 'ruleGroup', logWarning: boolean): void;

type UseMergedContextProps<F extends FullField = FullField, O extends string = string> = QueryBuilderContextProps<F, O>;
/**
 * Merges inherited context values with props, giving precedence to props.
 */
declare const useMergedContext: <F extends FullField<string, string, string, Option<string>, Option<string>> = FullField<string, string, string, Option<string>, Option<string>>, O extends string = string>(props: UseMergedContextProps<F, O>) => {
    controlClassnames: Classnames;
    controlElements: Required<type_fest.SetNonNullable<Partial<{
        actionElement: ComponentType<ActionProps>;
        addGroupAction: ComponentType<ActionWithRulesAndAddersProps> | null;
        addRuleAction: ComponentType<ActionWithRulesAndAddersProps> | null;
        cloneGroupAction: ComponentType<ActionWithRulesProps> | null;
        cloneRuleAction: ComponentType<ActionProps> | null;
        combinatorSelector: ComponentType<CombinatorSelectorProps> | null;
        dragHandle: ForwardRefExoticComponent<DragHandleProps & RefAttributes<HTMLElement>> | null;
        fieldSelector: ComponentType<FieldSelectorProps<F>> | null;
        inlineCombinator: ComponentType<InlineCombinatorProps> | null;
        lockGroupAction: ComponentType<ActionWithRulesProps> | null;
        lockRuleAction: ComponentType<ActionWithRulesProps> | null;
        notToggle: ComponentType<NotToggleProps> | null;
        operatorSelector: ComponentType<OperatorSelectorProps> | null;
        removeGroupAction: ComponentType<ActionWithRulesProps> | null;
        removeRuleAction: ComponentType<ActionProps> | null;
        rule: ComponentType<RuleProps<string, string>>;
        ruleGroup: ComponentType<RuleGroupProps<F, O>>;
        shiftActions: ComponentType<ShiftActionsProps> | null;
        valueEditor: ComponentType<ValueEditorProps<F, O>> | null;
        valueSelector: ComponentType<ValueSelectorProps<FullOption<string>>>;
        valueSourceSelector: ComponentType<ValueSourceSelectorProps> | null;
    }>, "rule" | "ruleGroup" | "inlineCombinator" | "actionElement" | "addGroupAction" | "addRuleAction" | "cloneGroupAction" | "cloneRuleAction" | "combinatorSelector" | "dragHandle" | "fieldSelector" | "lockGroupAction" | "lockRuleAction" | "notToggle" | "operatorSelector" | "removeGroupAction" | "removeRuleAction" | "shiftActions" | "valueEditor" | "valueSelector" | "valueSourceSelector">>;
    debugMode: boolean;
    enableDragAndDrop: boolean;
    enableMountQueryChange: boolean;
    translations: TranslationsFull;
};

/**
 * For given default, prop, and context values, return the first provided of prop,
 * context, and default, in that order.
 */
declare const usePreferProp: (def: boolean, prop?: boolean, context?: boolean) => boolean;
/**
 * For given default, prop, and context values, return the first provided of prop,
 * context, and default, in that order.
 */
declare const usePreferAnyProp: (def?: any, prop?: any, context?: any) => any;

/**
 * Returns the prop value from the last render.
 *
 * Adapted from https://usehooks.com/usePrevious/.
 */
declare const usePrevious: <T>(value: T) => T | null;

/**
 * Massages the props as necessary and prepares the basic update/generate methods
 * for use by the {@link QueryBuilder} component.
 */
declare const useQueryBuilderSetup: <RG extends RuleGroupTypeAny, F extends FullField<string, string, string, Option<string>, Option<string>>, O extends FullOperator<string>, C extends FullCombinator<string>>(props: QueryBuilderProps<RG, F, O, C>) => {
    qbId: string;
    rqbContext: {
        controlClassnames: Classnames;
        controlElements: Required<type_fest.SetNonNullable<Partial<{
            actionElement: react.ComponentType<ActionProps>;
            addGroupAction: react.ComponentType<ActionWithRulesAndAddersProps> | null;
            addRuleAction: react.ComponentType<ActionWithRulesAndAddersProps> | null;
            cloneGroupAction: react.ComponentType<ActionWithRulesProps> | null;
            cloneRuleAction: react.ComponentType<ActionProps> | null;
            combinatorSelector: react.ComponentType<CombinatorSelectorProps> | null;
            dragHandle: react.ForwardRefExoticComponent<DragHandleProps & react.RefAttributes<HTMLElement>> | null;
            fieldSelector: react.ComponentType<FieldSelectorProps<F>> | null;
            inlineCombinator: react.ComponentType<InlineCombinatorProps> | null;
            lockGroupAction: react.ComponentType<ActionWithRulesProps> | null;
            lockRuleAction: react.ComponentType<ActionWithRulesProps> | null;
            notToggle: react.ComponentType<NotToggleProps> | null;
            operatorSelector: react.ComponentType<OperatorSelectorProps> | null;
            removeGroupAction: react.ComponentType<ActionWithRulesProps> | null;
            removeRuleAction: react.ComponentType<ActionProps> | null;
            rule: react.ComponentType<RuleProps<string, string>>;
            ruleGroup: react.ComponentType<RuleGroupProps<F, GetOptionIdentifierType<O>>>;
            shiftActions: react.ComponentType<ShiftActionsProps> | null;
            valueEditor: react.ComponentType<ValueEditorProps<F, GetOptionIdentifierType<O>>> | null;
            valueSelector: react.ComponentType<ValueSelectorProps<FullOption<string>>>;
            valueSourceSelector: react.ComponentType<ValueSourceSelectorProps> | null;
        }>, "rule" | "ruleGroup" | "inlineCombinator" | "actionElement" | "addGroupAction" | "addRuleAction" | "cloneGroupAction" | "cloneRuleAction" | "combinatorSelector" | "dragHandle" | "fieldSelector" | "lockGroupAction" | "lockRuleAction" | "notToggle" | "operatorSelector" | "removeGroupAction" | "removeRuleAction" | "shiftActions" | "valueEditor" | "valueSelector" | "valueSourceSelector">>;
        debugMode: boolean;
        enableDragAndDrop: boolean;
        enableMountQueryChange: boolean;
        translations: TranslationsFull;
    };
    fields: FullOptionList<F>;
    fieldMap: FullOptionMap<FullField<string, string, string, Option<string>, Option<string>>, GetOptionIdentifierType<F>>;
    combinators: WithUnknownIndex<BaseOption<string> & FullOption<string>>[] | OptionGroup<WithUnknownIndex<BaseOption<string> & FullOption<string>>>[];
    getOperatorsMain: (field: GetOptionIdentifierType<F>, { fieldData }: {
        fieldData: F;
    }) => FullOptionList<O>;
    getRuleDefaultOperator: (field: GetOptionIdentifierType<F>) => GetOptionIdentifierType<O>;
    getValueEditorTypeMain: (field: GetOptionIdentifierType<F>, operator: GetOptionIdentifierType<O>, { fieldData }: {
        fieldData: F;
    }) => ValueEditorType;
    getValueSourcesMain: (field: GetOptionIdentifierType<F>, operator: GetOptionIdentifierType<O>) => ValueSources;
    getValuesMain: (field: GetOptionIdentifierType<F>, operator: GetOptionIdentifierType<O>, { fieldData }: {
        fieldData: F;
    }) => WithUnknownIndex<BaseOption<string> & FullOption<string>>[] | OptionGroup<WithUnknownIndex<BaseOption<string> & FullOption<string>>>[];
    getRuleDefaultValue: <RT extends RuleType<string, string, any, string> = GetRuleTypeFromGroupWithFieldAndOperator<RG, F, O>>(r: RT) => any;
    getInputTypeMain: (field: GetOptionIdentifierType<F>, operator: GetOptionIdentifierType<O>, { fieldData }: {
        fieldData: F;
    }) => InputType;
    createRule: () => GetRuleTypeFromGroupWithFieldAndOperator<RG, F, O>;
    createRuleGroup: (independentCombinators?: boolean) => RG;
};

/**
 * For given {@link QueryBuilderProps} and setup values from {@link useQueryBuilderSetup},
 * prepares and returns all values required to render a query builder.
 */
declare function useQueryBuilderSchema<RG extends RuleGroupTypeAny, F extends FullField, O extends FullOperator, C extends FullCombinator>(props: QueryBuilderProps<RG, F, O, C>, setup: ReturnType<typeof useQueryBuilderSetup<RG, F, O, C>>): QueryBuilderProps<RG, F, O, C> & {
    actions: QueryActions;
    rootGroup: RuleGroupTypeAny<GetRuleTypeFromGroupWithFieldAndOperator<RG, F, O>>;
    rootGroupDisabled: boolean;
    queryDisabled: boolean;
    rqbContext: {
        controlClassnames: Classnames;
        controlElements: Required<type_fest.SetNonNullable<Partial<{
            actionElement: react.ComponentType<ActionProps>;
            addGroupAction: react.ComponentType<ActionWithRulesAndAddersProps> | null;
            addRuleAction: react.ComponentType<ActionWithRulesAndAddersProps> | null;
            cloneGroupAction: react.ComponentType<ActionWithRulesProps> | null;
            cloneRuleAction: react.ComponentType<ActionProps> | null;
            combinatorSelector: react.ComponentType<CombinatorSelectorProps> | null;
            dragHandle: react.ForwardRefExoticComponent<DragHandleProps & react.RefAttributes<HTMLElement>> | null;
            fieldSelector: react.ComponentType<FieldSelectorProps<F>> | null;
            inlineCombinator: react.ComponentType<InlineCombinatorProps> | null;
            lockGroupAction: react.ComponentType<ActionWithRulesProps> | null;
            lockRuleAction: react.ComponentType<ActionWithRulesProps> | null;
            notToggle: react.ComponentType<NotToggleProps> | null;
            operatorSelector: react.ComponentType<OperatorSelectorProps> | null;
            removeGroupAction: react.ComponentType<ActionWithRulesProps> | null;
            removeRuleAction: react.ComponentType<ActionProps> | null;
            rule: react.ComponentType<RuleProps<string, string>>;
            ruleGroup: react.ComponentType<RuleGroupProps<F, GetOptionIdentifierType<O>>>;
            shiftActions: react.ComponentType<ShiftActionsProps> | null;
            valueEditor: react.ComponentType<ValueEditorProps<F, GetOptionIdentifierType<O>>> | null;
            valueSelector: react.ComponentType<ValueSelectorProps<FullOption<string>>>;
            valueSourceSelector: react.ComponentType<ValueSourceSelectorProps> | null;
        }>, "rule" | "ruleGroup" | "inlineCombinator" | "actionElement" | "addGroupAction" | "addRuleAction" | "cloneGroupAction" | "cloneRuleAction" | "combinatorSelector" | "dragHandle" | "fieldSelector" | "lockGroupAction" | "lockRuleAction" | "notToggle" | "operatorSelector" | "removeGroupAction" | "removeRuleAction" | "shiftActions" | "valueEditor" | "valueSelector" | "valueSourceSelector">>;
        debugMode: boolean;
        enableDragAndDrop: boolean;
        enableMountQueryChange: boolean;
        translations: TranslationsFull;
    };
    schema: Schema<F, GetOptionIdentifierType<O>>;
    translations: TranslationsFull;
    wrapperClassName: string;
    dndEnabledAttr: string;
    inlineCombinatorsAttr: string;
    combinatorPropObject: Pick<RuleGroupProps<FullOption<string>, string>, "combinator">;
};

/**
 * Logs a warning if drag-and-drop is enabled but the required dependencies
 * (`react-dnd` and `react-dnd-html5-backend`) were not detected.
 */
declare const useReactDndWarning: (enableDragAndDrop: boolean, dndRefs: boolean) => void;

/**
 * Prepares all values and methods used by the {@link Rule} component.
 */
declare const useRule: (props: RuleProps) => {
    classNames: {
        shiftActions: string;
        dragHandle: string;
        fields: string;
        operators: string;
        valueSource: string;
        value: string;
        cloneRule: string;
        lockRule: string;
        removeRule: string;
    };
    cloneRule: (_event?: any, _context?: any) => void;
    disabled: boolean;
    dndRef: react.Ref<HTMLDivElement>;
    dragMonitorId: string | symbol;
    dragRef: react.Ref<HTMLSpanElement>;
    dropMonitorId: string | symbol;
    fieldData: FullField<string, string, string, Option<string>, Option<string>>;
    generateOnChangeHandler: (prop: Exclude<keyof RuleType, 'id' | 'path'>) => (value: any, _context?: any) => void;
    hideValueControls: boolean;
    inputType: InputType | null;
    operators: FullOperator<string>[] | OptionGroup<FullOperator<string>>[];
    outerClassName: string;
    removeRule: (_event?: any, _context?: any) => void;
    rule: RuleType<string, string, any, string>;
    shiftRuleUp: (event?: MouseEvent, _context?: any) => void;
    shiftRuleDown: (event?: MouseEvent, _context?: any) => void;
    toggleLockRule: (_event?: any, _context?: any) => void;
    validationResult: boolean | ValidationResult;
    valueEditorSeparator: react.ReactNode;
    valueEditorType: ValueEditorType;
    values: FlexibleOptionList<Option<string>>;
    valueSourceOptions: {
        name: "value" | "field";
        value: "value" | "field";
        label: "value" | "field";
    }[];
    valueSources: ValueSources;
    field?: string | undefined;
    operator?: string | undefined;
    value?: any;
    valueSource?: ValueSource | undefined;
    id?: string | undefined;
    path: Path;
    parentDisabled?: boolean | undefined;
    translations: Translations;
    schema: Schema<FullOption<string>, string>;
    actions: QueryActions;
    shiftUpDisabled?: boolean | undefined;
    shiftDownDisabled?: boolean | undefined;
    context?: any;
    combinator?: react.ReactNode;
    isDragging?: boolean | undefined;
    isOver?: boolean | undefined;
    dropEffect?: DropEffect | undefined;
};

/**
 * Prepares all values and methods used by the {@link RuleGroup} component.
 */
declare const useRuleGroup: (props: RuleGroupProps) => {
    addGroup: (_event?: any, context?: any) => void;
    addRule: (_event?: any, context?: any) => void;
    accessibleDescription: string;
    classNames: {
        header: string;
        shiftActions: string;
        dragHandle: string;
        combinators: string;
        notToggle: string;
        addRule: string;
        addGroup: string;
        cloneGroup: string;
        lockGroup: string;
        removeGroup: string;
        body: string;
    };
    cloneGroup: (_event?: any, _context?: any) => void;
    combinator: string;
    disabled: boolean;
    dragMonitorId: string | symbol;
    dragRef: react.Ref<HTMLSpanElement>;
    dropMonitorId: string | symbol;
    dropRef: react.Ref<HTMLDivElement>;
    isDragging: boolean;
    isOver: boolean;
    onCombinatorChange: (value: any, _context?: any) => void;
    onGroupAdd: (group: RuleGroupTypeAny, parentPath: Path, context?: any) => void;
    onIndependentCombinatorChange: (value: any, index: number, _context?: any) => void;
    onNotToggleChange: (checked: boolean, _context?: any) => void;
    outerClassName: string;
    parentDisabled: boolean | undefined;
    pathsMemo: {
        path: Path;
        disabled: boolean;
    }[];
    previewRef: react.Ref<HTMLDivElement>;
    removeGroup: (_event?: any, _context?: any) => void;
    ruleGroup: RuleGroupType<RuleType<string, string, any, string>, string> | {
        combinator?: string | undefined;
        rules: RuleGroupICArray<RuleGroupTypeIC<RuleType<string, string, any, string>, string>, RuleType<string, string, any, string>, string>;
        combinatorPreceding?: string | undefined;
        not?: boolean | undefined;
        path?: Path | undefined;
        id?: string | undefined;
        disabled?: boolean | undefined;
    };
    shiftGroupUp: (event?: MouseEvent, _context?: any) => void;
    shiftGroupDown: (event?: MouseEvent, _context?: any) => void;
    toggleLockGroup: (_event?: any, _context?: any) => void;
    validationClassName: string;
    validationResult: boolean | ValidationResult;
    rules?: RuleOrGroupArray | undefined;
    not?: boolean | undefined;
    id?: string | undefined;
    path: Path;
    translations: Translations;
    schema: Schema<FullOption<string>, string>;
    actions: QueryActions;
    shiftUpDisabled?: boolean | undefined;
    shiftDownDisabled?: boolean | undefined;
    context?: any;
    dropEffect?: DropEffect | undefined;
};

interface UseSelectElementChangeHandlerParams {
    onChange: (v: string | string[]) => void;
    multiple?: boolean;
}
/**
 * Returns a memoized change handler for HTML `<select>` elements.
 */
declare const useSelectElementChangeHandler: (params: UseSelectElementChangeHandlerParams) => (e: ChangeEvent<HTMLSelectElement>) => void;

interface RQBMouseEventHandler {
    (event?: MouseEvent, context?: any): void;
}
/**
 * Wraps an event handler function in another function that calls
 * `event.preventDefault()` and `event.stopPropagation()` first. The
 * returned function accepts and forwards a second `context` argument.
 */
declare const useStopEventPropagation: (method: RQBMouseEventHandler) => RQBMouseEventHandler;

type UseValueEditorParams = Pick<ValueEditorProps, 'handleOnChange' | 'inputType' | 'operator' | 'value' | 'listsAsArrays' | 'type' | 'values' | 'parseNumbers' | 'skipHook'>;
/**
 * This hook is primarily concerned with multi-value editors like date range
 * pickers, editors for 'in' and 'between' operators, etc.
 *
 * @returns The value as an array (`valueAsArray`) and a change handler for
 * series of editors (`multiValueHandler`).
 *
 * **NOTE:** The following logic only applies if `skipHook` is not `true`. To avoid
 * automatically updating the `value`, pass `{ skipHook: true }`.
 *
 * If the `value` is an array of non-zero length, the `operator` is _not_ one of
 * the known multi-value operators ("between", "notBetween", "in", "notIn"), and
 * the `type` is not "multiselect", then the `value` will be set to the first
 * element of the array (i.e., `value[0]`).
 *
 * The same thing will happen if `inputType` is "number" and `value` is a string
 * containing a comma, since `<input type="number">` doesn't handle commas.
 *
 * @example
 * // Consider the following rule:
 * `{ field: "f1", operator: "in", value: ["twelve","fourteen"] }`
 * // If `operator` changes to "=", the value will be reset to "twelve".
 *
 * @example
 * // Consider the following rule:
 * `{ field: "f1", operator: "between", value: "12,14" }`
 * // If `operator` changes to "=", the value will be reset to "12".
 */
declare const useValueEditor: (props: UseValueEditorParams) => {
    /**
     * Array of values for when the main value represents a list, e.g. when operator
     * is "between" or "in".
     */
    valueAsArray: any[];
    /**
     * An update handler for a series of value editors, e.g. when operator is "between".
     * Calling this function will update a single element of the value array and leave
     * the rest of the array as is.
     *
     * @param {string} val The new value for the editor
     * @param {number} idx The index of the editor (and the array element to update)
     */
    multiValueHandler: (v: any, i: number) => void;
};

type UseValueSelectorParams = Pick<ValueSelectorProps, 'handleOnChange' | 'listsAsArrays' | 'multiple' | 'value'>;
/**
 * Transforms a value into an array when appropriate and provides
 * a memoized change handler.
 */
declare const useValueSelector: (props: UseValueSelectorParams) => {
    /**
     * Memoized change handler for value selectors
     */
    onChange: (v: string | string[]) => void;
    /**
     * The value as provided or, if appropriate, as an array
     */
    val: string | any[] | undefined;
};

/**
 * Default component to display {@link RuleType} objects. This is
 * actually a small wrapper around {@link RuleComponents}.
 */
declare const Rule: react.MemoExoticComponent<(props: RuleProps) => react.JSX.Element>;
/**
 * Renders a `React.Fragment` containing an array of form controls for managing
 * a {@link RuleType}.
 */
declare const RuleComponents: react.MemoExoticComponent<(r: RuleProps & ReturnType<typeof useRule>) => react.JSX.Element>;

/**
 * Default component to display {@link RuleGroupType} and {@link RuleGroupTypeIC}
 * objects. This is actually a small wrapper around {@link RuleGroupHeaderComponents}
 * and {@link RuleGroupBodyComponents}.
 */
declare const RuleGroup: react.MemoExoticComponent<(props: RuleGroupProps) => react.JSX.Element>;
/**
 * Renders a `React.Fragment` containing an array of form controls for managing
 * a {@link RuleGroupType} or {@link RuleGroupTypeIC}.
 */
declare const RuleGroupHeaderComponents: react.MemoExoticComponent<(rg: RuleGroupProps & ReturnType<typeof useRuleGroup>) => react.JSX.Element>;
/**
 * Renders a `React.Fragment` containing an array of either (1) {@link Rule} and
 * {@link RuleGroup}, or (2) {@link Rule}, {@link RuleGroup}, and {@link InlineCombinator}.
 */
declare const RuleGroupBodyComponents: react.MemoExoticComponent<(rg: RuleGroupProps & ReturnType<typeof useRuleGroup>) => react.JSX.Element>;

/**
 * Default "shift up"/"shift down" buttons used by {@link QueryBuilder}.
 */
declare const ShiftActions: (props: ShiftActionsProps) => react.JSX.Element;

/**
 * Default `valueEditor` component used by {@link QueryBuilder}.
 */
declare const ValueEditor: <F extends FullField<string, string, string, Option<string>, Option<string>>>(allProps: ValueEditorProps<F>) => react.JSX.Element | null;

/**
 * Default `<select>` component used by {@link QueryBuilder}.
 */
declare const ValueSelector: <Opt extends FullOption<string> = FullOption<string>>(props: ValueSelectorProps<Opt>) => react.JSX.Element;

/**
 * Default components used by {@link QueryBuilder}.
 */
declare const defaultControlElements: {
    actionElement: (props: ActionProps) => react.JSX.Element;
    addGroupAction: (props: ActionProps) => react.JSX.Element;
    addRuleAction: (props: ActionProps) => react.JSX.Element;
    cloneGroupAction: (props: ActionProps) => react.JSX.Element;
    cloneRuleAction: (props: ActionProps) => react.JSX.Element;
    combinatorSelector: <Opt extends FullOption<string> = FullOption<string>>(props: ValueSelectorProps<Opt>) => react.JSX.Element;
    dragHandle: react.ForwardRefExoticComponent<DragHandleProps & react.RefAttributes<HTMLSpanElement>>;
    fieldSelector: <Opt extends FullOption<string> = FullOption<string>>(props: ValueSelectorProps<Opt>) => react.JSX.Element;
    inlineCombinator: (allProps: InlineCombinatorProps) => react.JSX.Element;
    lockGroupAction: (props: ActionProps) => react.JSX.Element;
    lockRuleAction: (props: ActionProps) => react.JSX.Element;
    notToggle: (props: NotToggleProps) => react.JSX.Element;
    operatorSelector: <Opt extends FullOption<string> = FullOption<string>>(props: ValueSelectorProps<Opt>) => react.JSX.Element;
    removeGroupAction: (props: ActionProps) => react.JSX.Element;
    removeRuleAction: (props: ActionProps) => react.JSX.Element;
    rule: react.MemoExoticComponent<(props: RuleProps<string, string>) => react.JSX.Element>;
    ruleGroup: react.MemoExoticComponent<(props: RuleGroupProps<FullOption<string>, string>) => react.JSX.Element>;
    shiftActions: (props: ShiftActionsProps) => react.JSX.Element;
    valueEditor: <F extends FullField<string, string, string, Option<string>, Option<string>>>(allProps: ValueEditorProps<F, string>) => react.JSX.Element | null;
    valueSelector: <Opt extends FullOption<string> = FullOption<string>>(props: ValueSelectorProps<Opt>) => react.JSX.Element;
    valueSourceSelector: <Opt extends FullOption<string> = FullOption<string>>(props: ValueSelectorProps<Opt>) => react.JSX.Element;
};

/**
 * Default `name` for placeholder option in the `fields` array.
 */
declare const defaultPlaceholderFieldName = "~";
/**
 * Default `label` for placeholder option in the `fields` array.
 */
declare const defaultPlaceholderFieldLabel = "------";
/**
 * Default `label` for placeholder option group in the `fields` array.
 */
declare const defaultPlaceholderFieldGroupLabel = "------";
/**
 * Default `name` for placeholder option in the `operators` array.
 */
declare const defaultPlaceholderOperatorName = "~";
/**
 * Default `label` for placeholder option in the `operators` array.
 */
declare const defaultPlaceholderOperatorLabel = "------";
/**
 * Default `label` for placeholder option group in the `operators` array.
 */
declare const defaultPlaceholderOperatorGroupLabel = "------";
/**
 * Default character used to `.join` and `.split` arrays.
 */
declare const defaultJoinChar = ",";
/**
 * Default configuration of translatable strings.
 */
declare const defaultTranslations: {
    fields: {
        readonly title: "Fields";
        readonly placeholderName: "~";
        readonly placeholderLabel: "------";
        readonly placeholderGroupLabel: "------";
    };
    operators: {
        readonly title: "Operators";
        readonly placeholderName: "~";
        readonly placeholderLabel: "------";
        readonly placeholderGroupLabel: "------";
    };
    value: {
        readonly title: "Value";
    };
    removeRule: {
        readonly label: "⨯";
        readonly title: "Remove rule";
    };
    removeGroup: {
        readonly label: "⨯";
        readonly title: "Remove group";
    };
    addRule: {
        readonly label: "+ Rule";
        readonly title: "Add rule";
    };
    addGroup: {
        readonly label: "+ Group";
        readonly title: "Add group";
    };
    combinators: {
        readonly title: "Combinators";
    };
    notToggle: {
        readonly label: "Not";
        readonly title: "Invert this group";
    };
    cloneRule: {
        readonly label: "⧉";
        readonly title: "Clone rule";
    };
    cloneRuleGroup: {
        readonly label: "⧉";
        readonly title: "Clone group";
    };
    shiftActionUp: {
        readonly label: "˄";
        readonly title: "Shift up";
    };
    shiftActionDown: {
        readonly label: "˅";
        readonly title: "Shift down";
    };
    dragHandle: {
        readonly label: "⁞⁞";
        readonly title: "Drag handle";
    };
    lockRule: {
        readonly label: "🔓";
        readonly title: "Lock rule";
    };
    lockGroup: {
        readonly label: "🔓";
        readonly title: "Lock group";
    };
    lockRuleDisabled: {
        readonly label: "🔒";
        readonly title: "Unlock rule";
    };
    lockGroupDisabled: {
        readonly label: "🔒";
        readonly title: "Unlock group";
    };
    valueSourceSelector: {
        readonly title: "Value source";
    };
};
/**
 * Default operator list.
 */
declare const defaultOperators: ({
    readonly name: "=";
    readonly value: "=";
    readonly label: "=";
} | {
    readonly name: "!=";
    readonly value: "!=";
    readonly label: "!=";
} | {
    readonly name: "<";
    readonly value: "<";
    readonly label: "<";
} | {
    readonly name: ">";
    readonly value: ">";
    readonly label: ">";
} | {
    readonly name: "<=";
    readonly value: "<=";
    readonly label: "<=";
} | {
    readonly name: ">=";
    readonly value: ">=";
    readonly label: ">=";
} | {
    readonly name: "contains";
    readonly value: "contains";
    readonly label: "contains";
} | {
    readonly name: "beginsWith";
    readonly value: "beginsWith";
    readonly label: "begins with";
} | {
    readonly name: "endsWith";
    readonly value: "endsWith";
    readonly label: "ends with";
} | {
    readonly name: "doesNotContain";
    readonly value: "doesNotContain";
    readonly label: "does not contain";
} | {
    readonly name: "doesNotBeginWith";
    readonly value: "doesNotBeginWith";
    readonly label: "does not begin with";
} | {
    readonly name: "doesNotEndWith";
    readonly value: "doesNotEndWith";
    readonly label: "does not end with";
} | {
    readonly name: "null";
    readonly value: "null";
    readonly label: "is null";
} | {
    readonly name: "notNull";
    readonly value: "notNull";
    readonly label: "is not null";
} | {
    readonly name: "in";
    readonly value: "in";
    readonly label: "in";
} | {
    readonly name: "notIn";
    readonly value: "notIn";
    readonly label: "not in";
} | {
    readonly name: "between";
    readonly value: "between";
    readonly label: "between";
} | {
    readonly name: "notBetween";
    readonly value: "notBetween";
    readonly label: "not between";
})[];
/**
 * Map of default operators to their respective opposite/negating operators.
 */
declare const defaultOperatorNegationMap: {
    '=': "!=";
    '!=': "=";
    '<': ">=";
    '<=': ">";
    '>': "<=";
    '>=': "<";
    beginsWith: "doesNotBeginWith";
    doesNotBeginWith: "beginsWith";
    endsWith: "doesNotEndWith";
    doesNotEndWith: "endsWith";
    contains: "doesNotContain";
    doesNotContain: "contains";
    between: "notBetween";
    notBetween: "between";
    in: "notIn";
    notIn: "in";
    notNull: "null";
    null: "notNull";
};
/**
 * Default combinator list.
 */
declare const defaultCombinators: ({
    readonly name: "and";
    readonly value: "and";
    readonly label: "AND";
} | {
    readonly name: "or";
    readonly value: "or";
    readonly label: "OR";
})[];
/**
 * Default combinator list, with `XOR` added.
 */
declare const defaultCombinatorsExtended: ({
    readonly name: "and";
    readonly value: "and";
    readonly label: "AND";
} | {
    readonly name: "or";
    readonly value: "or";
    readonly label: "OR";
} | {
    readonly name: "xor";
    readonly value: "xor";
    readonly label: "XOR";
})[];
/**
 * Standard classnames applied to each component.
 */
declare const standardClassnames: {
    readonly queryBuilder: "queryBuilder";
    readonly ruleGroup: "ruleGroup";
    readonly header: "ruleGroup-header";
    readonly body: "ruleGroup-body";
    readonly combinators: "ruleGroup-combinators";
    readonly addRule: "ruleGroup-addRule";
    readonly addGroup: "ruleGroup-addGroup";
    readonly cloneRule: "rule-cloneRule";
    readonly cloneGroup: "ruleGroup-cloneGroup";
    readonly removeGroup: "ruleGroup-remove";
    readonly notToggle: "ruleGroup-notToggle";
    readonly rule: "rule";
    readonly fields: "rule-fields";
    readonly operators: "rule-operators";
    readonly value: "rule-value";
    readonly removeRule: "rule-remove";
    readonly betweenRules: "betweenRules";
    readonly valid: "queryBuilder-valid";
    readonly invalid: "queryBuilder-invalid";
    readonly shiftActions: "shiftActions";
    readonly dndDragging: "dndDragging";
    readonly dndOver: "dndOver";
    readonly dndCopy: "dndCopy";
    readonly dragHandle: "queryBuilder-dragHandle";
    readonly disabled: "queryBuilder-disabled";
    readonly lockRule: "rule-lock";
    readonly lockGroup: "ruleGroup-lock";
    readonly valueSource: "rule-valueSource";
    readonly valueListItem: "rule-value-list-item";
    readonly branches: "queryBuilder-branches";
};
/**
 * Default classnames for each component.
 */
declare const defaultControlClassnames: {
    queryBuilder: string;
    ruleGroup: string;
    header: string;
    body: string;
    combinators: string;
    addRule: string;
    addGroup: string;
    cloneRule: string;
    cloneGroup: string;
    removeGroup: string;
    notToggle: string;
    rule: string;
    fields: string;
    operators: string;
    value: string;
    removeRule: string;
    shiftActions: string;
    dragHandle: string;
    lockRule: string;
    lockGroup: string;
    valueSource: string;
    actionElement: string;
    valueSelector: string;
};
/**
 * Default reason codes for a group being invalid.
 */
declare const groupInvalidReasons: {
    readonly empty: "empty";
    readonly invalidCombinator: "invalid combinator";
    readonly invalidIndependentCombinators: "invalid independent combinators";
};
/**
 * Component identifiers for testing.
 */
declare const TestID: {
    readonly rule: "rule";
    readonly ruleGroup: "rule-group";
    readonly inlineCombinator: "inline-combinator";
    readonly addGroup: "add-group";
    readonly removeGroup: "remove-group";
    readonly cloneGroup: "clone-group";
    readonly cloneRule: "clone-rule";
    readonly addRule: "add-rule";
    readonly removeRule: "remove-rule";
    readonly combinators: "combinators";
    readonly fields: "fields";
    readonly operators: "operators";
    readonly valueEditor: "value-editor";
    readonly notToggle: "not-toggle";
    readonly shiftActions: "shift-actions";
    readonly dragHandle: "drag-handle";
    readonly lockRule: "lock-rule";
    readonly lockGroup: "lock-group";
    readonly valueSourceSelector: "value-source-selector";
};
declare const LogType: {
    readonly parentPathDisabled: "action aborted: parent path disabled";
    readonly pathDisabled: "action aborted: path is disabled";
    readonly queryUpdate: "query updated";
    readonly onAddRuleFalse: "onAddRule callback returned false";
    readonly onAddGroupFalse: "onAddGroup callback returned false";
    readonly onRemoveFalse: "onRemove callback returned false";
    readonly add: "rule or group added";
    readonly remove: "rule or group removed";
    readonly update: "rule or group updated";
    readonly move: "rule or group moved";
};

declare const messages: {
    readonly errorInvalidIndependentCombinatorsProp: "QueryBuilder was rendered with a truthy independentCombinators prop. This prop is deprecated and unnecessary. Furthermore, the initial query/defaultQuery prop was of type RuleGroupType instead of type RuleGroupIC. More info: https://react-querybuilder.js.org/docs/components/querybuilder#independent-combinators";
    readonly errorUnnecessaryIndependentCombinatorsProp: "QueryBuilder was rendered with the deprecated and unnecessary independentCombinators prop. To use independent combinators, make sure the query/defaultQuery prop is of type RuleGroupIC when the component mounts. More info: https://react-querybuilder.js.org/docs/components/querybuilder#independent-combinators";
    readonly errorDeprecatedRuleGroupProps: "A custom RuleGroup component has rendered a standard RuleGroup component with deprecated props. The combinator, not, and rules props should not be used. Instead, the full group object should be passed as the ruleGroup prop.";
    readonly errorDeprecatedRuleProps: "A custom RuleGroup component has rendered a standard Rule component with deprecated props. The field, operator, value, and valueSource props should not be used. Instead, the full rule object should be passed as the rule prop.";
    readonly errorBothQueryDefaultQuery: "QueryBuilder was rendered with both query and defaultQuery props. QueryBuilder must be either controlled or uncontrolled (specify either the query prop, or the defaultQuery prop, but not both). Decide between using a controlled or uncontrolled query builder and remove one of these props. More info: https://reactjs.org/link/controlled-components";
    readonly errorUncontrolledToControlled: "QueryBuilder is changing from an uncontrolled component to be controlled. This is likely caused by the query changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled query builder for the lifetime of the component. More info: https://reactjs.org/link/controlled-components";
    readonly errorControlledToUncontrolled: "QueryBuilder is changing from a controlled component to be uncontrolled. This is likely caused by the query changing from defined to undefined, which should not happen. Decide between using a controlled or uncontrolled query builder for the lifetime of the component. More info: https://reactjs.org/link/controlled-components";
    readonly errorEnabledDndWithoutReactDnD: "QueryBuilder was rendered with the enableDragAndDrop prop set to true, but either react-dnd or react-dnd-html5-backend (or both) was not installed. To enable drag-and-drop functionality, install both packages and wrap QueryBuilder in QueryBuilderDnD from @react-querybuilder/dnd.";
};

type QueriesSliceState = Record<string, RuleGroupTypeAny>;

type ValuesAsKeys<T> = T extends Record<infer _K, infer V> ? [V] extends [string] ? {
    [Key in V]: boolean;
} : never : never;
type WarningsSliceState = ValuesAsKeys<typeof messages>;

type RqbState = {
    queries: QueriesSliceState;
    warnings: WarningsSliceState;
};
declare const queryBuilderStore: _reduxjs_toolkit.EnhancedStore<{
    queries: QueriesSliceState;
    warnings: {
        "QueryBuilder was rendered with a truthy independentCombinators prop. This prop is deprecated and unnecessary. Furthermore, the initial query/defaultQuery prop was of type RuleGroupType instead of type RuleGroupIC. More info: https://react-querybuilder.js.org/docs/components/querybuilder#independent-combinators": boolean;
        "QueryBuilder was rendered with the deprecated and unnecessary independentCombinators prop. To use independent combinators, make sure the query/defaultQuery prop is of type RuleGroupIC when the component mounts. More info: https://react-querybuilder.js.org/docs/components/querybuilder#independent-combinators": boolean;
        "A custom RuleGroup component has rendered a standard RuleGroup component with deprecated props. The combinator, not, and rules props should not be used. Instead, the full group object should be passed as the ruleGroup prop.": boolean;
        "A custom RuleGroup component has rendered a standard Rule component with deprecated props. The field, operator, value, and valueSource props should not be used. Instead, the full rule object should be passed as the rule prop.": boolean;
        "QueryBuilder was rendered with both query and defaultQuery props. QueryBuilder must be either controlled or uncontrolled (specify either the query prop, or the defaultQuery prop, but not both). Decide between using a controlled or uncontrolled query builder and remove one of these props. More info: https://reactjs.org/link/controlled-components": boolean;
        "QueryBuilder is changing from an uncontrolled component to be controlled. This is likely caused by the query changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled query builder for the lifetime of the component. More info: https://reactjs.org/link/controlled-components": boolean;
        "QueryBuilder is changing from a controlled component to be uncontrolled. This is likely caused by the query changing from defined to undefined, which should not happen. Decide between using a controlled or uncontrolled query builder for the lifetime of the component. More info: https://reactjs.org/link/controlled-components": boolean;
        "QueryBuilder was rendered with the enableDragAndDrop prop set to true, but either react-dnd or react-dnd-html5-backend (or both) was not installed. To enable drag-and-drop functionality, install both packages and wrap QueryBuilder in QueryBuilderDnD from @react-querybuilder/dnd.": boolean;
    };
}, UnknownAction, _reduxjs_toolkit.Tuple<[redux.StoreEnhancer<{
    dispatch: redux_thunk.ThunkDispatch<{
        queries: QueriesSliceState;
        warnings: {
            "QueryBuilder was rendered with a truthy independentCombinators prop. This prop is deprecated and unnecessary. Furthermore, the initial query/defaultQuery prop was of type RuleGroupType instead of type RuleGroupIC. More info: https://react-querybuilder.js.org/docs/components/querybuilder#independent-combinators": boolean;
            "QueryBuilder was rendered with the deprecated and unnecessary independentCombinators prop. To use independent combinators, make sure the query/defaultQuery prop is of type RuleGroupIC when the component mounts. More info: https://react-querybuilder.js.org/docs/components/querybuilder#independent-combinators": boolean;
            "A custom RuleGroup component has rendered a standard RuleGroup component with deprecated props. The combinator, not, and rules props should not be used. Instead, the full group object should be passed as the ruleGroup prop.": boolean;
            "A custom RuleGroup component has rendered a standard Rule component with deprecated props. The field, operator, value, and valueSource props should not be used. Instead, the full rule object should be passed as the rule prop.": boolean;
            "QueryBuilder was rendered with both query and defaultQuery props. QueryBuilder must be either controlled or uncontrolled (specify either the query prop, or the defaultQuery prop, but not both). Decide between using a controlled or uncontrolled query builder and remove one of these props. More info: https://reactjs.org/link/controlled-components": boolean;
            "QueryBuilder is changing from an uncontrolled component to be controlled. This is likely caused by the query changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled query builder for the lifetime of the component. More info: https://reactjs.org/link/controlled-components": boolean;
            "QueryBuilder is changing from a controlled component to be uncontrolled. This is likely caused by the query changing from defined to undefined, which should not happen. Decide between using a controlled or uncontrolled query builder for the lifetime of the component. More info: https://reactjs.org/link/controlled-components": boolean;
            "QueryBuilder was rendered with the enableDragAndDrop prop set to true, but either react-dnd or react-dnd-html5-backend (or both) was not installed. To enable drag-and-drop functionality, install both packages and wrap QueryBuilder in QueryBuilderDnD from @react-querybuilder/dnd.": boolean;
        };
    }, undefined, UnknownAction>;
}>, redux.StoreEnhancer]>>;
declare const QueryBuilderStateContext: react.Context<ReactReduxContextValue<RqbState, UnknownAction> | null>;
/**
 * A `useSelector` hook for the RQB Redux store.
 */
declare const useQueryBuilderSelector: TypedUseSelectorHook<RqbState>;
/**
 * Given a `qbId` (provided as part of the `schema` prop), returns
 * a selector for use with `useQueryBuilderSelector`.
 */
declare const getQuerySelectorById: (qbId: string) => (state: RqbState) => RuleGroupTypeAny;

/**
 * Splits a string by a given character (see {@link defaultJoinChar}. Escaped characters
 * (characters preceded by a backslash) will not apply to the split, and the backslash will
 * be removed in the array element. Inverse of {@link joinWith}.
 *
 * @example
 * splitBy('this\\,\\,that,,the other,,,\\,')
 * // or
 * splitBy('this\\,\\,that,,the other,,,\\,', ',')
 * // would return
 * ['this,,that', '', 'the other', '', '', ',']
 */
declare const splitBy: (str?: string, splitChar?: string) => string[];
/**
 * Joins an array of strings using the given character (see {@link defaultJoinChar}. When
 * the given character appears in an array element, a backslash will be added just before it
 * to distinguish it from the join character. Inverse of {@link splitBy}.
 *
 * @example
 * joinWith(['this,,that', '', 'the other', '', '', ','])
 * // would return
 * 'this\\,\\,that,,the other,,,\\,'
 */
declare const joinWith: (strArr: any[], joinChar?: string) => string;
/**
 * Trims the value if it is a string. Otherwise returns the value as is.
 */
declare const trimIfString: (val: any) => any;
/**
 * Splits a string by comma then trims each element. Arrays are returned as is except
 * any string elements are trimmed.
 */
declare const toArray: (v: any) => any[];
/**
 * Determines if an array is free of `null`/`undefined`.
 */
declare const nullFreeArray: <T>(arr: T[]) => arr is Exclude<T, null>[];

/**
 * Converts a {@link RuleGroupTypeIC} to {@link RuleGroupType}.
 *
 * This function is idempotent: {@link RuleGroupType} queries will be
 * returned as-is.
 */
declare const convertFromIC: <RG extends RuleGroupType<RuleType<string, string, any, string>, string> = RuleGroupType<RuleType<string, string, any, string>, string>>(rg: RuleGroupTypeIC) => RG;
/**
 * Converts a {@link RuleGroupType} to {@link RuleGroupTypeIC}.
 *
 * This function is idempotent: {@link RuleGroupTypeIC} queries will be
 * returned as-is.
 */
declare const convertToIC: <RGIC extends RuleGroupTypeIC<RuleType<string, string, any, string>, string> = RuleGroupTypeIC<RuleType<string, string, any, string>, string>>(rg: RuleGroupType) => RGIC;
/**
 * Converts a {@link RuleGroupType} to {@link RuleGroupTypeIC}. For a more explicit
 * operation, use {@link convertToIC}.
 */
declare function convertQuery(query: RuleGroupType): RuleGroupTypeIC;
/**
 * Converts a {@link RuleGroupTypeIC} to {@link RuleGroupType}. For a more explicit
 * operation, use {@link convertFromIC}.
 */
declare function convertQuery(query: RuleGroupTypeIC): RuleGroupType;

/**
 * This is an example validation function you can pass to {@link QueryBuilder} in the
 * `validator` prop. It assumes that you want to validate groups, and has a no-op
 * for validating rules which you can replace with your own implementation.
 */
declare const defaultValidator: QueryValidator;

/**
 * For a given {@link FullField}, returns the `fields` list filtered for
 * other fields that match by `comparator`. Only fields *other than the
 * one in question* will ever be included, even if `comparator` is `null`
 * or `undefined`. If `comparator` is a string, fields with the same value
 * for that property will be included. If `comparator` is a function, each
 * field will be passed to the function along with the `operator` and fields
 * for which the function returns `true` will be included.
 */
declare const filterFieldsByComparator: (field: FullField, fields: OptionList<FullField>, operator: string) => FullField<string, string, string, Option<string>, Option<string>>[] | {
    options: WithUnknownIndex<FullField<string, string, string, Option<string>, Option<string>>>[];
    label: string;
}[];

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

declare const generateAccessibleDescription: AccessibleDescriptionGenerator;

/**
 * Default `id` generator. Generates a valid v4 UUID. Uses `crypto.randomUUID()`
 * when available, otherwise uses an alternate method based on `getRandomValues`.
 * The returned string is guaranteed to match this regex:
 * ```
 * /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
 * ```
 * @returns Valid v4 UUID
 */
declare let generateID: () => string;

type GetCompatContextProviderProps = Pick<QueryBuilderContextProps<FullField, string>, 'controlClassnames' | 'controlElements' | 'translations'> & {
    key: string;
};
/**
 * Generates a context provider for a compatibility package.
 */
declare const getCompatContextProvider: (gccpProps: GetCompatContextProviderProps) => QueryBuilderContextProvider;

/**
 * Gets the standard classname for valid or invalid components
 * based on the given validation result.
 */
declare const getValidationClassNames: (validationResult: boolean | ValidationResult) => "" | "queryBuilder-valid" | "queryBuilder-invalid";

/**
 * Utility function to get the value sources array for the given
 * field and operator. If the field definition does not define a
 * `valueSources` property, the `getValueSources` prop is used.
 * Returns `["value"]` by default.
 */
declare const getValueSourcesUtil: <F extends FullField<string, string, string, Option<string>, Option<string>>, O extends string>(fieldData: F, operator: string, getValueSources?: (field: GetOptionIdentifierType<F>, operator: O, misc: {
    fieldData: F;
}) => ValueSources) => ValueSources;

/**
 * Determines if an object is a {@link RuleGroupType} or {@link RuleGroupTypeIC}.
 */
declare const isRuleGroup: (rg: any) => rg is RuleGroupTypeAny;
/**
 * Determines if an object is a {@link RuleGroupType}.
 */
declare const isRuleGroupType: (rg: any) => rg is RuleGroupType<RuleType<string, string, any, string>, string>;
/**
 * Determines if an object is a {@link RuleGroupTypeIC}.
 */
declare const isRuleGroupTypeIC: (rg: any) => rg is RuleGroupTypeIC<RuleType<string, string, any, string>, string>;

/**
 * Determines if an object is useful as a validation result.
 */
declare const isValidationResult: (vr?: ValidationResult) => vr is ValidationResult;
/**
 * Determines if a rule or group is valid based on a validation result (if defined)
 * or a validator function. Returns `true` if neither are defined.
 */
declare const isRuleOrGroupValid: (rg: RuleType | RuleGroupTypeAny, validationResult?: boolean | ValidationResult, validator?: RuleValidator) => boolean;

/**
 * Merges a list of partial {@link Classnames} definitions into a single definition.
 */
declare const mergeClassnames: (...args: (Partial<Classnames> | undefined)[]) => Classnames;

/**
 * Merges any number of partial {@link Translations} into a single definition.
 */
declare const mergeTranslations: (...args: (Partial<Translations> | undefined)[]) => Partial<Translations>;

/**
 * Regex matching numeric strings. Passes for positive/negative integers, decimals,
 * and E notation, with optional surrounding whitespace.
 */
declare const numericRegex: RegExp;
/**
 * Determines if a variable is a plain old JavaScript object, aka POJO.
 */
declare const isPojo: (obj: any) => obj is Record<string, any>;

/**
 * Original looked like this (not sure why template string is used):
 * ```
 * type ObjectKeys<T extends object> = `${Exclude<keyof T, symbol>}`;
 * ```
 */
type ObjectKeys<T extends object> = Exclude<keyof T, symbol>;
/**
 * A strongly-typed version of `Object.keys()`.
 *
 * [Original source](https://github.com/sindresorhus/ts-extras/blob/44f57392c5f027268330771996c4fdf9260b22d6/source/object-keys.ts)
 */
declare const objectKeys: <Type extends object>(value: Type) => Array<ObjectKeys<Type>>;
/**
 * A strongly-typed version of `Object.entries()`.
 *
 * [Original source](https://github.com/sindresorhus/ts-extras/blob/44f57392c5f027268330771996c4fdf9260b22d6/source/object-entries.ts)
 */
declare const objectEntries: <Type extends Record<PropertyKey, unknown>>(value: Type) => Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]>;

/**
 * Determines if an {@link OptionList} is an {@link OptionGroup} array.
 */
declare const isOptionGroupArray: (arr: any) => arr is OptionGroup<BaseOption<string>>[];
/**
 * Determines if a {@link FlexibleOptionList} is a {@link FlexibleOptionGroup} array.
 */
declare const isFlexibleOptionGroupArray: (arr: any) => arr is FlexibleOptionGroup[];
/**
 * Determines if a {@link FlexibleOptionList} is a {@link OptionGroup} array of
 * {@link FullOption}.
 */
declare const isFullOptionGroupArray: (arr: any) => arr is OptionGroup<FullOption<string>>[];
/**
 * Gets the option from an {@link OptionList} with the given `name`. Handles
 * {@link Option} arrays as well as {@link OptionGroup} arrays.
 */
declare const getOption: <OptType extends Option<string> = Option<string>>(arr: OptionList<OptType>, name: string) => OptType | undefined;
/**
 * Gets the first option from an {@link OptionList}.
 */
declare const getFirstOption: <Opt extends BaseOption<string>>(arr?: FlexibleOptionGroup<Opt>[] | Opt[]) => GetOptionIdentifierType<Opt>;
/**
 * Flattens {@link FlexibleOptionGroup} arrays into {@link BaseOption} arrays.
 * If the array is already flat, it is returned as is.
 */
declare const toFlatOptionArray: <T extends FullOption<string>, OL extends FullOptionList<T>>(arr: OL) => T[];

/**
 * Options object for {@link parseNumber}.
 */
interface ParseNumberOptions {
    parseNumbers?: ParseNumbersMethod;
}
/**
 * Converts a string to a number. Uses native `parseFloat` if `parseNumbers` is "native",
 * otherwise uses [`numeric-quantity`](https://jakeboone02.github.io/numeric-quantity/).
 * If that returns `NaN`, the string is returned unchanged. Numeric values are returned
 * as-is regardless of the `parseNumbers` option.
 */
declare const parseNumber: (v: any, pno?: ParseNumberOptions) => any;

/**
 * Return type for {@link findPath}.
 */
type FindPathReturnType = RuleGroupTypeAny | RuleType | null;
/**
 * Returns the {@link RuleType} or {@link RuleGroupType}/{@link RuleGroupTypeIC}
 * at the given path within a query.
 */
declare const findPath: (path: Path, query: RuleGroupTypeAny) => FindPathReturnType;
/**
 * Truncates the last element of an array and returns the result as a new array.
 */
declare const getParentPath: (path: Path) => number[];
/**
 * Determines if two paths (each `Path`) are equivalent.
 */
declare const pathsAreEqual: (path1: Path, path2: Path) => boolean;
/**
 * Determines if the first path is an ancestor of the second path. The first path must
 * be shorter and exactly match the second path up through the length of the first path.
 */
declare const isAncestor: (maybeAncestor: Path, path: Path) => boolean;
/**
 * Finds the deepest/longest path that two paths have in common.
 */
declare const getCommonAncestorPath: (path1: Path, path2: Path) => Path;
/**
 * Determines if the rule or group at the specified path is either disabled itself
 * or disabled by an ancestor group.
 */
declare const pathIsDisabled: (path: Path, query: RuleGroupTypeAny) => boolean;

/**
 * Options for {@link prepareRule}/{@link prepareRuleGroup}.
 */
interface PreparerOptions {
    idGenerator?: () => string;
}
/**
 * Ensures that a rule is valid by adding an `id` property if it does not already exist.
 */
declare const prepareRule: (rule: RuleType, { idGenerator }?: PreparerOptions) => RuleType<string, string, any, string>;
/**
 * Ensures that a rule group is valid by recursively adding an `id` property to the group itself
 * and all its rules and subgroups where one does not already exist.
 */
declare const prepareRuleGroup: <RG extends RuleGroupTypeAny>(queryObject: RG, { idGenerator }?: PreparerOptions) => RG;
/**
 * Ensures that a rule or group is valid. See {@link prepareRule} and {@link prepareRuleGroup}.
 */
declare const prepareRuleOrGroup: <RG extends RuleGroupTypeAny>(rg: RG | RuleType, { idGenerator }?: PreparerOptions) => RuleType<string, string, any, string> | (RG & RuleGroupType<RuleType<string, string, any, string>, string>) | (RG & RuleGroupTypeIC<RuleType<string, string, any, string>, string>);

/**
 * Options object for {@link add}.
 */
interface AddOptions {
    /**
     * If the query extends `RuleGroupTypeIC` (i.e. the query has independent
     * combinators), then the first combinator in this list will be  inserted
     * before the new rule/group if the parent group is not empty. This option
     * is overridden by `combinatorPreceding`.
     */
    combinators?: OptionList;
    /**
     * If the query extends `RuleGroupTypeIC` (i.e. the query has independent
     * combinators), then this combinator will be inserted before  the new rule/group
     * if the parent group is not empty. This option will supersede `combinators`.
     */
    combinatorPreceding?: string;
    /**
     * ID generator.
     */
    idGenerator?: () => string;
}
/**
 * Adds a rule or group to a query.
 * @returns The new query with the rule or group added.
 */
declare const add: <RG extends RuleGroupTypeAny>(query: RG, ruleOrGroup: RG | RuleType, parentPath: Path, { combinators, combinatorPreceding, idGenerator, }?: AddOptions) => RG;
/**
 * Options object for {@link update}.
 */
interface UpdateOptions {
    /**
     * When updating the `field` of a rule, the rule's `operator`, `value`, and `valueSource`
     * will be reset to their respective defaults. Defaults to `true`.
     */
    resetOnFieldChange?: boolean;
    /**
     * When updating the `operator` of a rule, the rule's `value` and `valueSource`
     * will be reset to their respective defaults. Defaults to `false`.
     */
    resetOnOperatorChange?: boolean;
    /**
     * Determines the default operator name for a given field.
     */
    getRuleDefaultOperator?: (field: string) => string;
    /**
     * Determines the valid value sources for a given field and operator.
     */
    getValueSources?: (field: string, operator: string) => ValueSources;
    /**
     * Gets the default value for a given rule, in case the value needs to be reset.
     */
    getRuleDefaultValue?: (rule: RuleType) => any;
}
/**
 * Updates a property of a rule or group within a query.
 * @returns The new query with the rule or group property updated.
 */
declare const update: <RG extends RuleGroupTypeAny>(query: RG, prop: UpdateableProperties, value: any, path: Path, { resetOnFieldChange, resetOnOperatorChange, getRuleDefaultOperator, getValueSources, getRuleDefaultValue, }?: UpdateOptions) => RG;
/**
 * Removes a rule or group from a query.
 * @returns The new query with the rule or group removed.
 */
declare const remove: <RG extends RuleGroupTypeAny>(query: RG, path: Path) => RG;
/**
 * Options object for {@link move}.
 */
interface MoveOptions {
    /**
     * When `true`, the source rule/group will not be removed from its original path.
     */
    clone?: boolean;
    /**
     * If the query extends `RuleGroupTypeIC` (i.e. the query is using independent
     * combinators), then the first combinator in this list will be inserted before
     * the rule/group if necessary.
     */
    combinators?: OptionList;
    /**
     * ID generator.
     */
    idGenerator?: () => string;
}
/**
 * Moves a rule or group from one path to another. In the options parameter, pass
 * `{ clone: true }` to copy instead of move.
 * @returns The new query with the rule or group moved or cloned.
 */
declare const move: <RG extends RuleGroupTypeAny>(query: RG, oldPath: Path, newPath: Path | 'up' | 'down', { clone, combinators, idGenerator }?: MoveOptions) => RG;

/**
 * Options object for {@link regenerateID}/{@link regenerateIDs}.
 */
interface RegenerateIdOptions {
    idGenerator?: () => string;
}
/**
 * Generates a new `id` property for a rule.
 */
declare const regenerateID: (rule: RuleType, { idGenerator }?: RegenerateIdOptions) => RuleType;
/**
 * Recursively generates new `id` properties for a group and all its rules and subgroups.
 */
declare const regenerateIDs: (ruleOrGroup: RuleGroupType | RuleGroupTypeIC, { idGenerator }?: RegenerateIdOptions) => RuleGroupType | RuleGroupTypeIC;

/**
 * Converts an {@link Option} or {@link ValueOption} (i.e., {@link BaseOption})
 * into a {@link FullOption}. Full options are left unchanged.
 */
declare function toFullOption<Opt extends BaseOption>(opt: Opt, baseProperties?: Record<string, unknown>): ToFullOption<Opt>;
/**
 * Converts an {@link OptionList} or {@link FlexibleOptionList} into a {@link FullOptionList}.
 * Lists of full options are left unchanged.
 */
declare function toFullOptionList<Opt extends BaseOption, OptList extends FlexibleOptionList<Opt>>(optList: OptList, baseProperties?: Record<string, unknown>): FullOptionList<Opt>;
/**
 * Converts a {@link FlexibleOptionList} into a {@link FullOptionList}.
 * Lists of full options are left unchanged.
 */
declare function toFullOptionMap<OptMap extends BaseOptionMap>(optMap: OptMap, baseProperties?: Record<string, unknown>): OptMap extends BaseOptionMap<infer V, infer K> ? Partial<Record<K, ToFullOption<V>>> : never;

/**
 * Generates an array of `<option>` or `<optgroup>` elements
 * from a given {@link OptionList}.
 */
declare const toOptions: (arr?: OptionList) => react.JSX.Element[] | null;

/**
 * Options object for {@link transformQuery}.
 */
interface TransformQueryOptions<RG extends RuleGroupTypeAny = RuleGroupType> {
    /**
     * When a rule is encountered in the hierarchy, it will be replaced
     * with the result of this function.
     *
     * @defaultValue `r => r`
     */
    ruleProcessor?: (rule: RuleType) => any;
    /**
     * When a group is encountered in the hierarchy (including the root group, the
     * query itself), it will be replaced with the result of this function.
     *
     * @defaultValue `rg => rg`
     */
    ruleGroupProcessor?: (ruleGroup: RG) => Record<string, any>;
    /**
     * For each rule and group in the query, any properties matching a key
     * in this object will be renamed to the corresponding value. To retain both
     * the new _and_ the original properties, set `deleteRemappedProperties`
     * to `false`.
     *
     * If a key has a value of `false`, the corresponding property will be removed
     * without being copied to a new property name. (Warning: `{ rules: false }`
     * will prevent recursion and only return the processed root group.)
     *
     * @defaultValue `{}`
     *
     * @example
     * ```
     *   transformQuery(
     *     { combinator: 'and', not: true, rules: [] },
     *     { propertyMap: { combinator: 'AndOr', not: false } }
     *   )
     *   // Returns: { AndOr: 'and', rules: [] }
     * ```
     */
    propertyMap?: Record<string, string | false>;
    /**
     * Any combinator values (including independent combinators) will be translated
     * from the key in this object to the value.
     *
     * @defaultValue `{}`
     *
     * @example
     * ```
     *   transformQuery(
     *     { combinator: 'and', rules: [] },
     *     { combinatorMap: { and: '&&', or: '||' } }
     *   )
     *   // Returns: { combinator: '&&', rules: [] }
     * ```
     */
    combinatorMap?: Record<string, string>;
    /**
     * Any operator values will be translated from the key in this object to the value.
     *
     * @defaultValue `{}`
     *
     * @example
     * ```
     *   transformQuery(
     *     { combinator: 'and', rules: [{ field: 'name', operator: '=', value: 'Steve Vai' }] },
     *     { operatorMap: { '=': 'is' } }
     *   )
     *   // Returns:
     *   // {
     *   //   combinator: 'and',
     *   //   rules: [{ field: 'name', operator: 'is', value: 'Steve Vai' }]
     *   // }
     * ```
     */
    operatorMap?: Record<string, string>;
    /**
     * Prevents the `path` property (see {@link Path}) from being added to each
     * rule and group in the hierarchy.
     *
     * @defaultValue `false`
     */
    omitPath?: boolean;
    /**
     * Original properties remapped according to the `propertyMap` option will be removed.
     *
     * @defaultValue `true`
     *
     * @example
     * ```
     *   transformQuery(
     *     { combinator: 'and', rules: [] },
     *     { propertyMap: { combinator: 'AndOr' }, deleteRemappedProperties: false }
     *   )
     *   // Returns: { combinator: 'and', AndOr: 'and', rules: [] }
     * ```
     */
    deleteRemappedProperties?: boolean;
}
/**
 * Recursively process a query heirarchy using this versatile utility function.
 *
 * [Documentation](https://react-querybuilder.js.org/docs/utils/misc#transformquery)
 */
declare function transformQuery(query: RuleGroupType, options?: TransformQueryOptions<RuleGroupType>): any;
/**
 * Recursively process a query heirarchy with independent combinators using this
 * versatile utility function.
 *
 * [Documentation](https://react-querybuilder.js.org/docs/utils/misc#transformquery)
 */
declare function transformQuery(query: RuleGroupTypeIC, options?: TransformQueryOptions<RuleGroupTypeIC>): any;

/**
 * @deprecated Renamed to {@link uniqByIdentifier}.
 */
declare const uniqByName: <T extends {
    name: string;
    value?: string | undefined;
} | {
    name?: string | undefined;
    value: string;
}>(originalArray: T[]) => T[];
/**
 * Generates a new array of objects with duplicates removed based
 * on the identifying property (`value` or `name`)
 */
declare const uniqByIdentifier: <T extends RequireAtLeastOne<{
    name: string;
    value: string;
}, "name" | "value">>(originalArray: T[]) => T[];
/**
 * Generates a new {@link OptionGroup} array with duplicates
 * removed based on the identifying property (`value` or `name`).
 */
declare const uniqOptGroups: <T extends BaseOption<string>>(originalArray: FlexibleOptionGroup<T>[]) => OptionGroup<ToFullOption<T>>[];
/**
 * Generates a new {@link Option} or {@link OptionGroup} array with duplicates
 * removed based on the identifier property (`value` or `name`).
 */
declare const uniqOptList: <T extends BaseOption<string>>(originalArray: FlexibleOptionList<T>) => OptionGroup<ToFullOption<T>>[] | WithUnknownIndex<BaseOption<string> & FullOption<string>>[];

export { type AccessibleDescriptionGenerator, ActionElement, type ActionProps, type ActionWithRulesAndAddersProps, type ActionWithRulesProps, type AddOptions, type Arity, type BaseFullOption, type BaseOption, type BaseOptionMap, type Classname, type Classnames, type Combinator, type CombinatorByValue, type CombinatorSelectorProps, type CommonRuleAndGroupProperties, type CommonRuleSubComponentProps, type CommonSubComponentProps, type ControlElementsProp, type Controls, type DefaultCombinator, type DefaultCombinatorExtended, type DefaultCombinatorName, type DefaultCombinatorNameExtended, type DefaultOperator, type DefaultOperatorName, type DefaultRuleGroupArray, type DefaultRuleGroupICArray, type DefaultRuleGroupType, type DefaultRuleGroupTypeAny, type DefaultRuleGroupTypeIC, type DefaultRuleOrGroupArray, type DefaultRuleType, type DndDropTargetType, type DragCollection, DragHandle, type DragHandleProps, type DraggedItem, type DropCollection, type DropEffect, type DropResult, type ExportFormat, type Field, type FieldByValue, type FieldSelectorProps, type FindPathReturnType, type FlexibleOption, type FlexibleOptionGroup, type FlexibleOptionList, type FormatQueryOptions, type FullCombinator, type FullField, type FullOperator, type FullOption, type FullOptionList, type FullOptionMap, type FullOptionRecord, type GetCompatContextProviderProps, type GetOptionIdentifierType, type GetOptionType, type GetRuleGroupType, type GetRuleTypeFromGroupWithFieldAndOperator, InlineCombinator, type InlineCombinatorProps, type InputType, LogType, type MoveOptions, type NameLabelPair, NotToggle, type NotToggleProps, type Operator, type OperatorByValue, type OperatorSelectorProps, type Option, type OptionGroup, type OptionList, type ParameterizedNamedSQL, type ParameterizedSQL, type ParseCELOptions, type ParseJSONataOptions, type ParseJsonLogicOptions, type ParseMongoDbOptions, type ParseNumberOptions, type ParseNumbersMethod, type ParseSQLOptions, type ParseSpELOptions, type Path, type PreparerOptions, type QueryActions, QueryBuilder, QueryBuilderContext, type QueryBuilderContextProps, type QueryBuilderContextProvider, type QueryBuilderContextProviderProps, type QueryBuilderProps, QueryBuilderStateContext, QueryBuilderStateProvider, type QueryValidator, type RQBJsonLogic, type RQBJsonLogicEndsWith, type RQBJsonLogicStartsWith, type RQBJsonLogicVar, type RegenerateIdOptions, type RqbState, Rule, RuleComponents, RuleGroup, type RuleGroupArray, RuleGroupBodyComponents, RuleGroupHeaderComponents, type RuleGroupICArray, type RuleGroupProps, type RuleGroupType, type RuleGroupTypeAny, type RuleGroupTypeIC, type RuleOrGroupArray, type RuleProcessor, type RuleProps, type RuleType, type RuleValidator, type Schema, type SelectorOrEditorProps, ShiftActions, type ShiftActionsProps, TestID, type ToFlexibleOption, type ToFullOption, type TransformQueryOptions, type Translation, type TranslationWithLabel, type TranslationWithPlaceholders, type Translations, type TranslationsFull, type UpdateOptions, type UpdateableProperties, type UseControlledOrUncontrolledParams, type UseMergedContextProps, type UseRuleDnD, type UseRuleGroupDnD, type UseSelectElementChangeHandlerParams, type UseValueEditorParams, type UseValueSelectorParams, type ValidationMap, type ValidationResult, ValueEditor, type ValueEditorProps, type ValueEditorType, type ValueOption, type ValueProcessor, type ValueProcessorByRule, type ValueProcessorLegacy, type ValueProcessorOptions, ValueSelector, type ValueSelectorProps, type ValueSource, type ValueSourceSelectorProps, type ValueSources, type VersatileSelectorProps, type WithRequired, type WithUnknownIndex, add, convertFromIC, convertQuery, convertToIC, QueryBuilder as default, defaultCELValueProcessor, defaultCombinators, defaultCombinatorsExtended, defaultControlClassnames, defaultControlElements, defaultJoinChar, defaultMongoDBValueProcessor, defaultOperatorNegationMap, defaultOperators, defaultPlaceholderFieldGroupLabel, defaultPlaceholderFieldLabel, defaultPlaceholderFieldName, defaultPlaceholderOperatorGroupLabel, defaultPlaceholderOperatorLabel, defaultPlaceholderOperatorName, defaultRuleProcessorCEL, defaultRuleProcessorElasticSearch, defaultRuleProcessorJSONata, defaultRuleProcessorJsonLogic, defaultRuleProcessorMongoDB, defaultRuleProcessorParameterized, defaultRuleProcessorSQL, defaultRuleProcessorSpEL, defaultSpELValueProcessor, defaultTranslations, defaultValidator, defaultValueProcessor, defaultValueProcessorByRule, defaultValueProcessorCELByRule, defaultValueProcessorMongoDBByRule, defaultValueProcessorSpELByRule, filterFieldsByComparator, findPath, formatQuery, generateAccessibleDescription, generateID, getCommonAncestorPath, getCompatContextProvider, getFirstOption, getOption, getParentPath, getQuerySelectorById, getValidationClassNames, getValueSourcesUtil, groupInvalidReasons, isAncestor, isFlexibleOptionGroupArray, isFullOptionGroupArray, isOptionGroupArray, isPojo, isRuleGroup, isRuleGroupType, isRuleGroupTypeIC, isRuleOrGroupValid, isValidationResult, joinWith, jsonLogicAdditionalOperators, mergeClassnames, mergeTranslations, messages, move, nullFreeArray, numericRegex, objectEntries, objectKeys, parseNumber, pathIsDisabled, pathsAreEqual, prepareRule, prepareRuleGroup, prepareRuleOrGroup, queryBuilderStore, regenerateID, regenerateIDs, remove, rootPath, splitBy, standardClassnames, toArray, toFlatOptionArray, toFullOption, toFullOptionList, toFullOptionMap, toOptions, transformQuery, trimIfString, uniqByIdentifier, uniqByName, uniqOptGroups, uniqOptList, update, useControlledOrUncontrolled, useDeprecatedProps, useMergedContext, usePreferAnyProp, usePreferProp, usePrevious, useQueryBuilderSchema, useQueryBuilderSelector, useQueryBuilderSetup, useReactDndWarning, useRule, useRuleGroup, useSelectElementChangeHandler, useStopEventPropagation, useValueEditor, useValueSelector };
