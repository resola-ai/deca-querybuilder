var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/components/ActionElement.tsx
import * as React from "react";
var ActionElement = (props) => /* @__PURE__ */ React.createElement(
  "button",
  {
    type: "button",
    "data-testid": props.testID,
    disabled: props.disabled && !props.disabledTranslation,
    className: props.className,
    title: props.disabledTranslation && props.disabled ? props.disabledTranslation.title : props.title,
    onClick: (e) => props.handleOnClick(e)
  },
  props.disabledTranslation && props.disabled ? props.disabledTranslation.label : props.label
);

// src/components/DragHandle.tsx
import * as React2 from "react";
import { forwardRef } from "react";
var DragHandle = forwardRef((props, dragRef) => /* @__PURE__ */ React2.createElement("span", { "data-testid": props.testID, ref: dragRef, className: props.className, title: props.title }, props.label));

// src/components/InlineCombinator.tsx
import * as React3 from "react";

// src/defaults.ts
var placeholderName = "~";
var placeholderLabel = "------";
var defaultPlaceholderFieldName = placeholderName;
var defaultPlaceholderFieldLabel = placeholderLabel;
var defaultPlaceholderFieldGroupLabel = placeholderLabel;
var defaultPlaceholderOperatorName = placeholderName;
var defaultPlaceholderOperatorLabel = placeholderLabel;
var defaultPlaceholderOperatorGroupLabel = placeholderLabel;
var defaultJoinChar = ",";
var defaultTranslations = {
  fields: {
    title: "Fields",
    placeholderName: defaultPlaceholderFieldName,
    placeholderLabel: defaultPlaceholderFieldLabel,
    placeholderGroupLabel: defaultPlaceholderFieldGroupLabel
  },
  operators: {
    title: "Operators",
    placeholderName: defaultPlaceholderOperatorName,
    placeholderLabel: defaultPlaceholderOperatorLabel,
    placeholderGroupLabel: defaultPlaceholderOperatorGroupLabel
  },
  value: {
    title: "Value"
  },
  removeRule: {
    label: "\u2A2F",
    title: "Remove rule"
  },
  removeGroup: {
    label: "\u2A2F",
    title: "Remove group"
  },
  addRule: {
    label: "+ Rule",
    title: "Add rule"
  },
  addGroup: {
    label: "+ Group",
    title: "Add group"
  },
  combinators: {
    title: "Combinators"
  },
  notToggle: {
    label: "Not",
    title: "Invert this group"
  },
  cloneRule: {
    label: "\u29C9",
    title: "Clone rule"
  },
  cloneRuleGroup: {
    label: "\u29C9",
    title: "Clone group"
  },
  shiftActionUp: {
    label: "\u02C4",
    title: "Shift up"
  },
  shiftActionDown: {
    label: "\u02C5",
    title: "Shift down"
  },
  dragHandle: {
    label: "\u205E\u205E",
    title: "Drag handle"
  },
  lockRule: {
    label: "\u{1F513}",
    title: "Lock rule"
  },
  lockGroup: {
    label: "\u{1F513}",
    title: "Lock group"
  },
  lockRuleDisabled: {
    label: "\u{1F512}",
    title: "Unlock rule"
  },
  lockGroupDisabled: {
    label: "\u{1F512}",
    title: "Unlock group"
  },
  valueSourceSelector: {
    title: "Value source"
  }
};
var defaultOperators = [
  { name: "=", value: "=", label: "=" },
  { name: "!=", value: "!=", label: "!=" },
  { name: "<", value: "<", label: "<" },
  { name: ">", value: ">", label: ">" },
  { name: "<=", value: "<=", label: "<=" },
  { name: ">=", value: ">=", label: ">=" },
  { name: "contains", value: "contains", label: "contains" },
  { name: "beginsWith", value: "beginsWith", label: "begins with" },
  { name: "endsWith", value: "endsWith", label: "ends with" },
  { name: "doesNotContain", value: "doesNotContain", label: "does not contain" },
  { name: "doesNotBeginWith", value: "doesNotBeginWith", label: "does not begin with" },
  { name: "doesNotEndWith", value: "doesNotEndWith", label: "does not end with" },
  { name: "null", value: "null", label: "is null" },
  { name: "notNull", value: "notNull", label: "is not null" },
  { name: "in", value: "in", label: "in" },
  { name: "notIn", value: "notIn", label: "not in" },
  { name: "between", value: "between", label: "between" },
  { name: "notBetween", value: "notBetween", label: "not between" }
];
var defaultOperatorNegationMap = {
  "=": "!=",
  "!=": "=",
  "<": ">=",
  "<=": ">",
  ">": "<=",
  ">=": "<",
  beginsWith: "doesNotBeginWith",
  doesNotBeginWith: "beginsWith",
  endsWith: "doesNotEndWith",
  doesNotEndWith: "endsWith",
  contains: "doesNotContain",
  doesNotContain: "contains",
  between: "notBetween",
  notBetween: "between",
  in: "notIn",
  notIn: "in",
  notNull: "null",
  null: "notNull"
};
var defaultCombinators = [
  { name: "and", value: "and", label: "AND" },
  { name: "or", value: "or", label: "OR" }
];
var defaultCombinatorsExtended = [
  ...defaultCombinators,
  { name: "xor", value: "xor", label: "XOR" }
];
var standardClassnames = {
  queryBuilder: "queryBuilder",
  ruleGroup: "ruleGroup",
  header: "ruleGroup-header",
  body: "ruleGroup-body",
  combinators: "ruleGroup-combinators",
  addRule: "ruleGroup-addRule",
  addGroup: "ruleGroup-addGroup",
  cloneRule: "rule-cloneRule",
  cloneGroup: "ruleGroup-cloneGroup",
  removeGroup: "ruleGroup-remove",
  notToggle: "ruleGroup-notToggle",
  rule: "rule",
  fields: "rule-fields",
  operators: "rule-operators",
  value: "rule-value",
  removeRule: "rule-remove",
  betweenRules: "betweenRules",
  valid: "queryBuilder-valid",
  invalid: "queryBuilder-invalid",
  shiftActions: "shiftActions",
  dndDragging: "dndDragging",
  dndOver: "dndOver",
  dndCopy: "dndCopy",
  dragHandle: "queryBuilder-dragHandle",
  disabled: "queryBuilder-disabled",
  lockRule: "rule-lock",
  lockGroup: "ruleGroup-lock",
  valueSource: "rule-valueSource",
  valueListItem: "rule-value-list-item",
  branches: "queryBuilder-branches"
};
var defaultControlClassnames = {
  queryBuilder: "",
  ruleGroup: "",
  header: "",
  body: "",
  combinators: "",
  addRule: "",
  addGroup: "",
  cloneRule: "",
  cloneGroup: "",
  removeGroup: "",
  notToggle: "",
  rule: "",
  fields: "",
  operators: "",
  value: "",
  removeRule: "",
  shiftActions: "",
  dragHandle: "",
  lockRule: "",
  lockGroup: "",
  valueSource: "",
  actionElement: "",
  valueSelector: ""
};
var groupInvalidReasons = {
  empty: "empty",
  invalidCombinator: "invalid combinator",
  invalidIndependentCombinators: "invalid independent combinators"
};
var TestID = {
  rule: "rule",
  ruleGroup: "rule-group",
  inlineCombinator: "inline-combinator",
  addGroup: "add-group",
  removeGroup: "remove-group",
  cloneGroup: "clone-group",
  cloneRule: "clone-rule",
  addRule: "add-rule",
  removeRule: "remove-rule",
  combinators: "combinators",
  fields: "fields",
  operators: "operators",
  valueEditor: "value-editor",
  notToggle: "not-toggle",
  shiftActions: "shift-actions",
  dragHandle: "drag-handle",
  lockRule: "lock-rule",
  lockGroup: "lock-group",
  valueSourceSelector: "value-source-selector"
};
var LogType = {
  parentPathDisabled: "action aborted: parent path disabled",
  pathDisabled: "action aborted: path is disabled",
  queryUpdate: "query updated",
  onAddRuleFalse: "onAddRule callback returned false",
  onAddGroupFalse: "onAddGroup callback returned false",
  onMoveRuleFalse: "onMoveRule callback returned false",
  onMoveGroupFalse: "onMoveGroup callback returned false",
  onRemoveFalse: "onRemove callback returned false",
  add: "rule or group added",
  remove: "rule or group removed",
  update: "rule or group updated",
  move: "rule or group moved"
};

// src/components/InlineCombinator.tsx
var InlineCombinator = (allProps) => {
  const _a = allProps, { component: CombinatorSelectorComponent } = _a, props = __objRest(_a, ["component"]);
  return /* @__PURE__ */ React3.createElement("div", { className: standardClassnames.betweenRules, "data-testid": TestID.inlineCombinator }, /* @__PURE__ */ React3.createElement(CombinatorSelectorComponent, __spreadProps(__spreadValues({}, props), { testID: TestID.combinators })));
};

// src/components/NotToggle.tsx
import * as React4 from "react";
var NotToggle = (props) => /* @__PURE__ */ React4.createElement("label", { "data-testid": props.testID, className: props.className, title: props.title }, /* @__PURE__ */ React4.createElement(
  "input",
  {
    type: "checkbox",
    onChange: (e) => props.handleOnChange(e.target.checked),
    checked: !!props.checked,
    disabled: props.disabled
  }
), props.label);

// src/components/QueryBuilder.tsx
import * as React8 from "react";
import { Provider } from "react-redux";

// src/messages.ts
var messages = {
  errorInvalidIndependentCombinatorsProp: "QueryBuilder was rendered with a truthy independentCombinators prop. This prop is deprecated and unnecessary. Furthermore, the initial query/defaultQuery prop was of type RuleGroupType instead of type RuleGroupIC. More info: https://react-querybuilder.js.org/docs/components/querybuilder#independent-combinators",
  errorUnnecessaryIndependentCombinatorsProp: "QueryBuilder was rendered with the deprecated and unnecessary independentCombinators prop. To use independent combinators, make sure the query/defaultQuery prop is of type RuleGroupIC when the component mounts. More info: https://react-querybuilder.js.org/docs/components/querybuilder#independent-combinators",
  errorDeprecatedRuleGroupProps: "A custom RuleGroup component has rendered a standard RuleGroup component with deprecated props. The combinator, not, and rules props should not be used. Instead, the full group object should be passed as the ruleGroup prop.",
  errorDeprecatedRuleProps: "A custom RuleGroup component has rendered a standard Rule component with deprecated props. The field, operator, value, and valueSource props should not be used. Instead, the full rule object should be passed as the rule prop.",
  errorBothQueryDefaultQuery: "QueryBuilder was rendered with both query and defaultQuery props. QueryBuilder must be either controlled or uncontrolled (specify either the query prop, or the defaultQuery prop, but not both). Decide between using a controlled or uncontrolled query builder and remove one of these props. More info: https://reactjs.org/link/controlled-components",
  errorUncontrolledToControlled: "QueryBuilder is changing from an uncontrolled component to be controlled. This is likely caused by the query changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled query builder for the lifetime of the component. More info: https://reactjs.org/link/controlled-components",
  errorControlledToUncontrolled: "QueryBuilder is changing from a controlled component to be uncontrolled. This is likely caused by the query changing from defined to undefined, which should not happen. Decide between using a controlled or uncontrolled query builder for the lifetime of the component. More info: https://reactjs.org/link/controlled-components",
  errorEnabledDndWithoutReactDnD: "QueryBuilder was rendered with the enableDragAndDrop prop set to true, but either react-dnd or react-dnd-html5-backend (or both) was not installed. To enable drag-and-drop functionality, install both packages and wrap QueryBuilder in QueryBuilderDnD from @react-querybuilder/dnd."
};

// src/redux/_internal.ts
import { createDispatchHook, createStoreHook } from "react-redux";

// src/redux/index.ts
import { configureStore } from "@reduxjs/toolkit";
import * as React5 from "react";
import { createSelectorHook } from "react-redux";

// src/redux/queriesSlice.ts
import { createSlice } from "@reduxjs/toolkit";
var initialState = {};
var queriesSlice = createSlice({
  name: "queries",
  initialState,
  reducers: {
    setQueryState: (state, { payload: { qbId, query } }) => {
      state[qbId] = query;
    }
  },
  selectors: {
    getQuerySelectorById: (state, qbId) => state[qbId]
  }
});

// src/redux/warningsSlice.ts
import { createSlice as createSlice2 } from "@reduxjs/toolkit";
var initialState2 = {
  [messages.errorInvalidIndependentCombinatorsProp]: false,
  [messages.errorUnnecessaryIndependentCombinatorsProp]: false,
  [messages.errorDeprecatedRuleGroupProps]: false,
  [messages.errorDeprecatedRuleProps]: false,
  [messages.errorBothQueryDefaultQuery]: false,
  [messages.errorUncontrolledToControlled]: false,
  [messages.errorControlledToUncontrolled]: false,
  [messages.errorEnabledDndWithoutReactDnD]: false
};
var warningsSlice = createSlice2({
  name: "warnings",
  initialState: initialState2,
  reducers: {
    rqbWarn: (state, { payload }) => {
      if (!state[payload]) {
        console.error(payload);
        state[payload] = true;
      }
    }
  }
});

// src/redux/index.ts
var preloadedState = {
  queries: queriesSlice.getInitialState(),
  warnings: warningsSlice.getInitialState()
};
var queryBuilderStore = configureStore({
  reducer: {
    queries: queriesSlice.reducer,
    warnings: warningsSlice.reducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    // Ignore non-serializable values in setQueryState actions and rule `value`s
    // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
    serializableCheck: {
      ignoredActions: ["queries/setQueryState"],
      ignoredPaths: [/^queries\b.*\.rules\.\d+\.value$/]
    }
  })
});
var QueryBuilderStateContext = React5.createContext(null);
var useRQB_INTERNAL_QueryBuilderSelector = createSelectorHook(QueryBuilderStateContext);
var useQueryBuilderSelector = (selector, other) => {
  const rqbContext = React5.useContext(QueryBuilderContext);
  const result = useRQB_INTERNAL_QueryBuilderSelector(selector, other);
  return result != null ? result : rqbContext == null ? void 0 : rqbContext.initialQuery;
};
var useQueryBuilderQuery = (props) => {
  var _a, _b, _c;
  const rqbContext = React5.useContext(QueryBuilderContext);
  return (_c = useRQB_INTERNAL_QueryBuilderSelector(
    getQuerySelectorById((_b = (_a = props == null ? void 0 : props.schema.qbId) != null ? _a : rqbContext.qbId) != null ? _b : (
      /* istanbul ignore next */
      ""
    ))
  )) != null ? _c : rqbContext == null ? void 0 : rqbContext.initialQuery;
};
var getQuerySelectorById = (qbId) => (state) => queriesSlice.selectors.getQuerySelectorById({ queries: state.queries }, qbId);

// src/redux/_internal.ts
var _RQB_INTERNAL_dispatchThunk = ({
  payload,
  onQueryChange
}) => (dispatch) => {
  dispatch(queriesSlice.actions.setQueryState(payload));
  if (typeof onQueryChange === "function") {
    onQueryChange(payload.query);
  }
};
var useRQB_INTERNAL_QueryBuilderDispatch = createDispatchHook(QueryBuilderStateContext);
var useRQB_INTERNAL_QueryBuilderStore = createStoreHook(QueryBuilderStateContext);
var { rqbWarn: _SYNC_rqbWarn } = warningsSlice.actions;
var rqbWarn = (msg) => (dispatch) => {
  setTimeout(() => dispatch(_SYNC_rqbWarn(msg)));
};

// src/hooks/usePrevious.ts
import { useRef } from "react";
var usePrevious = (value) => {
  const ref = useRef({ value, prev: null });
  const current = ref.current.value;
  if (value !== current) {
    ref.current = { value, prev: current };
  }
  return ref.current.prev;
};

// src/hooks/useControlledOrUncontrolled.ts
var useControlledOrUncontrolled = (params) => {
  const dispatch = useRQB_INTERNAL_QueryBuilderDispatch();
  const { defaultQuery, queryProp } = params;
  const prevQueryPresent = usePrevious(!!queryProp);
  if (process.env.NODE_ENV !== "production") {
    if (!!queryProp && !!defaultQuery) {
      dispatch(rqbWarn(messages.errorBothQueryDefaultQuery));
    } else if (prevQueryPresent === true && !queryProp && !!defaultQuery) {
      dispatch(rqbWarn(messages.errorControlledToUncontrolled));
    } else if (prevQueryPresent === false && !!queryProp && !defaultQuery) {
      dispatch(rqbWarn(messages.errorUncontrolledToControlled));
    }
  }
};

// src/hooks/useDeprecatedProps.ts
function useDeprecatedProps(type, logWarning, otherParams) {
  const dispatch = useRQB_INTERNAL_QueryBuilderDispatch();
  if (process.env.NODE_ENV !== "production" && logWarning) {
    if (type === "independentCombinators") {
      if (otherParams === "invalid") {
        dispatch(rqbWarn(messages.errorInvalidIndependentCombinatorsProp));
      }
      if (otherParams === "unnecessary") {
        dispatch(rqbWarn(messages.errorUnnecessaryIndependentCombinatorsProp));
      }
    }
    if (type === "rule") {
      dispatch(rqbWarn(messages.errorDeprecatedRuleProps));
    }
    if (type === "ruleGroup") {
      dispatch(rqbWarn(messages.errorDeprecatedRuleGroupProps));
    }
  }
}

// src/hooks/useMergedContext.ts
import { forwardRef as forwardRef2, useCallback, useContext as useContext2, useMemo } from "react";

// src/utils/arrayUtils.ts
var splitBy = (str, splitChar = defaultJoinChar) => typeof str === "string" ? str.split(`\\${splitChar}`).map((c) => c.split(splitChar)).reduce((prev, curr, idx) => {
  if (idx === 0) {
    return curr;
  }
  return [
    ...prev.slice(0, prev.length - 1),
    `${prev[prev.length - 1]}${splitChar}${curr[0]}`,
    ...curr.slice(1)
  ];
}, []) : [];
var joinWith = (strArr, joinChar = defaultJoinChar) => strArr.map((str) => `${str != null ? str : ""}`.replaceAll(joinChar[0], `\\${joinChar[0]}`)).join(joinChar);
var trimIfString = (val) => typeof val === "string" ? val.trim() : val;
var toArray = (v) => Array.isArray(v) ? v.map(trimIfString) : typeof v === "string" ? splitBy(v, defaultJoinChar).filter((s) => !/^\s*$/.test(s)).map((s) => s.trim()) : typeof v === "number" ? [v] : [];
var nullFreeArray = (arr) => arr.every((el) => el === false || (el != null ? el : false) !== false);

// src/utils/misc.ts
import { numericRegex as numericQuantityRegex } from "numeric-quantity";
var numericRegex = new RegExp(
  numericQuantityRegex.source.replace(/^\^/, "^\\s*").replace(/\$$/, "\\s*$")
);
var isPojo = (obj) => obj === null || typeof obj !== "object" ? false : Object.getPrototypeOf(obj) === Object.prototype;

// src/utils/isRuleGroup.ts
var isRuleGroup = (rg) => isPojo(rg) && Array.isArray(rg.rules);
var isRuleGroupType = (rg) => isRuleGroup(rg) && typeof rg.combinator === "string";
var isRuleGroupTypeIC = (rg) => isRuleGroup(rg) && typeof rg.combinator === "undefined";

// src/utils/convertQuery.ts
var processRuleOrStringOrRuleGroupIC = (r) => isRuleGroup(r) ? generateRuleGroupICWithConsistentCombinators(r) : r;
var generateRuleGroupICWithConsistentCombinators = (rg) => {
  const returnArray = [];
  const push = (r) => returnArray.push(processRuleOrStringOrRuleGroupIC(r));
  let startIndex = 0;
  for (let i = 0; i < rg.rules.length; i += 2) {
    if (rg.rules.length === 1) {
      push(rg.rules[0]);
    } else if (rg.rules[i + 1] === "and") {
      startIndex = i;
      let j = 1;
      while (rg.rules[startIndex + j] === "and") {
        i += 2;
        j += 2;
      }
      returnArray.push({
        // @ts-expect-error Too complicated to keep track of odd/even indexes in TS
        rules: rg.rules.slice(startIndex, i + 1).map(processRuleOrStringOrRuleGroupIC)
      });
      i -= 2;
    } else if (rg.rules[i + 1] === "or") {
      if (i === 0 || i === rg.rules.length - 3) {
        if (i === 0 || rg.rules[i - 1] === "or") {
          push(rg.rules[i]);
        }
        push(rg.rules[i + 1]);
        if (i === rg.rules.length - 3) {
          push(rg.rules[i + 2]);
        }
      } else {
        if (rg.rules[i - 1] === "and") {
          push(rg.rules[i + 1]);
        } else {
          push(rg.rules[i]);
          push(rg.rules[i + 1]);
        }
      }
    }
  }
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error TS still thinks returnArray has length 0
    returnArray.length === 1 && typeof returnArray[0] === "object" && isRuleGroup(returnArray[0])
  ) {
    return __spreadValues(__spreadValues({}, rg), returnArray[0]);
  }
  return __spreadProps(__spreadValues({}, rg), { rules: returnArray });
};
var convertFromIC = (rg) => {
  if (isRuleGroupType(rg)) {
    return rg;
  }
  const processedRG = generateRuleGroupICWithConsistentCombinators(rg);
  const rulesAsMixedList = processedRG.rules.map(
    (r) => typeof r === "string" || !isRuleGroup(r) ? r : convertFromIC(r)
  );
  const combinator = rulesAsMixedList.length < 2 ? "and" : rulesAsMixedList[1];
  const rules = rulesAsMixedList.filter((r) => typeof r !== "string");
  return __spreadProps(__spreadValues({}, processedRG), { combinator, rules });
};
var convertToIC = (rg) => {
  if (isRuleGroupTypeIC(rg)) {
    return rg;
  }
  const _a = rg, { combinator } = _a, queryWithoutCombinator = __objRest(_a, ["combinator"]);
  const rules = [];
  const { length } = rg.rules;
  rg.rules.forEach((r, idx) => {
    if (isRuleGroup(r)) {
      rules.push(convertToIC(r));
    } else {
      rules.push(r);
    }
    if (combinator && idx < length - 1) {
      rules.push(combinator);
    }
  });
  return __spreadProps(__spreadValues({}, queryWithoutCombinator), { rules });
};
function convertQuery(query) {
  return isRuleGroupTypeIC(query) ? convertFromIC(query) : convertToIC(query);
}

// src/utils/defaultValidator.ts
var defaultValidator = (query) => {
  const result = {};
  const validateRule = (_rule) => {
  };
  const validateGroup = (rg) => {
    const reasons = [];
    if (rg.rules.length === 0) {
      reasons.push(groupInvalidReasons.empty);
    } else if (!isRuleGroupType(rg)) {
      let invalidICs = false;
      for (let i = 0; i < rg.rules.length && !invalidICs; i++) {
        if (i % 2 === 0 && typeof rg.rules[i] === "string" || i % 2 === 1 && typeof rg.rules[i] !== "string" || i % 2 === 1 && typeof rg.rules[i] === "string" && !defaultCombinators.map((c) => c.name).includes(rg.rules[i])) {
          invalidICs = true;
        }
      }
      if (invalidICs) {
        reasons.push(groupInvalidReasons.invalidIndependentCombinators);
      }
    }
    if (isRuleGroupType(rg) && !defaultCombinators.map((c) => c.name).includes(rg.combinator) && rg.rules.length > 1) {
      reasons.push(groupInvalidReasons.invalidCombinator);
    }
    if (rg.id) {
      if (reasons.length) {
        result[rg.id] = { valid: false, reasons };
      } else {
        result[rg.id] = true;
      }
    }
    rg.rules.forEach((r) => {
      if (typeof r === "string") {
      } else if (isRuleGroup(r)) {
        validateGroup(r);
      } else {
        validateRule(r);
      }
    });
  };
  validateGroup(query);
  return result;
};

// src/utils/toFullOption.ts
import { produce } from "immer";
var isOptionWithName = (opt) => isPojo(opt) && "name" in opt && typeof opt.name === "string";
var isOptionWithValue = (opt) => isPojo(opt) && "value" in opt && typeof opt.value === "string";
function toFullOption(opt, baseProperties) {
  const recipe = produce((draft) => {
    const idObj = {};
    let needsUpdating = !!baseProperties;
    if (isOptionWithName(draft) && !isOptionWithValue(draft)) {
      idObj.value = draft.name;
      needsUpdating = true;
    } else if (!isOptionWithName(draft) && isOptionWithValue(draft)) {
      idObj.name = draft.value;
      needsUpdating = true;
    }
    if (needsUpdating) {
      return Object.assign({}, baseProperties, draft, idObj);
    }
  });
  return recipe(opt);
}
function toFullOptionList(optList, baseProperties) {
  if (!Array.isArray(optList)) {
    return [];
  }
  const recipe = produce((draft) => {
    if (isFlexibleOptionGroupArray(draft)) {
      for (const optGroup of draft) {
        optGroup.options.forEach(
          (opt, idx) => optGroup.options[idx] = toFullOption(opt, baseProperties)
        );
      }
    } else {
      draft.forEach((opt, idx) => draft[idx] = toFullOption(opt, baseProperties));
    }
  });
  return recipe(optList);
}
function toFullOptionMap(optMap, baseProperties) {
  return Object.fromEntries(
    Object.entries(optMap).map(([k, v]) => [
      k,
      toFullOption(v, baseProperties)
    ])
  );
}

// src/utils/uniq.ts
var uniqByName = (originalArray) => uniqByIdentifier(originalArray);
var uniqByIdentifier = (originalArray) => {
  const names = /* @__PURE__ */ new Set();
  const newArray = [];
  originalArray.forEach((el) => {
    var _a, _b;
    if (!names.has((_a = el.value) != null ? _a : el.name)) {
      names.add((_b = el.value) != null ? _b : el.name);
      newArray.push(el);
    }
  });
  return originalArray.length === newArray.length ? originalArray : newArray;
};
var uniqOptGroups = (originalArray) => {
  const labels = /* @__PURE__ */ new Set();
  const names = /* @__PURE__ */ new Set();
  const newArray = [];
  originalArray.forEach((el) => {
    if (!labels.has(el.label)) {
      labels.add(el.label);
      const optionsForThisGroup = [];
      el.options.forEach((opt) => {
        var _a, _b;
        if (!names.has((_a = opt.value) != null ? _a : opt.name)) {
          names.add((_b = opt.value) != null ? _b : opt.name);
          optionsForThisGroup.push(toFullOption(opt));
        }
      });
      newArray.push(__spreadProps(__spreadValues({}, el), { options: optionsForThisGroup }));
    }
  });
  return newArray;
};
var uniqOptList = (originalArray) => {
  if (isFlexibleOptionGroupArray(originalArray)) {
    return uniqOptGroups(originalArray);
  }
  return uniqByIdentifier(originalArray.map((o) => toFullOption(o)));
};

