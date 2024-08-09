import { SetOptional, RequireAtLeastOne, SetRequired, Except } from 'type-fest';

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
 * The type of the `rules` array in a {@link DefaultRuleGroupTypeIC}.
 */
type DefaultRuleGroupICArray<F extends string = string> = RuleGroupICArray<DefaultRuleGroupTypeIC<F>, DefaultRuleType<F>, DefaultCombinatorName>;
/**
 * {@link RuleGroupTypeIC} with combinators limited to
 * {@link DefaultCombinatorName} and rules limited to {@link DefaultRuleType}.
 */
interface DefaultRuleGroupTypeIC<F extends string = string> extends RuleGroupTypeIC<DefaultRuleType<F>> {
    rules: DefaultRuleGroupICArray<F>;
}

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

export type { DefaultRuleGroupType as D, FlexibleOptionList as F, OptionList as O, QueryValidator as Q, RuleGroupTypeAny as R, ValueSource as V, DefaultRuleGroupTypeIC as a, FullField as b, RuleType as c, RuleGroupType as d, ValueSources as e, RuleGroupTypeIC as f };
