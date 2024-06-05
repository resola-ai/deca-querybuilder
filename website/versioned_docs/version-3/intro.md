---
title: v3 Documentation
---

## Usage

```tsx
import { useState } from 'react';
import QueryBuilder, { RuleGroupType } from 'react-querybuilder';

const fields = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'age', label: 'Age', inputType: 'number' },
  { name: 'address', label: 'Address' },
  { name: 'phone', label: 'Phone' },
  { name: 'email', label: 'Email', validator: ({ value }) => /^[^@]+@[^@]+/.test(value) },
  { name: 'twitter', label: 'Twitter' },
  { name: 'isDev', label: 'Is a Developer?', valueEditorType: 'checkbox', defaultValue: false },
];

export const App = () => {
  const [query, setQuery] = useState<RuleGroupType>({
    combinator: 'and',
    rules: [],
  });

  return <QueryBuilder fields={fields} query={query} onQueryChange={setQuery} />;
};
```

## Props

The default export of this library is the `QueryBuilder` React component, which supports the following props.

### `query`

`{ id?: string; combinator: string; rules: ({ field: string; operator: string; value: any; } | { combinator: string; rules: ...[]; })[]; }`

The initial query, in JSON form (follows the same format as the parameter passed to the [`onQueryChange`](#onquerychange) callback). `id` is optional.

### `fields`

The array of fields that should be used. Each field should be an object with the following signature:

```ts
interface Field {
  id?: string; // The field identifier (if not provided, then `name` will be used)
  name: string; // REQUIRED - the field name
  label: string; // REQUIRED - the field label
  operators?: { name: string; label: string }[]; // Array of operators (if not provided, then `getOperators()` will be used)
  valueEditorType?: 'text' | 'select' | 'checkbox' | 'radio' | null; // Value editor type for this field (if not provided, then `getValueEditorType()` will be used)
  inputType?: string | null; // Input type for text box inputs, e.g. 'text', 'number', or 'date' (if not provided, then `getInputType()` will be used)
  values?: { name: string; label: string }[]; // Array of values, applicable when valueEditorType is 'select' or 'radio' (if not provided, then `getValues()` will be used)
  defaultOperator?: string; // Default operator for this field (if not provided, then `getDefaultOperator()` will be used)
  defaultValue?: any; // Default value for this field (if not provided, then `getDefaultValue()` will be used)
  placeholder?: string; // Value to be displayed in the placeholder of the text field
  validator?(): boolean | ValidationResult; // Called when a rule specifies this field (see the [main validator prop](#validator) for more information)
}
```

Field objects can also contain other data. Each field object will be passed to the appropriate `OperatorSelector` and `ValueEditor` components as `fieldData` (see the section on [`controlElements`](#controlelements)).

### `context`

`any`

A "bucket" for passing arbitrary props down to custom components. The `context` prop is passed to each and every component, so it's accessible anywhere in the `QueryBuilder` component tree.

### `operators`

`{ name: string; label: string; }[]`

The array of operators that should be used. The default operators include:

```ts
[
  { name: '=', label: '=' },
  { name: '!=', label: '!=' },
  { name: '<', label: '<' },
  { name: '>', label: '>' },
  { name: '<=', label: '<=' },
  { name: '>=', label: '>=' },
  { name: 'contains', label: 'contains' },
  { name: 'beginsWith', label: 'begins with' },
  { name: 'endsWith', label: 'ends with' },
  { name: 'doesNotContain', label: 'does not contain' },
  { name: 'doesNotBeginWith', label: 'does not begin with' },
  { name: 'doesNotEndWith', label: 'does not end with' },
  { name: 'null', label: 'is null' },
  { name: 'notNull', label: 'is not null' },
  { name: 'in', label: 'in' },
  { name: 'notIn', label: 'not in' },
  { name: 'between', label: 'between' },
  { name: 'notBetween', label: 'not between' },
];
```

### `combinators`

`{ name: string, label: string; }[]`

The array of combinators that should be used for RuleGroups. The default set includes:

```ts
[
  { name: 'and', label: 'AND' },
  { name: 'or', label: 'OR' },
];
```

### `controlElements`

```ts
interface Controls {
  addGroupAction?: React.ComponentType<ActionWithRulesProps>;
  addRuleAction?: React.ComponentType<ActionWithRulesProps>;
  cloneGroupAction?: React.ComponentType<ActionWithRulesProps>;
  cloneRuleAction?: React.ComponentType<ActionProps>;
  combinatorSelector?: React.ComponentType<CombinatorSelectorProps>;
  fieldSelector?: React.ComponentType<FieldSelectorProps>;
  notToggle?: React.ComponentType<NotToggleProps>;
  operatorSelector?: React.ComponentType<OperatorSelectorProps>;
  removeGroupAction?: React.ComponentType<ActionWithRulesProps>;
  removeRuleAction?: React.ComponentType<ActionProps>;
  rule?: React.ComponentType<RuleProps>;
  ruleGroup?: React.ComponentType<RuleGroupProps>;
  valueEditor?: React.ComponentType<ValueEditorProps>;
}
```

This is a custom controls object that allows you to override the control elements used. The following control overrides are supported:

- `addGroupAction`: By default a `<button />` is used. The following props are passed:

```ts
interface ActionWithRulesProps {
  label: string; // translations.addGroup.label, e.g. "+Group"
  title: string; // translations.addGroup.title, e.g. "Add group"
  className: string; // CSS classNames to be applied
  handleOnClick: (e: React.MouseEvent) => void; // Callback function to invoke adding a <RuleGroup />
  rules: (RuleGroupType | RuleType)[]; // Provides the number of rules already present for this group
  level: number; // The level of the current group
  context: any; // Container for custom props that are passed to all components
  validation: boolean | ValidationResult; // validation result of this group
}
```

- `cloneGroupAction`: By default a `<button />` is used. The following props are passed:

```ts
interface ActionWithRulesProps {
  label: string; // translations.addGroup.label, e.g. "+Group"
  title: string; // translations.addGroup.title, e.g. "Add group"
  className: string; // CSS classNames to be applied
  handleOnClick: (e: React.MouseEvent) => void; // Callback function to invoke adding a <RuleGroup />
  rules: (RuleGroupType | RuleType)[]; // Provides the number of rules already present for this group
  level: number; // The level of the current group
  context: any; // Container for custom props that are passed to all components
  validation: boolean | ValidationResult; // validation result of this group
}
```

- `removeGroupAction`: By default a `<button />` is used. The following props are passed:

```ts
interface ActionWithRulesProps {
  label: string; // translations.removeGroup.label, e.g. "x"
  title: string; // translations.removeGroup.title, e.g. "Remove group"
  className: string; // CSS classNames to be applied
  handleOnClick: (e: React.MouseEvent) => void; // Callback function to invoke adding a <RuleGroup />
  rules: (RuleGroupType | RuleType)[]; // Provides the number of rules already present for this group
  level: number; // The level of the current group
  context: any; // Container for custom props that are passed to all components
  validation: boolean | ValidationResult; // validation result of this group
}
```

- `addRuleAction`: By default a `<button />` is used. The following props are passed:

```ts
interface ActionWithRulesProps {
  label: string; // translations.addGroup.label, e.g. "+Rule"
  title: string; // translations.addGroup.title, e.g. "Add rule"
  className: string; // CSS classNames to be applied
  handleOnClick: (e: React.MouseEvent) => void; // Callback function to invoke adding a <RuleGroup />
  rules: (RuleGroupType | RuleType)[]; // Provides the number of rules already present for this group
  level: number; // The level of the current group
  context: any; // Container for custom props that are passed to all components
  validation: boolean | ValidationResult; // validation result of this group
}
```

- `cloneRuleAction`: By default a `<button />` is used. The following props are passed:

```ts
interface ActionProps {
  label: string; // translations.addGroup.label, e.g. "+Rule"
  title: string; // translations.addGroup.title, e.g. "Add rule"
  className: string; // CSS classNames to be applied
  handleOnClick: (e: React.MouseEvent) => void; // Callback function to invoke adding a <RuleGroup />
  level: number; // The level of the current group
  context: any; // Container for custom props that are passed to all components
  validation: boolean | ValidationResult; // validation result of this rule
}
```

- `removeRuleAction`: By default a `<button />` is used. The following props are passed:

```ts
interface ActionProps {
  label: string; // translations.removeRule.label, e.g. "x"
  title: string; // translations.removeRule.title, e.g. "Remove rule"
  className: string; // CSS classNames to be applied
  handleOnClick: (e: React.MouseEvent) => void; // Callback function to invoke adding a <RuleGroup />
  level: number; // The level of the current group
  context: any; // Container for custom props that are passed to all components
  validation: boolean | ValidationResult; // validation result of this rule
}
```

- `combinatorSelector`: By default a `<select />` is used. The following props are passed:

```ts
interface CombinatorSelectorProps {
  options: { name: string; label: string }[]; // Same as 'combinators' passed into QueryBuilder
  value: string; // Selected combinator from the existing query representation, if any
  className: string; // CSS classNames to be applied
  handleOnChange: (value: any) => void; // Callback function to update query representation
  rules: (RuleGroupType | RuleType)[]; // Provides the number of rules already present for this group
  level: number; // The level of the current group
  context: any; // Container for custom props that are passed to all components
  validation: boolean | ValidationResult; // validation result of this group
}
```

- `fieldSelector`: By default a `<select />` is used. The following props are passed:

```ts
interface FieldSelectorProps {
  options: Field[]; // Same as 'fields' passed into QueryBuilder
  value: string; // Selected field from the existing query representation, if any
  title: string; // translations.fields.title, e.g. "Fields"
  operator: string; // Selected operator from the existing query representation, if any
  className: string; // CSS classNames to be applied
  handleOnChange: (value: any) => void; // Callback function to update query representation
  level: number; // The level the group this rule belongs to
  context: any; // Container for custom props that are passed to all components
  validation: boolean | ValidationResult; // validation result of this rule
}
```

- `operatorSelector`: By default a `<select />` is used. The following props are passed:

```ts
interface OperatorSelectorProps {
  field: string; // Field name corresponding to this rule
  fieldData: Field; // The entire object from the fields array for this field
  options: { name: string; label: string }[]; // Return value of getOperators(field)
  value: string; // Selected operator from the existing query representation, if any
  title: string; // translations.operators.title, e.g. "Operators"
  className: string; // CSS classNames to be applied
  handleOnChange: (value: any) => void; // Callback function to update query representation
  level: number; // The level the group this rule belongs to
  context: any; // Container for custom props that are passed to all components
  validation: boolean | ValidationResult; // validation result of this rule
}
```

- `valueEditor`: By default an `<input type="text" />` is used. The following props are passed:

```ts
interface ValueEditorProps {
  field: string; // Field name corresponding to this rule
  fieldData: Field; // The entire object from the fields array for this field
  operator: string; // Operator name corresponding to this rule
  value: string; // Value from the existing query representation, if any
  title: string; // translations.value.title, e.g. "Value"
  handleOnChange: (value: any) => void; // Callback function to update the query representation
  type: 'text' | 'select' | 'checkbox' | 'radio'; // Type of editor to be displayed
  inputType: string; // @type of <input> if `type` is "text"
  values: any[]; // List of available values for this rule
  level: number; // The level the group this rule belongs to
  className: string; // CSS classNames to be applied
  context: any; // Container for custom props that are passed to all components
  validation: boolean | ValidationResult; // validation result of this rule
}
```

- `notToggle`: By default, `<label><input type="checkbox" />Not</label>` is used. The following props are passed:

```ts
interface NotToggleProps {
  checked: boolean; // Whether the input should be checked or not
  handleOnChange: (checked: boolean) => void; // Callback function to update the query representation
  title: string; // translations.notToggle.title, e.g. "Invert this group"
  level: number; // The level of the group
  className: string; // CSS classNames to be applied
  context: any; // Container for custom props that are passed to all components
  validation: boolean | ValidationResult; // validation result of this group
}
```

- `ruleGroup`: By default, `<RuleGroup />` is used. The following props are passed:

```ts
interface RuleGroupProps {
  id?: string; // Unique identifier for this rule group
  combinator: string; // Combinator for this group, e.g. "and" / "or"
  rules: (RuleType | RuleGroupType)[]; // List of rules and/or sub-groups for this group
  translations: Translations; // The full translations object
  schema: Schema; // See `Schema` documentation below
  not: boolean; // Whether or not to invert this group
  context: any; // Container for custom props that are passed to all components
}
```

- `rule`: By default, `<Rule />` is used. The following props are passed:

```ts
interface RuleProps {
  id?: string; // Unique identifier for this rule
  field: string; // Field name for this rule
  operator: string; // Operator name for this rule
  value: any; // Value for this rule
  translations: Translations; // The full translations object
  schema: Schema; // See `Schema` documentation below
  context: any; // Container for custom props that are passed to all components
}
```

The `Schema` object passed in the `rule` and `ruleGroup` props has the following signature:

```ts
interface Schema {
  fields: Field[];
  fieldMap: { [k: string]: Field };
  classNames: Classnames;
  combinators: { name: string; label: string }[];
  controls: Controls;
  createRule(): RuleType;
  createRuleGroup(): RuleGroupType;
  getOperators(field: string): { name: string; label: string }[];
  getValueEditorType(field: string, operator: string): ValueEditorType;
  getInputType(field: string, operator: string): string | null;
  getValues(field: string, operator: string): { name: string; label: string }[];
  isRuleGroup(ruleOrGroup: RuleType | RuleGroupType): ruleOrGroup is RuleGroupType;
  onGroupAdd(group: RuleGroupType, parentId: string): void;
  onGroupRemove(id: string, parentId: string): void;
  onPropChange(prop: string, value: any, ruleId: string): void;
  onRuleAdd(rule: RuleType, parentId: string): void;
  onRuleRemove(id: string, parentId: string): void;
  showCombinatorsBetweenRules: boolean;
  showNotToggle: boolean;
  showCloneButtons: boolean;
  autoSelectField: boolean;
  addRuleToNewGroups: boolean;
  validationMap: ValidationMap;
}
```

### `getOperators`

`(field: string) => { name: string; label: string; }[] | null`

This is a callback function invoked to get the list of allowed operators for the given field. If `null` is returned, the default operators are used.

### `getValueEditorType`

`(field: string, operator: string) => 'text' | 'select' | 'checkbox' | 'radio' | null`

This is a callback function invoked to get the type of `ValueEditor` for the given field and operator. Allowed values are `"text"` (the default if the function is not provided or if `null` is returned), `"select"`, `"checkbox"`, and `"radio"`.

### `getInputType`

`(field: string, operator: string) => string`

This is a callback function invoked to get the `type` of `<input />` for the given field and operator (only applicable when `getValueEditorType` returns `"text"` or a falsy value). If no function is provided, `"text"` is used as the default.

### `getValues`

`(field: string, operator: string) => { name: string; label: string; }[]`

This is a callback function invoked to get the list of allowed values for the given field and operator (only applicable when `getValueEditorType` returns `"select"` or `"radio"`). If no function is provided, an empty array is used as the default.

### `getDefaultField`

`string | ((fieldsData: Field[]) => string)`

The default field for new rules. This can be a string identifying the default field, or a function that returns a field name.

### `getDefaultOperator`

`string | ((field: string) => string)`

The default operator for new rules. This can be a string identifying the default operator, or a function that returns an operator name.

### `getDefaultValue`

`(rule: RuleType) => any`

This function returns the default value for new rules.

### `onAddRule`

`(rule: RuleType, parentId: string, query: RuleGroupType) => RuleType | false`

This callback is invoked before a new rule is added. The function should either manipulate the rule and return it, or return `false` to cancel the addition of the rule. _(To completely prevent the addition of new rules, pass `controlElements={{ addRuleAction: () => null }}` which will hide the "+Rule" button.)_ You can use `findRule(parentId, query)` to locate the parent group to which the new rule will be added among the entire query hierarchy.

### `onAddGroup`

`(ruleGroup: RuleGroupType, parentId: string, query: RuleGroupType) => RuleGroupType | false`

This callback is invoked before a new group is added. The function should either manipulate the group and return it, or return `false` to cancel the addition of the group. _(To completely prevent the addition of new groups, pass `controlElements={{ addGroupAction: () => null }}` which will hide the "+Group" button.)_ You can use `findRule(parentId, query)` to locate the parent group to which the new group will be added among the entire query hierarchy.

### `onQueryChange`

`(query: RuleGroupType) => void`

This is a notification that is invoked anytime the query configuration changes. The query is provided as a JSON structure, as shown below:

```json
{
  "combinator": "and",
  "not": false,
  "rules": [
    {
      "field": "firstName",
      "operator": "null",
      "value": ""
    },
    {
      "field": "lastName",
      "operator": "null",
      "value": ""
    },
    {
      "combinator": "and",
      "rules": [
        {
          "field": "age",
          "operator": ">",
          "value": "30"
        }
      ]
    }
  ]
}
```

### `controlClassnames`

This can be used to assign specific `CSS` classes to various controls that are created by the `<QueryBuilder />`. This is an object with the following signature:

```ts
interface Classnames {
  queryBuilder?: string; // Root <div> element
  ruleGroup?: string; // <div> containing the RuleGroup
  header?: string; // <div> containing the RuleGroup header controls
  body?: string; // <div> containing the RuleGroup child rules/groups
  combinators?: string; // <select> control for combinators
  addRule?: string; // <button> to add a Rule
  addGroup?: string; // <button> to add a RuleGroup
  cloneRule?: string; // <button> to clone a Rule
  cloneGroup?: string; // <button> to clone a RuleGroup
  removeGroup?: string; // <button> to remove a RuleGroup
  notToggle?: string; // <label> on the "not" toggle
  rule?: string; // <div> containing the Rule
  fields?: string; // <select> control for fields
  operators?: string; // <select> control for operators
  value?: string; // <input> for the field value
  removeRule?: string; // <button> to remove a Rule
}
```

### `translations`

This can be used to override translatable texts applied to various controls that are created by the `<QueryBuilder />`. This is an object with the following properties:

```ts
{
  fields: {
    title: "Fields",
  },
  operators: {
    title: "Operators",
  },
  value: {
    title: "Value",
  },
  removeRule: {
    label: "x",
    title: "Remove rule",
  },
  removeGroup: {
    label: "x",
    title: "Remove group",
  },
  addRule: {
    label: "+Rule",
    title: "Add rule",
  },
  addGroup: {
    label: "+Group",
    title: "Add group",
  },
  combinators: {
    title: "Combinators",
  },
  notToggle: {
    label: "Not",
    title: "Invert this group",
  },
  cloneRule: {
    label: '⧉',
    title: 'Clone rule'
  },
  cloneRuleGroup: {
    label: '⧉',
    title: 'Clone group'
  }
}
```

### `showCombinatorsBetweenRules`

`boolean`

Pass `true` to show the combinators (and/or) between rules and rule groups instead of at the top of rule groups. This can make some queries easier to understand as it encourages a more natural style of reading.

### `showNotToggle`

`boolean`

Pass `true` to show the "Not" toggle switch for each rule group.

### `showCloneButtons`

`boolean`

Pass `true` to show the "Clone rule" and "Clone group" buttons.

### `resetOnFieldChange`

`boolean`

Pass `false` not to reset operator and value for field change.

### `resetOnOperatorChange`

`boolean`

Pass `true` to reset value on operator change.

### `enableMountQueryChange`

`boolean`

Pass `false` to disable the `onQueryChange` on mount of component which will set default value.

### `autoSelectField`

`boolean`

Pass `false` to add an empty option (`"------"`) to the `fields` array as the first element (which is selected by default for new rules). When the empty field option is selected, the operator and value components will not display for that rule.

### `addRuleToNewGroups`

`boolean`

Pass `true` to automatically add a rule to new groups. If a `query` prop is not passed in, a rule will be added to the root group when the component is mounted. If a `query` prop is passed in with an empty `rules` array, no rule will be added automatically.

## Other exports

### `findRule`

```ts
function findRule(id: string, query: RuleGroupType): RuleType | RuleGroupType;
```

`findRule` is a utility function for finding the rule or group within the query hierarchy that has a given `id`. Useful in custom [`onAddRule`](#onaddrule) and [`onAddGroup`](#onaddgroup) functions.

### `formatQuery`

```ts
function formatQuery(
  query: RuleGroupType,
  options?: ExportFormat | FormatQueryOptions
): string | ParameterizedSQL | ParameterizedNamedSQL;
```

`formatQuery` parses a given query into one of the following formats: SQL, parameterized SQL, JSON, MongoDB, or JSON without IDs (which can be useful if you need to serialize the rules). The inversion operator (setting `not: true` for a rule group) is currently unsupported for the MongoDB format, but rules can be created using the `"!="` operator.

Example:

```ts
import { formatQuery } from 'react-querybuilder';

const query = {
  combinator: 'and',
  not: false,
  rules: [
    {
      field: 'firstName',
      value: 'Steve',
      operator: '=',
    },
    {
      field: 'lastName',
      value: 'Vai',
      operator: '=',
    },
  ],
};

console.log(formatQuery(query, 'sql')); // '(firstName = "Steve" and lastName = "Vai")'
console.log(formatQuery(query, 'parameterized')); // { sql: "(firstName = ? and lastName = ?)", params: ["Steve", "Vai"] }
console.log(formatQuery(query, 'mongodb')); // '{$and:[{firstName:{$eq:"Steve"}},{lastName:{$eq:"Vai"}}]}'
```

An `options` object can be passed as the second argument instead of a format string in order to have more detailed control over the output. The options object takes the following form:

```ts
interface FormatQueryOptions {
  format?: 'sql' | 'json' | 'json_without_ids' | 'parameterized'; // same as passing a `format` string instead of an options object
  valueProcessor?: (field: string, operator: string, value: any) => string; // see below for an example
  quoteFieldNamesWith?: string; // e.g. "`" to quote field names with backticks (useful if your field names have spaces)
  validator?: QueryValidator; // function to validate the entire query (see [validator](#validator))
  fields?: { name: string; validator?: RuleValidator; [k: string]: any }[]; // This can be the same Field[] passed to <QueryBuilder />, but really all you need to provide is the name and validator for each field
  fallbackExpression?: string; // this string will be inserted in place of invalid groups for "sql", "parameterized", "parameterized_named", and "mongodb" formats (defaults to '(1 = 1)' for "sql"/"parameterized"/"parameterized_named", '$and:[{$expr:true}]' for "mongodb")
  paramPrefix?: string; // this string will be placed in front of named parameters (aka bind variables) when using the "parameterized_named" format. Default is ":".
}
```

For example, if you need to control the way the value portion of the output is processed, you can specify a custom `valueProcessor` (only applicable for "sql" format).

```ts
const query = {
  combinator: 'and',
  not: false,
  rules: [
    {
      field: 'instrument',
      value: ['Guitar', 'Vocals'],
      operator: 'in',
    },
    {
      field: 'lastName',
      value: 'Vai',
      operator: '=',
    },
  ],
};

const valueProcessor = (field, operator, value) => {
  if (operator === 'in') {
    // Assuming `value` is an array, such as from a multi-select
    return `(${value.map(v => `"${v.trim()}"`).join(',')})`;
  } else {
    return defaultValueProcessor(field, operator, value);
  }
};

console.log(formatQuery(query, { format: 'sql', valueProcessor })); // '(instrument in ("Guitar","Vocals") and lastName = "Vai")'
```

The 'json_without_ids' format will return the same query without the IDs. This can be useful, for example, if you need to save the query to the URL so that it becomes bookmarkable:

```ts
const query = {
  id: 'root',
  rules: [
    {
      id: 'r1',
      field: 'instrument',
      value: ['Guitar', 'Vocals'],
      operator: 'in',
    },
    {
      id: 'r2',
      field: 'lastName',
      value: 'Vai',
      operator: '=',
    },
  ],
  combinator: 'and',
  not: false,
};

console.log(formatQuery(query, 'json_without_ids'));
// '{"rules":[{"field":"instrument","value":["Guitar","Vocals"],"operator":"in"},{"field":"lastName","value":"Vai","operator":"="}],"combinator":"and","not":false}'
```

The validation options (`validator` and `fields`) only affect the output when `format` is "sql", "parameterized", or "mongodb". If the `validator` function returns `false`, the "sql" and "parameterized" formats will return `"(1 = 1)"` and the `mongodb` format will return `"{$and:[{$expr:true}]}"` to maintain valid syntax while (hopefully) not affecting the query criteria. Otherwise, groups and rules marked as invalid (either by the validation map produced by the `validator` function or the result of the field-based `validator` function) will be ignored.

Example:

```ts
const query = {
  id: 'root',
  rules: [
    {
      id: 'r1',
      field: 'firstName',
      value: '',
      operator: '=',
    },
    {
      id: 'r2',
      field: 'lastName',
      value: 'Vai',
      operator: '=',
    },
  ],
  combinator: 'and',
  not: false,
};

// Invalid query
console.log(formatQuery(query, { format: 'sql', validator: () => false })); // "(1 = 1)" <-- see `fallbackExpression` option
// Invalid rule based on validation map
console.log(formatQuery(query, { format: 'sql', validator: () => ({ r1: false }) })); // "(lastName = 'Vai')"
// Invalid rule based on field validator
console.log(
  formatQuery(query, { format: 'sql', fields: [{ name: 'firstName', validator: () => false }] })
); // "(lastName = 'Vai')"
```

A basic form of validation will be used by `formatQuery` for the "in", "notIn", "between", and "notBetween" operators when the output format is "sql", "parameterized", or "mongodb". This validation is used regardless of the presence of any `validator` options either at the query or field level.

- Rules that specify an "in" or "notIn" `operator` will be deemed invalid if the rule's `value` is neither an array with at least one element (`value.length > 0`) nor a non-empty string.
- Rules that specify a "between" or "notBetween" `operator` will be deemed invalid if the rule's `value` is neither an array of length two (`value.length === 2`) nor a string with exactly one comma that isn't the first or last character (`value.split(',').length === 2` and neither element is an empty string).

### `parseSQL`

```ts
function parseSQL(sql: string, options?: ParseSQLOptions): RuleGroupType;
```

`parseSQL` takes a SQL `SELECT` statement (either the full statement, or just the `WHERE` clause by itself) and returns a query object fit for using as the `query` prop in the `<QueryBuilder />` component. Try it out in the [demo](https://react-querybuilder.js.org/react-querybuilder) by clicking the "Load from SQL" button.

The optional second parameter to `parseSQL` is an options object that configures how the function handles named or anonymous bind variables.

```ts
interface ParseSQLOptions {
  paramPrefix?: string;
  params?: any[] | { [p: string]: any };
}
```

Examples:

```ts
const standardSQL = parseSQL(`SELECT * FROM t WHERE firstName = 'Steve' AND lastName = 'Vai'`);
const paramsArray = parseSQL(`SELECT * FROM t WHERE firstName = ? AND lastName = ?`, {
  params: ['Steve', 'Vai'],
});
const paramsObject = parseSQL(`SELECT * FROM t WHERE firstName = :p1 AND lastName = :p2`, {
  params: { p1: 'Steve', p2: 'Vai' },
});
const paramsObject$ = parseSQL(`SELECT * FROM t WHERE firstName = $p1 AND lastName = $p2`, {
  params: { p1: 'Steve', p2: 'Vai' },
  paramPrefix: '$',
});

// Running any of the following statements will log the same result (see below)
console.log(JSON.stringify(standardSQL, null, 2));
console.log(JSON.stringify(paramsArray, null, 2));
console.log(JSON.stringify(paramsObject, null, 2));
console.log(JSON.stringify(paramsObject$, null, 2));
/*
{
  "combinator": "and",
  "rules": [
    {
      "field": "firstName",
      "operator": "=",
      "value": "Steve"
    },
    {
      "field": "lastName",
      "operator": "=",
      "value": "Vai"
    }
  ]
}
*/
```

### Defaults

The following default configuration objects are exported for convenience.

- `defaultCombinators`
- `defaultOperators`
- `defaultTranslations`
- `defaultValueProcessor`

The following components are exported as well:

- `ActionElement` - used for buttons ("Add rule", "Remove group", etc.)
- `NotToggle` - used for the "Invert this group" toggle switch
- `ValueEditor` - the default ValueEditor component
- `ValueSelector` - used for drop-down lists: the combinator, field, and operator selectors