// src/utils/optGroupUtils.ts
var isOptionGroupArray = (arr) => Array.isArray(arr) && arr.length > 0 && isPojo(arr[0]) && "options" in arr[0] && Array.isArray(arr[0].options);
var isFlexibleOptionGroupArray = (arr) => {
  if (Array.isArray(arr)) {
    for (const og of arr) {
      if (isPojo(og) && "options" in og) {
        for (const opt of og.options) {
          if (isPojo(opt) && ("name" in opt || "value" in opt)) {
            return true;
          }
          return false;
        }
      }
    }
  }
  return false;
};
var isFullOptionGroupArray = (arr) => {
  if (Array.isArray(arr)) {
    for (const og of arr) {
      if (isPojo(og) && "options" in og) {
        for (const opt of og.options) {
          if (isPojo(opt) && "name" in opt && "value" in opt) {
            return true;
          }
          return false;
        }
      }
    }
  }
  return false;
};
var getOption = (arr, name) => (isOptionGroupArray(arr) ? arr.flatMap((og) => og.options) : arr).find(
  (op) => op.value === name || op.name === name
);
var getFirstOption = (arr) => {
  var _a, _b;
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  } else if (isFlexibleOptionGroupArray(arr)) {
    for (const og of arr) {
      if (og.options.length > 0) {
        return (_a = og.options[0].value) != null ? _a : og.options[0].name;
      }
    }
    return null;
  }
  return (_b = arr[0].value) != null ? _b : arr[0].name;
};
var toFlatOptionArray = (arr) => uniqByIdentifier(isOptionGroupArray(arr) ? arr.flatMap((og) => og.options) : arr);

// src/utils/filterFieldsByComparator.ts
var filterByComparator = (field, operator, fieldToCompare) => {
  var _a, _b;
  const fullField = toFullOption(field);
  const fullFieldToCompare = toFullOption(fieldToCompare);
  if (fullField.value === fullFieldToCompare.value) {
    return false;
  }
  if (typeof fullField.comparator === "string") {
    return fullField[fullField.comparator] === fullFieldToCompare[fullField.comparator];
  }
  return (_b = (_a = fullField.comparator) == null ? void 0 : _a.call(fullField, fullFieldToCompare, operator)) != null ? _b : (
    /* istanbul ignore next */
    false
  );
};
var filterFieldsByComparator = (field, fields, operator) => {
  if (!field.comparator) {
    const filterOutSameField = (f) => {
      var _a, _b;
      return ((_a = f.value) != null ? _a : (
        /* istanbul ignore next */
        f.name
      )) !== ((_b = field.value) != null ? _b : (
        /* istanbul ignore next */
        field.name
      ));
    };
    if (isFlexibleOptionGroupArray(fields)) {
      return fields.map((og) => __spreadProps(__spreadValues({}, og), {
        options: og.options.filter(filterOutSameField)
      }));
    }
    return fields.filter(filterOutSameField);
  }
  if (isFlexibleOptionGroupArray(fields)) {
    return fields.map((og) => __spreadProps(__spreadValues({}, og), {
      options: og.options.filter((f) => filterByComparator(field, operator, f))
    })).filter((og) => og.options.length > 0);
  }
  return fields.filter((f) => filterByComparator(field, operator, f));
};

// src/utils/parseNumber.ts
import { numericQuantity } from "numeric-quantity";
var parseNumber = (v, pno = {}) => {
  if (!pno.parseNumbers || typeof v === "bigint" || typeof v === "number") {
    return v;
  }
  if (pno.parseNumbers === "native") {
    return parseFloat(v);
  }
  const n = (
    // TODO: Should these options be configurable?
    numericQuantity(v, {
      allowTrailingInvalid: pno.parseNumbers === "enhanced",
      romanNumerals: true,
      round: false
    })
  );
  return isNaN(n) ? v : n;
};

// src/utils/formatQuery/utils.ts
var mapSQLOperator = (op) => {
  switch (op.toLowerCase()) {
    case "null":
      return "is null";
    case "notnull":
      return "is not null";
    case "notin":
      return "not in";
    case "notbetween":
      return "not between";
    case "contains":
    case "beginswith":
    case "endswith":
      return "like";
    case "doesnotcontain":
    case "doesnotbeginwith":
    case "doesnotendwith":
      return "not like";
    default:
      return op;
  }
};
var mongoOperators = {
  "=": "$eq",
  "!=": "$ne",
  "<": "$lt",
  "<=": "$lte",
  ">": "$gt",
  ">=": "$gte",
  in: "$in",
  notIn: "$nin"
};
var celCombinatorMap = {
  and: "&&",
  or: "||"
};
var jsonLogicAdditionalOperators = {
  startsWith: (a, b) => typeof a === "string" && a.startsWith(b),
  endsWith: (a, b) => typeof a === "string" && a.endsWith(b)
};
var numerifyValues = (rg) => __spreadProps(__spreadValues({}, rg), {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error TS doesn't keep track of odd/even indexes here
  rules: rg.rules.map((r) => {
    if (typeof r === "string") {
      return r;
    }
    if (isRuleGroup(r)) {
      return numerifyValues(r);
    }
    let { value } = r;
    if (typeof value === "string") {
      value = parseNumber(value, { parseNumbers: true });
    }
    return __spreadProps(__spreadValues({}, r), { value });
  })
});
var isValidValue = (v) => typeof v === "string" && v.length > 0 || typeof v === "number" && !isNaN(v) || typeof v !== "string" && typeof v !== "number";
var shouldRenderAsNumber = (v, parseNumbers) => parseNumbers && (typeof v === "number" || typeof v === "bigint" || typeof v === "string" && numericRegex.test(v));
var isValueProcessorLegacy = (vp) => vp.length >= 3;
var quoteFieldNamesWithArray = (quoteFieldNamesWith = ["", ""]) => Array.isArray(quoteFieldNamesWith) ? quoteFieldNamesWith : typeof quoteFieldNamesWith === "string" ? [quoteFieldNamesWith, quoteFieldNamesWith] : quoteFieldNamesWith != null ? quoteFieldNamesWith : ["", ""];
var nullOrUndefinedOrEmpty = (v) => v === null || typeof v === "undefined" || v === "";

// src/utils/formatQuery/defaultRuleProcessorCEL.ts
var shouldNegate = (op) => /^(does)?not/i.test(op);
var escapeDoubleQuotes = (v, escapeQuotes) => typeof v !== "string" || !escapeQuotes ? v : v.replaceAll(`"`, `\\"`);
var defaultRuleProcessorCEL = ({ field, operator, value, valueSource }, { escapeQuotes, parseNumbers } = {}) => {
  const valueIsField = valueSource === "field";
  const operatorTL = operator.replace(/^=$/, "==");
  const useBareValue = typeof value === "number" || typeof value === "boolean" || typeof value === "bigint" || shouldRenderAsNumber(value, parseNumbers);
  switch (operatorTL) {
    case "<":
    case "<=":
    case "==":
    case "!=":
    case ">":
    case ">=":
      return `${field} ${operatorTL} ${valueIsField || useBareValue ? trimIfString(value) : `"${escapeDoubleQuotes(value, escapeQuotes)}"`}`;
    case "contains":
    case "doesNotContain": {
      const negate2 = shouldNegate(operatorTL) ? "!" : "";
      return `${negate2}${field}.contains(${valueIsField ? trimIfString(value) : `"${escapeDoubleQuotes(value, escapeQuotes)}"`})`;
    }
    case "beginsWith":
    case "doesNotBeginWith": {
      const negate2 = shouldNegate(operatorTL) ? "!" : "";
      return `${negate2}${field}.startsWith(${valueIsField ? trimIfString(value) : `"${escapeDoubleQuotes(value, escapeQuotes)}"`})`;
    }
    case "endsWith":
    case "doesNotEndWith": {
      const negate2 = shouldNegate(operatorTL) ? "!" : "";
      return `${negate2}${field}.endsWith(${valueIsField ? trimIfString(value) : `"${escapeDoubleQuotes(value, escapeQuotes)}"`})`;
    }
    case "null":
      return `${field} == null`;
    case "notNull":
      return `${field} != null`;
    case "in":
    case "notIn": {
      const negate2 = shouldNegate(operatorTL);
      const valueAsArray = toArray(value);
      return `${negate2 ? "!(" : ""}${field} in [${valueAsArray.map(
        (val) => valueIsField || shouldRenderAsNumber(val, parseNumbers) ? `${trimIfString(val)}` : `"${escapeDoubleQuotes(val, escapeQuotes)}"`
      ).join(", ")}]${negate2 ? ")" : ""}`;
    }
    case "between":
    case "notBetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && !nullOrUndefinedOrEmpty(valueAsArray[0]) && !nullOrUndefinedOrEmpty(valueAsArray[1])) {
        const [first, second] = valueAsArray;
        const firstNum = shouldRenderAsNumber(first, true) ? parseNumber(first, { parseNumbers: true }) : NaN;
        const secondNum = shouldRenderAsNumber(second, true) ? parseNumber(second, { parseNumbers: true }) : NaN;
        let firstValue = isNaN(firstNum) ? valueIsField ? `${first}` : `"${escapeDoubleQuotes(first, escapeQuotes)}"` : firstNum;
        let secondValue = isNaN(secondNum) ? valueIsField ? `${second}` : `"${escapeDoubleQuotes(second, escapeQuotes)}"` : secondNum;
        if (firstValue === firstNum && secondValue === secondNum && secondNum < firstNum) {
          const tempNum = secondNum;
          secondValue = firstNum;
          firstValue = tempNum;
        }
        if (operator === "between") {
          return `(${field} >= ${firstValue} && ${field} <= ${secondValue})`;
        } else {
          return `(${field} < ${firstValue} || ${field} > ${secondValue})`;
        }
      } else {
        return "";
      }
    }
  }
  return "";
};

// src/utils/formatQuery/defaultRuleProcessorMongoDB.ts
var defaultRuleProcessorMongoDB = ({ field, operator, value, valueSource }, { parseNumbers } = {}) => {
  const valueIsField = valueSource === "field";
  const useBareValue = typeof value === "number" || typeof value === "boolean" || typeof value === "bigint" || shouldRenderAsNumber(value, parseNumbers);
  if (operator === "=" && !valueIsField) {
    return `{"${field}":${useBareValue ? trimIfString(value) : JSON.stringify(value)}}`;
  }
  switch (operator) {
    case "<":
    case "<=":
    case "=":
    case "!=":
    case ">":
    case ">=": {
      const mongoOperator = mongoOperators[operator];
      return valueIsField ? `{"$expr":{"${mongoOperator}":["$${field}","$${value}"]}}` : `{"${field}":{"${mongoOperator}":${useBareValue ? trimIfString(value) : JSON.stringify(value)}}}`;
    }
    case "contains":
      return valueIsField ? `{"$where":"this.${field}.includes(this.${value})"}` : `{"${field}":{"$regex":${JSON.stringify(value)}}}`;
    case "beginsWith":
      return valueIsField ? `{"$where":"this.${field}.startsWith(this.${value})"}` : `{"${field}":{"$regex":${JSON.stringify(`^${value}`)}}}`;
    case "endsWith":
      return valueIsField ? `{"$where":"this.${field}.endsWith(this.${value})"}` : `{"${field}":{"$regex":${JSON.stringify(`${value}$`)}}}`;
    case "doesNotContain":
      return valueIsField ? `{"$where":"!this.${field}.includes(this.${value})"}` : `{"${field}":{"$not":{"$regex":${JSON.stringify(value)}}}}`;
    case "doesNotBeginWith":
      return valueIsField ? `{"$where":"!this.${field}.startsWith(this.${value})"}` : `{"${field}":{"$not":{"$regex":${JSON.stringify(`^${value}`)}}}}`;
    case "doesNotEndWith":
      return valueIsField ? `{"$where":"!this.${field}.endsWith(this.${value})"}` : `{"${field}":{"$not":{"$regex":${JSON.stringify(`${value}$`)}}}}`;
    case "null":
      return `{"${field}":null}`;
    case "notNull":
      return `{"${field}":{"$ne":null}}`;
    case "in":
    case "notIn": {
      const valueAsArray = toArray(value);
      return valueIsField ? `{"$where":"${operator === "notIn" ? "!" : ""}[${valueAsArray.map((val) => `this.${val}`).join(",")}].includes(this.${field})"}` : `{"${field}":{"${mongoOperators[operator]}":[${valueAsArray.map(
        (val) => shouldRenderAsNumber(val, parseNumbers) ? `${trimIfString(val)}` : JSON.stringify(val)
      ).join(",")}]}}`;
    }
    case "between":
    case "notBetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && isValidValue(valueAsArray[0]) && isValidValue(valueAsArray[1])) {
        const [first, second] = valueAsArray;
        const firstNum = shouldRenderAsNumber(first, true) ? parseNumber(first, { parseNumbers: true }) : NaN;
        const secondNum = shouldRenderAsNumber(second, true) ? parseNumber(second, { parseNumbers: true }) : NaN;
        const firstValue = valueIsField || !isNaN(firstNum) ? `${first}` : `${JSON.stringify(first)}`;
        const secondValue = valueIsField || !isNaN(secondNum) ? `${second}` : `${JSON.stringify(second)}`;
        if (operator === "between") {
          return valueIsField ? `{"$and":[{"$expr":{"$gte":["$${field}","$${firstValue}"]}},{"$expr":{"$lte":["$${field}","$${secondValue}"]}}]}` : `{"${field}":{"$gte":${firstValue},"$lte":${secondValue}}}`;
        } else {
          return valueIsField ? `{"$or":[{"$expr":{"$lt":["$${field}","$${firstValue}"]}},{"$expr":{"$gt":["$${field}","$${secondValue}"]}}]}` : `{"$or":[{"${field}":{"$lt":${firstValue}}},{"${field}":{"$gt":${secondValue}}}]}`;
        }
      } else {
        return "";
      }
    }
  }
  return "";
};

// src/utils/formatQuery/defaultRuleProcessorSpEL.ts
var shouldNegate2 = (op) => /^(does)?not/i.test(op);
var wrapInNegation = (clause, negate2) => negate2 ? `!(${clause})` : `${clause}`;
var escapeSingleQuotes = (v, escapeQuotes) => typeof v !== "string" || !escapeQuotes ? v : v.replaceAll(`'`, `\\'`);
var defaultRuleProcessorSpEL = ({ field, operator, value, valueSource }, { escapeQuotes, parseNumbers } = {}) => {
  const valueIsField = valueSource === "field";
  const operatorTL = operator.replace(/^=$/, "==");
  const useBareValue = typeof value === "number" || typeof value === "boolean" || typeof value === "bigint" || shouldRenderAsNumber(value, parseNumbers);
  switch (operatorTL) {
    case "<":
    case "<=":
    case "==":
    case "!=":
    case ">":
    case ">=":
      return `${field} ${operatorTL} ${valueIsField || useBareValue ? trimIfString(value) : `'${escapeSingleQuotes(value, escapeQuotes)}'`}`;
    case "contains":
    case "doesNotContain":
      return wrapInNegation(
        `${field} matches ${valueIsField || useBareValue ? trimIfString(value) : `'${escapeSingleQuotes(value, escapeQuotes)}'`}`,
        shouldNegate2(operatorTL)
      );
    case "beginsWith":
    case "doesNotBeginWith": {
      const valueTL = valueIsField ? `'^'.concat(${trimIfString(value)})` : `'${typeof value === "string" && !value.startsWith("^") || useBareValue ? "^" : ""}${escapeSingleQuotes(value, escapeQuotes)}'`;
      return wrapInNegation(`${field} matches ${valueTL}`, shouldNegate2(operatorTL));
    }
    case "endsWith":
    case "doesNotEndWith": {
      const valueTL = valueIsField ? `${trimIfString(value)}.concat('$')` : `'${escapeSingleQuotes(value, escapeQuotes)}${typeof value === "string" && !value.endsWith("$") || useBareValue ? "$" : ""}'`;
      return wrapInNegation(`${field} matches ${valueTL}`, shouldNegate2(operatorTL));
    }
    case "null":
      return `${field} == null`;
    case "notNull":
      return `${field} != null`;
    case "in":
    case "notIn": {
      const negate2 = shouldNegate2(operatorTL) ? "!" : "";
      const valueAsArray = toArray(value);
      if (valueAsArray.length > 0) {
        return `${negate2}(${valueAsArray.map(
          (val) => `${field} == ${valueIsField || shouldRenderAsNumber(val, parseNumbers) ? `${trimIfString(val)}` : `'${escapeSingleQuotes(val, escapeQuotes)}'`}`
        ).join(" or ")})`;
      } else {
        return "";
      }
    }
    case "between":
    case "notBetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && !nullOrUndefinedOrEmpty(valueAsArray[0]) && !nullOrUndefinedOrEmpty(valueAsArray[1])) {
        const [first, second] = valueAsArray;
        const firstNum = shouldRenderAsNumber(first, true) ? parseNumber(first, { parseNumbers: true }) : NaN;
        const secondNum = shouldRenderAsNumber(second, true) ? parseNumber(second, { parseNumbers: true }) : NaN;
        let firstValue = isNaN(firstNum) ? valueIsField ? `${first}` : `'${escapeSingleQuotes(first, escapeQuotes)}'` : firstNum;
        let secondValue = isNaN(secondNum) ? valueIsField ? `${second}` : `'${escapeSingleQuotes(second, escapeQuotes)}'` : secondNum;
        if (firstValue === firstNum && secondValue === secondNum && secondNum < firstNum) {
          const tempNum = secondNum;
          secondValue = firstNum;
          firstValue = tempNum;
        }
        if (operator === "between") {
          return `(${field} >= ${firstValue} and ${field} <= ${secondValue})`;
        } else {
          return `(${field} < ${firstValue} or ${field} > ${secondValue})`;
        }
      } else {
        return "";
      }
    }
  }
  return "";
};

// src/utils/formatQuery/defaultValueProcessorByRule.ts
var escapeStringValueQuotes = (v, quoteChar, escapeQuotes) => escapeQuotes && typeof v === "string" ? v.replaceAll(`${quoteChar}`, `${quoteChar}${quoteChar}`) : v;
var defaultValueProcessorByRule = ({ operator, value, valueSource }, { escapeQuotes, parseNumbers, quoteFieldNamesWith, quoteValuesWith } = {}) => {
  const valueIsField = valueSource === "field";
  const [qfnwPre, qfnwPost] = quoteFieldNamesWithArray(quoteFieldNamesWith);
  const operatorLowerCase = operator.toLowerCase();
  const quoteChar = quoteValuesWith || "'";
  const escapeValue = (v) => escapeStringValueQuotes(v, quoteChar, escapeQuotes);
  const wrapAndEscape = (v) => `${quoteChar}${escapeValue(v)}${quoteChar}`;
  const wrapFieldName = (f) => `${qfnwPre}${f}${qfnwPost}`;
  switch (operatorLowerCase) {
    case "null":
    case "notnull": {
      return "";
    }
    case "in":
    case "notin": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length > 0) {
        return `(${valueAsArray.map(
          (v) => valueIsField ? wrapFieldName(v) : shouldRenderAsNumber(v, parseNumbers) ? `${trimIfString(v)}` : `${wrapAndEscape(v)}`
        ).join(", ")})`;
      }
      return "";
    }
    case "between":
    case "notbetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && isValidValue(valueAsArray[0]) && isValidValue(valueAsArray[1])) {
        const [first, second] = valueAsArray;
        return valueIsField ? `${wrapFieldName(first)} and ${wrapFieldName(second)}` : shouldRenderAsNumber(first, parseNumbers) && shouldRenderAsNumber(second, parseNumbers) ? `${trimIfString(first)} and ${trimIfString(second)}` : `${wrapAndEscape(first)} and ${wrapAndEscape(second)}`;
      }
      return "";
    }
    case "contains":
    case "doesnotcontain":
      return valueIsField ? `${quoteChar}%${quoteChar} || ${wrapFieldName(value)} || ${quoteChar}%${quoteChar}` : `${quoteChar}%${escapeValue(value)}%${quoteChar}`;
    case "beginswith":
    case "doesnotbeginwith":
      return valueIsField ? `${wrapFieldName(value)} || ${quoteChar}%${quoteChar}` : `${quoteChar}${escapeValue(value)}%${quoteChar}`;
    case "endswith":
    case "doesnotendwith":
      return valueIsField ? `${quoteChar}%${quoteChar} || ${wrapFieldName(value)}` : `${quoteChar}%${escapeValue(value)}${quoteChar}`;
  }
  if (typeof value === "boolean") {
    return value ? "TRUE" : "FALSE";
  }
  return valueIsField ? wrapFieldName(value) : shouldRenderAsNumber(value, parseNumbers) ? `${trimIfString(value)}` : `${wrapAndEscape(value)}`;
};

// src/utils/formatQuery/defaultRuleProcessorElasticSearch.ts
var rangeOperatorMap = { "<": "lt", "<=": "lte", ">": "gt", ">=": "gte" };
var negateIfNotOp = (op, elasticSearchRule) => /^(does)?not/i.test(op) ? { bool: { must_not: elasticSearchRule } } : elasticSearchRule;
var escapeSQ = (s) => s == null ? void 0 : s.replace(/('|\\)/g, `\\$1`);
var textFunctionMap = {
  beginsWith: "startsWith",
  doesNotContain: "contains",
  doesNotBeginWith: "startsWith",
  doesNotEndWith: "endsWith"
};
var getTextScript = (f, o, v) => {
  var _a;
  const script = `doc['${f}'].${(_a = textFunctionMap[o]) != null ? _a : o}(doc['${v}'])`;
  return o.startsWith("d") ? `!${script}` : script;
};
var valueRenderer = (v, parseNumbers) => typeof v === "boolean" ? v : shouldRenderAsNumber(v, parseNumbers) ? parseNumber(v, { parseNumbers }) : v;
var defaultRuleProcessorElasticSearch = ({ field, operator, value, valueSource }, { parseNumbers } = {}) => {
  if (valueSource === "field") {
    if (toArray(value).some((v) => typeof v !== "string")) return false;
    const fieldForScript = escapeSQ(field);
    switch (operator) {
      case "=":
      case "!=":
      case ">":
      case ">=":
      case "<":
      case "<=": {
        const operatorForScript = operator === "=" ? "==" : operator;
        const valueForScript = escapeSQ(value);
        return !valueForScript ? false : {
          bool: {
            filter: {
              script: {
                script: `doc['${fieldForScript}'] ${operatorForScript} doc['${valueForScript}']`
              }
            }
          }
        };
      }
      case "in":
      case "notIn": {
        const valueAsArray = toArray(value);
        if (valueAsArray.length > 0) {
          const arr = valueAsArray.map((v) => ({
            bool: { filter: { script: { script: `doc['${fieldForScript}'] == doc['${v}']` } } }
          }));
          return { bool: operator === "in" ? { should: arr } : { must_not: arr } };
        }
        return false;
      }
      case "between":
      case "notBetween": {
        const valueAsArray = toArray(value);
        if (valueAsArray.length >= 2 && valueAsArray[0] && valueAsArray[1]) {
          const script = `doc['${fieldForScript}'] >= doc['${valueAsArray[0]}'] && doc['${fieldForScript}'] <= doc['${valueAsArray[1]}']`;
          return {
            bool: {
              filter: { script: { script: operator === "notBetween" ? `!(${script})` : script } }
            }
          };
        }
        return false;
      }
      case "contains":
      case "doesNotContain":
      case "beginsWith":
      case "doesNotBeginWith":
      case "endsWith":
      case "doesNotEndWith": {
        const valueForScript = escapeSQ(value);
        if (!valueForScript) return false;
        const script = getTextScript(fieldForScript, operator, valueForScript);
        return {
          bool: {
            filter: {
              script: {
                script
              }
            }
          }
        };
      }
    }
  }
  switch (operator) {
    case "<":
    case "<=":
    case ">":
    case ">=":
      return {
        range: {
          [field]: {
            [rangeOperatorMap[operator]]: valueRenderer(value, parseNumbers)
          }
        }
      };
    case "=":
      return { term: { [field]: valueRenderer(value, parseNumbers) } };
    case "!=":
      return { bool: { must_not: { term: { [field]: valueRenderer(value, parseNumbers) } } } };
    case "null":
      return { bool: { must_not: { exists: { field } } } };
    case "notNull":
      return { exists: { field } };
    case "in":
    case "notIn": {
      const valueAsArray = toArray(value).map((v) => valueRenderer(v, parseNumbers));
      if (valueAsArray.length > 0) {
        const arr = valueAsArray.map((v) => ({ term: { [field]: valueRenderer(v, parseNumbers) } }));
        return { bool: operator === "in" ? { should: arr } : { must_not: arr } };
      }
      return false;
    }
    case "between":
    case "notBetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && isValidValue(valueAsArray[0]) && isValidValue(valueAsArray[1])) {
        let [first, second] = valueAsArray;
        if (shouldRenderAsNumber(first, true) && shouldRenderAsNumber(second, true)) {
          const firstNum = parseNumber(first, { parseNumbers: true });
          const secondNum = parseNumber(second, { parseNumbers: true });
          if (secondNum < firstNum) {
            const tempNum = secondNum;
            second = firstNum;
            first = tempNum;
          } else {
            first = firstNum;
            second = secondNum;
          }
        }
        return negateIfNotOp(operator, { range: { [field]: { gte: first, lte: second } } });
      }
      return false;
    }
    case "contains":
    case "doesNotContain":
      return negateIfNotOp(operator, { regexp: { [field]: { value: `.*${value}.*` } } });
    case "beginsWith":
    case "doesNotBeginWith":
      return negateIfNotOp(operator, { regexp: { [field]: { value: `${value}.*` } } });
    case "endsWith":
    case "doesNotEndWith":
      return negateIfNotOp(operator, { regexp: { [field]: { value: `.*${value}` } } });
  }
  return false;
};

