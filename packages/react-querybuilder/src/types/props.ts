import type {
  Classname,
  FullCombinator,
  FullField,
  FullOperator,
  Path,
  ValueSource,
} from './basic';
import type { FullOption, FullOptionList, Option, ToFullOption } from './options';
import type { Schema, TranslationWithLabel } from './propsUsingReact';
import type { RuleGroupType, RuleType } from './ruleGroups';
import type { RuleGroupTypeAny, RuleOrGroupArray } from './ruleGroupsIC';
import type { ValidationResult } from './validation';

/**
 * Base interface for all subcomponents.
 */
export interface CommonSubComponentProps<
  F extends FullOption = FullField,
  O extends string = string,
> {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export interface SelectorOrEditorProps<F extends FullOption = FullField, O extends string = string>
  extends CommonSubComponentProps<F, O> {
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOnChange(value: any): void;
}

/**
 * Base interface for all rule subcomponents.
 */
export interface CommonRuleSubComponentProps {
  rule: RuleType;
}

/**
 * Base interface for selector components.
 */
interface BaseSelectorProps<OptType extends Option>
  extends SelectorOrEditorProps<ToFullOption<OptType>> {
  options: FullOptionList<OptType>;
}

/**
 * Props for all `value` selector components.
 */
export interface ValueSelectorProps<OptType extends Option = FullOption>
  extends BaseSelectorProps<OptType> {
  multiple?: boolean;
  listsAsArrays?: boolean;
}

/**
 * Props for `combinatorSelector` components.
 */
export interface CombinatorSelectorProps extends BaseSelectorProps<FullOption> {
  options: FullOptionList<FullCombinator>;
  rules?: RuleOrGroupArray;
}

/**
 * Props for `fieldSelector` components.
 */
export interface FieldSelectorProps<F extends FullField = FullField>
  extends BaseSelectorProps<F>,
    CommonRuleSubComponentProps {
  operator?: F extends FullField<string, infer OperatorName> ? OperatorName : string;
}

/**
 * Props for `operatorSelector` components.
 */
export interface OperatorSelectorProps
  extends BaseSelectorProps<FullOption>,
    CommonRuleSubComponentProps {
  options: FullOptionList<FullOperator>;
  field: string;
  fieldData: FullField;
}

/**
 * Props for `valueSourceSelector` components.
 */
export interface ValueSourceSelectorProps
  extends BaseSelectorProps<FullOption>,
    CommonRuleSubComponentProps {
  options: FullOptionList<FullOption<ValueSource>>;
  field: string;
  fieldData: FullField;
}

/**
 * Utility type representing props for selector components
 * that could potentially be any of the standard selector types.
 */
export type VersatileSelectorProps = ValueSelectorProps &
  Partial<FieldSelectorProps<FullField>> &
  Partial<OperatorSelectorProps> &
  Partial<CombinatorSelectorProps>;

/**
 * Classnames applied to each component.
 */
export interface Classnames {
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
export interface QueryActions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onGroupAdd(group: RuleGroupTypeAny, parentPath: Path, context?: any): void;
  onGroupRemove(path: Path): void;
  onPropChange(
    prop: Exclude<keyof RuleType | keyof RuleGroupType, 'id' | 'path'>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    path: Path
  ): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRuleAdd(rule: RuleType, parentPath: Path, context?: any): void;
  onRuleRemove(path: Path): void;
  moveRule(oldPath: Path, newPath: Path | 'up' | 'down', clone?: boolean): void;
}

/**
 * A translation for a component with `title` only.
 */
export interface Translation {
  title?: string;
}
/**
 * A translation for a component with `title` and a placeholder.
 */
export interface TranslationWithPlaceholders extends Translation {
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
export interface Translations {
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
export type TranslationsFull = {
  [K in keyof Translations]: { [T in keyof Translations[K]]-?: string };
};
