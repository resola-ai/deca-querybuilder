"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  MantineActionElement: () => MantineActionElement,
  MantineNotToggle: () => MantineNotToggle,
  MantineShiftActions: () => MantineShiftActions,
  MantineValueEditor: () => MantineValueEditor,
  MantineValueSelector: () => MantineValueSelector,
  QueryBuilderMantine: () => QueryBuilderMantine,
  mantineControlElements: () => mantineControlElements
});
module.exports = __toCommonJS(src_exports);
var import_react_querybuilder4 = require("react-querybuilder");

// src/MantineActionElement.tsx
var import_core = require("@mantine/core");
var React = __toESM(require("react"));
var MantineActionElement = ({
  className,
  handleOnClick,
  label,
  title,
  disabled,
  disabledTranslation,
  testID,
  ruleOrGroup: _rg,
  path: _path,
  level: _level,
  context: _context,
  validation: _validation,
  schema: _schema,
  ...otherProps
}) => /* @__PURE__ */ React.createElement(
  import_core.Button,
  {
    ...otherProps,
    "data-testid": testID,
    type: "button",
    className,
    title: disabledTranslation && disabled ? disabledTranslation.title : title,
    onClick: (e) => handleOnClick(e),
    disabled: disabled && !disabledTranslation
  },
  disabledTranslation && disabled ? disabledTranslation.label : label
);

// src/MantineNotToggle.tsx
var import_core2 = require("@mantine/core");
var React2 = __toESM(require("react"));
var MantineNotToggle = ({
  className,
  handleOnChange,
  label,
  checked,
  title,
  disabled,
  testID,
  path: _path,
  level: _level,
  context: _context,
  validation: _validation,
  schema: _schema,
  ruleGroup: _ruleGroup,
  ...otherProps
}) => /* @__PURE__ */ React2.createElement(
  import_core2.Switch,
  {
    ...otherProps,
    "data-testid": testID,
    label,
    className,
    title,
    disabled,
    checked,
    onChange: (e) => handleOnChange(e.target.checked)
  }
);

// src/MantineShiftActions.tsx
var import_core3 = require("@mantine/core");
var React3 = __toESM(require("react"));
var MantineShiftActions = ({
  shiftUp,
  shiftDown,
  shiftUpDisabled,
  shiftDownDisabled,
  disabled,
  className,
  labels,
  titles,
  testID
}) => /* @__PURE__ */ React3.createElement("div", { "data-testid": testID, className }, /* @__PURE__ */ React3.createElement(
  import_core3.Button,
  {
    type: "button",
    size: "compact-xs",
    disabled: disabled || shiftUpDisabled,
    onClick: shiftUp,
    title: titles?.shiftUp
  },
  labels?.shiftUp
), /* @__PURE__ */ React3.createElement(
  import_core3.Button,
  {
    type: "button",
    size: "compact-xs",
    disabled: disabled || shiftDownDisabled,
    onClick: shiftDown,
    title: titles?.shiftDown
  },
  labels?.shiftDown
));

// src/MantineValueEditor.tsx
var import_core4 = require("@mantine/core");
var import_dates = require("@mantine/dates");
var import_dayjs = __toESM(require("dayjs"));
var React4 = __toESM(require("react"));
var import_react_querybuilder2 = require("react-querybuilder");

// src/utils.ts
var import_react_querybuilder = require("react-querybuilder");
var optionListToComboboxData = (list) => {
  const uniqList = (0, import_react_querybuilder.uniqOptList)(list);
  return (0, import_react_querybuilder.isOptionGroupArray)(uniqList) ? uniqList.map((og) => ({ ...og, group: og.label, items: og.options })) : uniqList.map((opt) => ({ name: opt.name, value: opt.name, label: opt.label }));
};
var toNumberInputValue = (val) => {
  if (typeof val === "number")
    return val;
  const valParsed = (0, import_react_querybuilder.parseNumber)(val, { parseNumbers: "native" });
  if (!isNaN(valParsed))
    return valParsed;
  return "";
};