// src/utils/formatQuery/defaultRuleProcessorJSONata.ts
var shouldNegate3 = (op) => /^(does)?not/i.test(op);
var quote = (v, escapeQuotes) => `"${typeof v !== "string" || !escapeQuotes ? v : v.replaceAll(`"`, `\\"`)}"`;
var negate = (clause, negate2) => negate2 ? `$not(${clause})` : `${clause}`;
var escapeStringRegex = (s) => `${s}`.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
var defaultRuleProcessorJSONata = ({ field, operator, value, valueSource }, { escapeQuotes, parseNumbers = true, quoteFieldNamesWith = ["", ""] } = {}) => {
  const valueIsField = valueSource === "field";
  const useBareValue = typeof value === "number" || typeof value === "boolean" || typeof value === "bigint" || shouldRenderAsNumber(value, parseNumbers);
  const [qPre, qPost] = quoteFieldNamesWithArray(quoteFieldNamesWith);
  const qfn = (f) => `${qPre}${f}${qPost}`;
  switch (operator) {
    case "<":
    case "<=":
    case "=":
    case "!=":
    case ">":
    case ">=":
      return `${qfn(field)} ${operator} ${valueIsField ? qfn(trimIfString(value)) : useBareValue ? trimIfString(value) : quote(value, escapeQuotes)}`;
    case "contains":
    case "doesNotContain":
      return negate(
        `$contains(${qfn(field)}, ${valueIsField ? qfn(trimIfString(value)) : quote(value, escapeQuotes)})`,
        shouldNegate3(operator)
      );
    case "beginsWith":
    case "doesNotBeginWith":
      return negate(
        valueIsField ? `$substring(${qfn(field)}, 0, $length(${qfn(trimIfString(value))})) = ${qfn(trimIfString(value))}` : `$contains(${qfn(field)}, /^${escapeStringRegex(value)}/)`,
        shouldNegate3(operator)
      );
    case "endsWith":
    case "doesNotEndWith":
      return negate(
        valueIsField ? `$substring(${qfn(field)}, $length(${qfn(field)}) - $length(${qfn(trimIfString(value))})) = ${qfn(trimIfString(value))}` : `$contains(${qfn(field)}, /${escapeStringRegex(value)}$/)`,
        shouldNegate3(operator)
      );
    case "null":
      return `${qfn(field)} = null`;
    case "notNull":
      return `${qfn(field)} != null`;
    case "in":
    case "notIn": {
      const valueAsArray = toArray(value);
      return negate(
        `${qfn(field)} in [${valueAsArray.map(
          (val) => valueIsField ? `${qfn(trimIfString(val))}` : shouldRenderAsNumber(val, parseNumbers) ? `${trimIfString(val)}` : quote(val, escapeQuotes)
        ).join(", ")}]`,
        shouldNegate3(operator)
      );
    }
    case "between":
    case "notBetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && !nullOrUndefinedOrEmpty(valueAsArray[0]) && !nullOrUndefinedOrEmpty(valueAsArray[1])) {
        const [first, second] = valueAsArray;
        const firstNum = shouldRenderAsNumber(first, true) ? parseNumber(first, { parseNumbers: true }) : NaN;
        const secondNum = shouldRenderAsNumber(second, true) ? parseNumber(second, { parseNumbers: true }) : NaN;
        let firstValue = isNaN(firstNum) ? valueIsField ? `${first}` : first : firstNum;
        let secondValue = isNaN(secondNum) ? valueIsField ? `${second}` : second : secondNum;
        if (firstValue === firstNum && secondValue === secondNum && secondNum < firstNum) {
          const tempNum = secondNum;
          secondValue = firstNum;
          firstValue = tempNum;
        }
        const renderAsNumbers = shouldRenderAsNumber(first, parseNumbers) && shouldRenderAsNumber(second, parseNumbers);
        const expression = `${qfn(field)} >= ${valueIsField ? qfn(first) : renderAsNumbers ? firstValue : quote(firstValue, escapeQuotes)} and ${qfn(field)} <= ${valueIsField ? qfn(second) : renderAsNumbers ? secondValue : quote(secondValue, escapeQuotes)}`;
        return operator === "between" ? `(${expression})` : negate(expression, true);
      } else {
        return "";
      }
    }
  }
  return "";
};

// src/utils/formatQuery/defaultRuleProcessorJsonLogic.ts
var convertOperator = (op) => op.replace(/^(=)$/, "$1=").replace(/^notNull$/i, "!=").replace(/^null$/i, "==");
var negateIfNotOp2 = (op, jsonRule) => /^(does)?not/i.test(op) ? { "!": jsonRule } : jsonRule;
var defaultRuleProcessorJsonLogic = ({ field, operator, value, valueSource }, { parseNumbers } = {}) => {
  const valueIsField = valueSource === "field";
  const fieldObject = { var: field };
  const fieldOrNumberRenderer = (v) => valueIsField ? { var: `${v}` } : shouldRenderAsNumber(v, parseNumbers) ? parseNumber(v, { parseNumbers }) : v;
  switch (operator) {
    case "<":
    case "<=":
    case "=":
    case "!=":
    case ">":
    case ">=":
      return {
        [convertOperator(operator)]: [fieldObject, fieldOrNumberRenderer(value)]
      };
    case "null":
    case "notNull": {
      return {
        [`${operator === "notNull" ? "!" : "="}=`]: [fieldObject, null]
      };
    }
    case "in":
    case "notIn": {
      const valueAsArray = toArray(value).map(fieldOrNumberRenderer);
      return negateIfNotOp2(operator, { in: [fieldObject, valueAsArray] });
    }
    case "between":
    case "notBetween": {
      const valueAsArray = toArray(value);
      if (valueAsArray.length >= 2 && isValidValue(valueAsArray[0]) && isValidValue(valueAsArray[1])) {
        let [first, second] = valueAsArray;
        if (!valueIsField && shouldRenderAsNumber(first, true) && shouldRenderAsNumber(second, true)) {
          const firstNum = parseNumber(first, { parseNumbers: true });
          const secondNum = parseNumber(second, { parseNumbers: true });
          if (secondNum < firstNum) {
            const tempNum = secondNum;
            second = firstNum;
            first = tempNum;
          } else {
            first = firstNum;
            second = secondNum;
          }
        } else if (valueIsField) {
          first = { var: first };
          second = { var: second };
        }
        const jsonRule = { "<=": [first, fieldObject, second] };
        return negateIfNotOp2(operator, jsonRule);
      }
      return false;
    }
    case "contains":
    case "doesNotContain": {
      const jsonRule = {
        in: [fieldOrNumberRenderer(value), fieldObject]
      };
      return negateIfNotOp2(operator, jsonRule);
    }
    case "beginsWith":
    case "doesNotBeginWith": {
      const jsonRule = {
        startsWith: [fieldObject, fieldOrNumberRenderer(value)]
      };
      return negateIfNotOp2(operator, jsonRule);
    }
    case "endsWith":
    case "doesNotEndWith": {
      const jsonRule = {
        endsWith: [fieldObject, fieldOrNumberRenderer(value)]
      };
      return negateIfNotOp2(operator, jsonRule);
    }
  }
  return false;
};

// src/utils/formatQuery/defaultRuleProcessorParameterized.ts
var defaultRuleProcessorParameterized = (rule, opts, meta) => {
  const {
    fieldData,
    format,
    getNextNamedParam,
    parseNumbers,
    paramPrefix,
    paramsKeepPrefix,
    numberedParams,
    quoteFieldNamesWith = ["", ""],
    valueProcessor = defaultValueProcessorByRule
  } = opts != null ? opts : {};
  const { processedParams = [] } = meta != null ? meta : {};
  const parameterized = format === "parameterized";
  const params = [];
  const paramsNamed = {};
  const finalize = (sql) => {
    if (parameterized) {
      return { sql, params };
    }
    return { sql, params: paramsNamed };
  };
  const value = valueProcessor(rule, {
    parseNumbers,
    quoteFieldNamesWith,
    fieldData,
    format
  });
  const sqlOperator = mapSQLOperator(rule.operator);
  const sqlOperatorLowerCase = sqlOperator.toLowerCase();
  if ((sqlOperatorLowerCase === "in" || sqlOperatorLowerCase === "not in" || sqlOperatorLowerCase === "between" || sqlOperatorLowerCase === "not between") && !value) {
    return finalize("");
  } else if (sqlOperatorLowerCase === "is null" || sqlOperatorLowerCase === "is not null") {
    return finalize(
      `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator}`
    );
  } else if (rule.valueSource === "field") {
    return finalize(
      `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator} ${value}`.trim()
    );
  }
  if (sqlOperatorLowerCase === "in" || sqlOperatorLowerCase === "not in") {
    const splitValue = toArray(rule.value);
    if (parameterized) {
      splitValue.forEach(
        (v) => params.push(shouldRenderAsNumber(v, parseNumbers) ? parseNumber(v, { parseNumbers }) : v)
      );
      return finalize(
        `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator} (${splitValue.map(
          (_v, i) => numberedParams ? `${paramPrefix}${processedParams.length + 1 + splitValue.length - (splitValue.length - i)}` : "?"
        ).join(", ")})`
      );
    }
    const inParams = [];
    splitValue.forEach((v) => {
      const thisParamName = getNextNamedParam(rule.field);
      inParams.push(`${paramPrefix}${thisParamName}`);
      paramsNamed[`${paramsKeepPrefix ? paramPrefix : ""}${thisParamName}`] = shouldRenderAsNumber(
        v,
        parseNumbers
      ) ? parseNumber(v, { parseNumbers }) : v;
    });
    return finalize(
      `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator} (${inParams.join(", ")})`
    );
  } else if (sqlOperatorLowerCase === "between" || sqlOperatorLowerCase === "not between") {
    const valueAsArray = toArray(rule.value);
    const [first, second] = valueAsArray.slice(0, 2).map((v) => shouldRenderAsNumber(v, parseNumbers) ? parseNumber(v, { parseNumbers }) : v);
    if (parameterized) {
      params.push(first);
      params.push(second);
      return finalize(
        `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator} ${numberedParams ? `${paramPrefix}${processedParams.length + 1}` : "?"} and ${numberedParams ? `${paramPrefix}${processedParams.length + 2}` : "?"}`
      );
    }
    const firstParamName = getNextNamedParam(rule.field);
    const secondParamName = getNextNamedParam(rule.field);
    paramsNamed[`${paramsKeepPrefix ? paramPrefix : ""}${firstParamName}`] = first;
    paramsNamed[`${paramsKeepPrefix ? paramPrefix : ""}${secondParamName}`] = second;
    return finalize(
      `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator} ${paramPrefix}${firstParamName} and ${paramPrefix}${secondParamName}`
    );
  }
  let paramValue = rule.value;
  if (typeof rule.value === "string") {
    if (shouldRenderAsNumber(rule.value, parseNumbers)) {
      paramValue = parseNumber(rule.value, { parseNumbers });
    } else {
      paramValue = /^'.*'$/g.test(value) ? value.replace(/(^'|'$)/g, "") : (
        /* istanbul ignore next */
        value
      );
    }
  }
  let paramName = "";
  if (parameterized) {
    params.push(paramValue);
  } else {
    paramName = getNextNamedParam(rule.field);
    paramsNamed[`${paramsKeepPrefix ? paramPrefix : ""}${paramName}`] = paramValue;
  }
  return finalize(
    `${quoteFieldNamesWith[0]}${rule.field}${quoteFieldNamesWith[1]} ${sqlOperator} ${parameterized ? numberedParams ? `${paramPrefix}${processedParams.length + 1}` : "?" : `${paramPrefix}${paramName}`}`.trim()
  );
};

// src/utils/formatQuery/defaultRuleProcessorSQL.ts
var defaultRuleProcessorSQL = (rule, opts) => {
  const {
    parseNumbers,
    escapeQuotes,
    quoteFieldNamesWith = ["", ""],
    quoteValuesWith = `'`,
    valueProcessor = defaultValueProcessorByRule
  } = opts != null ? opts : {};
  const value = valueProcessor(rule, {
    parseNumbers,
    escapeQuotes,
    quoteFieldNamesWith,
    quoteValuesWith
  });
  const operator = mapSQLOperator(rule.operator);
  const operatorLowerCase = operator.toLowerCase();
  if ((operatorLowerCase === "in" || operatorLowerCase === "not in" || operatorLowerCase === "between" || operatorLowerCase === "not between") && !value) {
    return "";
  }
  const [qPre, qPost] = quoteFieldNamesWithArray(quoteFieldNamesWith);
  return `${qPre}${rule.field}${qPost} ${operator} ${value}`.trim();
};

// src/utils/isRuleOrGroupValid.ts
var isValidationResult = (vr) => isPojo(vr) && typeof vr.valid === "boolean";
var isRuleOrGroupValid = (rg, validationResult, validator) => {
  if (typeof validationResult === "boolean") {
    return validationResult;
  }
  if (isValidationResult(validationResult)) {
    return validationResult.valid;
  }
  if (typeof validator === "function" && !isRuleGroup(rg)) {
    const vr = validator(rg);
    if (typeof vr === "boolean") {
      return vr;
    }
    if (isValidationResult(vr)) {
      return vr.valid;
    }
  }
  return true;
};

// src/utils/formatQuery/formatQuery.ts
function formatQuery(ruleGroup, options = {}) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  let format = "json";
  let valueProcessorInternal = defaultValueProcessorByRule;
  let ruleProcessorInternal = null;
  let quoteFieldNamesWith = ["", ""];
  let validator = () => true;
  let fields = [];
  let validationMap = {};
  let fallbackExpression = "";
  let paramPrefix = ":";
  let paramsKeepPrefix = false;
  let numberedParams = false;
  let parseNumbers = false;
  let placeholderFieldName = defaultPlaceholderFieldName;
  let placeholderOperatorName = defaultPlaceholderOperatorName;
  let quoteValuesWith = "'";
  if (typeof options === "string") {
    format = options.toLowerCase();
    if (format === "mongodb") {
      ruleProcessorInternal = defaultRuleProcessorMongoDB;
    } else if (format === "parameterized") {
      ruleProcessorInternal = defaultRuleProcessorParameterized;
    } else if (format === "parameterized_named") {
      ruleProcessorInternal = defaultRuleProcessorParameterized;
    } else if (format === "cel") {
      ruleProcessorInternal = defaultRuleProcessorCEL;
    } else if (format === "spel") {
      ruleProcessorInternal = defaultRuleProcessorSpEL;
    } else if (format === "jsonlogic") {
      ruleProcessorInternal = defaultRuleProcessorJsonLogic;
    } else if (format === "elasticsearch") {
      ruleProcessorInternal = defaultRuleProcessorElasticSearch;
    } else if (format === "jsonata") {
      ruleProcessorInternal = defaultRuleProcessorJSONata;
    }
  } else {
    format = ((_a = options.format) != null ? _a : "json").toLowerCase();
    const { valueProcessor = null, ruleProcessor = null } = options;
    if (typeof ruleProcessor === "function") {
      ruleProcessorInternal = ruleProcessor;
    }
    valueProcessorInternal = typeof valueProcessor === "function" ? (r, opts) => isValueProcessorLegacy(valueProcessor) ? valueProcessor(r.field, r.operator, r.value, r.valueSource) : valueProcessor(r, opts) : format === "mongodb" ? ruleProcessorInternal != null ? ruleProcessorInternal : defaultRuleProcessorMongoDB : format === "cel" ? ruleProcessorInternal != null ? ruleProcessorInternal : defaultRuleProcessorCEL : format === "spel" ? ruleProcessorInternal != null ? ruleProcessorInternal : defaultRuleProcessorSpEL : format === "jsonlogic" ? ruleProcessorInternal != null ? ruleProcessorInternal : defaultRuleProcessorJsonLogic : format === "elasticsearch" ? ruleProcessorInternal != null ? ruleProcessorInternal : defaultRuleProcessorElasticSearch : format === "jsonata" ? ruleProcessorInternal != null ? ruleProcessorInternal : defaultRuleProcessorJSONata : defaultValueProcessorByRule;
    quoteFieldNamesWith = quoteFieldNamesWithArray(options.quoteFieldNamesWith);
    validator = (_b = options.validator) != null ? _b : () => true;
    fields = toFullOptionList((_c = options.fields) != null ? _c : []);
    fallbackExpression = (_d = options.fallbackExpression) != null ? _d : "";
    paramPrefix = (_e = options.paramPrefix) != null ? _e : ":";
    paramsKeepPrefix = !!options.paramsKeepPrefix;
    numberedParams = !!options.numberedParams;
    parseNumbers = !!options.parseNumbers;
    placeholderFieldName = (_f = options.placeholderFieldName) != null ? _f : defaultPlaceholderFieldName;
    placeholderOperatorName = (_g = options.placeholderOperatorName) != null ? _g : defaultPlaceholderOperatorName;
    quoteValuesWith = (_h = options.quoteValuesWith) != null ? _h : "'";
  }
  if (!fallbackExpression) {
    fallbackExpression = format === "mongodb" ? '"$and":[{"$expr":true}]' : format === "cel" || format === "spel" ? "1 == 1" : "(1 = 1)";
  }
  if (format === "json" || format === "json_without_ids") {
    const rg = parseNumbers ? numerifyValues(ruleGroup) : ruleGroup;
    if (format === "json") {
      return JSON.stringify(rg, null, 2);
    }
    return JSON.stringify(
      rg,
      (key, value) => (
        // Remove `id` and `path` keys; leave everything else unchanged.
        key === "id" || key === "path" ? void 0 : value
      )
    );
  }
  if (typeof validator === "function") {
    const validationResult = validator(ruleGroup);
    if (typeof validationResult === "boolean") {
      if (validationResult === false) {
        return format === "parameterized" ? { sql: fallbackExpression, params: [] } : format === "parameterized_named" ? { sql: fallbackExpression, params: {} } : format === "mongodb" ? `{${fallbackExpression}}` : format === "jsonlogic" ? false : format === "elasticsearch" ? {} : fallbackExpression;
      }
    } else {
      validationMap = validationResult;
    }
  }
  const validatorMap = {};
  const uniqueFields = toFlatOptionArray(fields);
  uniqueFields.forEach((f) => {
    var _a2;
    if (typeof f.validator === "function") {
      validatorMap[(_a2 = f.value) != null ? _a2 : (
        /* istanbul ignore next */
        f.name
      )] = f.validator;
    }
  });
  const validateRule = (rule) => {
    let validationResult = void 0;
    let fieldValidator = void 0;
    if (rule.id) {
      validationResult = validationMap[rule.id];
    }
    if (uniqueFields.length) {
      const fieldArr = uniqueFields.filter((f) => f.name === rule.field);
      if (fieldArr.length) {
        const field = fieldArr[0];
        if (typeof field.validator === "function") {
          fieldValidator = field.validator;
        }
      }
    }
    return [validationResult, fieldValidator];
  };
  if (format === "sql") {
    const processRuleGroup = (rg, outermostOrLonelyInGroup) => {
      var _a2;
      if (!isRuleOrGroupValid(rg, validationMap[(_a2 = rg.id) != null ? _a2 : (
        /* istanbul ignore next */
        ""
      )])) {
        return outermostOrLonelyInGroup ? fallbackExpression : (
          /* istanbul ignore next */
          ""
        );
      }
      const processedRules = rg.rules.map((rule) => {
        var _a3;
        if (typeof rule === "string") {
          return rule;
        }
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule, rg.rules.length === 1);
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return "";
        }
        const escapeQuotes = ((_a3 = rule.valueSource) != null ? _a3 : "value") === "value";
        const fieldData = getOption(fields, rule.field);
        if (typeof ruleProcessorInternal === "function") {
          return ruleProcessorInternal(rule, {
            parseNumbers,
            escapeQuotes,
            quoteFieldNamesWith,
            fieldData,
            format,
            quoteValuesWith
          });
        }
        return defaultRuleProcessorSQL(rule, {
          parseNumbers,
          escapeQuotes,
          valueProcessor: valueProcessorInternal,
          quoteFieldNamesWith,
          fieldData,
          format,
          quoteValuesWith
        });
      });
      if (processedRules.length === 0) {
        return fallbackExpression;
      }
      return `${rg.not ? "NOT " : ""}(${processedRules.filter(Boolean).join(isRuleGroupType(rg) ? ` ${rg.combinator} ` : " ")})`;
    };
    return processRuleGroup(ruleGroup, true);
  }
  if (format === "parameterized" || format === "parameterized_named") {
    const parameterized = format === "parameterized";
    const params = [];
    const paramsNamed = {};
    const fieldParams = /* @__PURE__ */ new Map();
    const getNextNamedParam = (field) => {
      if (!fieldParams.has(field)) {
        fieldParams.set(field, /* @__PURE__ */ new Set());
      }
      const nextNamedParam = `${field}_${fieldParams.get(field).size + 1}`;
      fieldParams.get(field).add(nextNamedParam);
      return nextNamedParam;
    };
    const processRule = (rule) => {
      const [validationResult, fieldValidator] = validateRule(rule);
      if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
        return "";
      }
      const fieldData = getOption(fields, rule.field);
      const fieldParamNames = Object.fromEntries(
        Array.from(fieldParams.entries()).map(([f, s]) => [
          f,
          Array.from(s)
        ])
      );
      const processedRule = (typeof ruleProcessorInternal === "function" ? ruleProcessorInternal : defaultRuleProcessorParameterized)(
        rule,
        {
          getNextNamedParam,
          fieldParamNames,
          parseNumbers,
          quoteFieldNamesWith,
          fieldData,
          format,
          paramPrefix,
          paramsKeepPrefix,
          numberedParams,
          fallbackExpression,
          valueProcessor: valueProcessorInternal,
          fields,
          placeholderFieldName,
          placeholderOperatorName,
          validator
        },
        {
          processedParams: params
        }
      );
      if (!isPojo(processedRule)) {
        return "";
      }
      const { sql, params: customParams } = processedRule;
      if (typeof sql !== "string" || !sql) {
        return "";
      }
      if (format === "parameterized" && Array.isArray(customParams)) {
        params.push(...customParams);
      } else if (format === "parameterized_named" && isPojo(customParams)) {
        Object.assign(paramsNamed, customParams);
        Object.keys(customParams).forEach((p) => {
          var _a2;
          return (_a2 = fieldParams.get(rule.field)) == null ? void 0 : _a2.add(p);
        });
      }
      return sql;
    };
    const processRuleGroup = (rg, outermostOrLonelyInGroup) => {
      var _a2;
      if (!isRuleOrGroupValid(rg, validationMap[(_a2 = rg.id) != null ? _a2 : (
        /* istanbul ignore next */
        ""
      )])) {
        return outermostOrLonelyInGroup ? fallbackExpression : (
          /* istanbul ignore next */
          ""
        );
      }
      const processedRules = rg.rules.map((rule) => {
        if (typeof rule === "string") {
          return rule;
        }
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule, rg.rules.length === 1);
        }
        return processRule(rule);
      });
      if (processedRules.length === 0) {
        return fallbackExpression;
      }
      return `${rg.not ? "NOT " : ""}(${processedRules.filter(Boolean).join(isRuleGroupType(rg) ? ` ${rg.combinator} ` : " ")})`;
    };
    if (parameterized) {
      return { sql: processRuleGroup(ruleGroup, true), params };
    }
    return { sql: processRuleGroup(ruleGroup, true), params: paramsNamed };
  }
  if (format === "mongodb") {
    const processRuleGroup = (rg, outermost) => {
      var _a2;
      if (!isRuleOrGroupValid(rg, validationMap[(_a2 = rg.id) != null ? _a2 : (
        /* istanbul ignore next */
        ""
      )])) {
        return outermost ? fallbackExpression : "";
      }
      const combinator = `"$${rg.combinator.toLowerCase()}"`;
      let hasChildRules = false;
      const expressions = rg.rules.map((rule) => {
        if (isRuleGroup(rule)) {
          const processedRuleGroup = processRuleGroup(rule);
          if (processedRuleGroup) {
            hasChildRules = true;
            return /^\{.+\}$/.test(processedRuleGroup) ? processedRuleGroup : `{${processedRuleGroup}}`;
          }
          return "";
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return "";
        }
        const fieldData = getOption(fields, rule.field);
        return (ruleProcessorInternal != null ? ruleProcessorInternal : valueProcessorInternal)(rule, {
          parseNumbers,
          fieldData,
          format
        });
      }).filter(Boolean);
      return expressions.length > 0 ? expressions.length === 1 && !hasChildRules ? expressions[0] : `${combinator}:[${expressions.join(",")}]` : fallbackExpression;
    };
    const rgStandard = isRuleGroupType(ruleGroup) ? ruleGroup : convertFromIC(ruleGroup);
    const processedQuery = processRuleGroup(rgStandard, true);
    return /^\{.+\}$/.test(processedQuery) ? processedQuery : `{${processedQuery}}`;
  }
  if (format === "cel") {
    const processRuleGroup = (rg, outermost) => {
      var _a2;
      if (!isRuleOrGroupValid(rg, validationMap[(_a2 = rg.id) != null ? _a2 : (
        /* istanbul ignore next */
        ""
      )])) {
        return outermost ? fallbackExpression : "";
      }
      const expression = rg.rules.map((rule) => {
        var _a3;
        if (typeof rule === "string") {
          return celCombinatorMap[rule];
        }
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule);
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return "";
        }
        const fieldData = getOption(fields, rule.field);
        return (ruleProcessorInternal != null ? ruleProcessorInternal : valueProcessorInternal)(rule, {
          parseNumbers,
          escapeQuotes: ((_a3 = rule.valueSource) != null ? _a3 : "value") === "value",
          fieldData,
          format
        });
      }).filter(Boolean).join(
        isRuleGroupType(rg) ? ` ${celCombinatorMap[rg.combinator]} ` : " "
      );
      const [prefix, suffix] = rg.not || !outermost ? [`${rg.not ? "!" : ""}(`, ")"] : ["", ""];
      return expression ? `${prefix}${expression}${suffix}` : fallbackExpression;
    };
    return processRuleGroup(ruleGroup, true);
  }
  if (format === "spel") {
    const processRuleGroup = (rg, outermost) => {
      var _a2;
      if (!isRuleOrGroupValid(rg, validationMap[(_a2 = rg.id) != null ? _a2 : (
        /* istanbul ignore next */
        ""
      )])) {
        return outermost ? fallbackExpression : "";
      }
      const expression = rg.rules.map((rule) => {
        var _a3;
        if (typeof rule === "string") {
          return rule;
        }
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule);
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return "";
        }
        const fieldData = getOption(fields, rule.field);
        return (ruleProcessorInternal != null ? ruleProcessorInternal : valueProcessorInternal)(rule, {
          parseNumbers,
          escapeQuotes: ((_a3 = rule.valueSource) != null ? _a3 : "value") === "value",
          fieldData,
          format
        });
      }).filter(Boolean).join(isRuleGroupType(rg) ? ` ${rg.combinator} ` : " ");
      const [prefix, suffix] = rg.not || !outermost ? [`${rg.not ? "!" : ""}(`, ")"] : ["", ""];
      return expression ? `${prefix}${expression}${suffix}` : fallbackExpression;
    };
    return processRuleGroup(ruleGroup, true);
  }
  if (format === "jsonata") {
    const processRuleGroup = (rg, outermost) => {
      var _a2;
      if (!isRuleOrGroupValid(rg, validationMap[(_a2 = rg.id) != null ? _a2 : (
        /* istanbul ignore next */
        ""
      )])) {
        return outermost ? fallbackExpression : "";
      }
      const expression = rg.rules.map((rule) => {
        var _a3;
        if (typeof rule === "string") {
          return rule;
        }
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule);
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return "";
        }
        const fieldData = getOption(fields, rule.field);
        return (ruleProcessorInternal != null ? ruleProcessorInternal : valueProcessorInternal)(rule, {
          parseNumbers,
          escapeQuotes: ((_a3 = rule.valueSource) != null ? _a3 : "value") === "value",
          fieldData,
          format,
          quoteFieldNamesWith
        });
      }).filter(Boolean).join(isRuleGroupType(rg) ? ` ${rg.combinator} ` : " ");
      const [prefix, suffix] = rg.not || !outermost ? [`${rg.not ? "$not" : ""}(`, ")"] : ["", ""];
      return expression ? `${prefix}${expression}${suffix}` : fallbackExpression;
    };
    return processRuleGroup(ruleGroup, true);
  }
  if (format === "jsonlogic") {
    const query = isRuleGroupType(ruleGroup) ? ruleGroup : convertFromIC(ruleGroup);
    const processRuleGroup = (rg, _outermost) => {
      var _a2;
      if (!isRuleOrGroupValid(rg, validationMap[(_a2 = rg.id) != null ? _a2 : (
        /* istanbul ignore next */
        ""
      )])) {
        return false;
      }
      const processedRules = rg.rules.map((rule) => {
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule);
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return false;
        }
        const fieldData = getOption(fields, rule.field);
        return (ruleProcessorInternal != null ? ruleProcessorInternal : valueProcessorInternal)(rule, {
          parseNumbers,
          fieldData,
          format
        });
      }).filter(Boolean);
      if (processedRules.length === 0) {
        return false;
      }
      const jsonRuleGroup = { [rg.combinator]: processedRules };
      return rg.not ? { "!": jsonRuleGroup } : jsonRuleGroup;
    };
    return processRuleGroup(query, true);
  }
  if (format === "elasticsearch") {
    const query = isRuleGroupType(ruleGroup) ? ruleGroup : convertFromIC(ruleGroup);
    const processRuleGroup = (rg) => {
      var _a2;
      if (!isRuleOrGroupValid(rg, validationMap[(_a2 = rg.id) != null ? _a2 : (
        /* istanbul ignore next */
        ""
      )])) {
        return false;
      }
      const processedRules = rg.rules.map((rule) => {
        if (isRuleGroup(rule)) {
          return processRuleGroup(rule);
        }
        const [validationResult, fieldValidator] = validateRule(rule);
        if (!isRuleOrGroupValid(rule, validationResult, fieldValidator) || rule.field === placeholderFieldName || rule.operator === placeholderOperatorName) {
          return false;
        }
        const fieldData = getOption(fields, rule.field);
        return (ruleProcessorInternal != null ? ruleProcessorInternal : valueProcessorInternal)(rule, {
          parseNumbers,
          fieldData,
          format
        });
      }).filter(Boolean);
      if (processedRules.length === 0) {
        return false;
      }
      return {
        bool: rg.not ? {
          must_not: rg.combinator === "or" ? { bool: { should: processedRules } } : processedRules
        } : { [rg.combinator === "or" ? "should" : "must"]: processedRules }
      };
    };
    const processedRuleGroup = processRuleGroup(query);
    return processedRuleGroup === false ? {} : processedRuleGroup;
  }
  return "";
}

