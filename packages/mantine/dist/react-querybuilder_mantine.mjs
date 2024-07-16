// src/index.ts
import { getCompatContextProvider } from "react-querybuilder";

// src/MantineActionElement.tsx
import { Button } from "@mantine/core";
import * as React from "react";
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
  Button,
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
import { Switch } from "@mantine/core";
import * as React2 from "react";
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
  Switch,
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
import { Button as Button2 } from "@mantine/core";
import * as React3 from "react";
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
  Button2,
  {
    type: "button",
    size: "compact-xs",
    disabled: disabled || shiftUpDisabled,
    onClick: shiftUp,
    title: titles?.shiftUp
  },
  labels?.shiftUp
), /* @__PURE__ */ React3.createElement(
  Button2,
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
import { Checkbox, NumberInput, Radio, Switch as Switch2, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
import * as React4 from "react";
import { getFirstOption, standardClassnames, useValueEditor } from "react-querybuilder";

// src/utils.ts
import { isOptionGroupArray, parseNumber, uniqOptList } from "react-querybuilder";
var optionListToComboboxData = (list) => {
  const uniqList = uniqOptList(list);
  return isOptionGroupArray(uniqList) ? uniqList.map((og) => ({ ...og, group: og.label, items: og.options })) : uniqList.map((opt) => ({ name: opt.name, value: opt.name, label: opt.label }));
};
var toNumberInputValue = (val) => {
  if (typeof val === "number") return val;
  const valParsed = parseNumber(val, { parseNumbers: "native" });
  if (!isNaN(valParsed)) return valParsed;
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
  const { valueAsArray, multiValueHandler } = useValueEditor({
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
          NumberInput,
          {
            key,
            placeholder: placeHolderText,
            value: toNumberInputValue(valueAsArray[i]),
            className: `${standardClassnames.valueListItem} input`,
            disabled,
            onChange: (v) => multiValueHandler(toNumberInputValue(v), i),
            ...extraProps
          }
        );
      }
      if (inputTypeCoerced === "datetime-local") {
        const dateTime = dayjs(valueAsArray[i]);
        const dateTimeValue = dateTime.isValid() ? dateTime.toDate() : null;
        return /* @__PURE__ */ React4.createElement(
          DateTimePicker,
          {
            placeholder: void 0,
            onPointerEnterCapture: void 0,
            onPointerLeaveCapture: void 0,
            key,
            value: dateTimeValue,
            className: standardClassnames.valueListItem,
            disabled,
            withSeconds: true,
            onChange: (d) => multiValueHandler(
              d ? dayjs(d).format(dateTimeLocalFormat) : (
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
          TextInput,
          {
            key,
            type: inputTypeCoerced,
            placeholder: placeHolderText,
            value: valueAsArray[i] ?? "",
            className: `${standardClassnames.valueListItem} input`,
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
          className: standardClassnames.valueListItem,
          handleOnChange: (v) => multiValueHandler(v, i),
          disabled,
          value: valueAsArray[i] ?? getFirstOption(values),
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
        Textarea,
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
        Switch2,
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
        Checkbox,
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
        Radio.Group,
        {
          className,
          title,
          value,
          onChange: handleOnChange,
          ...extraProps
        },
        values.map((v) => /* @__PURE__ */ React4.createElement(Radio, { key: v.name, value: v.name, label: v.label, disabled }))
      );
  }
  if (inputTypeCoerced === "date" || inputTypeCoerced === "datetime-local") {
    if (operator === "between" || operator === "notBetween") {
      const twoDateArray = [null, null].map((defaultValue, i) => {
        if (!valueAsArray[i]) return defaultValue;
        let date = dayjs(valueAsArray[i]);
        if (!date.isValid()) {
          date = dayjs(`${dayjs().format("YYYY-MM-DD")}T${valueAsArray[i]}`);
        }
        return date.isValid() ? date.toDate() : defaultValue;
      });
      return /* @__PURE__ */ React4.createElement(
        DatePickerInput,
        {
          "data-testid": testID,
          type: "range",
          value: twoDateArray,
          className,
          disabled,
          onChange: (dates) => {
            const dateArray = dates.map((d) => d ? dayjs(d).format(dateFormat) : "");
            handleOnChange(listsAsArrays ? dateArray : dateArray.join(","));
          },
          ...extraProps
        }
      );
    }
    if (inputTypeCoerced === "datetime-local") {
      return /* @__PURE__ */ React4.createElement(
        DateTimePicker,
        {
          placeholder: void 0,
          onPointerEnterCapture: void 0,
          onPointerLeaveCapture: void 0,
          "data-testid": testID,
          value: !!value && dayjs(value).isValid() ? dayjs(value).toDate() : null,
          className,
          disabled,
          withSeconds: true,
          onChange: (d) => handleOnChange(d ? dayjs(d).format(dateTimeLocalFormat) : (
            /* istanbul ignore next */
            ""
          )),
          ...extraProps
        }
      );
    }
    return /* @__PURE__ */ React4.createElement(
      DatePickerInput,
      {
        "data-testid": testID,
        type: "default",
        value: !!value && dayjs(value).isValid() ? dayjs(value).toDate() : null,
        className,
        disabled,
        onChange: (d) => handleOnChange(d ? dayjs(d).format(dateFormat) : (
          /* istanbul ignore next */
          ""
        )),
        ...extraProps
      }
    );
  }
  if (inputTypeCoerced === "number") {
    return /* @__PURE__ */ React4.createElement(
      NumberInput,
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
    TextInput,
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
import { MultiSelect, Select } from "@mantine/core";
import * as React5 from "react";
import { useValueSelector } from "react-querybuilder";
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
  const { onChange, val } = useValueSelector({ handleOnChange, listsAsArrays, multiple, value });
  const data = React5.useMemo(() => optionListToComboboxData(options), [options]);
  const changeHandler = (v) => onChange(v ?? "");
  return multiple ? /* @__PURE__ */ React5.createElement(
    MultiSelect,
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
    Select,
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
var QueryBuilderMantine = getCompatContextProvider({
  controlElements: mantineControlElements
});
export {
  MantineActionElement,
  MantineNotToggle,
  MantineShiftActions,
  MantineValueEditor,
  MantineValueSelector,
  QueryBuilderMantine,
  mantineControlElements
};
//# sourceMappingURL=react-querybuilder_mantine.mjs.map