// src/MantineValueEditor.tsx
var dateFormat = "YYYY-MM-DD";
var dateTimeLocalFormat = `${dateFormat}THH:mm:ss`;
var MantineValueEditor = (allProps) => {
  const {
    fieldData,
    operator,
    value,
    handleOnChange,
    title,
    className,
    type,
    inputType,
    values = [],
    listsAsArrays,
    parseNumbers,
    separator,
    valueSource: _vs,
    disabled,
    testID,
    selectorComponent: SelectorComponent = allProps.schema.controls.valueSelector,
    validation: _validation,
    extraProps,
    ...props
  } = allProps;
  const { valueAsArray, multiValueHandler } = (0, import_react_querybuilder2.useValueEditor)({
    handleOnChange,
    inputType,
    operator,
    value,
    type,
    listsAsArrays,
    parseNumbers,
    values
  });
  if (operator === "null" || operator === "notNull") {
    return null;
  }
  const placeHolderText = fieldData?.placeholder ?? "";
  const inputTypeCoerced = ["in", "notIn"].includes(operator) ? "text" : inputType || "text";
  if ((operator === "between" || operator === "notBetween") && (type === "select" || type === "text") && // Date and time ranges are handled differently in Mantine--see below
  inputTypeCoerced !== "date") {
    const editors = ["from", "to"].map((key, i) => {
      if (inputTypeCoerced === "number") {
        return /* @__PURE__ */ React4.createElement(
          import_core4.NumberInput,
          {
            key,
            placeholder: placeHolderText,
            value: toNumberInputValue(valueAsArray[i]),
            className: `${import_react_querybuilder2.standardClassnames.valueListItem} input`,
            disabled,
            onChange: (v) => multiValueHandler(toNumberInputValue(v), i),
            ...extraProps
          }
        );
      }
      if (inputTypeCoerced === "datetime-local") {
        const dateTime = (0, import_dayjs.default)(valueAsArray[i]);
        const dateTimeValue = dateTime.isValid() ? dateTime.toDate() : null;
        return /* @__PURE__ */ React4.createElement(
          import_dates.DateTimePicker,
          {
            placeholder: void 0,
            onPointerEnterCapture: void 0,
            onPointerLeaveCapture: void 0,
            key,
            value: dateTimeValue,
            className: import_react_querybuilder2.standardClassnames.valueListItem,
            disabled,
            withSeconds: true,
            onChange: (d) => multiValueHandler(
              d ? (0, import_dayjs.default)(d).format(dateTimeLocalFormat) : (
                /* istanbul ignore next */
                ""
              ),
              i
            ),
            ...extraProps
          }
        );
      }
      if (type === "text") {
        return /* @__PURE__ */ React4.createElement(
          import_core4.TextInput,
          {
            key,
            type: inputTypeCoerced,
            placeholder: placeHolderText,
            value: valueAsArray[i] ?? "",
            className: `${import_react_querybuilder2.standardClassnames.valueListItem} input`,
            disabled,
            onChange: (e) => multiValueHandler(e.target.value, i),
            ...extraProps
          }
        );
      }
      return /* @__PURE__ */ React4.createElement(
        SelectorComponent,
        {
          ...props,
          key,
          className: import_react_querybuilder2.standardClassnames.valueListItem,
          handleOnChange: (v) => multiValueHandler(v, i),
          disabled,
          value: valueAsArray[i] ?? (0, import_react_querybuilder2.getFirstOption)(values),
          options: values,
          listsAsArrays
        }
      );
    });
    return /* @__PURE__ */ React4.createElement("span", { "data-testid": testID, className, title }, editors[0], separator, editors[1]);
  }
  switch (type) {
    case "select":
    case "multiselect":
      return /* @__PURE__ */ React4.createElement(
        SelectorComponent,
        {
          ...props,
          title,
          className,
          handleOnChange,
          options: values,
          value,
          disabled,
          multiple: type === "multiselect",
          listsAsArrays
        }
      );
    case "textarea":
      return /* @__PURE__ */ React4.createElement(
        import_core4.Textarea,
        {
          className,
          value,
          title,
          placeholder: placeHolderText,
          disabled,
          onChange: (e) => handleOnChange(e.target.value),
          ...extraProps
        }
      );
    case "switch":
      return /* @__PURE__ */ React4.createElement(
        import_core4.Switch,
        {
          className,
          title,
          checked: value,
          disabled,
          onChange: (e) => handleOnChange(e.target.checked),
          ...extraProps
        }
      );
    case "checkbox":
      return /* @__PURE__ */ React4.createElement(
        import_core4.Checkbox,
        {
          className,
          title,
          checked: value,
          disabled,
          onChange: (e) => handleOnChange(e.target.checked),
          ...extraProps
        }
      );
    case "radio":
      return /* @__PURE__ */ React4.createElement(
        import_core4.Radio.Group,
        {
          className,
          title,
          value,
          onChange: handleOnChange,
          ...extraProps
        },
        values.map((v) => /* @__PURE__ */ React4.createElement(import_core4.Radio, { key: v.name, value: v.name, label: v.label, disabled }))
      );
  }
  if (inputTypeCoerced === "date" || inputTypeCoerced === "datetime-local") {
    if (operator === "between" || operator === "notBetween") {
      const twoDateArray = [null, null].map((defaultValue, i) => {
        if (!valueAsArray[i])
          return defaultValue;
        let date = (0, import_dayjs.default)(valueAsArray[i]);
        if (!date.isValid()) {
          date = (0, import_dayjs.default)(`${(0, import_dayjs.default)().format("YYYY-MM-DD")}T${valueAsArray[i]}`);
        }
        return date.isValid() ? date.toDate() : defaultValue;
      });
      return /* @__PURE__ */ React4.createElement(
        import_dates.DatePickerInput,
        {
          "data-testid": testID,
          type: "range",
          value: twoDateArray,
          className,
          disabled,
          onChange: (dates) => {
            const dateArray = dates.map((d) => d ? (0, import_dayjs.default)(d).format(dateFormat) : "");
            handleOnChange(listsAsArrays ? dateArray : dateArray.join(","));
          },
          ...extraProps
        }
      );
    }
    if (inputTypeCoerced === "datetime-local") {
      return /* @__PURE__ */ React4.createElement(
        import_dates.DateTimePicker,
        {
          placeholder: void 0,
          onPointerEnterCapture: void 0,
          onPointerLeaveCapture: void 0,
          "data-testid": testID,
          value: !!value && (0, import_dayjs.default)(value).isValid() ? (0, import_dayjs.default)(value).toDate() : null,
          className,
          disabled,
          withSeconds: true,
          onChange: (d) => handleOnChange(d ? (0, import_dayjs.default)(d).format(dateTimeLocalFormat) : (
            /* istanbul ignore next */
            ""
          )),
          ...extraProps
        }
      );
    }
    return /* @__PURE__ */ React4.createElement(
      import_dates.DatePickerInput,
      {
        "data-testid": testID,
        type: "default",
        value: !!value && (0, import_dayjs.default)(value).isValid() ? (0, import_dayjs.default)(value).toDate() : null,
        className,
        disabled,
        onChange: (d) => handleOnChange(d ? (0, import_dayjs.default)(d).format(dateFormat) : (
          /* istanbul ignore next */
          ""
        )),
        ...extraProps
      }
    );
  }
  if (inputTypeCoerced === "number") {
    return /* @__PURE__ */ React4.createElement(
      import_core4.NumberInput,
      {
        "data-testid": testID,
        title,
        className,
        placeholder: placeHolderText,
        disabled,
        value: toNumberInputValue(value),
        onChange: (v) => handleOnChange(toNumberInputValue(v)),
        ...extraProps
      }
    );
  }
  return /* @__PURE__ */ React4.createElement(
    import_core4.TextInput,
    {
      "data-testid": testID,
      title,
      className,
      placeholder: placeHolderText,
      type: inputTypeCoerced,
      disabled,
      value,
      onChange: (e) => handleOnChange(e.target.value),
      ...extraProps
    }
  );
};