// src/utils/formatQuery/index.ts
var internalValueProcessors = {
  default: defaultValueProcessorByRule,
  mongodb: defaultRuleProcessorMongoDB,
  cel: defaultRuleProcessorCEL,
  spel: defaultRuleProcessorSpEL
};
var generateValueProcessor = (format) => (field, operator, value, valueSource) => internalValueProcessors[format](
  { field, operator, value, valueSource },
  { parseNumbers: false }
);
var defaultValueProcessor = generateValueProcessor("default");
var defaultMongoDBValueProcessor = generateValueProcessor("mongodb");
var defaultCELValueProcessor = generateValueProcessor("cel");
var defaultSpELValueProcessor = generateValueProcessor("spel");
var defaultValueProcessorCELByRule = defaultRuleProcessorCEL;
var defaultValueProcessorMongoDBByRule = defaultRuleProcessorMongoDB;
var defaultValueProcessorSpELByRule = defaultRuleProcessorSpEL;

// src/utils/pathUtils.ts
var findPath = (path, query) => {
  let target = query;
  let level = 0;
  while (level < path.length && target && isRuleGroup(target)) {
    const t = target.rules[path[level]];
    if (typeof t !== "string") {
      target = t;
    } else {
      target = null;
    }
    level++;
  }
  return target;
};
var getParentPath = (path) => path.slice(0, path.length - 1);
var pathsAreEqual = (path1, path2) => path1.length === path2.length && path1.every((val, idx) => val === path2[idx]);
var isAncestor = (maybeAncestor, path) => maybeAncestor.length < path.length && RegExp(`^${maybeAncestor.join("-")}`).test(path.join("-"));
var getCommonAncestorPath = (path1, path2) => {
  const commonAncestorPath = [];
  const parentPath1 = getParentPath(path1);
  const parentPath2 = getParentPath(path2);
  let i = 0;
  while (i < parentPath1.length && i < parentPath2.length && parentPath1[i] === parentPath2[i]) {
    commonAncestorPath.push(parentPath2[i]);
    i++;
  }
  return commonAncestorPath;
};
var pathIsDisabled = (path, query) => {
  let disabled = !!query.disabled;
  let target = query;
  let level = 0;
  while (level < path.length && !disabled && isRuleGroup(target)) {
    const t = target.rules[path[level]];
    if (isPojo(t) && (isRuleGroup(t) || "field" in t && !!t.field)) {
      disabled = !!t.disabled;
      target = t;
    }
    level++;
  }
  return disabled;
};

// src/utils/generateAccessibleDescription.ts
var generateAccessibleDescription = (params) => pathsAreEqual([], params.path) ? `Query builder` : `Rule group at path ${params.path.join("-")}`;

// src/utils/generateID.ts
var cryptoModule = globalThis.crypto;
var generateID = () => "00-0-4-2-000".replace(
  /[^-]/g,
  (s) => ((Math.random() + ~~s) * 65536 >> parseInt(s)).toString(16).padStart(4, "0")
);
if (cryptoModule) {
  if (typeof cryptoModule.randomUUID === "function") {
    generateID = () => cryptoModule.randomUUID();
  } else if (typeof cryptoModule.getRandomValues === "function") {
    const position19vals = "89ab";
    const container = new Uint32Array(32);
    generateID = () => {
      cryptoModule.getRandomValues(container);
      let id = (container[0] % 16).toString(16);
      for (let i = 1; i < 32; i++) {
        if (i === 12) {
          id = `${id}${"4"}`;
        } else if (i === 16) {
          id = `${id}${position19vals[container[17] % 4]}`;
        } else {
          id = `${id}${(container[i] % 16).toString(16)}`;
        }
        if (i === 7 || i === 11 || i === 15 || i === 19) {
          id = `${id}${"-"}`;
        }
      }
      return id;
    };
  }
}

// src/utils/getCompatContextProvider.tsx
import * as React6 from "react";
var getCompatContextProvider = (gccpProps) => {
  const QBContextWrapper = (props) => {
    const rqbContext = useMergedContext(gccpProps);
    return /* @__PURE__ */ React6.createElement(QueryBuilderContext.Provider, { value: rqbContext }, props.children);
  };
  const QBContextInner = (props) => {
    const rqbContext = useMergedContext(props);
    return /* @__PURE__ */ React6.createElement(QueryBuilderContext.Provider, { value: rqbContext }, props.children);
  };
  return (props) => {
    return /* @__PURE__ */ React6.createElement(QBContextWrapper, null, /* @__PURE__ */ React6.createElement(QBContextInner, __spreadValues({}, props), props.children));
  };
};

// src/utils/getValidationClassNames.ts
var getValidationClassNames = (validationResult) => {
  const valid = typeof validationResult === "boolean" ? validationResult : typeof validationResult === "object" && validationResult !== null ? validationResult.valid : null;
  return typeof valid === "boolean" ? valid ? standardClassnames.valid : standardClassnames.invalid : "";
};

// src/utils/getValueSourcesUtil.ts
var defaultValueSourcesArray = ["value"];
var dummyFD = {
  name: "name",
  value: "name",
  valueSources: null,
  label: "label"
};
var getValueSourcesUtil = (fieldData, operator, getValueSources) => {
  const fd = fieldData ? toFullOption(fieldData) : (
    /* istanbul ignore else */
    dummyFD
  );
  if (fd.valueSources) {
    if (typeof fd.valueSources === "function") {
      return fd.valueSources(operator);
    }
    return fd.valueSources;
  }
  if (getValueSources) {
    const vals = getValueSources(fd.value, operator, {
      fieldData: toFullOption(fd)
    });
    if (vals) return vals;
  }
  return defaultValueSourcesArray;
};

// src/utils/mergeClassnames.ts
import clsx from "clsx";
var mergeClassnames = (...args) => {
  const joinClassnamesByName = (name) => clsx(args.map((c) => clsx(c == null ? void 0 : c[name])));
  return {
    queryBuilder: joinClassnamesByName("queryBuilder"),
    ruleGroup: joinClassnamesByName("ruleGroup"),
    header: joinClassnamesByName("header"),
    body: joinClassnamesByName("body"),
    combinators: joinClassnamesByName("combinators"),
    addRule: joinClassnamesByName("addRule"),
    addGroup: joinClassnamesByName("addGroup"),
    cloneRule: joinClassnamesByName("cloneRule"),
    cloneGroup: joinClassnamesByName("cloneGroup"),
    removeGroup: joinClassnamesByName("removeGroup"),
    rule: joinClassnamesByName("rule"),
    fields: joinClassnamesByName("fields"),
    operators: joinClassnamesByName("operators"),
    value: joinClassnamesByName("value"),
    removeRule: joinClassnamesByName("removeRule"),
    notToggle: joinClassnamesByName("notToggle"),
    shiftActions: joinClassnamesByName("shiftActions"),
    dragHandle: joinClassnamesByName("dragHandle"),
    lockRule: joinClassnamesByName("lockRule"),
    lockGroup: joinClassnamesByName("lockGroup"),
    valueSource: joinClassnamesByName("valueSource"),
    actionElement: joinClassnamesByName("actionElement"),
    valueSelector: joinClassnamesByName("valueSelector")
  };
};

// src/utils/mergeTranslations.ts
import { produce as produce2 } from "immer";

// src/utils/objectUtils.ts
var objectKeys = Object.keys;
var objectEntries = Object.entries;

// src/utils/mergeTranslations.ts
var mergeTranslations = (base, ...otherTranslations) => produce2(base, (draft) => {
  for (const translations of otherTranslations) {
    if (translations) {
      objectKeys(translations).forEach((t) => {
        if (!draft[t]) {
          Object.assign(draft, { [t]: translations[t] });
        } else {
          Object.assign(draft[t], translations[t]);
        }
      });
    }
  }
});
var mergeTranslation = (el, keyPropContextMap, finalize) => {
  const finalKeys = objectEntries(keyPropContextMap).map(([key, [pT, cT]]) => {
    var _a, _b;
    return [
      key,
      (_b = pT != null ? pT : cT) != null ? _b : (_a = (finalize ? defaultTranslations : {})[el]) == null ? void 0 : _a[key]
    ];
  }).filter((k) => !!k[1]);
  return finalKeys.length > 0 ? { [el]: Object.fromEntries(finalKeys) } : void 0;
};

// src/utils/prepareQueryObjects.ts
import { produce as produce3 } from "immer";
var prepareRule = (rule, { idGenerator = generateID } = {}) => produce3(rule, (draft) => {
  if (!draft.id) {
    draft.id = idGenerator();
  }
});
var prepareRuleGroup = (queryObject, { idGenerator = generateID } = {}) => produce3(queryObject, (draft) => {
  if (!draft.id) {
    draft.id = idGenerator();
  }
  draft.rules = draft.rules.map(
    (r) => typeof r === "string" ? r : isRuleGroup(r) ? prepareRuleGroup(r, { idGenerator }) : prepareRule(r, { idGenerator })
  );
});
var prepareRuleOrGroup = (rg, { idGenerator = generateID } = {}) => isRuleGroup(rg) ? prepareRuleGroup(rg, { idGenerator }) : prepareRule(rg, { idGenerator });

// src/utils/queryTools.ts
import { produce as produce4 } from "immer";

// src/utils/regenerateIDs.ts
var regenerateID = (rule, { idGenerator = generateID } = {}) => JSON.parse(JSON.stringify(__spreadProps(__spreadValues({}, rule), { id: idGenerator() })));
var regenerateIDs = (ruleOrGroup, { idGenerator = generateID } = {}) => {
  if (!isPojo(ruleOrGroup)) return ruleOrGroup;
  if (!isRuleGroup(ruleOrGroup)) {
    return JSON.parse(JSON.stringify(__spreadProps(__spreadValues({}, ruleOrGroup), { id: idGenerator() })));
  }
  if (isRuleGroupType(ruleOrGroup)) {
    const rules2 = ruleOrGroup.rules.map(
      (r) => isRuleGroup(r) ? regenerateIDs(r, { idGenerator }) : regenerateID(r, { idGenerator })
    );
    return __spreadProps(__spreadValues({}, ruleOrGroup), { id: idGenerator(), rules: rules2 });
  }
  const rules = ruleOrGroup.rules.map(
    (r) => typeof r === "string" ? r : isRuleGroup(r) ? regenerateIDs(r, { idGenerator }) : regenerateID(r, { idGenerator })
  );
  return __spreadProps(__spreadValues({}, ruleOrGroup), { id: idGenerator(), rules });
};

// src/utils/queryTools.ts
var add = (query, ruleOrGroup, parentPath, {
  combinators = defaultCombinators,
  combinatorPreceding,
  idGenerator = generateID
} = {}) => produce4(query, (draft) => {
  const parent = findPath(parentPath, draft);
  if (!parent || !isRuleGroup(parent)) return;
  if (isRuleGroupTypeIC(parent) && parent.rules.length > 0) {
    const prevCombinator = parent.rules[parent.rules.length - 2];
    parent.rules.push(
      // @ts-expect-error This is technically a type violation until the next push
      // to the rules array, but that happens immediately and unconditionally so
      // there's no significant risk.
      combinatorPreceding != null ? combinatorPreceding : typeof prevCombinator === "string" ? prevCombinator : getFirstOption(combinators)
    );
  }
  parent.rules.push(prepareRuleOrGroup(ruleOrGroup, { idGenerator }));
});
var update = (query, prop, value, path, {
  resetOnFieldChange = true,
  resetOnOperatorChange = false,
  getRuleDefaultOperator = () => "=",
  getValueSources = () => ["value"],
  getRuleDefaultValue = () => ""
} = {}) => produce4(query, (draft) => {
  if (prop === "combinator" && !isRuleGroupType(draft)) {
    const parentRules = findPath(getParentPath(path), draft).rules;
    if (path[path.length - 1] % 2 === 1) {
      parentRules[path[path.length - 1]] = value;
    }
    return;
  }
  const ruleOrGroup = findPath(path, draft);
  if (!ruleOrGroup) return;
  const isGroup = isRuleGroup(ruleOrGroup);
  if (ruleOrGroup[prop] === value) return;
  if (prop !== "valueSource") {
    ruleOrGroup[prop] = value;
  }
  if (isGroup) return;
  let resetValueSource = false;
  let resetValue = false;
  if (resetOnFieldChange && prop === "field") {
    ruleOrGroup.operator = getRuleDefaultOperator(value);
    resetValueSource = true;
    resetValue = true;
  }
  if (resetOnOperatorChange && prop === "operator") {
    resetValueSource = true;
    resetValue = true;
  }
  const defaultValueSource = getValueSources(ruleOrGroup.field, ruleOrGroup.operator)[0];
  if (resetValueSource && ruleOrGroup.valueSource && defaultValueSource !== ruleOrGroup.valueSource || prop === "valueSource" && value !== ruleOrGroup.valueSource) {
    resetValue = !!ruleOrGroup.valueSource || !ruleOrGroup.valueSource && value !== defaultValueSource;
    ruleOrGroup.valueSource = resetValueSource ? defaultValueSource : value;
  }
  if (resetValue) {
    ruleOrGroup.value = getRuleDefaultValue(ruleOrGroup);
  }
});
var remove = (query, path) => {
  if (
    // Can't remove the root group
    path.length === 0 || // Can't independently remove independent combinators
    !isRuleGroupType(query) && !findPath(path, query)
  ) {
    return query;
  }
  return produce4(query, (draft) => {
    const index = path[path.length - 1];
    const parent = findPath(getParentPath(path), draft);
    if (parent && isRuleGroup(parent)) {
      if (!isRuleGroupType(parent) && parent.rules.length > 1) {
        const idxStartDelete = index === 0 ? 0 : index - 1;
        parent.rules.splice(idxStartDelete, 2);
      } else {
        parent.rules.splice(index, 1);
      }
    }
  });
};
var getNextPath = (query, currentPath, newPathOrShiftDirection) => {
  if (Array.isArray(newPathOrShiftDirection)) {
    return newPathOrShiftDirection;
  }
  const ic = isRuleGroupTypeIC(query);
  if (newPathOrShiftDirection === "up") {
    if (pathsAreEqual(currentPath, [0])) {
      return currentPath;
    } else if (currentPath.at(-1) === 0) {
      const parentPath = getParentPath(currentPath);
      return [...getParentPath(parentPath), Math.max(0, parentPath.at(-1) - (ic ? 1 : 0))];
    } else {
      const evaluationPath = [
        ...getParentPath(currentPath),
        Math.max(0, currentPath.at(-1) - (ic ? 2 : 1))
      ];
      const entityAtTarget = findPath(evaluationPath, query);
      if (isRuleGroup(entityAtTarget)) {
        return [...evaluationPath, entityAtTarget.rules.length];
      } else {
        const targetPath = [
          ...getParentPath(currentPath),
          Math.max(0, currentPath.at(-1) - (ic ? 3 : 1))
        ];
        return targetPath;
      }
    }
  } else if (newPathOrShiftDirection === "down") {
    if (pathsAreEqual([query.rules.length - 1], currentPath)) {
      return currentPath;
    } else if (currentPath.at(-1) === findPath(getParentPath(currentPath), query).rules.length - 1) {
      const parentPath = getParentPath(currentPath);
      return [...getParentPath(parentPath), parentPath.at(-1) + 1];
    } else {
      const evaluationPath = [...getParentPath(currentPath), currentPath.at(-1) + (ic ? 2 : 1)];
      const entityToEvaluate = findPath(evaluationPath, query);
      if (isRuleGroup(entityToEvaluate)) {
        return [...evaluationPath, 0];
      } else {
        const targetPath = [...getParentPath(currentPath), currentPath.at(-1) + (ic ? 3 : 2)];
        return targetPath;
      }
    }
  }
  return currentPath;
};
var move = (query, oldPath, newPath, { clone = false, combinators = defaultCombinators, idGenerator = generateID } = {}) => {
  const nextPath = getNextPath(query, oldPath, newPath);
  if (oldPath.length === 0 || pathsAreEqual(oldPath, nextPath) || !findPath(getParentPath(nextPath), query)) {
    return query;
  }
  const ruleOrGroupOriginal = findPath(oldPath, query);
  if (!ruleOrGroupOriginal) {
    return query;
  }
  const ruleOrGroup = clone ? regenerateIDs(ruleOrGroupOriginal, { idGenerator }) : ruleOrGroupOriginal;
  return produce4(query, (draft) => {
    var _a, _b, _c, _d;
    const independentCombinators = isRuleGroupTypeIC(draft);
    const parentOfRuleToRemove = findPath(getParentPath(oldPath), draft);
    const ruleToRemoveIndex = oldPath[oldPath.length - 1];
    const oldPrevCombinator = independentCombinators && ruleToRemoveIndex > 0 ? parentOfRuleToRemove.rules[ruleToRemoveIndex - 1] : null;
    const oldNextCombinator = independentCombinators && ruleToRemoveIndex < parentOfRuleToRemove.rules.length - 1 ? parentOfRuleToRemove.rules[ruleToRemoveIndex + 1] : null;
    if (!clone) {
      const idxStartDelete = independentCombinators ? Math.max(0, ruleToRemoveIndex - 1) : ruleToRemoveIndex;
      const deleteLength = independentCombinators ? 2 : 1;
      parentOfRuleToRemove.rules.splice(idxStartDelete, deleteLength);
    }
    const newNewPath = [...nextPath];
    const commonAncestorPath = getCommonAncestorPath(oldPath, nextPath);
    if (!clone && oldPath.length === commonAncestorPath.length + 1 && nextPath[commonAncestorPath.length] > oldPath[commonAncestorPath.length]) {
      newNewPath[commonAncestorPath.length] -= independentCombinators ? 2 : 1;
    }
    const newNewParentPath = getParentPath(newNewPath);
    const parentToInsertInto = findPath(newNewParentPath, draft);
    const newIndex = newNewPath[newNewPath.length - 1];
    const insertRuleOrGroup = (...args) => parentToInsertInto.rules.splice(newIndex, 0, ...args);
    if (parentToInsertInto.rules.length === 0 || !independentCombinators) {
      insertRuleOrGroup(ruleOrGroup);
    } else {
      if (newIndex === 0) {
        if (ruleToRemoveIndex === 0 && oldNextCombinator) {
          insertRuleOrGroup(ruleOrGroup, oldNextCombinator);
        } else {
          const newNextCombinator = (_b = (_a = parentToInsertInto.rules[1]) != null ? _a : oldPrevCombinator) != null ? _b : getFirstOption(combinators);
          insertRuleOrGroup(ruleOrGroup, newNextCombinator);
        }
      } else {
        if (oldPrevCombinator) {
          insertRuleOrGroup(oldPrevCombinator, ruleOrGroup);
        } else {
          const newPrevCombinator = (_d = (_c = parentToInsertInto.rules[newIndex - 2]) != null ? _c : oldNextCombinator) != null ? _d : getFirstOption(combinators);
          insertRuleOrGroup(newPrevCombinator, ruleOrGroup);
        }
      }
    }
  });
};
var insert = (query, ruleOrGroup, path, {
  combinators = defaultCombinators,
  combinatorPreceding,
  combinatorSucceeding,
  idGenerator = generateID,
  replace = false
} = {}) => produce4(query, (draft) => {
  var _a, _b, _c, _d, _e;
  const parentToInsertInto = findPath(getParentPath(path), draft);
  if (!parentToInsertInto || !isRuleGroup(parentToInsertInto)) return;
  const rorg = regenerateIDs(ruleOrGroup, { idGenerator });
  const independentCombinators = isRuleGroupTypeIC(draft);
  const newIndex = path[path.length - 1];
  const insertRuleOrGroup = (idx, ...args) => parentToInsertInto.rules.splice(idx, replace ? args.length : 0, ...args);
  if (parentToInsertInto.rules.length === 0 || !independentCombinators) {
    insertRuleOrGroup(newIndex, rorg);
  } else if (replace && independentCombinators) {
    insertRuleOrGroup(newIndex + newIndex % 2, rorg);
  } else {
    if (newIndex === 0) {
      if (((_a = rorg.path) == null ? void 0 : _a.at(-1)) === 0 && combinatorSucceeding) {
        insertRuleOrGroup(newIndex, rorg, combinatorSucceeding);
      } else {
        const newNextCombinator = (_c = (_b = parentToInsertInto.rules[1]) != null ? _b : combinatorPreceding) != null ? _c : getFirstOption(combinators);
        insertRuleOrGroup(newIndex, rorg, newNextCombinator);
      }
    } else {
      const normalizedNewIndex = newIndex % 2 === 0 ? newIndex - 1 : newIndex;
      if (combinatorPreceding) {
        insertRuleOrGroup(normalizedNewIndex, combinatorPreceding, rorg);
      } else {
        const newPrevCombinator = (_e = (_d = parentToInsertInto.rules[normalizedNewIndex - 2]) != null ? _d : combinatorSucceeding) != null ? _e : getFirstOption(combinators);
        insertRuleOrGroup(normalizedNewIndex, newPrevCombinator, rorg);
      }
    }
  }
});

// src/utils/toOptions.tsx
import * as React7 from "react";
var toOptions = (arr) => isOptionGroupArray(arr) ? arr.map((og) => /* @__PURE__ */ React7.createElement("optgroup", { key: og.label, label: og.label }, og.options.map((opt) => /* @__PURE__ */ React7.createElement("option", { key: opt.name, value: opt.name, disabled: opt.disabled }, opt.label)))) : Array.isArray(arr) ? arr.map((opt) => /* @__PURE__ */ React7.createElement("option", { key: opt.name, value: opt.name, disabled: opt.disabled }, opt.label)) : null;

// src/utils/transformQuery.ts
import { produce as produce5 } from "immer";
var remapProperties = (obj, propertyMap, deleteRemappedProperties) => produce5(obj, (draft) => {
  for (const [k, v] of Object.entries(propertyMap)) {
    if (v === false) {
      delete draft[k];
    } else if (!!v && k !== v && k in draft) {
      draft[v] = draft[k];
      if (deleteRemappedProperties) {
        delete draft[k];
      }
    }
  }
});
function transformQuery(query, options = {}) {
  const {
    ruleProcessor = (r) => r,
    ruleGroupProcessor = (rg) => rg,
    propertyMap = {},
    combinatorMap = {},
    operatorMap = {},
    omitPath = false,
    deleteRemappedProperties = true
  } = options;
  const processGroup = (rg) => {
    var _a, _b;
    return __spreadValues(__spreadValues({}, ruleGroupProcessor(
      remapProperties(
        __spreadValues(__spreadValues({}, rg), isRuleGroupType(rg) ? { combinator: (_a = combinatorMap[rg.combinator]) != null ? _a : rg.combinator } : {}),
        propertyMap,
        deleteRemappedProperties
      )
    )), propertyMap["rules"] === false ? null : {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [(_b = propertyMap["rules"]) != null ? _b : "rules"]: rg.rules.map((r, idx) => {
        var _a2, _b2;
        const pathObject = omitPath ? null : { path: [...rg.path, idx] };
        if (typeof r === "string") {
          return (_a2 = combinatorMap[r]) != null ? _a2 : r;
        } else if (isRuleGroup(r)) {
          return processGroup(__spreadValues(__spreadValues({}, r), pathObject));
        }
        return ruleProcessor(
          remapProperties(
            __spreadValues(__spreadValues({}, __spreadValues(__spreadValues({}, r), pathObject)), "operator" in r ? { operator: (_b2 = operatorMap[r.operator]) != null ? _b2 : r.operator } : {}),
            propertyMap,
            deleteRemappedProperties
          )
        );
      })
    });
  };
  return processGroup(__spreadValues(__spreadValues({}, query), omitPath ? null : { path: [] }));
}

