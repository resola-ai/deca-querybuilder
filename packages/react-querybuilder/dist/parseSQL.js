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

// src/utils/parseSQL/index.ts
var parseSQL_exports = {};
__export(parseSQL_exports, {
  parseSQL: () => parseSQL
});
module.exports = __toCommonJS(parseSQL_exports);

// src/utils/misc.ts
var import_numeric_quantity = require("numeric-quantity");
var numericRegex = new RegExp(
  import_numeric_quantity.numericRegex.source.replace(/^\^/, "^\\s*").replace(/\$$/, "\\s*$")
);
var isPojo = (obj) => obj === null || typeof obj !== "object" ? false : Object.getPrototypeOf(obj) === Object.prototype;

// src/utils/isRuleGroup.ts
var isRuleGroup = (rg) => isPojo(rg) && "rules" in rg && Array.isArray(rg.rules);

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

// src/utils/parseSQL/sqlParser.js
var sqlParser = function() {
  var o = function(k, v, o2, l) {
    for (o2 = o2 || {}, l = k.length; l--; o2[k[l]] = v)
      ;
    return o2;
  }, $V0 = [1, 8], $V1 = [1, 4], $V2 = [2, 4], $V3 = [1, 11], $V4 = [1, 10], $V5 = [2, 16], $V6 = [1, 14], $V7 = [1, 15], $V8 = [1, 16], $V9 = [6, 8], $Va = [2, 148], $Vb = [1, 19], $Vc = [1, 20], $Vd = [16, 33, 35, 36, 37, 38, 39, 40, 41, 42, 45, 52, 53, 56, 57, 59, 60, 62, 76, 79, 81, 82, 83, 84, 86, 87, 88, 91, 103, 195], $Ve = [16, 18, 32, 33, 35, 36, 37, 38, 39, 40, 41, 42, 45, 52, 53, 56, 57, 59, 60, 62, 76, 79, 81, 82, 83, 84, 86, 87, 88, 91, 103, 195], $Vf = [2, 162], $Vg = [1, 29], $Vh = [6, 8, 14, 17, 146, 150, 152, 154], $Vi = [1, 42], $Vj = [1, 61], $Vk = [1, 53], $Vl = [1, 60], $Vm = [1, 62], $Vn = [1, 63], $Vo = [1, 64], $Vp = [1, 65], $Vq = [1, 66], $Vr = [1, 59], $Vs = [1, 54], $Vt = [1, 55], $Vu = [1, 56], $Vv = [1, 57], $Vw = [1, 58], $Vx = [1, 43], $Vy = [1, 44], $Vz = [1, 45], $VA = [1, 47], $VB = [1, 34], $VC = [1, 67], $VD = [16, 35, 36, 37, 38, 39, 40, 41, 42, 45, 52, 53, 56, 57, 59, 60, 62, 76, 79, 81, 82, 83, 84, 86, 87, 88, 91, 103, 195], $VE = [6, 8, 14, 17, 150, 152, 154], $VF = [2, 145], $VG = [1, 76], $VH = [1, 77], $VI = [6, 8, 14, 17, 43, 133, 138, 144, 146, 150, 152, 154], $VJ = [1, 80], $VK = [1, 79], $VL = [1, 81], $VM = [6, 8, 14, 17, 36, 43, 51, 52, 53, 71, 72, 74, 77, 89, 109, 126, 127, 129, 133, 135, 138, 141, 142, 144, 146, 150, 152, 154, 157, 164, 165, 167, 168, 173, 177, 179, 180, 182], $VN = [6, 8, 14, 17, 34, 36, 43, 51, 52, 53, 71, 72, 74, 77, 89, 109, 114, 115, 116, 117, 118, 119, 123, 126, 127, 129, 133, 135, 138, 141, 142, 144, 146, 150, 152, 154, 157, 164, 165, 167, 168, 173, 177, 179, 180, 182], $VO = [1, 102], $VP = [1, 100], $VQ = [1, 101], $VR = [1, 96], $VS = [1, 97], $VT = [1, 98], $VU = [1, 99], $VV = [1, 103], $VW = [1, 104], $VX = [1, 105], $VY = [1, 106], $VZ = [1, 107], $V_ = [1, 108], $V$ = [2, 107], $V01 = [6, 8, 14, 17, 34, 36, 43, 45, 51, 52, 53, 71, 72, 74, 77, 79, 81, 89, 93, 94, 95, 96, 97, 98, 99, 100, 101, 103, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 123, 126, 127, 129, 133, 135, 138, 141, 142, 144, 146, 150, 152, 154, 157, 164, 165, 167, 168, 173, 177, 179, 180, 182], $V11 = [6, 8, 14, 17, 34, 36, 43, 45, 51, 52, 53, 71, 72, 74, 77, 79, 81, 89, 93, 94, 95, 96, 97, 98, 99, 100, 101, 103, 105, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 123, 126, 127, 129, 133, 135, 138, 141, 142, 144, 146, 150, 152, 154, 157, 164, 165, 167, 168, 173, 177, 179, 180, 182], $V21 = [2, 82], $V31 = [1, 110], $V41 = [1, 109], $V51 = [1, 117], $V61 = [2, 65], $V71 = [1, 119], $V81 = [16, 35, 37, 38, 39, 40, 41, 42, 45, 52, 53, 56, 57, 59, 60, 62, 76, 79, 81, 82, 83, 84, 86, 87, 88, 91, 103, 195], $V91 = [16, 29, 35, 52, 53, 56, 57, 59, 60, 62, 76, 79, 81, 82, 83, 84, 86, 87, 88, 91, 121, 195], $Va1 = [1, 162], $Vb1 = [1, 164], $Vc1 = [17, 43], $Vd1 = [6, 8, 14, 16, 17, 34, 35, 36, 43, 45, 50, 51, 52, 53, 56, 57, 59, 60, 62, 71, 72, 74, 76, 77, 79, 81, 82, 83, 84, 86, 87, 88, 89, 90, 91, 93, 94, 95, 96, 97, 98, 99, 100, 101, 103, 105, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 123, 126, 127, 129, 133, 135, 138, 141, 142, 144, 146, 150, 152, 154, 157, 164, 165, 167, 168, 173, 177, 179, 180, 182, 192, 193, 194, 195], $Ve1 = [2, 60], $Vf1 = [1, 174], $Vg1 = [1, 172], $Vh1 = [6, 8, 138, 146], $Vi1 = [16, 35, 38, 39, 40, 41, 42, 45, 52, 53, 56, 57, 59, 60, 62, 76, 79, 81, 82, 83, 84, 86, 87, 88, 91, 103, 195], $Vj1 = [6, 8, 14, 17, 138, 144, 146, 150, 152, 154], $Vk1 = [6, 8, 14, 17, 36, 43, 51, 52, 53, 71, 72, 74, 77, 89, 126, 127, 129, 133, 135, 138, 141, 142, 144, 146, 150, 152, 154, 157, 164, 165, 167, 168, 173, 177, 179, 180, 182], $Vl1 = [6, 8, 14, 17, 34, 36, 43, 51, 52, 53, 71, 72, 74, 77, 89, 93, 94, 95, 96, 101, 103, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 123, 126, 127, 129, 133, 135, 138, 141, 142, 144, 146, 150, 152, 154, 157, 164, 165, 167, 168, 173, 177, 179, 180, 182], $Vm1 = [6, 8, 14, 17, 34, 36, 43, 51, 52, 53, 71, 72, 74, 77, 79, 81, 89, 93, 94, 95, 96, 101, 103, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 123, 126, 127, 129, 133, 135, 138, 141, 142, 144, 146, 150, 152, 154, 157, 164, 165, 167, 168, 173, 177, 179, 180, 182], $Vn1 = [16, 35, 39, 40, 41, 42, 45, 52, 53, 56, 57, 59, 60, 62, 76, 79, 81, 82, 83, 84, 86, 87, 88, 91, 103, 195], $Vo1 = [16, 35, 40, 41, 42, 45, 52, 53, 56, 57, 59, 60, 62, 76, 79, 81, 82, 83, 84, 86, 87, 88, 91, 103, 195], $Vp1 = [6, 8, 14, 17, 43, 157], $Vq1 = [16, 35, 42, 45, 52, 53, 56, 57, 59, 60, 62, 76, 79, 81, 82, 83, 84, 86, 87, 88, 91, 103, 195], $Vr1 = [71, 74, 77], $Vs1 = [16, 35, 45, 52, 53, 56, 57, 59, 60, 62, 76, 79, 81, 82, 83, 84, 86, 87, 88, 91, 103, 195], $Vt1 = [1, 239], $Vu1 = [6, 8, 14, 17], $Vv1 = [1, 257], $Vw1 = [1, 253], $Vx1 = [2, 199], $Vy1 = [1, 261], $Vz1 = [1, 262], $VA1 = [6, 8, 14, 17, 43, 129, 135, 138, 144, 146, 150, 152, 154, 182], $VB1 = [1, 264], $VC1 = [1, 267], $VD1 = [1, 268], $VE1 = [1, 269], $VF1 = [1, 270], $VG1 = [2, 176], $VH1 = [1, 266], $VI1 = [6, 8, 14, 17, 36, 43, 89, 129, 135, 138, 144, 146, 150, 152, 154, 164, 165, 167, 168, 173, 177, 179, 180, 182], $VJ1 = [6, 8, 14, 17, 135, 138, 144, 146, 150, 152, 154], $VK1 = [1, 282], $VL1 = [2, 181], $VM1 = [170, 173], $VN1 = [6, 8, 14, 17, 36, 43, 89, 129, 135, 138, 144, 146, 150, 152, 154, 164, 165, 167, 168, 173, 177, 179, 180, 182, 192, 193, 194], $VO1 = [2, 201], $VP1 = [1, 287], $VQ1 = [1, 299], $VR1 = [1, 307], $VS1 = [1, 308], $VT1 = [1, 309], $VU1 = [6, 8, 14, 17, 138, 146, 150, 152, 154], $VV1 = [1, 319], $VW1 = [1, 325], $VX1 = [1, 326], $VY1 = [2, 206], $VZ1 = [1, 337], $V_1 = [16, 152], $V$1 = [6, 8, 14, 17, 152, 154], $V02 = [1, 353];
  var parser = {
    trace: function trace() {
    },
    yy: {},
    symbols_: { "error": 2, "main": 3, "selectClause": 4, "semicolonOpt": 5, "EOF": 6, "unionClause": 7, ";": 8, "unionClauseNotParenthesized": 9, "unionClauseParenthesized": 10, "order_by_opt": 11, "limit_opt": 12, "selectClauseParenthesized": 13, "UNION": 14, "distinctOpt": 15, "(": 16, ")": 17, "SELECT": 18, "highPriorityOpt": 19, "maxStateMentTimeOpt": 20, "straightJoinOpt": 21, "sqlSmallResultOpt": 22, "sqlBigResultOpt": 23, "sqlBufferResultOpt": 24, "sqlCacheOpt": 25, "sqlCalcFoundRowsOpt": 26, "selectExprList": 27, "selectDataSetOpt": 28, "ALL": 29, "DISTINCT": 30, "DISTINCTROW": 31, "HIGH_PRIORITY": 32, "MAX_STATEMENT_TIME": 33, "=": 34, "NUMERIC": 35, "STRAIGHT_JOIN": 36, "SQL_SMALL_RESULT": 37, "SQL_BIG_RESULT": 38, "SQL_BUFFER_RESULT": 39, "SQL_CACHE": 40, "SQL_NO_CACHE": 41, "SQL_CALC_FOUND_ROWS": 42, ",": 43, "selectExpr": 44, "*": 45, "selectExprStar": 46, "expr": 47, "selectExprAliasOpt": 48, "identifier": 49, "DOT": 50, "AS": 51, "IDENTIFIER": 52, "STRING": 53, "string": 54, "number": 55, "EXPONENT_NUMERIC": 56, "HEX_NUMERIC": 57, "boolean": 58, "TRUE": 59, "FALSE": 60, "null": 61, "NULL": 62, "literal": 63, "place_holder": 64, "function_call": 65, "function_call_param_list": 66, "function_call_param": 67, "identifier_list": 68, "case_expr_opt": 69, "when_then_list": 70, "WHEN": 71, "THEN": 72, "case_when_else": 73, "ELSE": 74, "case_when": 75, "CASE": 76, "END": 77, "simple_expr_prefix": 78, "+": 79, "simple_expr": 80, "-": 81, "~": 82, "!": 83, "BINARY": 84, "expr_list": 85, "ROW": 86, "EXISTS": 87, "{": 88, "}": 89, "||": 90, "WILDCARD": 91, "bit_expr": 92, "|": 93, "&": 94, "<<": 95, ">>": 96, "/": 97, "DIV": 98, "MOD": 99, "%": 100, "^": 101, "not_opt": 102, "NOT": 103, "escape_opt": 104, "ESCAPE": 105, "predicate": 106, "IN": 107, "BETWEEN": 108, "AND": 109, "SOUNDS": 110, "LIKE": 111, "REGEXP": 112, "comparison_operator": 113, ">=": 114, ">": 115, "<=": 116, "<": 117, "<>": 118, "!=": 119, "sub_query_data_set_opt": 120, "ANY": 121, "boolean_primary": 122, "IS": 123, "boolean_extra": 124, "UNKNOWN": 125, "OR": 126, "XOR": 127, "where_opt": 128, "WHERE": 129, "group_by_opt": 130, "group_by": 131, "roll_up_opt": 132, "WITH": 133, "ROLLUP": 134, "GROUP_BY": 135, "group_by_order_by_item_list": 136, "order_by": 137, "ORDER_BY": 138, "group_by_order_by_item": 139, "sort_opt": 140, "ASC": 141, "DESC": 142, "having_opt": 143, "HAVING": 144, "limit": 145, "LIMIT": 146, "OFFSET": 147, "procedure_opt": 148, "procedure": 149, "PROCEDURE": 150, "for_update_lock_in_share_mode_opt": 151, "FOR": 152, "UPDATE": 153, "LOCK": 154, "SHARE": 155, "MODE": 156, "FROM": 157, "table_references": 158, "partitionOpt": 159, "escaped_table_reference": 160, "table_reference": 161, "OJ": 162, "join_inner_cross": 163, "INNER": 164, "CROSS": 165, "left_right": 166, "LEFT": 167, "RIGHT": 168, "out_opt": 169, "OUTER": 170, "left_right_out_opt": 171, "join_table": 172, "JOIN": 173, "table_factor": 174, "join_condition": 175, "on_join_condition": 176, "NATURAL": 177, "join_condition_opt": 178, "ON": 179, "USING": 180, "partition_names": 181, "PARTITION": 182, "aliasOpt": 183, "index_or_key": 184, "INDEX": 185, "KEY": 186, "for_opt": 187, "identifier_list_opt": 188, "index_hint_list_opt": 189, "index_hint_list": 190, "index_hint": 191, "USE": 192, "IGNORE": 193, "FORCE": 194, "PLACE_HOLDER": 195, "$accept": 0, "$end": 1 },
    terminals_: { 2: "error", 6: "EOF", 8: ";", 14: "UNION", 16: "(", 17: ")", 18: "SELECT", 29: "ALL", 30: "DISTINCT", 31: "DISTINCTROW", 32: "HIGH_PRIORITY", 33: "MAX_STATEMENT_TIME", 34: "=", 35: "NUMERIC", 36: "STRAIGHT_JOIN", 37: "SQL_SMALL_RESULT", 38: "SQL_BIG_RESULT", 39: "SQL_BUFFER_RESULT", 40: "SQL_CACHE", 41: "SQL_NO_CACHE", 42: "SQL_CALC_FOUND_ROWS", 43: ",", 45: "*", 50: "DOT", 51: "AS", 52: "IDENTIFIER", 53: "STRING", 56: "EXPONENT_NUMERIC", 57: "HEX_NUMERIC", 59: "TRUE", 60: "FALSE", 62: "NULL", 71: "WHEN", 72: "THEN", 74: "ELSE", 76: "CASE", 77: "END", 79: "+", 81: "-", 82: "~", 83: "!", 84: "BINARY", 86: "ROW", 87: "EXISTS", 88: "{", 89: "}", 90: "||", 91: "WILDCARD", 93: "|", 94: "&", 95: "<<", 96: ">>", 97: "/", 98: "DIV", 99: "MOD", 100: "%", 101: "^", 103: "NOT", 105: "ESCAPE", 107: "IN", 108: "BETWEEN", 109: "AND", 110: "SOUNDS", 111: "LIKE", 112: "REGEXP", 114: ">=", 115: ">", 116: "<=", 117: "<", 118: "<>", 119: "!=", 121: "ANY", 123: "IS", 125: "UNKNOWN", 126: "OR", 127: "XOR", 129: "WHERE", 133: "WITH", 134: "ROLLUP", 135: "GROUP_BY", 138: "ORDER_BY", 141: "ASC", 142: "DESC", 144: "HAVING", 146: "LIMIT", 147: "OFFSET", 150: "PROCEDURE", 152: "FOR", 153: "UPDATE", 154: "LOCK", 155: "SHARE", 156: "MODE", 157: "FROM", 162: "OJ", 164: "INNER", 165: "CROSS", 167: "LEFT", 168: "RIGHT", 170: "OUTER", 173: "JOIN", 177: "NATURAL", 179: "ON", 180: "USING", 182: "PARTITION", 185: "INDEX", 186: "KEY", 192: "USE", 193: "IGNORE", 194: "FORCE", 195: "PLACE_HOLDER" },
    productions_: [0, [3, 3], [3, 3], [5, 1], [5, 0], [7, 1], [7, 3], [10, 4], [10, 4], [13, 3], [9, 4], [9, 4], [4, 12], [15, 1], [15, 1], [15, 1], [15, 0], [19, 1], [19, 0], [20, 3], [20, 0], [21, 1], [21, 0], [22, 1], [22, 0], [23, 1], [23, 0], [24, 1], [24, 0], [25, 0], [25, 1], [25, 1], [26, 1], [26, 0], [27, 3], [27, 1], [44, 1], [44, 1], [44, 2], [46, 3], [48, 0], [48, 2], [48, 1], [48, 2], [48, 1], [54, 1], [55, 1], [55, 1], [55, 1], [58, 1], [58, 1], [61, 1], [63, 1], [63, 1], [63, 1], [63, 1], [63, 1], [65, 4], [66, 3], [66, 1], [67, 0], [67, 1], [67, 1], [67, 2], [67, 1], [49, 1], [49, 3], [68, 1], [68, 3], [69, 0], [69, 1], [70, 4], [70, 5], [73, 0], [73, 2], [75, 5], [78, 2], [78, 2], [78, 2], [78, 2], [78, 2], [80, 1], [80, 1], [80, 1], [80, 1], [80, 3], [80, 4], [80, 3], [80, 4], [80, 4], [80, 1], [80, 3], [80, 3], [80, 5], [92, 1], [92, 3], [92, 3], [92, 3], [92, 3], [92, 3], [92, 3], [92, 3], [92, 3], [92, 3], [92, 3], [92, 3], [92, 3], [102, 0], [102, 1], [104, 0], [104, 2], [106, 1], [106, 6], [106, 6], [106, 6], [106, 4], [106, 5], [106, 4], [113, 1], [113, 1], [113, 1], [113, 1], [113, 1], [113, 1], [113, 1], [120, 1], [120, 1], [122, 1], [122, 4], [122, 3], [122, 6], [124, 1], [124, 1], [47, 1], [47, 4], [47, 2], [47, 3], [47, 3], [47, 3], [85, 1], [85, 3], [128, 0], [128, 2], [130, 0], [130, 1], [132, 0], [132, 2], [131, 3], [11, 0], [11, 1], [137, 3], [136, 1], [136, 3], [139, 2], [140, 0], [140, 1], [140, 1], [143, 0], [143, 2], [145, 2], [145, 4], [145, 4], [12, 0], [12, 1], [148, 0], [148, 1], [149, 2], [151, 0], [151, 2], [151, 4], [28, 0], [28, 10], [158, 1], [158, 3], [160, 1], [160, 4], [163, 0], [163, 1], [163, 1], [166, 1], [166, 1], [169, 0], [169, 1], [171, 0], [171, 2], [172, 4], [172, 5], [172, 4], [172, 6], [172, 5], [178, 0], [178, 1], [176, 2], [175, 1], [175, 4], [161, 1], [161, 1], [181, 1], [181, 3], [159, 0], [159, 4], [183, 0], [183, 2], [183, 1], [184, 1], [184, 1], [187, 0], [187, 2], [187, 2], [187, 2], [188, 0], [188, 1], [189, 0], [189, 1], [190, 1], [190, 3], [191, 6], [191, 6], [191, 6], [174, 4], [174, 4], [174, 3], [64, 1]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
      var $0 = $$.length - 1;
      switch (yystate) {
        case 1:
        case 2:
          return { nodeType: "Main", value: $$[$0 - 2], hasSemicolon: $$[$0 - 1] };
          break;
        case 3:
        case 146:
          this.$ = true;
          break;
        case 4:
          this.$ = false;
          break;
        case 5:
        case 13:
        case 14:
        case 15:
        case 17:
        case 19:
        case 21:
        case 23:
        case 25:
        case 27:
        case 30:
        case 31:
        case 32:
        case 37:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 61:
        case 62:
        case 64:
        case 70:
        case 74:
        case 81:
        case 82:
        case 83:
        case 84:
        case 90:
        case 94:
        case 108:
        case 110:
        case 111:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
        case 123:
        case 124:
        case 125:
        case 126:
        case 127:
        case 131:
        case 133:
        case 142:
        case 144:
        case 149:
        case 155:
        case 156:
        case 158:
        case 163:
        case 165:
        case 166:
        case 177:
        case 178:
        case 179:
        case 180:
        case 182:
        case 191:
        case 193:
        case 195:
        case 196:
        case 204:
        case 205:
        case 211:
        case 213:
          this.$ = $$[$0];
          break;
        case 6:
          this.$ = $$[$0 - 2], this.$.orderBy = $$[$0 - 1], this.$.limit = $$[$0];
          ;
          break;
        case 7:
        case 8:
          this.$ = { type: "Union", left: $$[$0 - 3], distinctOpt: $$[$0 - 1], right: $$[$0] };
          ;
          break;
        case 9:
          this.$ = { type: "SelectParenthesized", value: $$[$0 - 1] };
          ;
          break;
        case 10:
        case 11:
          this.$ = { type: "Union", left: $$[$0 - 3], distinctOpt: $$[$0 - 1], right: $$[$0] };
          break;
        case 12:
          this.$ = {
            type: "Select",
            distinctOpt: $$[$0 - 10],
            highPriorityOpt: $$[$0 - 9],
            maxStateMentTimeOpt: $$[$0 - 8],
            straightJoinOpt: $$[$0 - 7],
            sqlSmallResultOpt: $$[$0 - 6],
            sqlBigResultOpt: $$[$0 - 5],
            sqlBufferResultOpt: $$[$0 - 4],
            sqlCacheOpt: $$[$0 - 3],
            sqlCalcFoundRowsOpt: $$[$0 - 2],
            selectItems: $$[$0 - 1],
            from: $$[$0].from,
            partition: $$[$0].partition,
            where: $$[$0].where,
            groupBy: $$[$0].groupBy,
            having: $$[$0].having,
            orderBy: $$[$0].orderBy,
            limit: $$[$0].limit,
            procedure: $$[$0].procedure,
            updateLockMode: $$[$0].updateLockMode
          };
          break;
        case 16:
        case 18:
        case 20:
        case 22:
        case 24:
        case 26:
        case 28:
        case 29:
        case 33:
        case 60:
        case 69:
        case 73:
        case 107:
        case 109:
        case 141:
        case 143:
        case 145:
        case 148:
        case 154:
        case 157:
        case 162:
        case 164:
        case 167:
        case 176:
        case 181:
        case 190:
        case 199:
        case 206:
        case 210:
        case 212:
          this.$ = null;
          break;
        case 34:
          $$[$0 - 2].value.push($$[$0]);
          break;
        case 35:
          this.$ = { type: "SelectExpr", value: [$$[$0]] };
          break;
        case 36:
        case 65:
          this.$ = { type: "Identifier", value: $$[$0] };
          break;
        case 38:
          this.$ = $$[$0 - 1];
          this.$.alias = $$[$0].alias;
          this.$.hasAs = $$[$0].hasAs;
          ;
          break;
        case 39:
        case 66:
          this.$ = $$[$0 - 2];
          $$[$0 - 2].value += "." + $$[$0];
          break;
        case 40:
        case 201:
          this.$ = { alias: null, hasAs: null };
          break;
        case 41:
        case 43:
          this.$ = { alias: $$[$0], hasAs: true };
          break;
        case 42:
          this.$ = { alias: $$[$0], hasAs: false };
          break;
        case 44:
          this.$ = { alias: $$[$01], hasAs: false };
          break;
        case 45:
          this.$ = { type: "String", value: $$[$0] };
          break;
        case 46:
        case 47:
        case 48:
          this.$ = { type: "Number", value: $$[$0] };
          break;
        case 49:
          this.$ = { type: "Boolean", value: "TRUE" };
          break;
        case 50:
          this.$ = { type: "Boolean", value: "FALSE" };
          break;
        case 51:
          this.$ = { type: "Null", value: "null" };
          break;
        case 57:
          this.$ = { type: "FunctionCall", name: $$[$0 - 3], params: $$[$0 - 1] };
          break;
        case 58:
          $$[$0 - 2].push($$[$0]);
          this.$ = $$[$0 - 2];
          break;
        case 59:
          this.$ = [$$[$0]];
          ;
          break;
        case 63:
          this.$ = { type: "FunctionCallParam", distinctOpt: $$[$0 - 1], value: $$[$0] };
          break;
        case 67:
          this.$ = { type: "IdentifierList", value: [$$[$0]] };
          break;
        case 68:
        case 173:
          this.$ = $$[$0 - 2];
          $$[$0 - 2].value.push($$[$0]);
          ;
          break;
        case 71:
          this.$ = { type: "WhenThenList", value: [{ when: $$[$0 - 2], then: $$[$0] }] };
          ;
          break;
        case 72:
          this.$ = $$[$0 - 4];
          this.$.value.push({ when: $$[$0 - 2], then: $$[$0] });
          ;
          break;
        case 75:
          this.$ = { type: "CaseWhen", caseExprOpt: $$[$0 - 3], whenThenList: $$[$0 - 2], else: $$[$0 - 1] };
          break;
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
          this.$ = { type: "Prefix", prefix: $$[$0 - 1], value: $$[$0] };
          break;
        case 85:
          this.$ = { type: "SimpleExprParentheses", value: $$[$0 - 1] };
          break;
        case 86:
          this.$ = { type: "SimpleExprParentheses", value: $$[$0 - 2], hasRow: true };
          break;
        case 87:
          this.$ = { type: "SubQuery", value: $$[$0 - 1] };
          break;
        case 88:
          this.$ = { type: "SubQuery", value: $$[$0 - 1], hasExists: true };
          break;
        case 89:
          this.$ = { type: "IdentifierExpr", identifier: $$[$0 - 2], value: $$[$0 - 1] };
          break;
        case 91:
          this.$ = { type: "StartsWithExpr", value: $$[$0 - 2] };
          break;
        case 92:
          this.$ = { type: "EndsWithExpr", value: $$[$0] };
          break;
        case 93:
          this.$ = { type: "ContainsExpr", value: $$[$0 - 2] };
          break;
        case 95:
          this.$ = { type: "BitExpression", operator: "|", left: $$[$0 - 2], right: $$[$0] };
          break;
        case 96:
          this.$ = { type: "BitExpression", operator: "&", left: $$[$0 - 2], right: $$[$0] };
          break;
        case 97:
          this.$ = { type: "BitExpression", operator: "<<", left: $$[$0 - 2], right: $$[$0] };
          break;
        case 98:
          this.$ = { type: "BitExpression", operator: ">>", left: $$[$0 - 2], right: $$[$0] };
          break;
        case 99:
          this.$ = { type: "BitExpression", operator: "+", left: $$[$0 - 2], right: $$[$0] };
          break;
        case 100:
          this.$ = { type: "BitExpression", operator: "-", left: $$[$0 - 2], right: $$[$0] };
          break;
        case 101:
          this.$ = { type: "BitExpression", operator: "*", left: $$[$0 - 2], right: $$[$0] };
          break;
        case 102:
          this.$ = { type: "BitExpression", operator: "/", left: $$[$0 - 2], right: $$[$0] };
          break;
        case 103:
          this.$ = { type: "BitExpression", operator: "DIV", left: $$[$0 - 2], right: $$[$0] };
          break;
        case 104:
          this.$ = { type: "BitExpression", operator: "MOD", left: $$[$0 - 2], right: $$[$0] };
          break;
        case 105:
          this.$ = { type: "BitExpression", operator: "%", left: $$[$0 - 2], right: $$[$0] };
          break;
        case 106:
          this.$ = { type: "BitExpression", operator: "^", left: $$[$0 - 2], right: $$[$0] };
          break;
        case 112:
          this.$ = { type: "InSubQueryPredicate", hasNot: $$[$0 - 4], left: $$[$0 - 5], right: $$[$0 - 1] };
          break;
        case 113:
          this.$ = { type: "InExpressionListPredicate", hasNot: $$[$0 - 4], left: $$[$0 - 5], right: $$[$0 - 1] };
          break;
        case 114:
          this.$ = { type: "BetweenPredicate", hasNot: $$[$0 - 4], left: $$[$0 - 5], right: { left: $$[$0 - 2], right: $$[$0] } };
          break;
        case 115:
          this.$ = { type: "SoundsLikePredicate", hasNot: false, left: $$[$0 - 3], right: $$[$0] };
          break;
        case 116:
          this.$ = { type: "LikePredicate", hasNot: $$[$0 - 3], left: $$[$0 - 4], right: $$[$0 - 1], escape: $$[$0] };
          break;
        case 117:
          this.$ = { type: "RegexpPredicate", hasNot: $$[$0 - 2], left: $$[$0 - 3], right: $$[$0] };
          break;
        case 128:
          this.$ = { type: "IsNullBooleanPrimary", hasNot: $$[$0 - 1], value: $$[$0 - 3] };
          break;
        case 129:
          this.$ = { type: "ComparisonBooleanPrimary", left: $$[$0 - 2], operator: $$[$0 - 1], right: $$[$0] };
          break;
        case 130:
          this.$ = { type: "ComparisonSubQueryBooleanPrimary", operator: $$[$0 - 4], subQueryOpt: $$[$0 - 3], left: $$[$0 - 5], right: $$[$0 - 1] };
          break;
        case 132:
          this.$ = { type: "BooleanExtra", value: $$[$0] };
          break;
        case 134:
          this.$ = { type: "IsExpression", hasNot: $$[$0 - 1], left: $$[$0 - 3], right: $$[$0] };
          break;
        case 135:
          this.$ = { type: "NotExpression", value: $$[$0] };
          break;
        case 136:
          this.$ = { type: "OrExpression", operator: $$[$0 - 1], left: $$[$0 - 2], right: $$[$0] };
          break;
        case 137:
          this.$ = { type: "AndExpression", operator: $$[$0 - 1], left: $$[$0 - 2], right: $$[$0] };
          break;
        case 138:
          this.$ = { type: "XorExpression", operator: $$[$0 - 1], left: $$[$0 - 2], right: $$[$0] };
          break;
        case 139:
          this.$ = { type: "ExpressionList", value: [$$[$0]] };
          break;
        case 140:
        case 215:
          this.$ = $$[$0 - 2];
          this.$.value.push($$[$0]);
          ;
          break;
        case 147:
          this.$ = { type: "GroupBy", value: $$[$0 - 1], rollUp: $$[$0] };
          break;
        case 150:
          this.$ = { type: "OrderBy", value: $$[$0 - 1], rollUp: $$[$0] };
          break;
        case 151:
        case 197:
          this.$ = [$$[$0]];
          break;
        case 152:
          this.$ = $$[$0 - 2];
          $$[$0 - 2].push($$[$0]);
          ;
          break;
        case 153:
          this.$ = { type: "GroupByOrderByItem", value: $$[$0 - 1], sortOpt: $$[$0] };
          break;
        case 159:
          this.$ = { type: "Limit", value: [$$[$0]] };
          break;
        case 160:
          this.$ = { type: "Limit", value: [$$[$0 - 2], $$[$0]] };
          break;
        case 161:
          this.$ = { type: "Limit", value: [$$[$0], $$[$0 - 2]], offsetMode: true };
          break;
        case 168:
          this.$ = $$[$0 - 1] + " " + $$[$0];
          break;
        case 169:
          this.$ = $$[$0 - 3] + " " + $$[$0 - 2] + " " + $$[$0 - 1] + " " + $$[$0];
          break;
        case 170:
          this.$ = {};
          break;
        case 171:
          this.$ = { from: $$[$0 - 8], partition: $$[$0 - 7], where: $$[$0 - 6], groupBy: $$[$0 - 5], having: $$[$0 - 4], orderBy: $$[$0 - 3], limit: $$[$0 - 2], procedure: $$[$0 - 1], updateLockMode: $$[$0] };
          break;
        case 172:
          this.$ = { type: "TableReferences", value: [$$[$0]] };
          break;
        case 174:
          this.$ = { type: "TableReference", value: $$[$0] };
          break;
        case 175:
          this.$ = { type: "TableReference", hasOj: true, value: $$[$0 - 1] };
          break;
        case 183:
          this.$ = { leftRight: null, outOpt: null };
          break;
        case 184:
          this.$ = { leftRight: $$[$0 - 1], outOpt: $$[$0] };
          break;
        case 185:
          this.$ = { type: "InnerCrossJoinTable", innerCrossOpt: $$[$0 - 2], left: $$[$0 - 3], right: $$[$0], condition: null };
          break;
        case 186:
          this.$ = { type: "InnerCrossJoinTable", innerCrossOpt: $$[$0 - 3], left: $$[$0 - 4], right: $$[$0 - 1], condition: $$[$0] };
          break;
        case 187:
          this.$ = { type: "StraightJoinTable", left: $$[$0 - 3], right: $$[$0 - 1], condition: $$[$0] };
          break;
        case 188:
          this.$ = { type: "LeftRightJoinTable", leftRight: $$[$0 - 4], outOpt: $$[$0 - 3], left: $$[$0 - 5], right: $$[$0 - 1], condition: $$[$0] };
          break;
        case 189:
          this.$ = { type: "NaturalJoinTable", leftRight: $$[$0 - 2].leftRight, outOpt: $$[$0 - 2].outOpt, left: $$[$0 - 4], right: $$[$0] };
          break;
        case 192:
          this.$ = { type: "OnJoinCondition", value: $$[$0] };
          break;
        case 194:
          this.$ = { type: "UsingJoinCondition", value: $$[$0 - 1] };
          break;
        case 198:
          this.$ = $$[$0 - 2];
          $$[$0 - 2].push($$[$0]);
          break;
        case 200:
          this.$ = { type: "Partitions", value: $$[$0 - 1] };
          break;
        case 202:
          this.$ = { hasAs: true, alias: $$[$0] };
          break;
        case 203:
          this.$ = { hasAs: false, alias: $$[$0] };
          break;
        case 207:
        case 208:
        case 209:
          this.$ = { type: "ForOptIndexHint", value: $$[$0] };
          break;
        case 214:
          this.$ = { type: "IndexHintList", value: [$$[$0]] };
          break;
        case 216:
          this.$ = { type: "UseIndexHint", value: $$[$0 - 1], forOpt: $$[$0 - 3], indexOrKey: $$[$0 - 4] };
          break;
        case 217:
          this.$ = { type: "IgnoreIndexHint", value: $$[$0 - 1], forOpt: $$[$0 - 3], indexOrKey: $$[$0 - 4] };
          break;
        case 218:
          this.$ = { type: "ForceIndexHint", value: $$[$0 - 1], forOpt: $$[$0 - 3], indexOrKey: $$[$0 - 4] };
          break;
        case 219:
          this.$ = { type: "TableFactor", value: $$[$0 - 3], partition: $$[$0 - 2], alias: $$[$0 - 1].alias, hasAs: $$[$0 - 1].hasAs, indexHintOpt: $$[$0] };
          break;
        case 220:
          this.$ = { type: "TableFactor", value: { type: "SubQuery", value: $$[$0 - 2] }, alias: $$[$0].alias, hasAs: $$[$0].hasAs };
          break;
        case 221:
          this.$ = $$[$0 - 1];
          this.$.hasParentheses = true;
          break;
        case 222:
          this.$ = { type: "PlaceHolder", value: $$[$0], param: $$[$0].slice(2, -1) };
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 7: 3, 9: 5, 10: 6, 13: 7, 16: $V0, 18: $V1 }, { 1: [3] }, { 5: 9, 6: $V2, 8: $V3, 14: $V4 }, { 5: 12, 6: $V2, 8: $V3 }, o([16, 32, 33, 35, 36, 37, 38, 39, 40, 41, 42, 45, 52, 53, 56, 57, 59, 60, 62, 76, 79, 81, 82, 83, 84, 86, 87, 88, 91, 103, 195], $V5, { 15: 13, 29: $V6, 30: $V7, 31: $V8 }), o($V9, [2, 5]), o([6, 8, 146], $Va, { 11: 17, 137: 18, 138: $Vb }), { 14: $Vc }, { 4: 21, 18: $V1 }, { 6: [1, 22] }, { 15: 23, 18: $V5, 29: $V6, 30: $V7, 31: $V8 }, { 6: [2, 3] }, { 6: [1, 24] }, o($Vd, [2, 18], { 19: 25, 32: [1, 26] }), o($Ve, [2, 13]), o($Ve, [2, 14]), o($Ve, [2, 15]), o($V9, $Vf, { 12: 27, 145: 28, 146: $Vg }), o($Vh, [2, 149]), { 16: $Vi, 35: $Vj, 47: 32, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 136: 30, 139: 31, 195: $VC }, { 15: 68, 16: $V5, 29: $V6, 30: $V7, 31: $V8 }, { 17: [1, 69] }, { 1: [2, 1] }, { 4: 70, 9: 71, 18: $V1 }, { 1: [2, 2] }, o($VD, [2, 20], { 20: 72, 33: [1, 73] }), o($Vd, [2, 17]), o($V9, [2, 6]), o($VE, [2, 163]), { 35: [1, 74] }, o($Vh, $VF, { 132: 75, 43: $VG, 133: $VH }), o($VI, [2, 151]), o($VI, [2, 154], { 140: 78, 109: $VJ, 126: $VK, 127: $VL, 141: [1, 82], 142: [1, 83] }), o($VM, [2, 133], { 113: 85, 34: [1, 86], 114: [1, 87], 115: [1, 88], 116: [1, 89], 117: [1, 90], 118: [1, 91], 119: [1, 92], 123: [1, 84] }), { 16: $Vi, 35: $Vj, 47: 93, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, o($VN, [2, 127]), o($VN, [2, 111], { 102: 94, 45: $VO, 79: $VP, 81: $VQ, 93: $VR, 94: $VS, 95: $VT, 96: $VU, 97: $VV, 98: $VW, 99: $VX, 100: $VY, 101: $VZ, 103: $V_, 107: $V$, 108: $V$, 111: $V$, 112: $V$, 110: [1, 95] }), o($V01, [2, 94]), o($V11, [2, 81]), o($V11, $V21, { 50: $V31, 90: $V41 }), o($V11, [2, 83]), o($V11, [2, 84]), { 4: 112, 16: $Vi, 18: $V1, 35: $Vj, 47: 113, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 85: 111, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, { 16: [1, 114] }, { 16: [1, 115] }, { 49: 116, 52: $V51 }, o($V11, [2, 90]), { 90: [1, 118] }, o($V11, [2, 52]), o($V11, [2, 53]), o($V11, [2, 54]), o($V11, [2, 55]), o($V11, [2, 56]), o([6, 8, 14, 17, 34, 36, 43, 45, 50, 51, 52, 53, 71, 72, 74, 77, 79, 81, 89, 90, 93, 94, 95, 96, 97, 98, 99, 100, 101, 103, 105, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 123, 126, 127, 129, 133, 135, 138, 141, 142, 144, 146, 150, 152, 154, 157, 164, 165, 167, 168, 173, 177, 179, 180, 182], $V61, { 16: $V71 }), { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 120, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 121, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 122, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 123, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 124, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 195: $VC }, { 16: $Vi, 35: $Vj, 47: 126, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 69: 125, 71: [2, 69], 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, o($V11, [2, 45]), o($V11, [2, 46]), o($V11, [2, 47]), o($V11, [2, 48]), o($V11, [2, 49]), o($V11, [2, 50]), o($V11, [2, 51]), o($V11, [2, 222]), { 10: 128, 13: 127, 16: $V0 }, o([6, 8, 14, 138, 146], [2, 9]), o($V9, [2, 10], { 14: $V4 }), o($V9, [2, 11]), o($V81, [2, 22], { 21: 129, 36: [1, 130] }), { 34: [1, 131] }, o($VE, [2, 159], { 43: [1, 132], 147: [1, 133] }), o($Vh, [2, 150]), { 16: $Vi, 35: $Vj, 47: 32, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 139: 134, 195: $VC }, { 134: [1, 135] }, o($VI, [2, 153]), { 16: $Vi, 35: $Vj, 47: 136, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, { 16: $Vi, 35: $Vj, 47: 137, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, { 16: $Vi, 35: $Vj, 47: 138, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, o($VI, [2, 155]), o($VI, [2, 156]), o([59, 60, 62, 125], $V$, { 102: 139, 103: $V_ }), { 16: $Vi, 29: [1, 142], 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 106: 140, 120: 141, 121: [1, 143], 195: $VC }, o($V91, [2, 118]), o($V91, [2, 119]), o($V91, [2, 120]), o($V91, [2, 121]), o($V91, [2, 122]), o($V91, [2, 123]), o($V91, [2, 124]), o($VM, [2, 135]), { 107: [1, 144], 108: [1, 145], 111: [1, 146], 112: [1, 147] }, { 111: [1, 148] }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 149, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 150, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 151, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 152, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 153, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 154, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 155, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 156, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 157, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 158, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 159, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 160, 195: $VC }, o([59, 60, 62, 107, 108, 111, 112, 125], [2, 108]), { 91: [1, 161] }, { 52: $Va1 }, { 17: [1, 163], 43: $Vb1 }, { 17: [1, 165] }, o($Vc1, [2, 139], { 109: $VJ, 126: $VK, 127: $VL }), { 16: $Vi, 35: $Vj, 47: 113, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 85: 166, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, { 4: 167, 18: $V1 }, { 16: $Vi, 35: $Vj, 47: 168, 49: 39, 50: $V31, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, o($Vd1, $V61), { 49: 169, 52: $V51 }, o($Vc1, $Ve1, { 122: 33, 106: 35, 92: 36, 80: 37, 63: 38, 65: 40, 78: 41, 75: 46, 54: 48, 55: 49, 58: 50, 61: 51, 64: 52, 66: 170, 67: 171, 46: 173, 47: 175, 49: 176, 16: $Vi, 30: $Vf1, 35: $Vj, 45: $Vg1, 52: $Vk, 53: $Vl, 56: $Vm, 57: $Vn, 59: $Vo, 60: $Vp, 62: $Vq, 76: $Vr, 79: $Vs, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 103: $VB, 195: $VC }), o($V11, [2, 76]), o($V11, [2, 77]), o($V11, [2, 78]), o($V11, [2, 79]), o($V11, [2, 80]), { 70: 177, 71: [1, 178] }, { 71: [2, 70], 109: $VJ, 126: $VK, 127: $VL }, o($Vh1, [2, 7], { 14: $Vc }), o($Vh1, [2, 8]), o($Vi1, [2, 24], { 22: 179, 37: [1, 180] }), o($V81, [2, 21]), { 35: [1, 181] }, { 35: [1, 182] }, { 35: [1, 183] }, o($VI, [2, 152]), o($Vj1, [2, 146]), o($Vk1, [2, 136], { 109: $VJ }), o($VM, [2, 137]), o($Vk1, [2, 138], { 109: $VJ }), { 58: 186, 59: $Vo, 60: $Vp, 62: [1, 185], 124: 184, 125: [1, 187] }, o($VN, [2, 129]), { 16: [1, 188] }, { 16: [2, 125] }, { 16: [2, 126] }, { 16: [1, 189] }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 190, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 191, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 192, 195: $VC }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 193, 195: $VC }, o([6, 8, 14, 17, 34, 36, 43, 51, 52, 53, 71, 72, 74, 77, 89, 93, 103, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 123, 126, 127, 129, 133, 135, 138, 141, 142, 144, 146, 150, 152, 154, 157, 164, 165, 167, 168, 173, 177, 179, 180, 182], [2, 95], { 45: $VO, 79: $VP, 81: $VQ, 94: $VS, 95: $VT, 96: $VU, 97: $VV, 98: $VW, 99: $VX, 100: $VY, 101: $VZ }), o([6, 8, 14, 17, 34, 36, 43, 51, 52, 53, 71, 72, 74, 77, 89, 93, 94, 101, 103, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 123, 126, 127, 129, 133, 135, 138, 141, 142, 144, 146, 150, 152, 154, 157, 164, 165, 167, 168, 173, 177, 179, 180, 182], [2, 96], { 45: $VO, 79: $VP, 81: $VQ, 95: $VT, 96: $VU, 97: $VV, 98: $VW, 99: $VX, 100: $VY }), o($Vl1, [2, 97], { 45: $VO, 79: $VP, 81: $VQ, 97: $VV, 98: $VW, 99: $VX, 100: $VY }), o($Vl1, [2, 98], { 45: $VO, 79: $VP, 81: $VQ, 97: $VV, 98: $VW, 99: $VX, 100: $VY }), o($Vm1, [2, 99], { 45: $VO, 97: $VV, 98: $VW, 99: $VX, 100: $VY }), o($Vm1, [2, 100], { 45: $VO, 97: $VV, 98: $VW, 99: $VX, 100: $VY }), o($V01, [2, 101]), o($V01, [2, 102]), o($V01, [2, 103]), o($V01, [2, 104]), o($V01, [2, 105]), o([6, 8, 14, 17, 34, 36, 43, 51, 52, 53, 71, 72, 74, 77, 89, 93, 101, 103, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 123, 126, 127, 129, 133, 135, 138, 141, 142, 144, 146, 150, 152, 154, 157, 164, 165, 167, 168, 173, 177, 179, 180, 182], [2, 106], { 45: $VO, 79: $VP, 81: $VQ, 94: $VS, 95: $VT, 96: $VU, 97: $VV, 98: $VW, 99: $VX, 100: $VY }), o($V11, [2, 91]), o($Vd1, [2, 66]), o($V11, [2, 85]), { 16: $Vi, 35: $Vj, 47: 194, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, o($V11, [2, 87]), { 17: [1, 195], 43: $Vb1 }, { 17: [1, 196] }, { 89: [1, 197], 109: $VJ, 126: $VK, 127: $VL }, o($V11, [2, 92], { 50: $V31, 90: [1, 198] }), { 17: [1, 199], 43: [1, 200] }, o($Vc1, [2, 59]), o($Vc1, [2, 61]), o($Vc1, [2, 62]), { 16: $Vi, 35: $Vj, 47: 201, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, o($Vc1, [2, 64], { 109: $VJ, 126: $VK, 127: $VL }), o([6, 8, 14, 17, 34, 43, 45, 51, 52, 53, 79, 81, 93, 94, 95, 96, 97, 98, 99, 100, 101, 103, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 123, 126, 127, 157], $V21, { 50: [1, 202], 90: $V41 }), { 71: [1, 204], 73: 203, 74: [1, 205], 77: [2, 73] }, { 16: $Vi, 35: $Vj, 47: 206, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, o($Vn1, [2, 26], { 23: 207, 38: [1, 208] }), o($Vi1, [2, 23]), o($VD, [2, 19]), o($VE, [2, 160]), o($VE, [2, 161]), o($VM, [2, 134]), o($VN, [2, 128]), o($VM, [2, 131]), o($VM, [2, 132]), { 4: 209, 18: $V1 }, { 4: 210, 16: $Vi, 18: $V1, 35: $Vj, 47: 113, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 85: 211, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, { 45: $VO, 79: $VP, 81: $VQ, 93: $VR, 94: $VS, 95: $VT, 96: $VU, 97: $VV, 98: $VW, 99: $VX, 100: $VY, 101: $VZ, 109: [1, 212] }, o($VN, [2, 109], { 104: 213, 105: [1, 214] }), o($VN, [2, 117], { 45: $VO, 79: $VP, 81: $VQ, 93: $VR, 94: $VS, 95: $VT, 96: $VU, 97: $VV, 98: $VW, 99: $VX, 100: $VY, 101: $VZ }), o($VN, [2, 115], { 45: $VO, 79: $VP, 81: $VQ, 93: $VR, 94: $VS, 95: $VT, 96: $VU, 97: $VV, 98: $VW, 99: $VX, 100: $VY, 101: $VZ }), o($Vc1, [2, 140], { 109: $VJ, 126: $VK, 127: $VL }), o($V11, [2, 86]), o($V11, [2, 88]), o($V11, [2, 89]), { 91: [1, 215] }, o($V11, [2, 57]), o($Vc1, $Ve1, { 122: 33, 106: 35, 92: 36, 80: 37, 63: 38, 65: 40, 78: 41, 75: 46, 54: 48, 55: 49, 58: 50, 61: 51, 64: 52, 46: 173, 47: 175, 49: 176, 67: 216, 16: $Vi, 30: $Vf1, 35: $Vj, 45: $Vg1, 52: $Vk, 53: $Vl, 56: $Vm, 57: $Vn, 59: $Vo, 60: $Vp, 62: $Vq, 76: $Vr, 79: $Vs, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 103: $VB, 195: $VC }), o($Vc1, [2, 63], { 109: $VJ, 126: $VK, 127: $VL }), { 45: [1, 217], 52: $Va1 }, { 77: [1, 218] }, { 16: $Vi, 35: $Vj, 47: 219, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, { 16: $Vi, 35: $Vj, 47: 220, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, { 72: [1, 221], 109: $VJ, 126: $VK, 127: $VL }, o($Vo1, [2, 28], { 24: 222, 39: [1, 223] }), o($Vn1, [2, 25]), { 17: [1, 224] }, { 17: [1, 225] }, { 17: [1, 226], 43: $Vb1 }, { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 106: 227, 195: $VC }, o($VN, [2, 116]), { 16: $Vi, 35: $Vj, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 228, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 195: $VC }, o($V11, [2, 93]), o($Vc1, [2, 58]), o($Vp1, [2, 39]), o($V11, [2, 75]), { 72: [1, 229], 109: $VJ, 126: $VK, 127: $VL }, { 77: [2, 74], 109: $VJ, 126: $VK, 127: $VL }, { 16: $Vi, 35: $Vj, 47: 230, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, o($Vq1, [2, 29], { 25: 231, 40: [1, 232], 41: [1, 233] }), o($Vo1, [2, 27]), o($VN, [2, 130]), o($VN, [2, 112]), o($VN, [2, 113]), o($VN, [2, 114]), o($VN, [2, 110]), { 16: $Vi, 35: $Vj, 47: 234, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, o($Vr1, [2, 71], { 109: $VJ, 126: $VK, 127: $VL }), o($Vs1, [2, 33], { 26: 235, 42: [1, 236] }), o($Vq1, [2, 30]), o($Vq1, [2, 31]), o($Vr1, [2, 72], { 109: $VJ, 126: $VK, 127: $VL }), { 16: $Vi, 27: 237, 35: $Vj, 44: 238, 45: $Vt1, 46: 240, 47: 241, 49: 176, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, o($Vs1, [2, 32]), o($Vu1, [2, 170], { 28: 242, 43: [1, 243], 157: [1, 244] }), o($Vp1, [2, 35]), o($Vp1, [2, 36]), o($Vp1, [2, 37]), o($Vp1, [2, 40], { 48: 245, 51: [1, 246], 52: [1, 247], 53: [1, 248], 109: $VJ, 126: $VK, 127: $VL }), o($Vu1, [2, 12]), { 16: $Vi, 35: $Vj, 44: 249, 45: $Vt1, 46: 240, 47: 241, 49: 176, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, { 16: $Vv1, 49: 256, 52: $V51, 88: $Vw1, 158: 250, 160: 251, 161: 252, 172: 255, 174: 254 }, o($Vp1, [2, 38]), { 52: [1, 258], 53: [1, 259] }, o($Vp1, [2, 42]), o($Vp1, [2, 44]), o($Vp1, [2, 34]), o([6, 8, 14, 17, 129, 135, 138, 144, 146, 150, 152, 154], $Vx1, { 159: 260, 43: $Vy1, 182: $Vz1 }), o($VA1, [2, 172]), o($VA1, [2, 174], { 163: 263, 166: 265, 36: $VB1, 164: $VC1, 165: $VD1, 167: $VE1, 168: $VF1, 173: $VG1, 177: $VH1 }), { 162: [1, 271] }, o($VI1, [2, 195]), o($VI1, [2, 196]), o([6, 8, 14, 17, 36, 43, 51, 52, 89, 129, 135, 138, 144, 146, 150, 152, 154, 164, 165, 167, 168, 173, 177, 179, 180, 192, 193, 194], $Vx1, { 159: 272, 50: $V31, 182: $Vz1 }), { 4: 273, 16: $Vv1, 18: $V1, 49: 256, 52: $V51, 88: $Vw1, 158: 274, 160: 251, 161: 252, 172: 255, 174: 254 }, o($Vp1, [2, 41]), o($Vp1, [2, 43]), o($VJ1, [2, 141], { 128: 275, 129: [1, 276] }), { 16: $Vv1, 49: 256, 52: $V51, 88: $Vw1, 160: 277, 161: 252, 172: 255, 174: 254 }, { 16: [1, 278] }, { 173: [1, 279] }, { 16: $Vv1, 49: 256, 52: $V51, 174: 280 }, { 169: 281, 170: $VK1, 173: $VL1 }, { 166: 284, 167: $VE1, 168: $VF1, 171: 283, 173: [2, 183] }, { 173: [2, 177] }, { 173: [2, 178] }, o($VM1, [2, 179]), o($VM1, [2, 180]), { 16: $Vv1, 49: 256, 52: $V51, 161: 285, 172: 255, 174: 254 }, o($VN1, $VO1, { 183: 286, 49: 288, 51: $VP1, 52: $V51 }), { 17: [1, 289] }, { 17: [1, 290], 43: $Vy1 }, o($Vj1, [2, 143], { 130: 291, 131: 292, 135: [1, 293] }), { 16: $Vi, 35: $Vj, 47: 294, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, o($VA1, [2, 173]), { 49: 296, 52: $V51, 181: 295 }, { 16: $Vv1, 49: 256, 52: $V51, 174: 297 }, { 176: 298, 179: $VQ1 }, { 173: [1, 300] }, { 173: [2, 182] }, { 173: [1, 301] }, { 169: 302, 170: $VK1, 173: $VL1 }, { 36: $VB1, 89: [1, 303], 163: 263, 164: $VC1, 165: $VD1, 166: 265, 167: $VE1, 168: $VF1, 173: $VG1, 177: $VH1 }, o($VI1, [2, 212], { 189: 304, 190: 305, 191: 306, 192: $VR1, 193: $VS1, 194: $VT1 }), { 49: 310, 52: $V51 }, o($VN1, [2, 203], { 50: $V31 }), o($VI1, $VO1, { 49: 288, 183: 311, 51: $VP1, 52: $V51 }), o($VI1, [2, 221]), o($VU1, [2, 157], { 143: 312, 144: [1, 313] }), o($Vj1, [2, 144]), { 16: $Vi, 35: $Vj, 47: 32, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 136: 314, 139: 31, 195: $VC }, o($VJ1, [2, 142], { 109: $VJ, 126: $VK, 127: $VL }), { 17: [1, 315], 43: [1, 316] }, o($Vc1, [2, 197], { 50: $V31 }), o([6, 8, 14, 17, 36, 43, 89, 129, 135, 138, 144, 146, 150, 152, 154, 164, 165, 167, 168, 173, 177, 182], [2, 185], { 175: 317, 176: 318, 179: $VQ1, 180: $VV1 }), o($VI1, [2, 187]), { 16: $Vi, 35: $Vj, 47: 320, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, { 16: $Vv1, 49: 256, 52: $V51, 161: 321, 172: 255, 174: 254 }, { 16: $Vv1, 49: 256, 52: $V51, 174: 322 }, { 173: [2, 184] }, o($VA1, [2, 175]), o($VI1, [2, 219]), o($VI1, [2, 213]), o($VI1, [2, 214]), { 184: 324, 185: $VW1, 186: $VX1 }, { 184: 327, 185: $VW1, 186: $VX1 }, { 184: 328, 185: $VW1, 186: $VX1 }, o($VN1, [2, 202], { 50: $V31 }), o($VI1, [2, 220]), o($Vh, $Va, { 137: 18, 11: 329, 138: $Vb }), { 16: $Vi, 35: $Vj, 47: 330, 49: 39, 52: $Vk, 53: $Vl, 54: 48, 55: 49, 56: $Vm, 57: $Vn, 58: 50, 59: $Vo, 60: $Vp, 61: 51, 62: $Vq, 63: 38, 64: 52, 65: 40, 75: 46, 76: $Vr, 78: 41, 79: $Vs, 80: 37, 81: $Vt, 82: $Vu, 83: $Vv, 84: $Vw, 86: $Vx, 87: $Vy, 88: $Vz, 91: $VA, 92: 36, 103: $VB, 106: 35, 122: 33, 195: $VC }, o($Vj1, $VF, { 132: 331, 43: $VG, 133: $VH }), o([6, 8, 14, 17, 36, 43, 51, 52, 89, 129, 135, 138, 144, 146, 150, 152, 154, 164, 165, 167, 168, 173, 177, 179, 180, 182, 192, 193, 194], [2, 200]), { 49: 332, 52: $V51 }, o($VI1, [2, 186]), o($VI1, [2, 193]), { 16: [1, 333] }, o($VI1, [2, 192], { 109: $VJ, 126: $VK, 127: $VL }), { 36: $VB1, 163: 263, 164: $VC1, 165: $VD1, 166: 265, 167: $VE1, 168: $VF1, 173: $VG1, 175: 334, 176: 318, 177: $VH1, 179: $VQ1, 180: $VV1 }, o($VI1, [2, 189]), { 191: 335, 192: $VR1, 193: $VS1, 194: $VT1 }, { 16: $VY1, 152: $VZ1, 187: 336 }, o($V_1, [2, 204]), o($V_1, [2, 205]), { 16: $VY1, 152: $VZ1, 187: 338 }, { 16: $VY1, 152: $VZ1, 187: 339 }, o($VE, $Vf, { 145: 28, 12: 340, 146: $Vg }), o($VU1, [2, 158], { 109: $VJ, 126: $VK, 127: $VL }), o($Vj1, [2, 147]), o($Vc1, [2, 198], { 50: $V31 }), { 49: 342, 52: $V51, 68: 341 }, o($VI1, [2, 188]), o($VI1, [2, 215]), { 16: [1, 343] }, { 135: [1, 346], 138: [1, 345], 173: [1, 344] }, { 16: [1, 347] }, { 16: [1, 348] }, o($V$1, [2, 164], { 148: 349, 149: 350, 150: [1, 351] }), { 17: [1, 352], 43: $V02 }, o($Vc1, [2, 67], { 50: $V31 }), { 17: [2, 210], 49: 342, 52: $V51, 68: 355, 188: 354 }, { 16: [2, 207] }, { 16: [2, 208] }, { 16: [2, 209] }, { 49: 342, 52: $V51, 68: 356 }, { 49: 342, 52: $V51, 68: 357 }, o($Vu1, [2, 167], { 151: 358, 152: [1, 359], 154: [1, 360] }), o($V$1, [2, 165]), { 52: [1, 362], 65: 361 }, o($VI1, [2, 194]), { 49: 363, 52: $V51 }, { 17: [1, 364] }, { 17: [2, 211], 43: $V02 }, { 17: [1, 365], 43: $V02 }, { 17: [1, 366], 43: $V02 }, o($Vu1, [2, 171]), { 153: [1, 367] }, { 107: [1, 368] }, o($V$1, [2, 166]), { 16: $V71 }, o($Vc1, [2, 68], { 50: $V31 }), o($VI1, [2, 216]), o($VI1, [2, 217]), o($VI1, [2, 218]), o($Vu1, [2, 168]), { 155: [1, 369] }, { 156: [1, 370] }, o($Vu1, [2, 169])],
    defaultActions: { 11: [2, 3], 22: [2, 1], 24: [2, 2], 142: [2, 125], 143: [2, 126], 267: [2, 177], 268: [2, 178], 282: [2, 182], 302: [2, 184], 344: [2, 207], 345: [2, 208], 346: [2, 209] },
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
      }
    },
    parse: function parse(input) {
      var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer2 = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer2.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer2;
      sharedState.yy.parser = this;
      if (typeof lexer2.yylloc == "undefined") {
        lexer2.yylloc = {};
      }
      var yyloc = lexer2.yylloc;
      lstack.push(yyloc);
      var ranges = lexer2.options && lexer2.options.ranges;
      if (typeof sharedState.yy.parseError === "function") {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      var lex = function() {
        var token;
        token = lexer2.lex() || EOF;
        if (typeof token !== "number") {
          token = self.symbols_[token] || token;
        }
        return token;
      };
      var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol == "undefined") {
            symbol = lex();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
          var errStr = "";
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push("'" + this.terminals_[p] + "'");
            }
          }
          if (lexer2.showPosition) {
            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + lexer2.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
          } else {
            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
          }
          this.parseError(errStr, {
            text: lexer2.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer2.yylineno,
            loc: yyloc,
            expected
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer2.yytext);
            lstack.push(lexer2.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer2.yyleng;
              yytext = lexer2.yytext;
              yylineno = lexer2.yylineno;
              yyloc = lexer2.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
              yyval._$.range = [
                lstack[lstack.length - (len || 1)].range[0],
                lstack[lstack.length - 1].range[1]
              ];
            }
            r = this.performAction.apply(yyval, [
              yytext,
              yyleng,
              yylineno,
              sharedState.yy,
              action[1],
              vstack,
              lstack
            ].concat(args));
            if (typeof r !== "undefined") {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }
  };
  var lexer = /* @__PURE__ */ function() {
    var lexer2 = {
      EOF: 1,
      parseError: function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      },
      // resets the lexer, sets new input
      setInput: function(input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = "";
        this.conditionStack = ["INITIAL"];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      },
      // consumes and returns one char from the input
      input: function() {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }
        this._input = this._input.slice(1);
        return ch;
      },
      // unshifts one char (or a string) into the input
      unput: function(ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);
        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);
        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;
        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
        };
        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      },
      // When called from action, caches matched text and appends it on next action
      more: function() {
        this._more = true;
        return this;
      },
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function() {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        }
        return this;
      },
      // retain first n characters of the match
      less: function(n) {
        this.unput(this.match.slice(n));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(match, indexed_rule) {
        var token, lines, backup;
        if (this.options.backtrack_lexer) {
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }
        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          for (var k in backup) {
            this[k] = backup[k];
          }
          return false;
        }
        return false;
      },
      // return next match in input
      next: function() {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }
        var token, match, tempMatch, index;
        if (!this._more) {
          this.yytext = "";
          this.match = "";
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue;
              } else {
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          return false;
        }
        if (this._input === "") {
          return this.EOF;
        } else {
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        }
      },
      // return next match that has a token
      lex: function lex() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions["INITIAL"].rules;
        }
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return "INITIAL";
        }
      },
      // alias for begin(condition)
      pushState: function pushState(condition) {
        this.begin(condition);
      },
      // return the number of states currently on the stack
      stateStackSize: function stateStackSize() {
        return this.conditionStack.length;
      },
      options: { "case-insensitive": true },
      performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            return 195;
            break;
          case 5:
            return 52;
            break;
          case 6:
            return 52;
            break;
          case 7:
            return 52;
            break;
          case 8:
            return 18;
            break;
          case 9:
            return 29;
            break;
          case 10:
            return 121;
            break;
          case 11:
            return 30;
            break;
          case 12:
            return 31;
            break;
          case 13:
            return 32;
            break;
          case 14:
            return 33;
            break;
          case 15:
            return 36;
            break;
          case 16:
            return 37;
            break;
          case 17:
            return 38;
            break;
          case 18:
            return 39;
            break;
          case 19:
            return 40;
            break;
          case 20:
            return 41;
            break;
          case 21:
            return 42;
            break;
          case 22:
            return 51;
            break;
          case 23:
            return 59;
            break;
          case 24:
            return 60;
            break;
          case 25:
            return 62;
            break;
          case 26:
            return "COLLATE";
            break;
          case 27:
            return 84;
            break;
          case 28:
            return 86;
            break;
          case 29:
            return 87;
            break;
          case 30:
            return 76;
            break;
          case 31:
            return 71;
            break;
          case 32:
            return 72;
            break;
          case 33:
            return 74;
            break;
          case 34:
            return 77;
            break;
          case 35:
            return 98;
            break;
          case 36:
            return 99;
            break;
          case 37:
            return 103;
            break;
          case 38:
            return 108;
            break;
          case 39:
            return 107;
            break;
          case 40:
            return 110;
            break;
          case 41:
            return 111;
            break;
          case 42:
            return 105;
            break;
          case 43:
            return 112;
            break;
          case 44:
            return 123;
            break;
          case 45:
            return 125;
            break;
          case 46:
            return 109;
            break;
          case 47:
            return 126;
            break;
          case 48:
            return 127;
            break;
          case 49:
            return 157;
            break;
          case 50:
            return 182;
            break;
          case 51:
            return 192;
            break;
          case 52:
            return 185;
            break;
          case 53:
            return 186;
            break;
          case 54:
            return 152;
            break;
          case 55:
            return 173;
            break;
          case 56:
            return 138;
            break;
          case 57:
            return 135;
            break;
          case 58:
            return 193;
            break;
          case 59:
            return 194;
            break;
          case 60:
            return 164;
            break;
          case 61:
            return 165;
            break;
          case 62:
            return 179;
            break;
          case 63:
            return 180;
            break;
          case 64:
            return 167;
            break;
          case 65:
            return 168;
            break;
          case 66:
            return 170;
            break;
          case 67:
            return 177;
            break;
          case 68:
            return 129;
            break;
          case 69:
            return 141;
            break;
          case 70:
            return 142;
            break;
          case 71:
            return 133;
            break;
          case 72:
            return 134;
            break;
          case 73:
            return 144;
            break;
          case 74:
            return 147;
            break;
          case 75:
            return 150;
            break;
          case 76:
            return 153;
            break;
          case 77:
            return 154;
            break;
          case 78:
            return 155;
            break;
          case 79:
            return 156;
            break;
          case 80:
            return 162;
            break;
          case 81:
            return 146;
            break;
          case 82:
            return 14;
            break;
          case 83:
            return 43;
            break;
          case 84:
            return 34;
            break;
          case 85:
            return 16;
            break;
          case 86:
            return 17;
            break;
          case 87:
            return 82;
            break;
          case 88:
            return 119;
            break;
          case 89:
            return 83;
            break;
          case 90:
            return 90;
            break;
          case 91:
            return 93;
            break;
          case 92:
            return 94;
            break;
          case 93:
            return 79;
            break;
          case 94:
            return 81;
            break;
          case 95:
            return 45;
            break;
          case 96:
            return 97;
            break;
          case 97:
            return 100;
            break;
          case 98:
            return 101;
            break;
          case 99:
            return 96;
            break;
          case 100:
            return 114;
            break;
          case 101:
            return 115;
            break;
          case 102:
            return 95;
            break;
          case 103:
            return "<=>";
            break;
          case 104:
            return 116;
            break;
          case 105:
            return 118;
            break;
          case 106:
            return 117;
            break;
          case 107:
            return 88;
            break;
          case 108:
            return 89;
            break;
          case 109:
            return 8;
            break;
          case 110:
            return 91;
            break;
          case 111:
            return 53;
            break;
          case 112:
            return 57;
            break;
          case 113:
            return 35;
            break;
          case 114:
            return 56;
            break;
          case 115:
            return 52;
            break;
          case 116:
            return 50;
            break;
          case 117:
            return 52;
            break;
          case 118:
            return 6;
            break;
          case 119:
            return "INVALID";
            break;
        }
      },
      rules: [/^(?:[/][*](.|\n)*?[*][/])/i, /^(?:[-][-]\s.*\n)/i, /^(?:[#]\s.*\n)/i, /^(?:\s+)/i, /^(?:[$][{](.*?)[}])/i, /^(?:([`][^`]+[`])+)/i, /^(?:(["][^"]+["])+)/i, /^(?:[\[]([^\]]|\]\])+[\]])/i, /^(?:SELECT\b)/i, /^(?:ALL\b)/i, /^(?:ANY\b)/i, /^(?:DISTINCT\b)/i, /^(?:DISTINCTROW\b)/i, /^(?:HIGH_PRIORITY\b)/i, /^(?:MAX_STATEMENT_TIME\b)/i, /^(?:STRAIGHT_JOIN\b)/i, /^(?:SQL_SMALL_RESULT\b)/i, /^(?:SQL_BIG_RESULT\b)/i, /^(?:SQL_BUFFER_RESULT\b)/i, /^(?:SQL_CACHE\b)/i, /^(?:SQL_NO_CACHE\b)/i, /^(?:SQL_CALC_FOUND_ROWS\b)/i, /^(?:AS\b)/i, /^(?:TRUE\b)/i, /^(?:FALSE\b)/i, /^(?:NULL\b)/i, /^(?:COLLATE\b)/i, /^(?:BINARY\b)/i, /^(?:ROW\b)/i, /^(?:EXISTS\b)/i, /^(?:CASE\b)/i, /^(?:WHEN\b)/i, /^(?:THEN\b)/i, /^(?:ELSE\b)/i, /^(?:END\b)/i, /^(?:DIV\b)/i, /^(?:MOD\b)/i, /^(?:NOT\b)/i, /^(?:BETWEEN\b)/i, /^(?:IN\b)/i, /^(?:SOUNDS\b)/i, /^(?:LIKE\b)/i, /^(?:ESCAPE\b)/i, /^(?:REGEXP\b)/i, /^(?:IS\b)/i, /^(?:UNKNOWN\b)/i, /^(?:AND\b)/i, /^(?:OR\b)/i, /^(?:XOR\b)/i, /^(?:FROM\b)/i, /^(?:PARTITION\b)/i, /^(?:USE\b)/i, /^(?:INDEX\b)/i, /^(?:KEY\b)/i, /^(?:FOR\b)/i, /^(?:JOIN\b)/i, /^(?:ORDER\s+BY\b)/i, /^(?:GROUP\s+BY\b)/i, /^(?:IGNORE\b)/i, /^(?:FORCE\b)/i, /^(?:INNER\b)/i, /^(?:CROSS\b)/i, /^(?:ON\b)/i, /^(?:USING\b)/i, /^(?:LEFT\b)/i, /^(?:RIGHT\b)/i, /^(?:OUTER\b)/i, /^(?:NATURAL\b)/i, /^(?:WHERE\b)/i, /^(?:ASC\b)/i, /^(?:DESC\b)/i, /^(?:WITH\b)/i, /^(?:ROLLUP\b)/i, /^(?:HAVING\b)/i, /^(?:OFFSET\b)/i, /^(?:PROCEDURE\b)/i, /^(?:UPDATE\b)/i, /^(?:LOCK\b)/i, /^(?:SHARE\b)/i, /^(?:MODE\b)/i, /^(?:OJ\b)/i, /^(?:LIMIT\b)/i, /^(?:UNION\b)/i, /^(?:,)/i, /^(?:=)/i, /^(?:\()/i, /^(?:\))/i, /^(?:~)/i, /^(?:!=)/i, /^(?:!)/i, /^(?:\|\|)/i, /^(?:\|)/i, /^(?:&)/i, /^(?:\+)/i, /^(?:-)/i, /^(?:\*)/i, /^(?:\/)/i, /^(?:%)/i, /^(?:\^)/i, /^(?:>>)/i, /^(?:>=)/i, /^(?:>)/i, /^(?:<<)/i, /^(?:<=>)/i, /^(?:<=)/i, /^(?:<>)/i, /^(?:<)/i, /^(?:\{)/i, /^(?:\})/i, /^(?:;)/i, /^(?:['](%)+['])/i, /^(?:(['][^']*['])+)/i, /^(?:[0][x][0-9a-fA-F]+)/i, /^(?:[-]?[0-9]+(\.[0-9]+)?)/i, /^(?:[-]?[0-9]+(\.[0-9]+)?[eE][-+]?[0-9]+(\.[0-9]+)?)/i, /^(?:[a-zA-Z_@#\uff3f\u4e00-\u9fa5][a-zA-Z0-9_$@#\uff3f\u4e00-\u9fa5]*)/i, /^(?:\.)/i, /^(?:([`])(?:(?=(\\?))\2.)*?\1)/i, /^(?:$)/i, /^(?:.)/i],
      conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119], "inclusive": true } }
    };
    return lexer2;
  }();
  parser.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  Parser.prototype = parser;
  parser.Parser = Parser;
  return new Parser();
}();

// src/utils/parseNumber.ts
var import_numeric_quantity2 = require("numeric-quantity");
var parseNumber = (v, pno = {}) => {
  if (!pno.parseNumbers || typeof v === "bigint" || typeof v === "number") {
    return v;
  }
  if (pno.parseNumbers === "native") {
    return parseFloat(v);
  }
  const n = (
    // TODO: Should these options be configurable?
    (0, import_numeric_quantity2.numericQuantity)(v, {
      allowTrailingInvalid: pno.parseNumbers === "enhanced",
      romanNumerals: true,
      round: false
    })
  );
  return isNaN(n) ? v : n;
};

// src/utils/parseSQL/utils.ts
var isSQLLiteralValue = (v) => v?.type === "String" || v?.type === "Number" || v?.type === "Boolean";
var isSQLSignedNumber = (v) => v?.type === "Prefix" && (v.prefix === "+" || v.prefix === "-") && v.value.type === "Number";
var isSQLLiteralOrSignedNumberValue = (v) => isSQLLiteralValue(v) || isSQLSignedNumber(v);
var isSQLIdentifier = (v) => v?.type === "Identifier";
var getParamString = (param) => {
  switch (typeof param) {
    case "number":
      return `${param}`;
    case "boolean":
      return param ? "TRUE" : "FALSE";
    default:
      return `'${param}'`;
  }
};
var getFieldName = (f) => {
  const fieldName = typeof f === "string" ? f : f.value;
  if (fieldName.startsWith("`") && fieldName.endsWith("`")) {
    return fieldName.replaceAll(/(^`|`$)/g, "").replaceAll("``", "`");
  } else if (fieldName.startsWith('"') && fieldName.endsWith('"')) {
    return fieldName.replaceAll(/(^"|"$)/g, "").replaceAll('""', '"');
  } else if (fieldName.startsWith("[") && fieldName.endsWith("]")) {
    return fieldName.replaceAll(/(^\[|\]$)/g, "").replaceAll("]]", "]");
  }
  return fieldName;
};
var normalizeCombinator = (c) => c.replace("&&", "and").replace("||", "or").toLowerCase();
var normalizeOperator = (op, flip) => {
  if (flip) {
    if (op === "<")
      return ">";
    if (op === "<=")
      return ">=";
    if (op === ">")
      return "<";
    if (op === ">=")
      return "<=";
  }
  if (op === "<>")
    return "!=";
  return op;
};
var evalSQLLiteralValue = (valueObj) => {
  if (valueObj.type === "String") {
    const valueString = valueObj.value;
    if (valueString.startsWith(`'`) && valueString.endsWith(`'`) || valueString.startsWith(`"`) && valueString.endsWith(`"`)) {
      const innerString = valueString.substring(1, valueString.length - 1);
      return innerString.replaceAll(/''/gm, "'");
    }
    return valueString;
  } else if (valueObj.type === "Boolean") {
    return valueObj.value.toLowerCase() === "true";
  } else if (isSQLSignedNumber(valueObj)) {
    return parseNumber(`${valueObj.prefix}${valueObj.value.value}`, { parseNumbers: true });
  }
  return parseNumber(valueObj.value, { parseNumbers: true });
};
var generateFlatAndOrList = (expr) => {
  const combinator = normalizeCombinator(expr.operator);
  if (expr.left.type === "AndExpression" || expr.left.type === "OrExpression" || expr.left.type === "XorExpression") {
    return [...generateFlatAndOrList(expr.left), combinator, expr.right];
  }
  return [expr.left, combinator, expr.right];
};
var generateMixedAndXorOrList = (expr) => {
  const arr = generateFlatAndOrList(expr);
  let currentLevel = 0;
  const orArray = { combinator: "or", expressions: [] };
  let xorArray = { combinator: "xor", expressions: [] };
  let andArray = { combinator: "and", expressions: [] };
  for (let i = 0; i < arr.length - 2; i += 2) {
    let levelDelta = 0;
    if (arr[i + 1] === "and") {
      levelDelta = 2 - currentLevel;
    } else if (arr[i + 1] === "xor") {
      levelDelta = 1 - currentLevel;
    } else if (arr[i + 1] === "or") {
      levelDelta = 0 - currentLevel;
    }
    if (levelDelta > 0) {
      for (let d = 0; d < levelDelta; d++) {
        currentLevel += 1;
        if (currentLevel === 1) {
          xorArray = { combinator: "xor", expressions: [] };
          if (levelDelta === 1) {
            xorArray.expressions.push(arr[i]);
            if (i >= arr.length - 3 || arr[i + 3] === "xor") {
              xorArray.expressions.push(arr[i + 2]);
            }
          }
        } else if (currentLevel === 2) {
          andArray = { combinator: "and", expressions: [] };
          andArray.expressions.push(arr[i], arr[i + 2]);
        }
      }
    } else if (levelDelta < 0) {
      for (let d = 0; d > levelDelta; d--) {
        currentLevel -= 1;
        if (currentLevel === 1) {
          xorArray.expressions.push(andArray);
          if (levelDelta === -1) {
            xorArray.expressions.push(arr[i + 2]);
          }
        } else if (currentLevel === 0) {
          orArray.expressions.push(xorArray);
          if (i >= arr.length - 3) {
            orArray.expressions.push(arr[i + 2]);
          }
        }
      }
    } else {
      if (currentLevel === 0) {
        if (i === 0 || i > 3 && arr[i - 3] !== "or") {
          orArray.expressions.push(arr[i]);
        }
        if (i >= arr.length - 3 || arr[i + 3] === "or") {
          orArray.expressions.push(arr[i + 2]);
        }
      } else if (currentLevel === 1) {
        xorArray.expressions.push(arr[i + 2]);
      } else if (currentLevel === 2) {
        andArray.expressions.push(arr[i + 2]);
      }
    }
  }
  if (currentLevel === 2) {
    xorArray.expressions.push(andArray);
    currentLevel -= 1;
  }
  if (currentLevel === 1) {
    orArray.expressions.push(xorArray);
    currentLevel -= 1;
  }
  if (orArray.expressions.length === 1 && "combinator" in orArray.expressions[0]) {
    if (orArray.expressions[0].expressions.length === 1 && "combinator" in orArray.expressions[0].expressions[0]) {
      return orArray.expressions[0].expressions[0];
    } else {
      return orArray.expressions[0];
    }
  }
  const returnArray = { combinator: "or", expressions: [] };
  for (const o of orArray.expressions) {
    if ("combinator" in o) {
      if ("combinator" in o.expressions[0] && o.expressions.length === 1) {
        returnArray.expressions.push(o.expressions[0]);
      } else {
        returnArray.expressions.push(o);
      }
    } else {
      returnArray.expressions.push(o);
    }
  }
  return returnArray;
};

// src/utils/parseSQL/parseSQL.ts
function parseSQL(sql, options = {}) {
  const { params, paramPrefix, independentCombinators, fields, getValueSources } = options;
  let sqlString = /^[ \t\n\r\s]*SELECT\b/i.test(sql) ? sql : /^[ \t\n\r\s]*WHERE\b/i.test(sql) ? `SELECT * FROM t ${sql}` : `SELECT * FROM t WHERE ${sql}`;
  let ic = false;
  const fieldsFlat = getFieldsArray(fields);
  ic = !!independentCombinators;
  if (params) {
    if (Array.isArray(params)) {
      let i = 0;
      sqlString = sqlString.replace(/\?/g, () => {
        const paramString = getParamString(params[i]);
        i++;
        return paramString;
      });
    } else {
      const keys = Object.keys(params);
      const prefix = paramPrefix ?? ":";
      keys.forEach((p) => {
        sqlString = sqlString.replace(
          new RegExp(`\\${prefix}${p}\\b`, "ig"),
          getParamString(params[p])
        );
      });
    }
  }
  const fieldIsValid = (fieldName, operator, subordinateFieldName) => fieldIsValidUtil({
    fieldName,
    fieldsFlat,
    operator,
    subordinateFieldName,
    getValueSources
  });
  const processSQLExpression = (expr) => {
    if (expr.type === "NotExpression") {
      const val = expr.value.type === "SimpleExprParentheses" ? expr.value.value.value[0] : expr.value;
      const rule = processSQLExpression(val);
      if (rule) {
        if (isRuleGroup(rule)) {
          return { ...rule, not: true };
        }
        return {
          rules: [rule],
          not: true,
          ...!ic && { combinator: "and" }
        };
      }
    } else if (expr.type === "SimpleExprParentheses") {
      const ex = expr.value.value[0];
      if (ex.type === "AndExpression" || ex.type === "OrExpression" || ex.type === "XorExpression") {
        return processSQLExpression(ex);
      }
      const rule = processSQLExpression(ex);
      return rule ? { rules: [rule], ...ic ? {} : { combinator: "and" } } : null;
    } else if (expr.type === "AndExpression" || expr.type === "OrExpression" || expr.type === "XorExpression") {
      if (ic) {
        const andOrList = generateFlatAndOrList(expr);
        const rules2 = andOrList.map((v) => {
          if (typeof v === "string") {
            return v;
          }
          return processSQLExpression(v);
        });
        if (rules2.includes(null)) {
          return null;
        }
        return {
          rules: rules2
        };
      }
      const andXorOrList = generateMixedAndXorOrList(expr);
      const { combinator } = andXorOrList;
      const rules = andXorOrList.expressions.map((obj) => {
        if ("combinator" in obj) {
          return {
            combinator: obj.combinator,
            rules: obj.expressions.map((o) => {
              if ("combinator" in o) {
                return {
                  combinator: o.combinator,
                  rules: o.expressions.map((oa) => processSQLExpression(oa)).filter(Boolean)
                };
              } else {
                return processSQLExpression(o);
              }
            }).filter(Boolean)
          };
        }
        return processSQLExpression(obj);
      }).filter(Boolean);
      if (rules.length > 0) {
        return { combinator, rules };
      }
    } else if (expr.type === "IsNullBooleanPrimary") {
      if (isSQLIdentifier(expr.value)) {
        const f = getFieldName(expr.value);
        const operator = expr.hasNot ? "notNull" : "null";
        if (fieldIsValid(f, operator)) {
          return {
            field: f,
            operator,
            value: null
          };
        }
      }
    } else if (expr.type === "ComparisonBooleanPrimary") {
      if (isSQLIdentifier(expr.left) && !isSQLIdentifier(expr.right) || !isSQLIdentifier(expr.left) && isSQLIdentifier(expr.right)) {
        const identifier = isSQLIdentifier(expr.left) ? expr.left.value : expr.right.value;
        const valueObj = [expr.left, expr.right].find((t) => !isSQLIdentifier(t));
        if (isSQLLiteralOrSignedNumberValue(valueObj)) {
          const f = getFieldName(identifier);
          const operator = normalizeOperator(expr.operator, isSQLIdentifier(expr.right));
          if (fieldIsValid(f, operator)) {
            return {
              field: f,
              operator,
              value: evalSQLLiteralValue(valueObj)
            };
          }
        }
      } else if (isSQLIdentifier(expr.left) && isSQLIdentifier(expr.right)) {
        const f = getFieldName(expr.left);
        const sf = getFieldName(expr.right);
        const operator = normalizeOperator(expr.operator);
        if (fieldIsValid(f, operator, sf)) {
          return {
            field: f,
            operator,
            value: sf,
            valueSource: "field"
          };
        }
      }
    } else if (expr.type === "InExpressionListPredicate") {
      if (isSQLIdentifier(expr.left)) {
        const f = getFieldName(expr.left);
        const valueArray = expr.right.value.filter(isSQLLiteralOrSignedNumberValue).map(evalSQLLiteralValue);
        const operator = expr.hasNot ? "notIn" : "in";
        const fieldArray = expr.right.value.filter(isSQLIdentifier).filter((sf) => fieldIsValid(f, operator, sf.value)).map(getFieldName);
        if (valueArray.length > 0) {
          const value = options?.listsAsArrays ? valueArray : valueArray.join(", ");
          return { field: getFieldName(expr.left), operator, value };
        } else if (fieldArray.length > 0) {
          const value = options?.listsAsArrays ? fieldArray : fieldArray.join(", ");
          return {
            field: getFieldName(expr.left),
            operator,
            value,
            valueSource: "field"
          };
        }
      }
    } else if (expr.type === "BetweenPredicate") {
      if (isSQLIdentifier(expr.left) && isSQLLiteralOrSignedNumberValue(expr.right.left) && isSQLLiteralOrSignedNumberValue(expr.right.right)) {
        const valueArray = [expr.right.left, expr.right.right].map(evalSQLLiteralValue);
        const value = options?.listsAsArrays ? valueArray : valueArray.join(", ");
        const operator = expr.hasNot ? "notBetween" : "between";
        return { field: getFieldName(expr.left), operator, value };
      } else if (isSQLIdentifier(expr.left) && isSQLIdentifier(expr.right.left) && isSQLIdentifier(expr.right.right)) {
        const f = getFieldName(expr.left);
        const valueArray = [expr.right.left, expr.right.right].map(getFieldName);
        const operator = expr.hasNot ? "notBetween" : "between";
        if (valueArray.every((sf) => fieldIsValid(f, operator, sf))) {
          const value = options?.listsAsArrays ? valueArray : valueArray.join(", ");
          return { field: f, operator, value, valueSource: "field" };
        }
      }
    } else if (expr.type === "LikePredicate") {
      if (isSQLIdentifier(expr.left) && expr.right.type === "String") {
        const valueWithWildcards = evalSQLLiteralValue(expr.right);
        const valueWithoutWildcards = valueWithWildcards.replace(/(^%)|(%$)/g, "");
        let operator = "=";
        if (/^%.*%$/.test(valueWithWildcards) || valueWithWildcards === "%") {
          operator = expr.hasNot ? "doesNotContain" : "contains";
        } else if (/%$/.test(valueWithWildcards)) {
          operator = expr.hasNot ? "doesNotBeginWith" : "beginsWith";
        } else if (/^%/.test(valueWithWildcards)) {
          operator = expr.hasNot ? "doesNotEndWith" : "endsWith";
        }
        const f = getFieldName(expr.left);
        if (fieldIsValid(f, operator)) {
          return { field: f, operator, value: valueWithoutWildcards };
        }
      } else if (isSQLIdentifier(expr.left) && (expr.right.type === "StartsWithExpr" || expr.right.type === "EndsWithExpr" || expr.right.type === "ContainsExpr")) {
        let subordinateFieldName = "";
        let operator = "=";
        if (isSQLIdentifier(expr.right.value)) {
          subordinateFieldName = getFieldName(expr.right.value);
        }
        if (expr.right.type === "EndsWithExpr") {
          operator = expr.hasNot ? "doesNotEndWith" : "endsWith";
        } else if (expr.right.type === "StartsWithExpr") {
          operator = expr.hasNot ? "doesNotBeginWith" : "beginsWith";
        } else if (expr.right.type === "ContainsExpr") {
          operator = expr.hasNot ? "doesNotContain" : "contains";
        }
        const baseFieldName = getFieldName(expr.left);
        if (operator !== "=" && fieldIsValid(baseFieldName, operator, subordinateFieldName)) {
          return {
            field: baseFieldName,
            operator,
            value: subordinateFieldName,
            valueSource: "field"
          };
        }
      } else if (isSQLIdentifier(expr.left) && isSQLIdentifier(expr.right)) {
        const baseFieldName = getFieldName(expr.left);
        const subordinateFieldName = getFieldName(expr.right);
        const operator = "=";
        if (fieldIsValid(baseFieldName, operator, subordinateFieldName)) {
          return {
            field: baseFieldName,
            operator,
            value: subordinateFieldName,
            valueSource: "field"
          };
        }
      }
    }
    return null;
  };
  const { where } = sqlParser.parse(sqlString).value;
  if (where) {
    const result = processSQLExpression(where);
    if (result) {
      if (isRuleGroup(result)) {
        return result;
      }
      return { rules: [result], ...ic ? {} : { combinator: "and" } };
    }
  }
  return { rules: [], ...ic ? {} : { combinator: "and" } };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseSQL
});
//# sourceMappingURL=parseSQL.js.map