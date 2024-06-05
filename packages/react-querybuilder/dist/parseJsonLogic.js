"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/parseJsonLogic/index.ts
var parseJsonLogic_exports = {};
__export(parseJsonLogic_exports, {
  parseJsonLogic: () => parseJsonLogic
});
module.exports = __toCommonJS(parseJsonLogic_exports);

// src/defaults.ts
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

// src/utils/misc.ts
var import_numeric_quantity = require("numeric-quantity");
var numericRegex = new RegExp(
  import_numeric_quantity.numericRegex.source.replace(/^\^/, "^\\s*").replace(/\$$/, "\\s*$")
);
var isPojo = (obj) => obj === null || typeof obj !== "object" ? false : Object.getPrototypeOf(obj) === Object.prototype;

// src/utils/isRuleGroup.ts
var isRuleGroup = (rg) => isPojo(rg) && "rules" in rg && Array.isArray(rg.rules);
var isRuleGroupType = (rg) => isRuleGroup(rg) && typeof rg.combinator === "string";
var isRuleGroupTypeIC = (rg) => isRuleGroup(rg) && typeof rg.combinator === "undefined";

// src/utils/convertQuery.ts
var convertToIC = (rg) => {
  if (isRuleGroupTypeIC(rg)) {
    return rg;
  }
  const { combinator, ...queryWithoutCombinator } = rg;
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
  return { ...queryWithoutCombinator, rules };
};

// src/utils/objectUtils.ts
var objectKeys = Object.keys;