// src/hooks/usePreferProp.ts
var preferPropDefaultTrue = (prop, context) => prop === false ? false : prop ? true : context === false ? false : true;
var preferPropDefaultFalse = (prop, context) => prop ? true : prop === false ? false : context ? true : false;
var preferProp = (def, prop, context) => def ? preferPropDefaultTrue(prop, context) : preferPropDefaultFalse(prop, context);
var usePreferProp = (def, prop, context) => preferProp(def, prop, context);
var usePreferAnyProp = (def, prop, context) => typeof prop !== "undefined" && prop != null ? prop : typeof context !== "undefined" && context != null ? context : def;

// src/hooks/useMergedContext.ts
var nullComp = () => null;
var nullFwdComp = forwardRef2(nullComp);
var emptyObject = {};
var useMergedContext = (_a) => {
  var _b = _a, {
    finalize
  } = _b, props = __objRest(_b, [
    "finalize"
  ]);
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea;
  const rqbContext = useContext2(QueryBuilderContext);
  const debugModePreferred = usePreferProp(false, props.debugMode, rqbContext.debugMode);
  const debugMode = finalize ? debugModePreferred : (_a2 = props.debugMode) != null ? _a2 : rqbContext.debugMode;
  const enableMountQueryChangePreferred = usePreferProp(
    true,
    props.enableMountQueryChange,
    rqbContext.enableMountQueryChange
  );
  const enableMountQueryChange = finalize ? enableMountQueryChangePreferred : (_b2 = props.enableMountQueryChange) != null ? _b2 : rqbContext.enableMountQueryChange;
  const enableDragAndDropPreferred = usePreferProp(false, props.enableDragAndDrop, rqbContext.enableDragAndDrop) && rqbContext.enableDragAndDrop !== false;
  const enableDragAndDrop = finalize ? enableDragAndDropPreferred : (_c = props.enableDragAndDrop) != null ? _c : rqbContext.enableDragAndDrop;
  const cc = useMemo(
    () => mergeClassnames(
      finalize ? Object.assign({}, defaultControlClassnames) : emptyObject,
      rqbContext.controlClassnames,
      props.controlClassnames
    ),
    [rqbContext.controlClassnames, props.controlClassnames, finalize]
  );
  const controlClassnames = useMemo(
    () => ({
      actionElement: cc.actionElement,
      addGroup: cc.addGroup,
      addRule: cc.addRule,
      body: cc.body,
      cloneGroup: cc.cloneGroup,
      cloneRule: cc.cloneRule,
      combinators: cc.combinators,
      dragHandle: cc.dragHandle,
      fields: cc.fields,
      header: cc.header,
      lockGroup: cc.lockGroup,
      lockRule: cc.lockRule,
      notToggle: cc.notToggle,
      operators: cc.operators,
      queryBuilder: cc.queryBuilder,
      removeGroup: cc.removeGroup,
      removeRule: cc.removeRule,
      rule: cc.rule,
      ruleGroup: cc.ruleGroup,
      shiftActions: cc.shiftActions,
      value: cc.value,
      valueSelector: cc.valueSelector,
      valueSource: cc.valueSource
    }),
    [
      cc.actionElement,
      cc.addGroup,
      cc.addRule,
      cc.body,
      cc.cloneGroup,
      cc.cloneRule,
      cc.combinators,
      cc.dragHandle,
      cc.fields,
      cc.header,
      cc.lockGroup,
      cc.lockRule,
      cc.notToggle,
      cc.operators,
      cc.queryBuilder,
      cc.removeGroup,
      cc.removeRule,
      cc.rule,
      cc.ruleGroup,
      cc.shiftActions,
      cc.value,
      cc.valueSelector,
      cc.valueSource
    ]
  );
  const contextCE = (_d = rqbContext.controlElements) != null ? _d : emptyObject;
  const propsCE = (_e = props.controlElements) != null ? _e : emptyObject;
  const mergeControlElement = useCallback(
    (name, propComp, contextComp) => {
      var _a3, _b3, _c2;
      const nc = name === "dragHandle" ? nullFwdComp : nullComp;
      const propBulkOverride = (_a3 = name.endsWith("Action") && propsCE.actionElement ? propsCE.actionElement : void 0) != null ? _a3 : name.endsWith("Selector") && propsCE.valueSelector ? propsCE.valueSelector : void 0;
      const contextBulkOverride = (_b3 = name.endsWith("Action") && contextCE.actionElement ? contextCE.actionElement : void 0) != null ? _b3 : name.endsWith("Selector") && contextCE.valueSelector ? contextCE.valueSelector : void 0;
      const comp = propComp === null ? nc : (_c2 = propComp != null ? propComp : finalize ? propBulkOverride : void 0) != null ? _c2 : contextComp === null ? nc : contextComp != null ? contextComp : finalize ? contextBulkOverride : void 0;
      return comp ? { [name]: comp } : finalize ? { [name]: defaultControlElements[name] } : emptyObject;
    },
    [
      contextCE.actionElement,
      contextCE.valueSelector,
      finalize,
      propsCE.actionElement,
      propsCE.valueSelector
    ]
  );
  const controlElements = useMemo(
    () => {
      var _a3, _b3, _c2, _d2, _e2, _f2;
      return (
        // For some reason TypeScript doesn't like the object spread syntax here.
        // Something about a union type being too complex to represent.
        Object.assign(
          {},
          mergeControlElement("addGroupAction", propsCE.addGroupAction, contextCE.addGroupAction),
          mergeControlElement("addRuleAction", propsCE.addRuleAction, contextCE.addRuleAction),
          mergeControlElement(
            "cloneGroupAction",
            propsCE.cloneGroupAction,
            contextCE.cloneGroupAction
          ),
          mergeControlElement("cloneRuleAction", propsCE.cloneRuleAction, contextCE.cloneRuleAction),
          mergeControlElement(
            "combinatorSelector",
            propsCE.combinatorSelector,
            contextCE.combinatorSelector
          ),
          mergeControlElement("dragHandle", propsCE.dragHandle, contextCE.dragHandle),
          mergeControlElement("fieldSelector", propsCE.fieldSelector, contextCE.fieldSelector),
          mergeControlElement(
            "inlineCombinator",
            propsCE.inlineCombinator,
            contextCE.inlineCombinator
          ),
          mergeControlElement("lockGroupAction", propsCE.lockGroupAction, contextCE.lockGroupAction),
          mergeControlElement("lockRuleAction", propsCE.lockRuleAction, contextCE.lockRuleAction),
          mergeControlElement("notToggle", propsCE.notToggle, contextCE.notToggle),
          mergeControlElement(
            "operatorSelector",
            propsCE.operatorSelector,
            contextCE.operatorSelector
          ),
          mergeControlElement(
            "removeGroupAction",
            propsCE.removeGroupAction,
            contextCE.removeGroupAction
          ),
          mergeControlElement(
            "removeRuleAction",
            propsCE.removeRuleAction,
            contextCE.removeRuleAction
          ),
          mergeControlElement("shiftActions", propsCE.shiftActions, contextCE.shiftActions),
          {
            valueEditor: propsCE.valueEditor === null ? nullComp : (_b3 = (_a3 = propsCE.valueEditor) != null ? _a3 : contextCE.valueEditor === null ? nullComp : contextCE.valueEditor) != null ? _b3 : defaultControlElements.valueEditor
          },
          mergeControlElement(
            "valueSourceSelector",
            propsCE.valueSourceSelector,
            contextCE.valueSourceSelector
          ),
          mergeControlElement("rule", propsCE.rule, contextCE.rule),
          mergeControlElement("ruleGroup", propsCE.ruleGroup, contextCE.ruleGroup),
          {
            actionElement: (_d2 = (_c2 = propsCE.actionElement) != null ? _c2 : contextCE.actionElement) != null ? _d2 : finalize ? defaultControlElements.actionElement : void 0
          },
          {
            valueSelector: (_f2 = (_e2 = propsCE.valueSelector) != null ? _e2 : contextCE.valueSelector) != null ? _f2 : finalize ? defaultControlElements.valueSelector : void 0
          }
          // TODO: this type should probably depend on `finalize`
        )
      );
    },
    [
      contextCE.actionElement,
      contextCE.addGroupAction,
      contextCE.addRuleAction,
      contextCE.cloneGroupAction,
      contextCE.cloneRuleAction,
      contextCE.combinatorSelector,
      contextCE.dragHandle,
      contextCE.fieldSelector,
      contextCE.inlineCombinator,
      contextCE.lockGroupAction,
      contextCE.lockRuleAction,
      contextCE.notToggle,
      contextCE.operatorSelector,
      contextCE.removeGroupAction,
      contextCE.removeRuleAction,
      contextCE.rule,
      contextCE.ruleGroup,
      contextCE.shiftActions,
      contextCE.valueEditor,
      contextCE.valueSelector,
      contextCE.valueSourceSelector,
      mergeControlElement,
      finalize,
      propsCE.actionElement,
      propsCE.addGroupAction,
      propsCE.addRuleAction,
      propsCE.cloneGroupAction,
      propsCE.cloneRuleAction,
      propsCE.combinatorSelector,
      propsCE.dragHandle,
      propsCE.fieldSelector,
      propsCE.inlineCombinator,
      propsCE.lockGroupAction,
      propsCE.lockRuleAction,
      propsCE.notToggle,
      propsCE.operatorSelector,
      propsCE.removeGroupAction,
      propsCE.removeRuleAction,
      propsCE.rule,
      propsCE.ruleGroup,
      propsCE.shiftActions,
      propsCE.valueEditor,
      propsCE.valueSelector,
      propsCE.valueSourceSelector
    ]
    // TODO: this type should probably depend on `finalize`
  );
  const propsT = (_f = props.translations) != null ? _f : emptyObject;
  const contextT = (_g = rqbContext.translations) != null ? _g : emptyObject;
  const translations = useMemo(
    () => {
      var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2, _y2, _z2, _A2, _B2, _C2, _D2, _E2, _F2, _G2, _H2, _I2, _J2, _K2, _L2, _M2, _N2, _O2, _P2, _Q2, _R2, _S2, _T2, _U2, _V2, _W2, _X2, _Y2, _Z2, __2, _$2, _aa2, _ba2, _ca2, _da2, _ea2, _fa2, _ga2, _ha2, _ia2, _ja2, _ka2, _la2, _ma2, _na2, _oa2, _pa2, _qa2, _ra2, _sa2, _ta2, _ua2, _va2, _wa2, _xa2;
      return Object.assign(
        finalize ? Object.assign({}, defaultTranslations) : {},
        mergeTranslation(
          "addGroup",
          {
            label: [(_a3 = propsT.addGroup) == null ? void 0 : _a3.label, (_b3 = contextT.addGroup) == null ? void 0 : _b3.label],
            title: [(_c2 = propsT.addGroup) == null ? void 0 : _c2.title, (_d2 = contextT.addGroup) == null ? void 0 : _d2.title]
          },
          finalize
        ),
        mergeTranslation(
          "addRule",
          {
            label: [(_e2 = propsT.addRule) == null ? void 0 : _e2.label, (_f2 = contextT.addRule) == null ? void 0 : _f2.label],
            title: [(_g2 = propsT.addRule) == null ? void 0 : _g2.title, (_h2 = contextT.addRule) == null ? void 0 : _h2.title]
          },
          finalize
        ),
        mergeTranslation(
          "cloneRule",
          {
            label: [(_i2 = propsT.cloneRule) == null ? void 0 : _i2.label, (_j2 = contextT.cloneRule) == null ? void 0 : _j2.label],
            title: [(_k2 = propsT.cloneRule) == null ? void 0 : _k2.title, (_l2 = contextT.cloneRule) == null ? void 0 : _l2.title]
          },
          finalize
        ),
        mergeTranslation(
          "cloneRuleGroup",
          {
            label: [(_m2 = propsT.cloneRuleGroup) == null ? void 0 : _m2.label, (_n2 = contextT.cloneRuleGroup) == null ? void 0 : _n2.label],
            title: [(_o2 = propsT.cloneRuleGroup) == null ? void 0 : _o2.title, (_p2 = contextT.cloneRuleGroup) == null ? void 0 : _p2.title]
          },
          finalize
        ),
        mergeTranslation(
          "combinators",
          { title: [(_q2 = propsT.combinators) == null ? void 0 : _q2.title, (_r2 = contextT.combinators) == null ? void 0 : _r2.title] },
          finalize
        ),
        mergeTranslation(
          "dragHandle",
          {
            label: [(_s2 = propsT.dragHandle) == null ? void 0 : _s2.label, (_t2 = contextT.dragHandle) == null ? void 0 : _t2.label],
            title: [(_u2 = propsT.dragHandle) == null ? void 0 : _u2.title, (_v2 = contextT.dragHandle) == null ? void 0 : _v2.title]
          },
          finalize
        ),
        mergeTranslation(
          "fields",
          {
            placeholderGroupLabel: [
              (_w2 = propsT.fields) == null ? void 0 : _w2.placeholderGroupLabel,
              (_x2 = contextT.fields) == null ? void 0 : _x2.placeholderGroupLabel
            ],
            placeholderLabel: [(_y2 = propsT.fields) == null ? void 0 : _y2.placeholderLabel, (_z2 = contextT.fields) == null ? void 0 : _z2.placeholderLabel],
            placeholderName: [(_A2 = propsT.fields) == null ? void 0 : _A2.placeholderName, (_B2 = contextT.fields) == null ? void 0 : _B2.placeholderName],
            title: [(_C2 = propsT.fields) == null ? void 0 : _C2.title, (_D2 = contextT.fields) == null ? void 0 : _D2.title]
          },
          finalize
        ),
        mergeTranslation(
          "lockGroup",
          {
            label: [(_E2 = propsT.lockGroup) == null ? void 0 : _E2.label, (_F2 = contextT.lockGroup) == null ? void 0 : _F2.label],
            title: [(_G2 = propsT.lockGroup) == null ? void 0 : _G2.title, (_H2 = contextT.lockGroup) == null ? void 0 : _H2.title]
          },
          finalize
        ),
        mergeTranslation(
          "lockGroupDisabled",
          {
            label: [(_I2 = propsT.lockGroupDisabled) == null ? void 0 : _I2.label, (_J2 = contextT.lockGroupDisabled) == null ? void 0 : _J2.label],
            title: [(_K2 = propsT.lockGroupDisabled) == null ? void 0 : _K2.title, (_L2 = contextT.lockGroupDisabled) == null ? void 0 : _L2.title]
          },
          finalize
        ),
        mergeTranslation(
          "lockRule",
          {
            label: [(_M2 = propsT.lockRule) == null ? void 0 : _M2.label, (_N2 = contextT.lockRule) == null ? void 0 : _N2.label],
            title: [(_O2 = propsT.lockRule) == null ? void 0 : _O2.title, (_P2 = contextT.lockRule) == null ? void 0 : _P2.title]
          },
          finalize
        ),
        mergeTranslation(
          "lockRuleDisabled",
          {
            label: [(_Q2 = propsT.lockRuleDisabled) == null ? void 0 : _Q2.label, (_R2 = contextT.lockRuleDisabled) == null ? void 0 : _R2.label],
            title: [(_S2 = propsT.lockRuleDisabled) == null ? void 0 : _S2.title, (_T2 = contextT.lockRuleDisabled) == null ? void 0 : _T2.title]
          },
          finalize
        ),
        mergeTranslation(
          "notToggle",
          {
            label: [(_U2 = propsT.notToggle) == null ? void 0 : _U2.label, (_V2 = contextT.notToggle) == null ? void 0 : _V2.label],
            title: [(_W2 = propsT.notToggle) == null ? void 0 : _W2.title, (_X2 = contextT.notToggle) == null ? void 0 : _X2.title]
          },
          finalize
        ),
        mergeTranslation(
          "operators",
          {
            placeholderGroupLabel: [
              (_Y2 = propsT.operators) == null ? void 0 : _Y2.placeholderGroupLabel,
              (_Z2 = contextT.operators) == null ? void 0 : _Z2.placeholderGroupLabel
            ],
            placeholderLabel: [
              (__2 = propsT.operators) == null ? void 0 : __2.placeholderLabel,
              (_$2 = contextT.operators) == null ? void 0 : _$2.placeholderLabel
            ],
            placeholderName: [
              (_aa2 = propsT.operators) == null ? void 0 : _aa2.placeholderName,
              (_ba2 = contextT.operators) == null ? void 0 : _ba2.placeholderName
            ],
            title: [(_ca2 = propsT.operators) == null ? void 0 : _ca2.title, (_da2 = contextT.operators) == null ? void 0 : _da2.title]
          },
          finalize
        ),
        mergeTranslation(
          "removeGroup",
          {
            label: [(_ea2 = propsT.removeGroup) == null ? void 0 : _ea2.label, (_fa2 = contextT.removeGroup) == null ? void 0 : _fa2.label],
            title: [(_ga2 = propsT.removeGroup) == null ? void 0 : _ga2.title, (_ha2 = contextT.removeGroup) == null ? void 0 : _ha2.title]
          },
          finalize
        ),
        mergeTranslation(
          "removeRule",
          {
            label: [(_ia2 = propsT.removeRule) == null ? void 0 : _ia2.label, (_ja2 = contextT.removeRule) == null ? void 0 : _ja2.label],
            title: [(_ka2 = propsT.removeRule) == null ? void 0 : _ka2.title, (_la2 = contextT.removeRule) == null ? void 0 : _la2.title]
          },
          finalize
        ),
        mergeTranslation(
          "shiftActionDown",
          {
            label: [(_ma2 = propsT.shiftActionDown) == null ? void 0 : _ma2.label, (_na2 = contextT.shiftActionDown) == null ? void 0 : _na2.label],
            title: [(_oa2 = propsT.shiftActionDown) == null ? void 0 : _oa2.title, (_pa2 = contextT.shiftActionDown) == null ? void 0 : _pa2.title]
          },
          finalize
        ),
        mergeTranslation(
          "shiftActionUp",
          {
            label: [(_qa2 = propsT.shiftActionUp) == null ? void 0 : _qa2.label, (_ra2 = contextT.shiftActionUp) == null ? void 0 : _ra2.label],
            title: [(_sa2 = propsT.shiftActionUp) == null ? void 0 : _sa2.title, (_ta2 = contextT.shiftActionUp) == null ? void 0 : _ta2.title]
          },
          finalize
        ),
        mergeTranslation(
          "value",
          { title: [(_ua2 = propsT.value) == null ? void 0 : _ua2.title, (_va2 = contextT.value) == null ? void 0 : _va2.title] },
          finalize
        ),
        mergeTranslation(
          "valueSourceSelector",
          { title: [(_wa2 = propsT.valueSourceSelector) == null ? void 0 : _wa2.title, (_xa2 = contextT.valueSourceSelector) == null ? void 0 : _xa2.title] },
          finalize
        )
      );
    },
    [
      (_h = propsT.addGroup) == null ? void 0 : _h.label,
      (_i = propsT.addGroup) == null ? void 0 : _i.title,
      (_j = propsT.addRule) == null ? void 0 : _j.label,
      (_k = propsT.addRule) == null ? void 0 : _k.title,
      (_l = propsT.cloneRule) == null ? void 0 : _l.label,
      (_m = propsT.cloneRule) == null ? void 0 : _m.title,
      (_n = propsT.cloneRuleGroup) == null ? void 0 : _n.label,
      (_o = propsT.cloneRuleGroup) == null ? void 0 : _o.title,
      (_p = propsT.combinators) == null ? void 0 : _p.title,
      (_q = propsT.dragHandle) == null ? void 0 : _q.label,
      (_r = propsT.dragHandle) == null ? void 0 : _r.title,
      (_s = propsT.fields) == null ? void 0 : _s.placeholderGroupLabel,
      (_t = propsT.fields) == null ? void 0 : _t.placeholderLabel,
      (_u = propsT.fields) == null ? void 0 : _u.placeholderName,
      (_v = propsT.fields) == null ? void 0 : _v.title,
      (_w = propsT.lockGroup) == null ? void 0 : _w.label,
      (_x = propsT.lockGroup) == null ? void 0 : _x.title,
      (_y = propsT.lockGroupDisabled) == null ? void 0 : _y.label,
      (_z = propsT.lockGroupDisabled) == null ? void 0 : _z.title,
      (_A = propsT.lockRule) == null ? void 0 : _A.label,
      (_B = propsT.lockRule) == null ? void 0 : _B.title,
      (_C = propsT.lockRuleDisabled) == null ? void 0 : _C.label,
      (_D = propsT.lockRuleDisabled) == null ? void 0 : _D.title,
      (_E = propsT.notToggle) == null ? void 0 : _E.label,
      (_F = propsT.notToggle) == null ? void 0 : _F.title,
      (_G = propsT.operators) == null ? void 0 : _G.placeholderGroupLabel,
      (_H = propsT.operators) == null ? void 0 : _H.placeholderLabel,
      (_I = propsT.operators) == null ? void 0 : _I.placeholderName,
      (_J = propsT.operators) == null ? void 0 : _J.title,
      (_K = propsT.removeGroup) == null ? void 0 : _K.label,
      (_L = propsT.removeGroup) == null ? void 0 : _L.title,
      (_M = propsT.removeRule) == null ? void 0 : _M.label,
      (_N = propsT.removeRule) == null ? void 0 : _N.title,
      (_O = propsT.shiftActionDown) == null ? void 0 : _O.label,
      (_P = propsT.shiftActionDown) == null ? void 0 : _P.title,
      (_Q = propsT.shiftActionUp) == null ? void 0 : _Q.label,
      (_R = propsT.shiftActionUp) == null ? void 0 : _R.title,
      (_S = propsT.value) == null ? void 0 : _S.title,
      (_T = propsT.valueSourceSelector) == null ? void 0 : _T.title,
      finalize,
      (_U = contextT.addGroup) == null ? void 0 : _U.label,
      (_V = contextT.addGroup) == null ? void 0 : _V.title,
      (_W = contextT.addRule) == null ? void 0 : _W.label,
      (_X = contextT.addRule) == null ? void 0 : _X.title,
      (_Y = contextT.cloneRule) == null ? void 0 : _Y.label,
      (_Z = contextT.cloneRule) == null ? void 0 : _Z.title,
      (__ = contextT.cloneRuleGroup) == null ? void 0 : __.label,
      (_$ = contextT.cloneRuleGroup) == null ? void 0 : _$.title,
      (_aa = contextT.combinators) == null ? void 0 : _aa.title,
      (_ba = contextT.dragHandle) == null ? void 0 : _ba.label,
      (_ca = contextT.dragHandle) == null ? void 0 : _ca.title,
      (_da = contextT.fields) == null ? void 0 : _da.placeholderGroupLabel,
      (_ea = contextT.fields) == null ? void 0 : _ea.placeholderLabel,
      (_fa = contextT.fields) == null ? void 0 : _fa.placeholderName,
      (_ga = contextT.fields) == null ? void 0 : _ga.title,
      (_ha = contextT.lockGroup) == null ? void 0 : _ha.label,
      (_ia = contextT.lockGroup) == null ? void 0 : _ia.title,
      (_ja = contextT.lockGroupDisabled) == null ? void 0 : _ja.label,
      (_ka = contextT.lockGroupDisabled) == null ? void 0 : _ka.title,
      (_la = contextT.lockRule) == null ? void 0 : _la.label,
      (_ma = contextT.lockRule) == null ? void 0 : _ma.title,
      (_na = contextT.lockRuleDisabled) == null ? void 0 : _na.label,
      (_oa = contextT.lockRuleDisabled) == null ? void 0 : _oa.title,
      (_pa = contextT.notToggle) == null ? void 0 : _pa.label,
      (_qa = contextT.notToggle) == null ? void 0 : _qa.title,
      (_ra = contextT.operators) == null ? void 0 : _ra.placeholderGroupLabel,
      (_sa = contextT.operators) == null ? void 0 : _sa.placeholderLabel,
      (_ta = contextT.operators) == null ? void 0 : _ta.placeholderName,
      (_ua = contextT.operators) == null ? void 0 : _ua.title,
      (_va = contextT.removeGroup) == null ? void 0 : _va.label,
      (_wa = contextT.removeGroup) == null ? void 0 : _wa.title,
      (_xa = contextT.removeRule) == null ? void 0 : _xa.label,
      (_ya = contextT.removeRule) == null ? void 0 : _ya.title,
      (_za = contextT.shiftActionDown) == null ? void 0 : _za.label,
      (_Aa = contextT.shiftActionDown) == null ? void 0 : _Aa.title,
      (_Ba = contextT.shiftActionUp) == null ? void 0 : _Ba.label,
      (_Ca = contextT.shiftActionUp) == null ? void 0 : _Ca.title,
      (_Da = contextT.value) == null ? void 0 : _Da.title,
      (_Ea = contextT.valueSourceSelector) == null ? void 0 : _Ea.title
    ]
    // TODO: this type should probably depend on `finalize`
  );
  return {
    controlClassnames,
    controlElements,
    debugMode,
    enableDragAndDrop,
    enableMountQueryChange,
    translations,
    initialQuery: props.initialQuery,
    qbId: props.qbId
  };
};