// src/MantineValueSelector.tsx
var import_core5 = require("@mantine/core");
var React5 = __toESM(require("react"));
var import_react_querybuilder3 = require("react-querybuilder");
var MantineValueSelector = ({
  className,
  handleOnChange,
  options,
  value,
  title,
  disabled,
  multiple,
  listsAsArrays,
  testID,
  field: _field,
  fieldData: _fieldData,
  rule: _rule,
  rules: _rules,
  path: _path,
  level: _level,
  context: _context,
  validation: _validation,
  schema: _schema,
  ...otherProps
}) => {
  const { onChange, val } = (0, import_react_querybuilder3.useValueSelector)({ handleOnChange, listsAsArrays, multiple, value });
  const data = React5.useMemo(() => optionListToComboboxData(options), [options]);
  const changeHandler = (v) => onChange(v ?? "");
  return multiple ? /* @__PURE__ */ React5.createElement(
    import_core5.MultiSelect,
    {
      ...otherProps,
      "data-testid": testID,
      title,
      className,
      data,
      disabled,
      value: val,
      onChange: changeHandler
    }
  ) : /* @__PURE__ */ React5.createElement(
    import_core5.Select,
    {
      ...otherProps,
      "data-testid": testID,
      title,
      className,
      value: val,
      data,
      disabled,
      onChange: changeHandler
    }
  );
};

// src/index.ts
var mantineControlElements = {
  actionElement: MantineActionElement,
  notToggle: MantineNotToggle,
  shiftActions: MantineShiftActions,
  valueEditor: MantineValueEditor,
  valueSelector: MantineValueSelector
};
var QueryBuilderMantine = (0, import_react_querybuilder4.getCompatContextProvider)({
  key: "mantine",
  controlElements: mantineControlElements
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MantineActionElement,
  MantineNotToggle,
  MantineShiftActions,
  MantineValueEditor,
  MantineValueSelector,
  QueryBuilderMantine,
  mantineControlElements
});
//# sourceMappingURL=react-querybuilder_mantine.cjs.development.js.map