// src/utils/toFullOption.ts
var import_immer = require("immer");
var isOptionWithName = (opt) => isPojo(opt) && "name" in opt && typeof opt.name === "string";
var isOptionWithValue = (opt) => isPojo(opt) && "value" in opt && typeof opt.value === "string";
function toFullOption(opt, baseProperties) {
  const recipe = (0, import_immer.produce)((draft) => {
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

// src/utils/uniq.ts
var uniqByIdentifier = (originalArray) => {
  const names = /* @__PURE__ */ new Set();
  const newArray = [];
  originalArray.forEach((el) => {
    if (!names.has(el.value ?? el.name)) {
      names.add(el.value ?? el.name);
      newArray.push(el);
    }
  });
  return originalArray.length === newArray.length ? originalArray : newArray;
};

// src/utils/optGroupUtils.ts
var isOptionGroupArray = (arr) => Array.isArray(arr) && arr.length > 0 && isPojo(arr[0]) && "options" in arr[0];
var isFlexibleOptionGroupArray = (arr) => Array.isArray(arr) && arr.length > 0 && isPojo(arr[0]) && "options" in arr[0] && isPojo(arr[0].options[0]) && ("name" in arr[0].options[0] || "value" in arr[0].options[0]);
var toFlatOptionArray = (arr) => uniqByIdentifier(isOptionGroupArray(arr) ? arr.flatMap((og) => og.options) : arr);

// src/utils/filterFieldsByComparator.ts
var filterByComparator = (field, operator, fieldToCompare) => {
  const fullField = toFullOption(field);
  const fullFieldToCompare = toFullOption(fieldToCompare);
  if (fullField.value === fullFieldToCompare.value) {
    return false;
  }
  if (typeof fullField.comparator === "string") {
    return fullField[fullField.comparator] === fullFieldToCompare[fullField.comparator];
  }
  return fullField.comparator?.(fullFieldToCompare, operator) ?? /* istanbul ignore next */
  false;
};
var filterFieldsByComparator = (field, fields, operator) => {
  if (!field.comparator) {
    const filterOutSameField = (f) => (f.value ?? /* istanbul ignore next */
    f.name) !== (field.value ?? /* istanbul ignore next */
    field.name);
    if (isFlexibleOptionGroupArray(fields)) {
      return fields.map((og) => ({
        ...og,
        options: og.options.filter(filterOutSameField)
      }));
    }
    return fields.filter(filterOutSameField);
  }
  if (isFlexibleOptionGroupArray(fields)) {
    return fields.map((og) => ({
      ...og,
      options: og.options.filter((f) => filterByComparator(field, operator, f))
    })).filter((og) => og.options.length > 0);
  }
  return fields.filter((f) => filterByComparator(field, operator, f));
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
    if (vals)
      return vals;
  }
  return defaultValueSourcesArray;
};

// src/utils/parserUtils.ts
var getFieldsArray = (fields) => {
  const fieldsArray = !fields ? [] : Array.isArray(fields) ? fields : Object.keys(fields).map((fld) => ({ ...fields[fld], name: fld })).sort((a, b) => a.label.localeCompare(b.label));
  return toFlatOptionArray(fieldsArray);
};
function fieldIsValidUtil(params) {
  const { fieldsFlat, fieldName, operator, subordinateFieldName, getValueSources } = params;
  if (fieldsFlat.length === 0)
    return true;
  let valid = false;
  const primaryField = toFullOption(fieldsFlat.find((ff) => ff.name === fieldName));
  if (primaryField) {
    if (!subordinateFieldName && operator !== "notNull" && operator !== "null" && !getValueSourcesUtil(primaryField, operator, getValueSources).some((vs) => vs === "value")) {
      valid = false;
    } else {
      valid = true;
    }
    if (valid && !!subordinateFieldName) {
      if (getValueSourcesUtil(primaryField, operator, getValueSources).some((vs) => vs === "field") && fieldName !== subordinateFieldName) {
        const validSubordinateFields = filterFieldsByComparator(
          primaryField,
          fieldsFlat,
          operator
        );
        if (!validSubordinateFields.find((vsf) => vsf.name === subordinateFieldName)) {
          valid = false;
        }
      } else {
        valid = false;
      }
    }
  }
  return valid;
}

// src/utils/parseJsonLogic/utils.ts
var isJsonLogicVar = (logic) => isPojo(logic) && "var" in logic;
var isRQBJsonLogicVar = (logic) => isJsonLogicVar(logic) && typeof logic.var === "string";
var isJsonLogicEqual = (logic) => isPojo(logic) && "==" in logic;
var isJsonLogicStrictEqual = (logic) => isPojo(logic) && "===" in logic;
var isJsonLogicNotEqual = (logic) => isPojo(logic) && "!=" in logic;
var isJsonLogicStrictNotEqual = (logic) => isPojo(logic) && "!==" in logic;
var isJsonLogicNegation = (logic) => isPojo(logic) && "!" in logic;
var isJsonLogicDoubleNegation = (logic) => isPojo(logic) && "!!" in logic;
var isJsonLogicOr = (logic) => isPojo(logic) && "or" in logic;
var isJsonLogicAnd = (logic) => isPojo(logic) && "and" in logic;
var isJsonLogicGreaterThan = (logic) => isPojo(logic) && ">" in logic;
var isJsonLogicGreaterThanOrEqual = (logic) => isPojo(logic) && ">=" in logic;
var isJsonLogicLessThan = (logic) => isPojo(logic) && "<" in logic && logic["<"].length === 2;
var isJsonLogicLessThanOrEqual = (logic) => isPojo(logic) && "<=" in logic && logic["<="].length === 2;
var isJsonLogicInArray = (logic) => isPojo(logic) && "in" in logic && Array.isArray(logic.in[1]);
var isJsonLogicInString = (logic) => isPojo(logic) && "in" in logic && !Array.isArray(logic.in[1]);
var isJsonLogicBetweenExclusive = (logic) => isPojo(logic) && "<" in logic && Array.isArray(logic["<"]) && logic["<"].length === 3;
var isJsonLogicBetweenInclusive = (logic) => isPojo(logic) && "<=" in logic && Array.isArray(logic["<="]) && logic["<="].length === 3;
var isRQBJsonLogicStartsWith = (logic) => isPojo(logic) && "startsWith" in logic;
var isRQBJsonLogicEndsWith = (logic) => isPojo(logic) && "endsWith" in logic;

// src/utils/parseJsonLogic/parseJsonLogic.ts
var emptyRuleGroup = { combinator: "and", rules: [] };
function parseJsonLogic(rqbJsonLogic, options = {}) {
  const fieldsFlat = getFieldsArray(options.fields);
  const { getValueSources, listsAsArrays, jsonLogicOperations } = options;
  const fieldIsValid = (fieldName, operator, subordinateFieldName) => fieldIsValidUtil({
    fieldName,
    fieldsFlat,
    operator,
    subordinateFieldName,
    getValueSources
  });
  function processLogic(logic, outermost) {
    if (outermost && !isPojo(logic)) {
      return false;
    }
    const key = Object.keys(logic)[0];
    const keyValue = logic[key];
    if (isJsonLogicAnd(logic)) {
      return {
        combinator: "and",
        rules: logic.and.map((l) => processLogic(l)).filter(Boolean)
      };
    } else if (isJsonLogicOr(logic)) {
      return {
        combinator: "or",
        rules: logic.or.map((l) => processLogic(l)).filter(Boolean)
      };
    } else if (isJsonLogicNegation(logic)) {
      const rule2 = processLogic(logic["!"]);
      if (rule2) {
        if (!isRuleGroupType(rule2) && (rule2.operator === "between" || rule2.operator === "in" || rule2.operator === "contains" || rule2.operator === "beginsWith" || rule2.operator === "endsWith")) {
          const newRule = { ...rule2, operator: defaultOperatorNegationMap[rule2.operator] };
          if (outermost) {
            return { combinator: "and", rules: [newRule] };
          }
          return newRule;
        } else if (isJsonLogicBetweenExclusive(logic["!"]) || isRuleGroupType(rule2)) {
          return { ...rule2, not: true };
        }
        return { combinator: "and", rules: [rule2], not: true };
      }
      return false;
    } else if (isJsonLogicDoubleNegation(logic)) {
      const rule2 = processLogic(logic["!!"]);
      return rule2 || false;
    }
    let rule = false;
    let field = "";
    let operator = "=";
    let value = "";
    let valueSource = void 0;
    if (jsonLogicOperations && objectKeys(jsonLogicOperations).includes(key)) {
      rule = jsonLogicOperations[key](keyValue);
    } else if (
      // Basic boolean operations
      isJsonLogicEqual(logic) || isJsonLogicStrictEqual(logic) || isJsonLogicNotEqual(logic) || isJsonLogicStrictNotEqual(logic) || isJsonLogicGreaterThan(logic) || isJsonLogicGreaterThanOrEqual(logic) || isJsonLogicLessThan(logic) || isJsonLogicLessThanOrEqual(logic) || isJsonLogicInString(logic) || isRQBJsonLogicStartsWith(logic) || isRQBJsonLogicEndsWith(logic)
    ) {
      const [first, second] = keyValue;
      if (isRQBJsonLogicVar(first) && !isPojo(second)) {
        field = first.var;
        value = second;
      } else if (!isPojo(first) && isRQBJsonLogicVar(second)) {
        field = second.var;
        value = first;
      } else if (isRQBJsonLogicVar(first) && isRQBJsonLogicVar(second)) {
        field = first.var;
        value = second.var;
        valueSource = "field";
      } else {
        return false;
      }
      if (isJsonLogicEqual(logic) || isJsonLogicStrictEqual(logic)) {
        operator = value === null ? "null" : "=";
      } else if (isJsonLogicNotEqual(logic) || isJsonLogicStrictNotEqual(logic)) {
        operator = value === null ? "notNull" : "!=";
      } else if (isJsonLogicInString(logic)) {
        operator = "contains";
      } else if (isRQBJsonLogicStartsWith(logic)) {
        operator = "beginsWith";
      } else if (isRQBJsonLogicEndsWith(logic)) {
        operator = "endsWith";
      } else {
        operator = key;
      }
      if (fieldIsValid(field, operator, valueSource === "field" ? value : void 0)) {
        rule = { field, operator, value, valueSource };
      }
    } else if (isJsonLogicBetweenExclusive(logic) && isRQBJsonLogicVar(logic["<"][1])) {
      field = logic["<"][1].var;
      const values = [logic["<"][0], logic["<"][2]];
      if (values.every(isRQBJsonLogicVar) || values.every((el) => typeof el === "string") || values.every((el) => typeof el === "number") || values.every((el) => typeof el === "boolean")) {
        return processLogic({
          and: [{ ">": [{ var: field }, values[0]] }, { "<": [{ var: field }, values[1]] }]
        }) || /* istanbul ignore next */
        false;
      }
    } else if (isJsonLogicBetweenInclusive(logic) && isRQBJsonLogicVar(logic["<="][1])) {
      field = logic["<="][1].var;
      operator = "between";
      const values = [logic["<="][0], logic["<="][2]];
      if (logic["<="].every(isRQBJsonLogicVar)) {
        const vars = values;
        valueSource = "field";
        const fieldList = vars.map((el) => el.var).filter((sf) => fieldIsValid(field, operator, sf));
        value = listsAsArrays ? fieldList : fieldList.join(",");
      } else {
        if (values.every((el) => typeof el === "string") || values.every((el) => typeof el === "number") || values.every((el) => typeof el === "boolean")) {
          value = listsAsArrays ? values : values.map((el) => `${el}`).join(",");
        }
      }
      if (fieldIsValid(field, operator) && value.length >= 2) {
        rule = { field, operator, value, valueSource };
      }
    } else if (isJsonLogicInArray(logic) && isRQBJsonLogicVar(keyValue[0])) {
      field = keyValue[0].var;
      operator = "in";
      if (logic.in[1].every(isRQBJsonLogicVar)) {
        valueSource = "field";
        const fieldList = logic.in[1].map((el) => el.var).filter((sf) => fieldIsValid(field, operator, sf));
        value = listsAsArrays ? fieldList : fieldList.join(",");
      } else {
        if (logic.in[1].every((el) => typeof el === "string") || logic.in[1].every((el) => typeof el === "number") || logic.in[1].every((el) => typeof el === "boolean")) {
          value = listsAsArrays ? logic.in[1] : logic.in[1].map((el) => `${el}`).join(",");
        }
      }
      if (value.length > 0) {
        rule = { field, operator, value, valueSource };
      }
    }
    return !rule ? false : outermost ? { combinator: "and", rules: [rule] } : rule;
  }
  let logicRoot = rqbJsonLogic;
  if (typeof rqbJsonLogic === "string") {
    try {
      logicRoot = JSON.parse(rqbJsonLogic);
    } catch (err) {
      return emptyRuleGroup;
    }
  }
  const result = processLogic(logicRoot, true);
  const finalQuery = !result ? emptyRuleGroup : result;
  return options.independentCombinators ? convertToIC(finalQuery) : finalQuery;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseJsonLogic
});
//# sourceMappingURL=parseJsonLogic.js.map