// src/hooks/useQueryBuilderSchema.ts
import { clsx as clsx2 } from "clsx";
import { useCallback as useCallback2, useEffect, useMemo as useMemo2, useRef as useRef2, useState } from "react";
var defaultValidationResult = {};
var defaultValidationMap = {};
var defaultDisabledPaths = [];
var icCombinatorPropObject = {};
var defaultGetValueEditorSeparator = () => null;
var defaultGetRuleOrGroupClassname = () => "";
var defaultOnAddMoveRemove = () => true;
var defaultOnLog = (...params) => {
  console.log(...params);
};
function useQueryBuilderSchema(props, setup) {
  var _a, _b, _c;
  const {
    query: queryProp,
    defaultQuery: defaultQueryProp,
    getValueEditorSeparator = defaultGetValueEditorSeparator,
    getRuleClassname = defaultGetRuleOrGroupClassname,
    getRuleGroupClassname = defaultGetRuleOrGroupClassname,
    onAddRule = defaultOnAddMoveRemove,
    onAddGroup = defaultOnAddMoveRemove,
    onMoveRule = defaultOnAddMoveRemove,
    onMoveGroup = defaultOnAddMoveRemove,
    onRemove = defaultOnAddMoveRemove,
    onQueryChange,
    showCombinatorsBetweenRules: showCombinatorsBetweenRulesProp = false,
    showNotToggle: showNotToggleProp = false,
    showShiftActions: showShiftActionsProp = false,
    showCloneButtons: showCloneButtonsProp = false,
    showLockButtons: showLockButtonsProp = false,
    resetOnFieldChange: resetOnFieldChangeProp = true,
    resetOnOperatorChange: resetOnOperatorChangeProp = false,
    autoSelectField: autoSelectFieldProp = true,
    autoSelectOperator: autoSelectOperatorProp = true,
    addRuleToNewGroups: addRuleToNewGroupsProp = false,
    listsAsArrays: listsAsArraysProp = false,
    parseNumbers = false,
    disabled = false,
    validator,
    onLog = defaultOnLog,
    idGenerator,
    accessibleDescriptionGenerator = generateAccessibleDescription
  } = props;
  const {
    qbId,
    rqbContext: incomingRqbContext,
    fields,
    fieldMap,
    combinators,
    getOperatorsMain,
    getRuleDefaultOperator,
    getValueEditorTypeMain,
    getValueSourcesMain,
    getValuesMain,
    getRuleDefaultValue,
    getInputTypeMain,
    createRule,
    createRuleGroup
  } = setup;
  const {
    controlClassnames,
    controlElements: controls,
    debugMode,
    enableDragAndDrop,
    enableMountQueryChange,
    translations
  } = incomingRqbContext;
  const showCombinatorsBetweenRules = !!showCombinatorsBetweenRulesProp;
  const showNotToggle = !!showNotToggleProp;
  const showShiftActions = !!showShiftActionsProp;
  const showCloneButtons = !!showCloneButtonsProp;
  const showLockButtons = !!showLockButtonsProp;
  const resetOnFieldChange = !!resetOnFieldChangeProp;
  const resetOnOperatorChange = !!resetOnOperatorChangeProp;
  const autoSelectField = !!autoSelectFieldProp;
  const autoSelectOperator = !!autoSelectOperatorProp;
  const addRuleToNewGroups = !!addRuleToNewGroupsProp;
  const listsAsArrays = !!listsAsArraysProp;
  const log = useCallback2(
    (...params) => {
      if (debugMode) {
        onLog(...params);
      }
    },
    [debugMode, onLog]
  );
  useControlledOrUncontrolled({
    defaultQuery: defaultQueryProp,
    queryProp
  });
  const queryBuilderStore2 = useRQB_INTERNAL_QueryBuilderStore();
  const queryBuilderDispatch = useRQB_INTERNAL_QueryBuilderDispatch();
  const querySelector = useMemo2(() => getQuerySelectorById(qbId), [qbId]);
  const storeQuery = useQueryBuilderSelector(querySelector);
  const getQuery = useCallback2(
    () => querySelector(queryBuilderStore2.getState()),
    [queryBuilderStore2, querySelector]
  );
  const fallbackQuery = useMemo2(() => createRuleGroup(), [createRuleGroup]);
  const candidateQuery = (_b = (_a = queryProp != null ? queryProp : storeQuery) != null ? _a : defaultQueryProp) != null ? _b : fallbackQuery;
  const rootGroup = !candidateQuery.id ? prepareRuleGroup(candidateQuery, { idGenerator }) : candidateQuery;
  const [initialQuery] = useState(rootGroup);
  const rqbContext = useMemo2(
    () => __spreadProps(__spreadValues({}, incomingRqbContext), { initialQuery }),
    [incomingRqbContext, initialQuery]
  );
  useEffect(() => {
    if (!!queryProp && !Object.is(queryProp, storeQuery)) {
      queryBuilderDispatch(
        _RQB_INTERNAL_dispatchThunk({
          payload: { qbId, query: queryProp },
          onQueryChange: void 0
        })
      );
    }
  }, [queryProp, qbId, storeQuery, queryBuilderDispatch]);
  const independentCombinators = useMemo2(() => isRuleGroupTypeIC(rootGroup), [rootGroup]);
  const invalidIC = !!props.independentCombinators && !independentCombinators;
  useDeprecatedProps(
    "independentCombinators",
    invalidIC || !invalidIC && ((_c = props.independentCombinators) != null ? _c : "not present") !== "not present",
    invalidIC ? "invalid" : "unnecessary"
  );
  const hasRunMountQueryChange = useRef2(false);
  useEffect(() => {
    if (hasRunMountQueryChange.current) return;
    hasRunMountQueryChange.current = true;
    queryBuilderDispatch(
      _RQB_INTERNAL_dispatchThunk({
        payload: { qbId, query: rootGroup },
        onQueryChange: (
          // Leave `onQueryChange` undefined if `enableMountQueryChange` is disabled
          enableMountQueryChange && typeof onQueryChange === "function" ? onQueryChange : void 0
        )
      })
    );
  }, [enableMountQueryChange, onQueryChange, qbId, queryBuilderDispatch, rootGroup]);
  const dispatchQuery = useCallback2(
    (newQuery) => {
      queryBuilderDispatch(
        _RQB_INTERNAL_dispatchThunk({ payload: { qbId, query: newQuery }, onQueryChange })
      );
    },
    [onQueryChange, qbId, queryBuilderDispatch]
  );
  const disabledPaths = useMemo2(
    () => Array.isArray(disabled) && disabled || defaultDisabledPaths,
    [disabled]
  );
  const queryDisabled = disabled === true;
  const rootGroupDisabled = useMemo2(
    () => rootGroup.disabled || disabledPaths.some((p) => p.length === 0),
    [disabledPaths, rootGroup.disabled]
  );
  const onRuleAdd = useCallback2(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rule, parentPath, context) => {
      var _a2;
      const queryLocal = getQuerySelectorById(qbId)(queryBuilderStore2.getState());
      if (!queryLocal) return;
      if (pathIsDisabled(parentPath, queryLocal) || queryDisabled) {
        log({ qbId, type: LogType.parentPathDisabled, rule, parentPath, query: queryLocal });
        return;
      }
      const nextRule = onAddRule(rule, parentPath, queryLocal, context);
      if (!nextRule) {
        log({ qbId, type: LogType.onAddRuleFalse, rule, parentPath, query: queryLocal });
        return;
      }
      const newRule = nextRule === true ? rule : nextRule;
      const newQuery = add(queryLocal, newRule, parentPath, {
        combinators,
        combinatorPreceding: (_a2 = newRule.combinatorPreceding) != null ? _a2 : void 0
      });
      log({ qbId, type: LogType.add, query: queryLocal, newQuery, newRule, parentPath });
      dispatchQuery(newQuery);
    },
    [qbId, queryBuilderStore2, queryDisabled, onAddRule, combinators, dispatchQuery, log]
  );
  const onGroupAdd = useCallback2(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ruleGroup, parentPath, context) => {
      var _a2;
      const queryLocal = getQuerySelectorById(qbId)(queryBuilderStore2.getState());
      if (!queryLocal) return;
      if (pathIsDisabled(parentPath, queryLocal) || queryDisabled) {
        log({
          qbId,
          type: LogType.parentPathDisabled,
          ruleGroup,
          parentPath,
          query: queryLocal
        });
        return;
      }
      const nextGroup = onAddGroup(ruleGroup, parentPath, queryLocal, context);
      if (!nextGroup) {
        log({ qbId, type: LogType.onAddGroupFalse, ruleGroup, parentPath, query: queryLocal });
        return;
      }
      const newGroup = nextGroup === true ? ruleGroup : nextGroup;
      const newQuery = add(queryLocal, newGroup, parentPath, {
        combinators,
        combinatorPreceding: (_a2 = newGroup.combinatorPreceding) != null ? _a2 : void 0
      });
      log({ qbId, type: LogType.add, query: queryLocal, newQuery, newGroup, parentPath });
      dispatchQuery(newQuery);
    },
    [qbId, queryBuilderStore2, queryDisabled, onAddGroup, combinators, log, dispatchQuery]
  );
  const onPropChange = useCallback2(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (prop, value, path) => {
      const queryLocal = getQuerySelectorById(qbId)(queryBuilderStore2.getState());
      if (!queryLocal) return;
      if (pathIsDisabled(path, queryLocal) && prop !== "disabled" || queryDisabled) {
        log({ qbId, type: LogType.pathDisabled, path, prop, value, query: queryLocal });
        return;
      }
      const newQuery = update(queryLocal, prop, value, path, {
        resetOnFieldChange,
        resetOnOperatorChange,
        getRuleDefaultOperator,
        getValueSources: getValueSourcesMain,
        getRuleDefaultValue
      });
      log({ qbId, type: LogType.update, query: queryLocal, newQuery, prop, value, path });
      dispatchQuery(newQuery);
    },
    [
      qbId,
      queryBuilderStore2,
      queryDisabled,
      resetOnFieldChange,
      resetOnOperatorChange,
      getRuleDefaultOperator,
      getValueSourcesMain,
      getRuleDefaultValue,
      log,
      dispatchQuery
    ]
  );
  const onRuleOrGroupRemove = useCallback2(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (path, context) => {
      const queryLocal = getQuerySelectorById(qbId)(queryBuilderStore2.getState());
      if (!queryLocal) return;
      if (pathIsDisabled(path, queryLocal) || queryDisabled) {
        log({ qbId, type: LogType.pathDisabled, path, query: queryLocal });
        return;
      }
      const ruleOrGroup = findPath(path, queryLocal);
      if (ruleOrGroup) {
        if (onRemove(ruleOrGroup, path, queryLocal, context)) {
          const newQuery = remove(queryLocal, path);
          log({ qbId, type: LogType.remove, query: queryLocal, newQuery, path, ruleOrGroup });
          dispatchQuery(newQuery);
        } else {
          log({ qbId, type: LogType.onRemoveFalse, ruleOrGroup, path, query: queryLocal });
        }
      }
    },
    [qbId, queryBuilderStore2, queryDisabled, log, onRemove, dispatchQuery]
  );
  const moveRule = useCallback2(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (oldPath, newPath, clone, context) => {
      const queryLocal = getQuerySelectorById(qbId)(queryBuilderStore2.getState());
      if (!queryLocal) return;
      if (pathIsDisabled(oldPath, queryLocal) || queryDisabled) {
        log({ qbId, type: LogType.pathDisabled, oldPath, newPath, query: queryLocal });
        return;
      }
      const nextQuery = move(queryLocal, oldPath, newPath, { clone, combinators });
      const ruleOrGroup = findPath(oldPath, queryLocal);
      const isGroup = isRuleGroup(ruleOrGroup);
      const callbackResult = (isGroup ? onMoveGroup : onMoveRule)(ruleOrGroup, oldPath, newPath, queryLocal, nextQuery, { clone, combinators }, context);
      if (!callbackResult) {
        log({
          qbId,
          type: isGroup ? LogType.onMoveGroupFalse : LogType.onMoveRuleFalse,
          ruleOrGroup,
          oldPath,
          newPath,
          clone,
          query: queryLocal,
          nextQuery
        });
        return;
      }
      const newQuery = isRuleGroup(callbackResult) ? callbackResult : nextQuery;
      log({ qbId, type: LogType.move, query: queryLocal, newQuery, oldPath, newPath, clone });
      dispatchQuery(newQuery);
    },
    [
      qbId,
      queryBuilderStore2,
      queryDisabled,
      combinators,
      onMoveGroup,
      onMoveRule,
      log,
      dispatchQuery
    ]
  );
  const { validationResult, validationMap } = useMemo2(() => {
    const validationResult2 = typeof validator === "function" && rootGroup ? validator(rootGroup) : defaultValidationResult;
    const validationMap2 = typeof validationResult2 === "boolean" ? defaultValidationMap : validationResult2;
    return { validationResult: validationResult2, validationMap: validationMap2 };
  }, [rootGroup, validator]);
  const dndEnabledAttr = useMemo2(
    () => enableDragAndDrop ? "enabled" : "disabled",
    [enableDragAndDrop]
  );
  const inlineCombinatorsAttr = useMemo2(
    () => independentCombinators || showCombinatorsBetweenRules ? "enabled" : "disabled",
    [independentCombinators, showCombinatorsBetweenRules]
  );
  const combinatorPropObject = useMemo2(
    () => typeof rootGroup.combinator === "string" ? { combinator: rootGroup.combinator } : icCombinatorPropObject,
    [rootGroup.combinator]
  );
  const wrapperClassName = useMemo2(
    () => clsx2(standardClassnames.queryBuilder, clsx2(controlClassnames.queryBuilder), {
      [standardClassnames.disabled]: queryDisabled,
      [standardClassnames.valid]: typeof validationResult === "boolean" && validationResult,
      [standardClassnames.invalid]: typeof validationResult === "boolean" && !validationResult
    }),
    [controlClassnames.queryBuilder, queryDisabled, validationResult]
  );
  const schema = useMemo2(
    () => ({
      addRuleToNewGroups,
      accessibleDescriptionGenerator,
      autoSelectField,
      autoSelectOperator,
      classNames: controlClassnames,
      combinators,
      controls,
      createRule,
      createRuleGroup,
      disabledPaths,
      enableDragAndDrop,
      fieldMap,
      fields,
      dispatchQuery,
      getQuery,
      getInputType: getInputTypeMain,
      getOperators: getOperatorsMain,
      getRuleClassname,
      getRuleGroupClassname,
      getValueEditorSeparator,
      getValueEditorType: getValueEditorTypeMain,
      getValues: getValuesMain,
      getValueSources: getValueSourcesMain,
      independentCombinators,
      listsAsArrays,
      parseNumbers,
      qbId,
      showCloneButtons,
      showCombinatorsBetweenRules,
      showLockButtons,
      showNotToggle,
      showShiftActions,
      validationMap
    }),
    [
      addRuleToNewGroups,
      accessibleDescriptionGenerator,
      autoSelectField,
      autoSelectOperator,
      combinators,
      controlClassnames,
      controls,
      createRule,
      createRuleGroup,
      disabledPaths,
      enableDragAndDrop,
      fieldMap,
      fields,
      dispatchQuery,
      getQuery,
      getInputTypeMain,
      getOperatorsMain,
      getRuleClassname,
      getRuleGroupClassname,
      getValueEditorTypeMain,
      getValuesMain,
      getValueSourcesMain,
      getValueEditorSeparator,
      independentCombinators,
      listsAsArrays,
      parseNumbers,
      qbId,
      showCloneButtons,
      showCombinatorsBetweenRules,
      showLockButtons,
      showNotToggle,
      showShiftActions,
      validationMap
    ]
  );
  const actions = useMemo2(
    () => ({
      moveRule,
      onGroupAdd,
      onGroupRemove: onRuleOrGroupRemove,
      onPropChange,
      onRuleAdd,
      onRuleRemove: onRuleOrGroupRemove
    }),
    [moveRule, onGroupAdd, onPropChange, onRuleAdd, onRuleOrGroupRemove]
  );
  return {
    actions,
    rootGroup,
    rootGroupDisabled,
    queryDisabled,
    rqbContext,
    schema,
    translations,
    wrapperClassName,
    dndEnabledAttr,
    inlineCombinatorsAttr,
    combinatorPropObject
  };
}

// src/hooks/useQueryBuilderSetup.ts
import { useCallback as useCallback3, useMemo as useMemo3, useState as useState2 } from "react";
var getFirstOptionsFrom = (opts, r, listsAsArrays) => {
  const firstOption = getFirstOption(opts);
  if (r.operator === "between" || r.operator === "notBetween") {
    const valueAsArray = [firstOption, firstOption];
    return listsAsArrays ? valueAsArray : joinWith(
      valueAsArray.map((v) => v != null ? v : (
        /* istanbul ignore next */
        ""
      )),
      ","
    );
  }
  return firstOption;
};
var useQueryBuilderSetup = (props) => {
  var _a;
  const [qbId] = useState2(generateID);
  const {
    fields: fieldsPropOriginal,
    baseField,
    operators: operatorsProp,
    baseOperator,
    combinators: combinatorsProp = defaultCombinators,
    baseCombinator,
    translations: translationsProp,
    enableMountQueryChange: enableMountQueryChangeProp = true,
    controlClassnames: controlClassnamesProp,
    controlElements: controlElementsProp,
    getDefaultField,
    getDefaultOperator,
    getDefaultValue,
    getOperators,
    getValueEditorType,
    getValueSources,
    getInputType,
    getValues,
    autoSelectField = true,
    autoSelectOperator = true,
    addRuleToNewGroups = false,
    enableDragAndDrop: enableDragAndDropProp,
    listsAsArrays = false,
    debugMode: debugModeProp = false,
    idGenerator = generateID
  } = props;
  const operators = operatorsProp != null ? operatorsProp : defaultOperators;
  const [initialQueryProp] = useState2((_a = props.query) != null ? _a : props.defaultQuery);
  const rqbContext = useMergedContext({
    controlClassnames: controlClassnamesProp,
    controlElements: controlElementsProp,
    debugMode: debugModeProp,
    enableDragAndDrop: enableDragAndDropProp,
    enableMountQueryChange: enableMountQueryChangeProp,
    translations: translationsProp,
    initialQuery: initialQueryProp,
    qbId,
    finalize: true
  });
  const { translations } = rqbContext;
  const defaultField = useMemo3(
    () => ({
      id: translations.fields.placeholderName,
      name: translations.fields.placeholderName,
      value: translations.fields.placeholderName,
      label: translations.fields.placeholderLabel
    }),
    [translations.fields.placeholderLabel, translations.fields.placeholderName]
  );
  const fieldsProp = useMemo3(
    () => fieldsPropOriginal != null ? fieldsPropOriginal : [defaultField],
    [defaultField, fieldsPropOriginal]
  );
  const fields = useMemo3(() => {
    const flds = Array.isArray(fieldsProp) ? toFullOptionList(fieldsProp, baseField) : objectKeys(toFullOptionMap(fieldsProp, baseField)).map((fld) => __spreadProps(__spreadValues({}, fieldsProp[fld]), { name: fld, value: fld })).sort((a, b) => a.label.localeCompare(b.label));
    if (isFlexibleOptionGroupArray(flds)) {
      if (autoSelectField) {
        return uniqOptGroups(flds);
      } else {
        return uniqOptGroups([
          {
            label: translations.fields.placeholderGroupLabel,
            options: [defaultField]
          },
          ...flds
        ]);
      }
    } else {
      if (autoSelectField) {
        return uniqByIdentifier(flds);
      } else {
        return uniqByIdentifier([defaultField, ...flds]);
      }
    }
  }, [
    autoSelectField,
    baseField,
    defaultField,
    fieldsProp,
    translations.fields.placeholderGroupLabel
  ]);
  const fieldMap = useMemo3(() => {
    if (!Array.isArray(fieldsProp)) {
      const fp = toFullOptionMap(fieldsProp, baseField);
      if (autoSelectField) {
        return fp;
      } else {
        return __spreadProps(__spreadValues({}, fp), { [translations.fields.placeholderName]: defaultField });
      }
    }
    const fm = {};
    if (isFlexibleOptionGroupArray(fields)) {
      fields.forEach(
        (f) => f.options.forEach((opt) => {
          var _a2;
          fm[(_a2 = opt.value) != null ? _a2 : (
            /* istanbul ignore next */
            opt.name
          )] = toFullOption(
            opt,
            baseField
          );
        })
      );
    } else {
      fields.forEach((f) => {
        var _a2;
        fm[(_a2 = f.value) != null ? _a2 : (
          /* istanbul ignore next */
          f.name
        )] = toFullOption(
          f,
          baseField
        );
      });
    }
    return fm;
  }, [
    autoSelectField,
    baseField,
    defaultField,
    fields,
    fieldsProp,
    translations.fields.placeholderName
  ]);
  const combinators = useMemo3(
    () => toFullOptionList(combinatorsProp, baseCombinator),
    [baseCombinator, combinatorsProp]
  );
  const defaultOperator = useMemo3(
    () => ({
      id: translations.operators.placeholderName,
      name: translations.operators.placeholderName,
      value: translations.operators.placeholderName,
      label: translations.operators.placeholderLabel
    }),
    [translations.operators.placeholderLabel, translations.operators.placeholderName]
  );
  const getOperatorsMain = useCallback3(
    (field, { fieldData }) => {
      let opsFinal = toFullOptionList(operators, baseOperator);
      if (fieldData == null ? void 0 : fieldData.operators) {
        opsFinal = toFullOptionList(fieldData.operators, baseOperator);
      } else if (getOperators) {
        const ops = getOperators(field, { fieldData });
        if (ops) {
          opsFinal = toFullOptionList(ops, baseOperator);
        }
      }
      if (!autoSelectOperator) {
        if (isFlexibleOptionGroupArray(opsFinal)) {
          opsFinal = [
            {
              label: translations.operators.placeholderGroupLabel,
              options: [defaultOperator]
            },
            ...opsFinal
          ];
        } else {
          opsFinal = [defaultOperator, ...opsFinal];
        }
      }
      return uniqOptList(opsFinal);
    },
    [
      autoSelectOperator,
      baseOperator,
      defaultOperator,
      getOperators,
      operators,
      translations.operators.placeholderGroupLabel
    ]
  );
  const getRuleDefaultOperator = useCallback3(
    (field) => {
      var _a2, _b;
      const fieldData = fieldMap[field];
      if (fieldData == null ? void 0 : fieldData.defaultOperator) {
        return fieldData.defaultOperator;
      }
      if (getDefaultOperator) {
        if (typeof getDefaultOperator === "function") {
          return getDefaultOperator(field, { fieldData });
        } else {
          return getDefaultOperator;
        }
      }
      const ops = (_a2 = getOperatorsMain(field, { fieldData })) != null ? _a2 : (
        /* istanbul ignore next */
        []
      );
      return (_b = getFirstOption(ops)) != null ? _b : (
        /* istanbul ignore next */
        ""
      );
    },
    [fieldMap, getDefaultOperator, getOperatorsMain]
  );
  const getValueEditorTypeMain = useCallback3(
    (field, operator, { fieldData }) => {
      var _a2;
      if (fieldData.valueEditorType) {
        if (typeof fieldData.valueEditorType === "function") {
          return fieldData.valueEditorType(operator);
        }
        return fieldData.valueEditorType;
      }
      return (_a2 = getValueEditorType == null ? void 0 : getValueEditorType(field, operator, { fieldData })) != null ? _a2 : "text";
    },
    [getValueEditorType]
  );
  const getValueSourcesMain = useCallback3(
    (field, operator) => getValueSourcesUtil(fieldMap[field], operator, getValueSources),
    [fieldMap, getValueSources]
  );
  const getValuesMain = useCallback3(
    (field, operator, { fieldData }) => {
      if (fieldData == null ? void 0 : fieldData.values) {
        return toFullOptionList(fieldData.values);
      }
      if (getValues) {
        return toFullOptionList(getValues(field, operator, { fieldData }));
      }
      return [];
    },
    [getValues]
  );
  const getRuleDefaultValue = useCallback3(
    (r) => {
      var _a2;
      const fieldData = (_a2 = fieldMap[r.field]) != null ? _a2 : {};
      if ((fieldData == null ? void 0 : fieldData.defaultValue) !== void 0 && fieldData.defaultValue !== null) {
        return fieldData.defaultValue;
      } else if (getDefaultValue) {
        return getDefaultValue(r, { fieldData });
      }
      let value = "";
      const values = getValuesMain(r.field, r.operator, {
        fieldData
      });
      if (r.valueSource === "field") {
        const filteredFields = filterFieldsByComparator(fieldData, fields, r.operator);
        if (filteredFields.length > 0) {
          value = getFirstOptionsFrom(filteredFields, r, listsAsArrays);
        } else {
          value = "";
        }
      } else if (values.length) {
        const editorType = getValueEditorTypeMain(
          r.field,
          r.operator,
          { fieldData }
        );
        if (editorType === "multiselect") {
          value = listsAsArrays ? [] : "";
        } else if (editorType === "select" || editorType === "radio") {
          value = getFirstOptionsFrom(values, r, listsAsArrays);
        }
      } else {
        const editorType = getValueEditorTypeMain(
          r.field,
          r.operator,
          { fieldData }
        );
        if (editorType === "checkbox") {
          value = false;
        }
      }
      return value;
    },
    [fieldMap, fields, getDefaultValue, getValueEditorTypeMain, getValuesMain, listsAsArrays]
  );
  const getInputTypeMain = useCallback3(
    (field, operator, { fieldData }) => {
      if (getInputType) {
        const inputType = getInputType(field, operator, { fieldData });
        if (inputType) return inputType;
      }
      return "text";
    },
    [getInputType]
  );
  const createRule = useCallback3(() => {
    var _a2;
    let field = "";
    const flds = fields;
    if ((flds == null ? void 0 : flds.length) > 0 && flds[0]) {
      const fo = getFirstOption(flds);
      if (fo) field = fo;
    }
    if (getDefaultField) {
      if (typeof getDefaultField === "function") {
        const df = getDefaultField(flds);
        if (df) field = df;
      } else {
        field = getDefaultField;
      }
    }
    const operator = getRuleDefaultOperator(field);
    const valueSource = (_a2 = getValueSourcesMain(field, operator)[0]) != null ? _a2 : "value";
    const newRule = {
      id: idGenerator(),
      field,
      operator,
      valueSource,
      value: ""
    };
    const value = getRuleDefaultValue(newRule);
    return __spreadProps(__spreadValues({}, newRule), { value });
  }, [
    fields,
    getDefaultField,
    getRuleDefaultOperator,
    getRuleDefaultValue,
    getValueSourcesMain,
    idGenerator
  ]);
  const createRuleGroup = useCallback3(
    (independentCombinators) => {
      var _a2;
      if (independentCombinators) {
        return {
          id: idGenerator(),
          rules: addRuleToNewGroups ? [createRule()] : [],
          not: false
        };
      }
      return {
        id: idGenerator(),
        rules: addRuleToNewGroups ? [createRule()] : [],
        combinator: (_a2 = getFirstOption(combinators)) != null ? _a2 : (
          /* istanbul ignore next */
          ""
        ),
        not: false
      };
    },
    [addRuleToNewGroups, combinators, createRule, idGenerator]
  );
  return {
    qbId,
    rqbContext,
    fields,
    fieldMap,
    combinators,
    getOperatorsMain,
    getRuleDefaultOperator,
    getValueEditorTypeMain,
    getValueSourcesMain,
    getValuesMain,
    getRuleDefaultValue,
    getInputTypeMain,
    createRule,
    createRuleGroup
  };
};

// src/hooks/useQueryBuilder.ts
var useQueryBuilder = (props) => useQueryBuilderSchema(props, useQueryBuilderSetup(props));

// src/hooks/useReactDndWarning.ts
var didWarnEnabledDndWithoutReactDnD = false;
var useReactDndWarning = (enableDragAndDrop, dndRefs) => {
  if (process.env.NODE_ENV !== "production" && !didWarnEnabledDndWithoutReactDnD && enableDragAndDrop && !dndRefs) {
    console.error(messages.errorEnabledDndWithoutReactDnD);
    didWarnEnabledDndWithoutReactDnD = true;
  }
};

// src/hooks/useRule.ts
import { clsx as clsx3 } from "clsx";
import { useCallback as useCallback4, useMemo as useMemo4 } from "react";
var useRule = (props) => {
  const {
    id,
    path,
    rule: ruleProp,
    schema,
    actions: { moveRule, onPropChange, onRuleRemove },
    disabled: disabledProp,
    parentDisabled,
    shiftUpDisabled,
    shiftDownDisabled,
    field: fieldProp,
    operator: operatorProp,
    value: valueProp,
    valueSource: valueSourceProp,
    dragMonitorId = "",
    dropMonitorId = "",
    dndRef = null,
    dragRef = null,
    isDragging = false,
    isOver = false
  } = props;
  const {
    classNames: classNamesProp,
    fields,
    fieldMap,
    getInputType,
    getOperators,
    getValueEditorType,
    getValueEditorSeparator,
    getValueSources,
    getValues,
    validationMap,
    enableDragAndDrop,
    getRuleClassname
  } = schema;
  useDeprecatedProps("rule", !ruleProp);
  useReactDndWarning(enableDragAndDrop, !!(dragMonitorId || dropMonitorId || dndRef || dragRef));
  const disabled = !!parentDisabled || !!disabledProp;
  const rule = useMemo4(
    () => ruleProp ? ruleProp : {
      id,
      field: fieldProp != null ? fieldProp : (
        /* istanbul ignore next */
        ""
      ),
      operator: operatorProp != null ? operatorProp : (
        /* istanbul ignore next */
        ""
      ),
      value: valueProp,
      valueSource: valueSourceProp
    },
    [fieldProp, id, operatorProp, ruleProp, valueProp, valueSourceProp]
  );
  const classNames = useMemo4(
    () => ({
      shiftActions: clsx3(standardClassnames.shiftActions, classNamesProp.shiftActions),
      dragHandle: clsx3(standardClassnames.dragHandle, classNamesProp.dragHandle),
      fields: clsx3(standardClassnames.fields, classNamesProp.valueSelector, classNamesProp.fields),
      operators: clsx3(
        standardClassnames.operators,
        classNamesProp.valueSelector,
        classNamesProp.operators
      ),
      valueSource: clsx3(
        standardClassnames.valueSource,
        classNamesProp.valueSelector,
        classNamesProp.valueSource
      ),
      value: clsx3(standardClassnames.value, classNamesProp.value),
      cloneRule: clsx3(
        standardClassnames.cloneRule,
        classNamesProp.actionElement,
        classNamesProp.cloneRule
      ),
      lockRule: clsx3(
        standardClassnames.lockRule,
        classNamesProp.actionElement,
        classNamesProp.lockRule
      ),
      removeRule: clsx3(
        standardClassnames.removeRule,
        classNamesProp.actionElement,
        classNamesProp.removeRule
      )
    }),
    [
      classNamesProp.shiftActions,
      classNamesProp.dragHandle,
      classNamesProp.valueSelector,
      classNamesProp.fields,
      classNamesProp.operators,
      classNamesProp.valueSource,
      classNamesProp.value,
      classNamesProp.actionElement,
      classNamesProp.cloneRule,
      classNamesProp.lockRule,
      classNamesProp.removeRule
    ]
  );
  const generateOnChangeHandler = useCallback4(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (prop) => (value, _context) => {
      if (!disabled) {
        onPropChange(prop, value, path);
      }
    },
    [disabled, onPropChange, path]
  );
  const cloneRule = useCallback4(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_event, _context) => {
      if (!disabled) {
        const newPath = [...getParentPath(path), path[path.length - 1] + 1];
        moveRule(path, newPath, true);
      }
    },
    [disabled, moveRule, path]
  );
  const toggleLockRule = useCallback4(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_event, _context) => {
      onPropChange("disabled", !disabled, path);
    },
    [disabled, onPropChange, path]
  );
  const removeRule = useCallback4(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_event, _context) => {
      if (!disabled) {
        onRuleRemove(path);
      }
    },
    [disabled, onRuleRemove, path]
  );
  const shiftRuleUp = useCallback4(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event, _context) => {
      if (!disabled && !shiftUpDisabled) {
        moveRule(path, "up", event == null ? void 0 : event.altKey);
      }
    },
    [disabled, moveRule, path, shiftUpDisabled]
  );
  const shiftRuleDown = useCallback4(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event, _context) => {
      if (!disabled && !shiftDownDisabled) {
        moveRule(path, "down", event == null ? void 0 : event.altKey);
      }
    },
    [disabled, moveRule, path, shiftDownDisabled]
  );
  const fieldData = useMemo4(
    () => {
      var _a;
      return (_a = fieldMap == null ? void 0 : fieldMap[rule.field]) != null ? _a : { name: rule.field, value: rule.field, label: rule.field };
    },
    [fieldMap, rule.field]
  );
  const inputType = useMemo4(
    () => {
      var _a;
      return (_a = fieldData.inputType) != null ? _a : getInputType(rule.field, rule.operator, { fieldData });
    },
    [fieldData, getInputType, rule.field, rule.operator]
  );
  const operators = useMemo4(
    () => getOperators(rule.field, { fieldData }),
    [fieldData, getOperators, rule.field]
  );
  const operatorObject = useMemo4(
    () => getOption(operators, rule.operator),
    [operators, rule.operator]
  );
  const arity = operatorObject == null ? void 0 : operatorObject.arity;
  const hideValueControls = typeof arity === "string" && arity === "unary" || typeof arity === "number" && arity < 2;
  const valueSources = useMemo4(
    () => {
      var _a;
      return typeof fieldData.valueSources === "function" ? fieldData.valueSources(rule.operator) : (_a = fieldData.valueSources) != null ? _a : getValueSources(rule.field, rule.operator, { fieldData });
    },
    [fieldData, getValueSources, rule.field, rule.operator]
  );
  const valueEditorType = useMemo4(
    () => rule.valueSource === "field" ? "select" : getValueEditorType(rule.field, rule.operator, { fieldData }),
    [fieldData, getValueEditorType, rule.field, rule.operator, rule.valueSource]
  );
  const valueEditorSeparator = useMemo4(
    () => getValueEditorSeparator(rule.field, rule.operator, { fieldData }),
    [fieldData, getValueEditorSeparator, rule.field, rule.operator]
  );
  const values = useMemo4(
    () => {
      var _a;
      return rule.valueSource === "field" ? filterFieldsByComparator(fieldData, fields, rule.operator) : (_a = fieldData.values) != null ? _a : getValues(rule.field, rule.operator, { fieldData });
    },
    [fieldData, fields, getValues, rule.field, rule.operator, rule.valueSource]
  );
  const valueSourceOptions = useMemo4(
    () => valueSources.map((vs) => ({ name: vs, value: vs, label: vs })),
    [valueSources]
  );
  const validationResult = useMemo4(
    () => {
      var _a;
      return (_a = validationMap[id != null ? id : (
        /* istanbul ignore next */
        ""
      )]) != null ? _a : typeof fieldData.validator === "function" ? fieldData.validator(rule) : null;
    },
    [fieldData, id, rule, validationMap]
  );
  const validationClassName = useMemo4(
    () => getValidationClassNames(validationResult),
    [validationResult]
  );
  const fieldBasedClassName = useMemo4(() => {
    var _a;
    return (_a = fieldData == null ? void 0 : fieldData.className) != null ? _a : "";
  }, [fieldData == null ? void 0 : fieldData.className]);
  const operatorBasedClassName = useMemo4(
    () => {
      var _a;
      return (_a = operatorObject == null ? void 0 : operatorObject.className) != null ? _a : "";
    },
    [operatorObject == null ? void 0 : operatorObject.className]
  );
  const outerClassName = clsx3(
    getRuleClassname(rule, { fieldData }),
    fieldBasedClassName,
    operatorBasedClassName,
    standardClassnames.rule,
    classNamesProp.rule,
    {
      [standardClassnames.disabled]: disabled,
      [standardClassnames.dndDragging]: isDragging,
      [standardClassnames.dndOver]: isOver
    },
    validationClassName
  );
  return __spreadProps(__spreadValues({}, props), {
    classNames,
    cloneRule,
    disabled,
    dndRef,
    dragMonitorId,
    dragRef,
    dropMonitorId,
    fieldData,
    generateOnChangeHandler,
    hideValueControls,
    inputType,
    operators,
    outerClassName,
    removeRule,
    rule,
    shiftRuleUp,
    shiftRuleDown,
    toggleLockRule,
    validationResult,
    valueEditorSeparator,
    valueEditorType,
    values,
    valueSourceOptions,
    valueSources
  });
};

// src/hooks/useRuleGroup.ts
import { clsx as clsx4 } from "clsx";
import { useCallback as useCallback5, useMemo as useMemo5 } from "react";
var useRuleGroup = (props) => {
  const {
    id,
    path,
    ruleGroup: ruleGroupProp,
    schema: {
      qbId,
      accessibleDescriptionGenerator,
      classNames: classNamesProp,
      combinators,
      createRule,
      createRuleGroup,
      disabledPaths,
      independentCombinators,
      validationMap,
      enableDragAndDrop,
      getRuleGroupClassname
    },
    actions: { onGroupAdd, onGroupRemove, onPropChange, onRuleAdd, moveRule },
    disabled: disabledProp,
    parentDisabled,
    shiftUpDisabled,
    shiftDownDisabled,
    combinator: combinatorProp,
    rules: rulesProp,
    not: notProp,
    // Drag-and-drop
    dragMonitorId = "",
    dropMonitorId = "",
    previewRef = null,
    dragRef = null,
    dropRef = null,
    isDragging = false,
    isOver = false
  } = props;
  useDeprecatedProps("ruleGroup", !ruleGroupProp);
  useReactDndWarning(
    enableDragAndDrop,
    !!(dragMonitorId || dropMonitorId || previewRef || dragRef || dropRef)
  );
  const disabled = !!parentDisabled || !!disabledProp;
  const combinator = useMemo5(
    () => ruleGroupProp && isRuleGroupType(ruleGroupProp) ? ruleGroupProp.combinator : !ruleGroupProp ? combinatorProp != null ? combinatorProp : getFirstOption(combinators) : getFirstOption(combinators),
    [combinatorProp, combinators, ruleGroupProp]
  );
  const ruleGroup = useMemo5(
    () => ruleGroupProp ? __spreadValues(__spreadValues({}, ruleGroupProp), !independentCombinators ? { combinator } : {}) : { rules: rulesProp, not: notProp },
    [combinator, independentCombinators, notProp, ruleGroupProp, rulesProp]
  );
  const classNames = useMemo5(
    () => ({
      header: clsx4(standardClassnames.header, classNamesProp.header, {
        [standardClassnames.dndOver]: isOver
      }),
      shiftActions: clsx4(standardClassnames.shiftActions, classNamesProp.shiftActions),
      dragHandle: clsx4(standardClassnames.dragHandle, classNamesProp.dragHandle),
      combinators: clsx4(
        standardClassnames.combinators,
        classNamesProp.valueSelector,
        classNamesProp.combinators
      ),
      notToggle: clsx4(standardClassnames.notToggle, classNamesProp.notToggle),
      addRule: clsx4(
        standardClassnames.addRule,
        classNamesProp.actionElement,
        classNamesProp.addRule
      ),
      addGroup: clsx4(
        standardClassnames.addGroup,
        classNamesProp.actionElement,
        classNamesProp.addGroup
      ),
      cloneGroup: clsx4(
        standardClassnames.cloneGroup,
        classNamesProp.actionElement,
        classNamesProp.cloneGroup
      ),
      lockGroup: clsx4(
        standardClassnames.lockGroup,
        classNamesProp.actionElement,
        classNamesProp.lockGroup
      ),
      removeGroup: clsx4(
        standardClassnames.removeGroup,
        classNamesProp.actionElement,
        classNamesProp.removeGroup
      ),
      body: clsx4(standardClassnames.body, classNamesProp.body)
    }),
    [
      classNamesProp.actionElement,
      classNamesProp.addGroup,
      classNamesProp.addRule,
      classNamesProp.body,
      classNamesProp.cloneGroup,
      classNamesProp.combinators,
      classNamesProp.dragHandle,
      classNamesProp.header,
      classNamesProp.lockGroup,
      classNamesProp.notToggle,
      classNamesProp.removeGroup,
      classNamesProp.shiftActions,
      classNamesProp.valueSelector,
      isOver
    ]
  );
  const onCombinatorChange = useCallback5(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value, _context) => {
      if (!disabled) {
        onPropChange("combinator", value, path);
      }
    },
    [disabled, onPropChange, path]
  );
  const onIndependentCombinatorChange = useCallback5(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value, index, _context) => {
      if (!disabled) {
        onPropChange("combinator", value, path.concat([index]));
      }
    },
    [disabled, onPropChange, path]
  );
  const onNotToggleChange = useCallback5(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (checked, _context) => {
      if (!disabled) {
        onPropChange("not", checked, path);
      }
    },
    [disabled, onPropChange, path]
  );
  const addRule = useCallback5(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_event, context) => {
      if (!disabled) {
        const newRule = createRule();
        onRuleAdd(newRule, path, context);
      }
    },
    [createRule, disabled, onRuleAdd, path]
  );
  const addGroup = useCallback5(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_event, context) => {
      if (!disabled) {
        const newGroup = createRuleGroup(independentCombinators);
        onGroupAdd(newGroup, path, context);
      }
    },
    [createRuleGroup, disabled, independentCombinators, onGroupAdd, path]
  );
  const cloneGroup = useCallback5(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_event, _context) => {
      if (!disabled) {
        const newPath = [...getParentPath(path), path[path.length - 1] + 1];
        moveRule(path, newPath, true);
      }
    },
    [disabled, moveRule, path]
  );
  const shiftGroupUp = useCallback5(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event, _context) => {
      if (!disabled && !shiftUpDisabled) {
        moveRule(path, "up", event == null ? void 0 : event.altKey);
      }
    },
    [disabled, moveRule, path, shiftUpDisabled]
  );
  const shiftGroupDown = useCallback5(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event, _context) => {
      if (!disabled && !shiftDownDisabled) {
        moveRule(path, "down", event == null ? void 0 : event.altKey);
      }
    },
    [disabled, moveRule, path, shiftDownDisabled]
  );
  const toggleLockGroup = useCallback5(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_event, _context) => {
      onPropChange("disabled", !disabled, path);
    },
    [disabled, onPropChange, path]
  );
  const removeGroup = useCallback5(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_event, _context) => {
      if (!disabled) {
        onGroupRemove(path);
      }
    },
    [disabled, onGroupRemove, path]
  );
  const validationResult = useMemo5(
    () => validationMap[id != null ? id : (
      /* istanbul ignore next */
      ""
    )],
    [id, validationMap]
  );
  const validationClassName = useMemo5(
    () => getValidationClassNames(validationResult),
    [validationResult]
  );
  const combinatorBasedClassName = useMemo5(
    () => {
      var _a, _b;
      return independentCombinators ? null : (_b = (_a = getOption(combinators, combinator)) == null ? void 0 : _a.className) != null ? _b : "";
    },
    [combinator, combinators, independentCombinators]
  );
  const ruleGroupClassname = useMemo5(
    () => getRuleGroupClassname(ruleGroup),
    [getRuleGroupClassname, ruleGroup]
  );
  const outerClassName = useMemo5(
    () => clsx4(
      ruleGroupClassname,
      combinatorBasedClassName,
      standardClassnames.ruleGroup,
      classNamesProp.ruleGroup,
      {
        [standardClassnames.disabled]: disabled,
        [standardClassnames.dndDragging]: isDragging
      },
      validationClassName
    ),
    [
      classNamesProp.ruleGroup,
      combinatorBasedClassName,
      disabled,
      ruleGroupClassname,
      isDragging,
      validationClassName
    ]
  );
  const pathsMemo = useMemo5(() => {
    const paths = [];
    for (let i = 0; i < ruleGroup.rules.length; i++) {
      const thisPath = [...path, i];
      paths[i] = {
        path: thisPath,
        disabled: disabled || disabledPaths.some((p) => pathsAreEqual(thisPath, p))
      };
    }
    return paths;
  }, [disabled, path, ruleGroup.rules.length, disabledPaths]);
  const accessibleDescription = useMemo5(
    () => accessibleDescriptionGenerator({ path, qbId }),
    [accessibleDescriptionGenerator, path, qbId]
  );
  return __spreadProps(__spreadValues({}, props), {
    addGroup,
    addRule,
    accessibleDescription,
    classNames,
    cloneGroup,
    combinator,
    disabled,
    dragMonitorId,
    dragRef,
    dropMonitorId,
    dropRef,
    isDragging,
    isOver,
    onCombinatorChange,
    onGroupAdd,
    onIndependentCombinatorChange,
    onNotToggleChange,
    outerClassName,
    parentDisabled,
    pathsMemo,
    previewRef,
    removeGroup,
    ruleGroup,
    shiftGroupUp,
    shiftGroupDown,
    toggleLockGroup,
    validationClassName,
    validationResult
  });
};

// src/hooks/useSelectElementChangeHandler.ts
import { useMemo as useMemo6 } from "react";
var useSelectElementChangeHandler = (params) => {
  const { multiple, onChange } = params;
  const selectElementChangeHandler = useMemo6(
    () => multiple ? (e) => onChange(Array.from(e.target.selectedOptions).map((o) => o.value)) : (e) => onChange(e.target.value),
    [multiple, onChange]
  );
  return selectElementChangeHandler;
};

// src/hooks/useStopEventPropagation.ts
import { useCallback as useCallback6 } from "react";
var useStopEventPropagation = (method) => useCallback6(
  (event, context) => {
    event == null ? void 0 : event.preventDefault();
    event == null ? void 0 : event.stopPropagation();
    method(event, context);
  },
  [method]
);

// src/hooks/useValueEditor.ts
import { produce as produce6 } from "immer";
import { useCallback as useCallback7, useEffect as useEffect2, useMemo as useMemo7 } from "react";
var useValueEditor = (props) => {
  const {
    handleOnChange,
    inputType,
    operator,
    value,
    listsAsArrays,
    parseNumbers,
    values,
    type,
    skipHook
  } = props;
  useEffect2(() => {
    var _a;
    if (!skipHook && type !== "multiselect" && !["between", "notBetween", "in", "notIn"].includes(operator) && (Array.isArray(value) || inputType === "number" && typeof value === "string" && value.includes(","))) {
      handleOnChange((_a = toArray(value)[0]) != null ? _a : "");
    }
  }, [handleOnChange, inputType, operator, skipHook, type, value]);
  const valueAsArray = useMemo7(() => toArray(value), [value]);
  const multiValueHandler = useCallback7(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (v, i) => {
      const val = produce6(valueAsArray, (va) => {
        va[i] = parseNumber(v, { parseNumbers });
        if (i === 0 && (operator === "between" || operator === "notBetween") && (va.length < 2 || typeof va[1] === "undefined")) {
          va[1] = getFirstOption(values);
        }
      });
      handleOnChange(listsAsArrays ? val : joinWith(val, ","));
    },
    [handleOnChange, listsAsArrays, operator, parseNumbers, valueAsArray, values]
  );
  return {
    /**
     * Array of values for when the main value represents a list, e.g. when operator
     * is "between" or "in".
     */
    valueAsArray,
    /**
     * An update handler for a series of value editors, e.g. when operator is "between".
     * Calling this function will update a single element of the value array and leave
     * the rest of the array as is.
     *
     * @param {string} val The new value for the editor
     * @param {number} idx The index of the editor (and the array element to update)
     */
    multiValueHandler
  };
};

// src/hooks/useValueSelector.ts
import { useCallback as useCallback8, useMemo as useMemo8 } from "react";
var useValueSelector = (props) => {
  const { handleOnChange, listsAsArrays = false, multiple = false, value } = props;
  const onChange = useCallback8(
    (v) => {
      if (multiple) {
        const valueAsArray = toArray(v);
        handleOnChange(listsAsArrays ? valueAsArray : joinWith(valueAsArray, ","));
      } else {
        handleOnChange(v);
      }
    },
    [handleOnChange, listsAsArrays, multiple]
  );
  const val = useMemo8(() => multiple ? toArray(value) : value, [multiple, value]);
  return {
    /**
     * Memoized change handler for value selectors
     */
    onChange,
    /**
     * The value as provided or, if appropriate, as an array
     */
    val
  };
};

// src/components/QueryBuilderContext.ts
import { createContext as createContext2 } from "react";
var QueryBuilderContext = createContext2({});

// src/components/QueryBuilder.tsx
var rootPath = [];
var QueryBuilderStateProvider = (props) => /* @__PURE__ */ React8.createElement(Provider, { context: QueryBuilderStateContext, store: queryBuilderStore }, props.children);
var QueryBuilderInternal = ({
  props
}) => {
  const qb = useQueryBuilder(props);
  const RuleGroupControlElement = qb.schema.controls.ruleGroup;
  const QueryBuilderContext2 = QueryBuilderContext;
  return /* @__PURE__ */ React8.createElement(QueryBuilderContext2.Provider, { key: qb.dndEnabledAttr, value: qb.rqbContext }, /* @__PURE__ */ React8.createElement(
    "div",
    {
      role: "form",
      className: qb.wrapperClassName,
      "data-dnd": qb.dndEnabledAttr,
      "data-inlinecombinators": qb.inlineCombinatorsAttr
    },
    /* @__PURE__ */ React8.createElement(
      RuleGroupControlElement,
      __spreadProps(__spreadValues({
        translations: qb.translations,
        ruleGroup: qb.rootGroup,
        rules: qb.rootGroup.rules
      }, qb.combinatorPropObject), {
        not: !!qb.rootGroup.not,
        schema: qb.schema,
        actions: qb.actions,
        id: qb.rootGroup.id,
        path: rootPath,
        disabled: qb.rootGroupDisabled,
        shiftUpDisabled: true,
        shiftDownDisabled: true,
        parentDisabled: qb.queryDisabled,
        context: props.context
      })
    )
  ));
};
var QueryBuilder = (props) => /* @__PURE__ */ React8.createElement(QueryBuilderStateProvider, null, /* @__PURE__ */ React8.createElement(QueryBuilderInternal, { props }));

// src/components/Rule.tsx
import * as React9 from "react";
var Rule = React9.memo((props) => {
  const r = useRule(props);
  const cloneRule = useStopEventPropagation(r.cloneRule);
  const toggleLockRule = useStopEventPropagation(r.toggleLockRule);
  const removeRule = useStopEventPropagation(r.removeRule);
  const shiftRuleUp = useStopEventPropagation(r.shiftRuleUp);
  const shiftRuleDown = useStopEventPropagation(r.shiftRuleDown);
  return /* @__PURE__ */ React9.createElement(
    "div",
    {
      ref: r.dndRef,
      "data-testid": TestID.rule,
      "data-dragmonitorid": r.dragMonitorId,
      "data-dropmonitorid": r.dropMonitorId,
      className: r.outerClassName,
      "data-rule-id": r.id,
      "data-level": r.path.length,
      "data-path": JSON.stringify(r.path)
    },
    /* @__PURE__ */ React9.createElement(
      RuleComponents,
      __spreadProps(__spreadValues({}, r), {
        cloneRule,
        toggleLockRule,
        removeRule,
        shiftRuleUp,
        shiftRuleDown
      })
    )
  );
});
var RuleComponents = React9.memo((r) => {
  var _a, _b;
  const {
    schema: {
      controls: {
        shiftActions: ShiftActionsControlElement,
        dragHandle: DragHandleControlElement,
        fieldSelector: FieldSelectorControlElement,
        operatorSelector: OperatorSelectorControlElement,
        valueSourceSelector: ValueSourceSelectorControlElement,
        valueEditor: ValueEditorControlElement,
        cloneRuleAction: CloneRuleActionControlElement,
        lockRuleAction: LockRuleActionControlElement,
        removeRuleAction: RemoveRuleActionControlElement
      }
    },
    combinator
  } = r;
  return /* @__PURE__ */ React9.createElement(React9.Fragment, null, r.schema.showShiftActions && /* @__PURE__ */ React9.createElement(
    ShiftActionsControlElement,
    {
      testID: TestID.shiftActions,
      level: r.path.length,
      path: r.path,
      titles: {
        shiftUp: r.translations.shiftActionUp.title,
        shiftDown: r.translations.shiftActionDown.title
      },
      labels: {
        shiftUp: r.translations.shiftActionUp.label,
        shiftDown: r.translations.shiftActionDown.label
      },
      className: r.classNames.shiftActions,
      disabled: r.disabled,
      shiftUp: r.shiftRuleUp,
      shiftDown: r.shiftRuleDown,
      shiftUpDisabled: r.shiftUpDisabled,
      shiftDownDisabled: r.shiftDownDisabled,
      context: r.context,
      validation: r.validationResult,
      schema: r.schema,
      ruleOrGroup: r.rule
    }
  ), r.schema.enableDragAndDrop && /* @__PURE__ */ React9.createElement(
    DragHandleControlElement,
    {
      testID: TestID.dragHandle,
      ref: r.dragRef,
      level: r.path.length,
      path: r.path,
      title: r.translations.dragHandle.title,
      label: r.translations.dragHandle.label,
      className: r.classNames.dragHandle,
      disabled: r.disabled,
      context: r.context,
      validation: r.validationResult,
      schema: r.schema,
      ruleOrGroup: r.rule
    }
  ), combinator, /* @__PURE__ */ React9.createElement(
    FieldSelectorControlElement,
    {
      testID: TestID.fields,
      options: r.schema.fields,
      title: r.translations.fields.title,
      value: r.rule.field,
      operator: r.rule.operator,
      className: r.classNames.fields,
      handleOnChange: r.generateOnChangeHandler("field"),
      level: r.path.length,
      path: r.path,
      disabled: r.disabled,
      context: r.context,
      validation: r.validationResult,
      schema: r.schema,
      rule: r.rule
    }
  ), (r.schema.autoSelectField || r.rule.field !== r.translations.fields.placeholderName) && /* @__PURE__ */ React9.createElement(React9.Fragment, null, /* @__PURE__ */ React9.createElement(
    OperatorSelectorControlElement,
    {
      testID: TestID.operators,
      field: r.rule.field,
      fieldData: r.fieldData,
      title: r.translations.operators.title,
      options: r.operators,
      value: r.rule.operator,
      className: r.classNames.operators,
      handleOnChange: r.generateOnChangeHandler("operator"),
      level: r.path.length,
      path: r.path,
      disabled: r.disabled,
      context: r.context,
      validation: r.validationResult,
      schema: r.schema,
      rule: r.rule
    }
  ), (r.schema.autoSelectOperator || r.rule.operator !== r.translations.operators.placeholderName) && !r.hideValueControls && /* @__PURE__ */ React9.createElement(React9.Fragment, null, !["null", "notNull"].includes(r.rule.operator) && r.valueSources.length > 1 && /* @__PURE__ */ React9.createElement(
    ValueSourceSelectorControlElement,
    {
      testID: TestID.valueSourceSelector,
      field: r.rule.field,
      fieldData: r.fieldData,
      title: r.translations.valueSourceSelector.title,
      options: r.valueSourceOptions,
      value: (_a = r.rule.valueSource) != null ? _a : "value",
      className: r.classNames.valueSource,
      handleOnChange: r.generateOnChangeHandler("valueSource"),
      level: r.path.length,
      path: r.path,
      disabled: r.disabled,
      context: r.context,
      validation: r.validationResult,
      schema: r.schema,
      rule: r.rule
    }
  ), /* @__PURE__ */ React9.createElement(
    ValueEditorControlElement,
    {
      testID: TestID.valueEditor,
      field: r.rule.field,
      fieldData: r.fieldData,
      title: r.translations.value.title,
      operator: r.rule.operator,
      value: r.rule.value,
      valueSource: (_b = r.rule.valueSource) != null ? _b : "value",
      type: r.valueEditorType,
      inputType: r.inputType,
      values: r.values,
      listsAsArrays: r.schema.listsAsArrays,
      parseNumbers: r.schema.parseNumbers,
      separator: r.valueEditorSeparator,
      className: r.classNames.value,
      handleOnChange: r.generateOnChangeHandler("value"),
      level: r.path.length,
      path: r.path,
      disabled: r.disabled,
      context: r.context,
      validation: r.validationResult,
      schema: r.schema,
      rule: r.rule
    }
  ))), r.schema.showCloneButtons && /* @__PURE__ */ React9.createElement(
    CloneRuleActionControlElement,
    {
      testID: TestID.cloneRule,
      label: r.translations.cloneRule.label,
      title: r.translations.cloneRule.title,
      className: r.classNames.cloneRule,
      handleOnClick: r.cloneRule,
      level: r.path.length,
      path: r.path,
      disabled: r.disabled,
      context: r.context,
      validation: r.validationResult,
      ruleOrGroup: r.rule,
      schema: r.schema
    }
  ), r.schema.showLockButtons && /* @__PURE__ */ React9.createElement(
    LockRuleActionControlElement,
    {
      testID: TestID.lockRule,
      label: r.translations.lockRule.label,
      title: r.translations.lockRule.title,
      className: r.classNames.lockRule,
      handleOnClick: r.toggleLockRule,
      level: r.path.length,
      path: r.path,
      disabled: r.disabled,
      disabledTranslation: r.parentDisabled ? void 0 : r.translations.lockRuleDisabled,
      context: r.context,
      validation: r.validationResult,
      ruleOrGroup: r.rule,
      schema: r.schema
    }
  ), /* @__PURE__ */ React9.createElement(
    RemoveRuleActionControlElement,
    {
      testID: TestID.removeRule,
      label: r.translations.removeRule.label,
      title: r.translations.removeRule.title,
      className: r.classNames.removeRule,
      handleOnClick: r.removeRule,
      level: r.path.length,
      path: r.path,
      disabled: r.disabled,
      context: r.context,
      validation: r.validationResult,
      ruleOrGroup: r.rule,
      schema: r.schema
    }
  ));
});

// src/components/RuleGroup.tsx
import * as React10 from "react";
import { Fragment as Fragment3 } from "react";
var RuleGroup = React10.memo((props) => {
  const rg = useRuleGroup(props);
  const addRule = useStopEventPropagation(rg.addRule);
  const addGroup = useStopEventPropagation(rg.addGroup);
  const cloneGroup = useStopEventPropagation(rg.cloneGroup);
  const toggleLockGroup = useStopEventPropagation(rg.toggleLockGroup);
  const removeGroup = useStopEventPropagation(rg.removeGroup);
  const shiftGroupUp = useStopEventPropagation(rg.shiftGroupUp);
  const shiftGroupDown = useStopEventPropagation(rg.shiftGroupDown);
  return /* @__PURE__ */ React10.createElement(
    "div",
    {
      ref: rg.previewRef,
      title: rg.accessibleDescription,
      className: rg.outerClassName,
      "data-testid": TestID.ruleGroup,
      "data-dragmonitorid": rg.dragMonitorId,
      "data-dropmonitorid": rg.dropMonitorId,
      "data-rule-group-id": rg.id,
      "data-level": rg.path.length,
      "data-path": JSON.stringify(rg.path)
    },
    /* @__PURE__ */ React10.createElement("div", { ref: rg.dropRef, className: rg.classNames.header }, /* @__PURE__ */ React10.createElement(
      RuleGroupHeaderComponents,
      __spreadProps(__spreadValues({}, rg), {
        addRule,
        addGroup,
        cloneGroup,
        toggleLockGroup,
        removeGroup,
        shiftGroupUp,
        shiftGroupDown
      })
    )),
    /* @__PURE__ */ React10.createElement("div", { className: rg.classNames.body }, /* @__PURE__ */ React10.createElement(
      RuleGroupBodyComponents,
      __spreadProps(__spreadValues({}, rg), {
        addRule,
        addGroup,
        cloneGroup,
        toggleLockGroup,
        removeGroup,
        shiftGroupUp,
        shiftGroupDown
      })
    ))
  );
});
var RuleGroupHeaderComponents = React10.memo(
  (rg) => {
    const {
      schema: {
        controls: {
          shiftActions: ShiftActionsControlElement,
          dragHandle: DragHandleControlElement,
          combinatorSelector: CombinatorSelectorControlElement,
          notToggle: NotToggleControlElement,
          addRuleAction: AddRuleActionControlElement,
          addGroupAction: AddGroupActionControlElement,
          cloneGroupAction: CloneGroupActionControlElement,
          lockGroupAction: LockGroupActionControlElement,
          removeGroupAction: RemoveGroupActionControlElement
        }
      }
    } = rg;
    return /* @__PURE__ */ React10.createElement(React10.Fragment, null, rg.schema.showShiftActions && rg.path.length > 0 && /* @__PURE__ */ React10.createElement(
      ShiftActionsControlElement,
      {
        key: TestID.shiftActions,
        testID: TestID.shiftActions,
        level: rg.path.length,
        path: rg.path,
        titles: {
          shiftUp: rg.translations.shiftActionUp.title,
          shiftDown: rg.translations.shiftActionDown.title
        },
        labels: {
          shiftUp: rg.translations.shiftActionUp.label,
          shiftDown: rg.translations.shiftActionDown.label
        },
        className: rg.classNames.shiftActions,
        disabled: rg.disabled,
        shiftUp: rg.shiftGroupUp,
        shiftDown: rg.shiftGroupDown,
        shiftUpDisabled: rg.shiftUpDisabled,
        shiftDownDisabled: rg.shiftDownDisabled,
        context: rg.context,
        validation: rg.validationResult,
        schema: rg.schema,
        ruleOrGroup: rg.ruleGroup
      }
    ), rg.path.length > 0 && rg.schema.enableDragAndDrop && /* @__PURE__ */ React10.createElement(
      DragHandleControlElement,
      {
        key: TestID.dragHandle,
        testID: TestID.dragHandle,
        ref: rg.dragRef,
        level: rg.path.length,
        path: rg.path,
        title: rg.translations.dragHandle.title,
        label: rg.translations.dragHandle.label,
        className: rg.classNames.dragHandle,
        disabled: rg.disabled,
        context: rg.context,
        validation: rg.validationResult,
        schema: rg.schema,
        ruleOrGroup: rg.ruleGroup
      }
    ), rg.path.length > 0 && /* @__PURE__ */ React10.createElement("span", { className: "statement" }, "Any of the following are true..."), !rg.schema.showCombinatorsBetweenRules && !rg.schema.independentCombinators && /* @__PURE__ */ React10.createElement(
      CombinatorSelectorControlElement,
      {
        key: TestID.combinators,
        testID: TestID.combinators,
        options: rg.schema.combinators,
        value: rg.combinator,
        title: rg.translations.combinators.title,
        className: rg.classNames.combinators,
        handleOnChange: rg.onCombinatorChange,
        rules: rg.ruleGroup.rules,
        level: rg.path.length,
        path: rg.path,
        disabled: rg.disabled,
        context: rg.context,
        validation: rg.validationResult,
        schema: rg.schema
      }
    ), rg.schema.showNotToggle && /* @__PURE__ */ React10.createElement(
      NotToggleControlElement,
      {
        key: TestID.notToggle,
        testID: TestID.notToggle,
        className: rg.classNames.notToggle,
        title: rg.translations.notToggle.title,
        label: rg.translations.notToggle.label,
        checked: rg.ruleGroup.not,
        handleOnChange: rg.onNotToggleChange,
        level: rg.path.length,
        disabled: rg.disabled,
        path: rg.path,
        context: rg.context,
        validation: rg.validationResult,
        schema: rg.schema,
        ruleGroup: rg.ruleGroup
      }
    ), /* @__PURE__ */ React10.createElement(
      AddRuleActionControlElement,
      {
        key: TestID.addRule,
        testID: TestID.addRule,
        label: rg.translations.addRule.label,
        title: rg.translations.addRule.title,
        className: rg.classNames.addRule,
        handleOnClick: rg.addRule,
        rules: rg.ruleGroup.rules,
        level: rg.path.length,
        path: rg.path,
        disabled: rg.disabled,
        context: rg.context,
        validation: rg.validationResult,
        ruleOrGroup: rg.ruleGroup,
        schema: rg.schema
      }
    ), /* @__PURE__ */ React10.createElement(
      AddGroupActionControlElement,
      {
        key: TestID.addGroup,
        testID: TestID.addGroup,
        label: rg.translations.addGroup.label,
        title: rg.translations.addGroup.title,
        className: rg.classNames.addGroup,
        handleOnClick: rg.addGroup,
        rules: rg.ruleGroup.rules,
        level: rg.path.length,
        path: rg.path,
        disabled: rg.disabled,
        context: rg.context,
        validation: rg.validationResult,
        ruleOrGroup: rg.ruleGroup,
        schema: rg.schema
      }
    ), rg.schema.showCloneButtons && rg.path.length >= 1 && /* @__PURE__ */ React10.createElement(
      CloneGroupActionControlElement,
      {
        key: TestID.cloneGroup,
        testID: TestID.cloneGroup,
        label: rg.translations.cloneRuleGroup.label,
        title: rg.translations.cloneRuleGroup.title,
        className: rg.classNames.cloneGroup,
        handleOnClick: rg.cloneGroup,
        rules: rg.ruleGroup.rules,
        level: rg.path.length,
        path: rg.path,
        disabled: rg.disabled,
        context: rg.context,
        validation: rg.validationResult,
        ruleOrGroup: rg.ruleGroup,
        schema: rg.schema
      }
    ), rg.schema.showLockButtons && /* @__PURE__ */ React10.createElement(
      LockGroupActionControlElement,
      {
        key: TestID.lockGroup,
        testID: TestID.lockGroup,
        label: rg.translations.lockGroup.label,
        title: rg.translations.lockGroup.title,
        className: rg.classNames.lockGroup,
        handleOnClick: rg.toggleLockGroup,
        rules: rg.ruleGroup.rules,
        level: rg.path.length,
        path: rg.path,
        disabled: rg.disabled,
        disabledTranslation: rg.parentDisabled ? void 0 : rg.translations.lockGroupDisabled,
        context: rg.context,
        validation: rg.validationResult,
        ruleOrGroup: rg.ruleGroup,
        schema: rg.schema
      }
    ), rg.path.length > 0 && /* @__PURE__ */ React10.createElement(
      RemoveGroupActionControlElement,
      {
        key: TestID.removeGroup,
        testID: TestID.removeGroup,
        label: rg.translations.removeGroup.label,
        title: rg.translations.removeGroup.title,
        className: rg.classNames.removeGroup,
        handleOnClick: rg.removeGroup,
        rules: rg.ruleGroup.rules,
        level: rg.path.length,
        path: rg.path,
        disabled: rg.disabled,
        context: rg.context,
        validation: rg.validationResult,
        ruleOrGroup: rg.ruleGroup,
        schema: rg.schema
      }
    ));
  }
);
var RuleGroupBodyComponents = React10.memo(
  (rg) => {
    const {
      schema: {
        controls: {
          combinatorSelector: CombinatorSelectorControlElement,
          inlineCombinator: InlineCombinatorControlElement,
          ruleGroup: RuleGroupControlElement,
          rule: RuleControlElement
        }
      }
    } = rg;
    return /* @__PURE__ */ React10.createElement(React10.Fragment, null, rg.ruleGroup.rules.map(
      (r, idx, { length: ruleArrayLength }) => {
        const thisPathMemo = rg.pathsMemo[idx];
        const thisPath = thisPathMemo.path;
        const thisPathDisabled = thisPathMemo.disabled || typeof r !== "string" && r.disabled;
        const shiftUpDisabled = pathsAreEqual([0], thisPath);
        const shiftDownDisabled = rg.path.length === 0 && idx === ruleArrayLength - 1;
        const key = typeof r === "string" ? [...thisPath, r].join("-") : r.id;
        const showCombinatorBetweenRules = !rg.schema.independentCombinators && rg.schema.showCombinatorsBetweenRules;
        return /* @__PURE__ */ React10.createElement(Fragment3, { key }, typeof r === "string" ? /* @__PURE__ */ React10.createElement(
          InlineCombinatorControlElement,
          {
            key: `${TestID.inlineCombinator}-independent`,
            options: rg.schema.combinators,
            value: r,
            title: rg.translations.combinators.title,
            className: rg.classNames.combinators,
            handleOnChange: (val) => rg.onIndependentCombinatorChange(val, idx),
            rules: rg.ruleGroup.rules,
            level: rg.path.length,
            context: rg.context,
            validation: rg.validationResult,
            component: CombinatorSelectorControlElement,
            path: thisPath,
            disabled: thisPathDisabled,
            schema: rg.schema
          }
        ) : isRuleGroup(r) ? /* @__PURE__ */ React10.createElement(
          RuleGroupControlElement,
          {
            key: TestID.ruleGroup,
            id: r.id,
            schema: rg.schema,
            actions: rg.actions,
            path: thisPath,
            translations: rg.translations,
            ruleGroup: r,
            rules: r.rules,
            combinator: isRuleGroupType(r) ? r.combinator : void 0,
            not: !!r.not,
            disabled: thisPathDisabled,
            parentDisabled: rg.parentDisabled || rg.disabled,
            shiftUpDisabled,
            shiftDownDisabled,
            context: rg.context
          }
        ) : /* @__PURE__ */ React10.createElement(
          RuleControlElement,
          {
            key: TestID.rule,
            id: r.id,
            rule: r,
            field: r.field,
            operator: r.operator,
            value: r.value,
            valueSource: r.valueSource,
            schema: rg.schema,
            actions: rg.actions,
            path: thisPath,
            disabled: thisPathDisabled,
            parentDisabled: rg.parentDisabled || rg.disabled,
            translations: rg.translations,
            shiftUpDisabled,
            shiftDownDisabled,
            context: rg.context,
            combinator: idx === 1 && showCombinatorBetweenRules ? /* @__PURE__ */ React10.createElement(
              InlineCombinatorControlElement,
              {
                key: TestID.inlineCombinator,
                options: rg.schema.combinators,
                value: rg.combinator,
                title: rg.translations.combinators.title,
                className: rg.classNames.combinators,
                handleOnChange: rg.onCombinatorChange,
                rules: rg.ruleGroup.rules,
                level: rg.path.length,
                context: rg.context,
                validation: rg.validationResult,
                component: CombinatorSelectorControlElement,
                path: thisPath,
                disabled: rg.disabled,
                schema: rg.schema
              }
            ) : idx > 1 && showCombinatorBetweenRules ? /* @__PURE__ */ React10.createElement("span", { className: rg.classNames.combinators }, rg.combinator) : rg.path.length === 0 && showCombinatorBetweenRules ? /* @__PURE__ */ React10.createElement("span", { className: rg.classNames.combinators }, "Where") : /* @__PURE__ */ React10.createElement("span", { className: rg.classNames.combinators })
          }
        ));
      }
    ));
  }
);

// src/components/ShiftActions.tsx
import * as React11 from "react";
var ShiftActions = (props) => {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ React11.createElement("div", { "data-testid": props.testID, className: props.className }, /* @__PURE__ */ React11.createElement(
    "button",
    {
      disabled: props.disabled || props.shiftUpDisabled,
      onClick: props.shiftUp,
      title: (_a = props.titles) == null ? void 0 : _a.shiftUp
    },
    (_b = props.labels) == null ? void 0 : _b.shiftUp
  ), /* @__PURE__ */ React11.createElement(
    "button",
    {
      disabled: props.disabled || props.shiftDownDisabled,
      onClick: props.shiftDown,
      title: (_c = props.titles) == null ? void 0 : _c.shiftDown
    },
    (_d = props.labels) == null ? void 0 : _d.shiftDown
  ));
};

// src/components/ValueEditor.tsx
import * as React12 from "react";
var ValueEditor = (allProps) => {
  var _b;
  const _a = allProps, {
    operator,
    value,
    handleOnChange,
    title,
    className,
    type = "text",
    inputType = "text",
    values = [],
    listsAsArrays,
    parseNumbers,
    fieldData,
    disabled,
    separator = null,
    testID,
    selectorComponent: SelectorComponent = allProps.schema.controls.valueSelector
  } = _a, props = __objRest(_a, [
    "operator",
    "value",
    "handleOnChange",
    "title",
    "className",
    "type",
    "inputType",
    "values",
    "listsAsArrays",
    "parseNumbers",
    "fieldData",
    "disabled",
    "separator",
    "testID",
    "selectorComponent"
  ]);
  const { valueAsArray, multiValueHandler } = useValueEditor(allProps);
  if (operator === "null" || operator === "notNull") {
    return null;
  }
  const placeHolderText = (_b = fieldData == null ? void 0 : fieldData.placeholder) != null ? _b : "";
  const inputTypeCoerced = ["in", "notIn"].includes(operator) ? "text" : inputType || "text";
  if ((operator === "between" || operator === "notBetween") && (type === "select" || type === "text")) {
    const editors = ["from", "to"].map((key, i) => {
      var _a2, _b2;
      if (type === "text") {
        return /* @__PURE__ */ React12.createElement(
          "input",
          {
            key,
            type: inputTypeCoerced,
            placeholder: placeHolderText,
            value: (_a2 = valueAsArray[i]) != null ? _a2 : "",
            className: standardClassnames.valueListItem,
            disabled,
            onChange: (e) => multiValueHandler(e.target.value, i)
          }
        );
      }
      return /* @__PURE__ */ React12.createElement(
        SelectorComponent,
        __spreadProps(__spreadValues({}, props), {
          schema: allProps.schema,
          key,
          className: standardClassnames.valueListItem,
          handleOnChange: (v) => multiValueHandler(v, i),
          disabled,
          value: (_b2 = valueAsArray[i]) != null ? _b2 : getFirstOption(values),
          options: values,
          listsAsArrays
        })
      );
    });
    return /* @__PURE__ */ React12.createElement("span", { "data-testid": testID, className, title }, editors[0], separator, editors[1]);
  }
  switch (type) {
    case "select":
    case "multiselect":
      return /* @__PURE__ */ React12.createElement(
        SelectorComponent,
        __spreadProps(__spreadValues({}, props), {
          schema: allProps.schema,
          testID,
          className,
          title,
          handleOnChange,
          disabled,
          value,
          options: values,
          multiple: type === "multiselect",
          listsAsArrays
        })
      );
    case "textarea":
      return /* @__PURE__ */ React12.createElement(
        "textarea",
        {
          "data-testid": testID,
          placeholder: placeHolderText,
          value,
          title,
          className,
          disabled,
          onChange: (e) => handleOnChange(e.target.value)
        }
      );
    case "switch":
    case "checkbox":
      return /* @__PURE__ */ React12.createElement(
        "input",
        {
          "data-testid": testID,
          type: "checkbox",
          className,
          title,
          onChange: (e) => handleOnChange(e.target.checked),
          checked: !!value,
          disabled
        }
      );
    case "radio":
      return /* @__PURE__ */ React12.createElement("span", { "data-testid": testID, className, title }, values.map((v) => /* @__PURE__ */ React12.createElement("label", { key: v.name }, /* @__PURE__ */ React12.createElement(
        "input",
        {
          type: "radio",
          value: v.name,
          disabled,
          checked: value === v.name,
          onChange: (e) => handleOnChange(e.target.value)
        }
      ), v.label)));
  }
  return /* @__PURE__ */ React12.createElement(
    "input",
    {
      "data-testid": testID,
      type: inputTypeCoerced,
      placeholder: placeHolderText,
      value,
      title,
      className,
      disabled,
      onChange: (e) => handleOnChange(parseNumber(e.target.value, { parseNumbers }))
    }
  );
};

// src/components/ValueSelector.tsx
import * as React13 from "react";
var ValueSelector = (props) => {
  const { onChange, val } = useValueSelector(props);
  const selectElementChangeHandler = useSelectElementChangeHandler({
    multiple: props.multiple,
    onChange
  });
  return /* @__PURE__ */ React13.createElement(
    "select",
    {
      "data-testid": props.testID,
      className: props.className,
      value: val,
      title: props.title,
      disabled: props.disabled,
      multiple: !!props.multiple,
      onChange: selectElementChangeHandler
    },
    toOptions(props.options)
  );
};

// src/components/defaults.ts
var defaultControlElements = {
  actionElement: ActionElement,
  addGroupAction: ActionElement,
  addRuleAction: ActionElement,
  cloneGroupAction: ActionElement,
  cloneRuleAction: ActionElement,
  combinatorSelector: ValueSelector,
  dragHandle: DragHandle,
  fieldSelector: ValueSelector,
  inlineCombinator: InlineCombinator,
  lockGroupAction: ActionElement,
  lockRuleAction: ActionElement,
  notToggle: NotToggle,
  operatorSelector: ValueSelector,
  removeGroupAction: ActionElement,
  removeRuleAction: ActionElement,
  rule: Rule,
  ruleGroup: RuleGroup,
  shiftActions: ShiftActions,
  valueEditor: ValueEditor,
  valueSelector: ValueSelector,
  valueSourceSelector: ValueSelector
};
export {
  ActionElement,
  DragHandle,
  InlineCombinator,
  LogType,
  NotToggle,
  QueryBuilder,
  QueryBuilderContext,
  QueryBuilderStateContext,
  QueryBuilderStateProvider,
  Rule,
  RuleComponents,
  RuleGroup,
  RuleGroupBodyComponents,
  RuleGroupHeaderComponents,
  ShiftActions,
  TestID,
  ValueEditor,
  ValueSelector,
  add,
  convertFromIC,
  convertQuery,
  convertToIC,
  QueryBuilder as default,
  defaultCELValueProcessor,
  defaultCombinators,
  defaultCombinatorsExtended,
  defaultControlClassnames,
  defaultControlElements,
  defaultJoinChar,
  defaultMongoDBValueProcessor,
  defaultOperatorNegationMap,
  defaultOperators,
  defaultPlaceholderFieldGroupLabel,
  defaultPlaceholderFieldLabel,
  defaultPlaceholderFieldName,
  defaultPlaceholderOperatorGroupLabel,
  defaultPlaceholderOperatorLabel,
  defaultPlaceholderOperatorName,
  defaultRuleProcessorCEL,
  defaultRuleProcessorElasticSearch,
  defaultRuleProcessorJSONata,
  defaultRuleProcessorJsonLogic,
  defaultRuleProcessorMongoDB,
  defaultRuleProcessorParameterized,
  defaultRuleProcessorSQL,
  defaultRuleProcessorSpEL,
  defaultSpELValueProcessor,
  defaultTranslations,
  defaultValidator,
  defaultValueProcessor,
  defaultValueProcessorByRule,
  defaultValueProcessorCELByRule,
  defaultValueProcessorMongoDBByRule,
  defaultValueProcessorSpELByRule,
  filterFieldsByComparator,
  findPath,
  formatQuery,
  generateAccessibleDescription,
  generateID,
  getCommonAncestorPath,
  getCompatContextProvider,
  getFirstOption,
  getOption,
  getParentPath,
  getQuerySelectorById,
  getValidationClassNames,
  getValueSourcesUtil,
  groupInvalidReasons,
  insert,
  isAncestor,
  isFlexibleOptionGroupArray,
  isFullOptionGroupArray,
  isOptionGroupArray,
  isPojo,
  isRuleGroup,
  isRuleGroupType,
  isRuleGroupTypeIC,
  isRuleOrGroupValid,
  isValidationResult,
  joinWith,
  jsonLogicAdditionalOperators,
  mergeClassnames,
  mergeTranslation,
  mergeTranslations,
  messages,
  move,
  nullFreeArray,
  numericRegex,
  objectEntries,
  objectKeys,
  parseNumber,
  pathIsDisabled,
  pathsAreEqual,
  preferProp,
  prepareRule,
  prepareRuleGroup,
  prepareRuleOrGroup,
  queryBuilderStore,
  regenerateID,
  regenerateIDs,
  remove,
  rootPath,
  splitBy,
  standardClassnames,
  toArray,
  toFlatOptionArray,
  toFullOption,
  toFullOptionList,
  toFullOptionMap,
  toOptions,
  transformQuery,
  trimIfString,
  uniqByIdentifier,
  uniqByName,
  uniqOptGroups,
  uniqOptList,
  update,
  useControlledOrUncontrolled,
  useDeprecatedProps,
  useMergedContext,
  usePreferAnyProp,
  usePreferProp,
  usePrevious,
  useQueryBuilder,
  useQueryBuilderQuery,
  useQueryBuilderSchema,
  useQueryBuilderSelector,
  useQueryBuilderSetup,
  useReactDndWarning,
  useRule,
  useRuleGroup,
  useSelectElementChangeHandler,
  useStopEventPropagation,
  useValueEditor,
  useValueSelector
};
//# sourceMappingURL=react-querybuilder.legacy-esm.js.map