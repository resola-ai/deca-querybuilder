"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// ../../node_modules/jsonata/jsonata.js
var require_jsonata = __commonJS({
  "../../node_modules/jsonata/jsonata.js"(exports2, module2) {
    "use strict";
    (function(f) {
      if (typeof exports2 === "object" && typeof module2 !== "undefined") {
        module2.exports = f();
      } else if (typeof define === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.jsonata = f();
      }
    })(function() {
      var define2, module3, exports3;
      return (/* @__PURE__ */ function() {
        function r(e, n, t) {
          function o(i2, f) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c = "function" == typeof require && require;
                if (!f && c)
                  return c(i2, true);
                if (u)
                  return u(i2, true);
                var a = new Error("Cannot find module '" + i2 + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p = n[i2] = { exports: {} };
              e[i2][0].call(p.exports, function(r2) {
                var n2 = e[i2][1][r2];
                return o(n2 || r2);
              }, p, p.exports, r, e, n, t);
            }
            return n[i2].exports;
          }
          for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)
            o(t[i]);
          return o;
        }
        return r;
      }())({ 1: [function(require2, module4, exports4) {
        const utils = require2("./utils");
        const dateTime = function() {
          "use strict";
          const stringToArray = utils.stringToArray;
          const few = [
            "Zero",
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine",
            "Ten",
            "Eleven",
            "Twelve",
            "Thirteen",
            "Fourteen",
            "Fifteen",
            "Sixteen",
            "Seventeen",
            "Eighteen",
            "Nineteen"
          ];
          const ordinals = [
            "Zeroth",
            "First",
            "Second",
            "Third",
            "Fourth",
            "Fifth",
            "Sixth",
            "Seventh",
            "Eighth",
            "Ninth",
            "Tenth",
            "Eleventh",
            "Twelfth",
            "Thirteenth",
            "Fourteenth",
            "Fifteenth",
            "Sixteenth",
            "Seventeenth",
            "Eighteenth",
            "Nineteenth"
          ];
          const decades = ["Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety", "Hundred"];
          const magnitudes = ["Thousand", "Million", "Billion", "Trillion"];
          function numberToWords(value, ordinal) {
            var lookup = function(num, prev, ord) {
              var words2 = "";
              if (num <= 19) {
                words2 = (prev ? " and " : "") + (ord ? ordinals[num] : few[num]);
              } else if (num < 100) {
                const tens = Math.floor(num / 10);
                const remainder = num % 10;
                words2 = (prev ? " and " : "") + decades[tens - 2];
                if (remainder > 0) {
                  words2 += "-" + lookup(remainder, false, ord);
                } else if (ord) {
                  words2 = words2.substring(0, words2.length - 1) + "ieth";
                }
              } else if (num < 1e3) {
                const hundreds = Math.floor(num / 100);
                const remainder = num % 100;
                words2 = (prev ? ", " : "") + few[hundreds] + " Hundred";
                if (remainder > 0) {
                  words2 += lookup(remainder, true, ord);
                } else if (ord) {
                  words2 += "th";
                }
              } else {
                var mag = Math.floor(Math.log10(num) / 3);
                if (mag > magnitudes.length) {
                  mag = magnitudes.length;
                }
                const factor = Math.pow(10, mag * 3);
                const mant = Math.floor(num / factor);
                const remainder = num - mant * factor;
                words2 = (prev ? ", " : "") + lookup(mant, false, false) + " " + magnitudes[mag - 1];
                if (remainder > 0) {
                  words2 += lookup(remainder, true, ord);
                } else if (ord) {
                  words2 += "th";
                }
              }
              return words2;
            };
            var words = lookup(value, false, ordinal);
            return words;
          }
          const wordValues = {};
          few.forEach(function(word, index) {
            wordValues[word.toLowerCase()] = index;
          });
          ordinals.forEach(function(word, index) {
            wordValues[word.toLowerCase()] = index;
          });
          decades.forEach(function(word, index) {
            const lword = word.toLowerCase();
            wordValues[lword] = (index + 2) * 10;
            wordValues[lword.substring(0, word.length - 1) + "ieth"] = wordValues[lword];
          });
          wordValues.hundredth = 100;
          magnitudes.forEach(function(word, index) {
            const lword = word.toLowerCase();
            const val = Math.pow(10, (index + 1) * 3);
            wordValues[lword] = val;
            wordValues[lword + "th"] = val;
          });
          function wordsToNumber(text) {
            const parts = text.split(/,\s|\sand\s|[\s\\-]/);
            const values = parts.map((part) => wordValues[part]);
            let segs = [0];
            values.forEach((value) => {
              if (value < 100) {
                let top = segs.pop();
                if (top >= 1e3) {
                  segs.push(top);
                  top = 0;
                }
                segs.push(top + value);
              } else {
                segs.push(segs.pop() * value);
              }
            });
            const result = segs.reduce((a, b) => a + b, 0);
            return result;
          }
          const romanNumerals = [
            [1e3, "m"],
            [900, "cm"],
            [500, "d"],
            [400, "cd"],
            [100, "c"],
            [90, "xc"],
            [50, "l"],
            [40, "xl"],
            [10, "x"],
            [9, "ix"],
            [5, "v"],
            [4, "iv"],
            [1, "i"]
          ];
          const romanValues = { "M": 1e3, "D": 500, "C": 100, "L": 50, "X": 10, "V": 5, "I": 1 };
          function decimalToRoman(value) {
            for (var index = 0; index < romanNumerals.length; index++) {
              const numeral = romanNumerals[index];
              if (value >= numeral[0]) {
                return numeral[1] + decimalToRoman(value - numeral[0]);
              }
            }
            return "";
          }
          function romanToDecimal(roman) {
            var decimal = 0;
            var max = 1;
            for (var i = roman.length - 1; i >= 0; i--) {
              const digit = roman[i];
              const value = romanValues[digit];
              if (value < max) {
                decimal -= value;
              } else {
                max = value;
                decimal += value;
              }
            }
            return decimal;
          }
          function decimalToLetters(value, aChar) {
            var letters = [];
            var aCode = aChar.charCodeAt(0);
            while (value > 0) {
              letters.unshift(String.fromCharCode((value - 1) % 26 + aCode));
              value = Math.floor((value - 1) / 26);
            }
            return letters.join("");
          }
          function lettersToDecimal(letters, aChar) {
            var aCode = aChar.charCodeAt(0);
            var decimal = 0;
            for (var i = 0; i < letters.length; i++) {
              decimal += (letters.charCodeAt(letters.length - i - 1) - aCode + 1) * Math.pow(26, i);
            }
            return decimal;
          }
          function formatInteger(value, picture) {
            if (typeof value === "undefined") {
              return void 0;
            }
            value = Math.floor(value);
            const format = analyseIntegerPicture(picture);
            return _formatInteger(value, format);
          }
          const formats = {
            DECIMAL: "decimal",
            LETTERS: "letters",
            ROMAN: "roman",
            WORDS: "words",
            SEQUENCE: "sequence"
          };
          const tcase = {
            UPPER: "upper",
            LOWER: "lower",
            TITLE: "title"
          };
          function _formatInteger(value, format) {
            let formattedInteger;
            const negative = value < 0;
            value = Math.abs(value);
            switch (format.primary) {
              case formats.LETTERS:
                formattedInteger = decimalToLetters(value, format.case === tcase.UPPER ? "A" : "a");
                break;
              case formats.ROMAN:
                formattedInteger = decimalToRoman(value);
                if (format.case === tcase.UPPER) {
                  formattedInteger = formattedInteger.toUpperCase();
                }
                break;
              case formats.WORDS:
                formattedInteger = numberToWords(value, format.ordinal);
                if (format.case === tcase.UPPER) {
                  formattedInteger = formattedInteger.toUpperCase();
                } else if (format.case === tcase.LOWER) {
                  formattedInteger = formattedInteger.toLowerCase();
                }
                break;
              case formats.DECIMAL:
                formattedInteger = "" + value;
                var padLength = format.mandatoryDigits - formattedInteger.length;
                if (padLength > 0) {
                  var padding = new Array(padLength + 1).join("0");
                  formattedInteger = padding + formattedInteger;
                }
                if (format.zeroCode !== 48) {
                  formattedInteger = stringToArray(formattedInteger).map((code) => {
                    return String.fromCodePoint(code.codePointAt(0) + format.zeroCode - 48);
                  }).join("");
                }
                if (format.regular) {
                  const n = Math.floor((formattedInteger.length - 1) / format.groupingSeparators.position);
                  for (let ii = n; ii > 0; ii--) {
                    const pos = formattedInteger.length - ii * format.groupingSeparators.position;
                    formattedInteger = formattedInteger.substr(0, pos) + format.groupingSeparators.character + formattedInteger.substr(pos);
                  }
                } else {
                  format.groupingSeparators.reverse().forEach((separator) => {
                    const pos = formattedInteger.length - separator.position;
                    formattedInteger = formattedInteger.substr(0, pos) + separator.character + formattedInteger.substr(pos);
                  });
                }
                if (format.ordinal) {
                  var suffix123 = { "1": "st", "2": "nd", "3": "rd" };
                  var lastDigit = formattedInteger[formattedInteger.length - 1];
                  var suffix = suffix123[lastDigit];
                  if (!suffix || formattedInteger.length > 1 && formattedInteger[formattedInteger.length - 2] === "1") {
                    suffix = "th";
                  }
                  formattedInteger = formattedInteger + suffix;
                }
                break;
              case formats.SEQUENCE:
                throw {
                  code: "D3130",
                  value: format.token
                };
            }
            if (negative) {
              formattedInteger = "-" + formattedInteger;
            }
            return formattedInteger;
          }
          const decimalGroups = [48, 1632, 1776, 1984, 2406, 2534, 2662, 2790, 2918, 3046, 3174, 3302, 3430, 3558, 3664, 3792, 3872, 4160, 4240, 6112, 6160, 6470, 6608, 6784, 6800, 6992, 7088, 7232, 7248, 42528, 43216, 43264, 43472, 43504, 43600, 44016, 65296];
          function analyseIntegerPicture(picture) {
            const format = {
              type: "integer",
              primary: formats.DECIMAL,
              case: tcase.LOWER,
              ordinal: false
            };
            let primaryFormat, formatModifier;
            const semicolon = picture.lastIndexOf(";");
            if (semicolon === -1) {
              primaryFormat = picture;
            } else {
              primaryFormat = picture.substring(0, semicolon);
              formatModifier = picture.substring(semicolon + 1);
              if (formatModifier[0] === "o") {
                format.ordinal = true;
              }
            }
            switch (primaryFormat) {
              case "A":
                format.case = tcase.UPPER;
              case "a":
                format.primary = formats.LETTERS;
                break;
              case "I":
                format.case = tcase.UPPER;
              case "i":
                format.primary = formats.ROMAN;
                break;
              case "W":
                format.case = tcase.UPPER;
                format.primary = formats.WORDS;
                break;
              case "Ww":
                format.case = tcase.TITLE;
                format.primary = formats.WORDS;
                break;
              case "w":
                format.primary = formats.WORDS;
                break;
              default: {
                let zeroCode = null;
                let mandatoryDigits = 0;
                let optionalDigits = 0;
                let groupingSeparators = [];
                let separatorPosition = 0;
                const formatCodepoints = stringToArray(primaryFormat).map((c) => c.codePointAt(0)).reverse();
                formatCodepoints.forEach((codePoint) => {
                  let digit = false;
                  for (let ii = 0; ii < decimalGroups.length; ii++) {
                    const group = decimalGroups[ii];
                    if (codePoint >= group && codePoint <= group + 9) {
                      digit = true;
                      mandatoryDigits++;
                      separatorPosition++;
                      if (zeroCode === null) {
                        zeroCode = group;
                      } else if (group !== zeroCode) {
                        throw {
                          code: "D3131"
                        };
                      }
                      break;
                    }
                  }
                  if (!digit) {
                    if (codePoint === 35) {
                      separatorPosition++;
                      optionalDigits++;
                    } else {
                      groupingSeparators.push({
                        position: separatorPosition,
                        character: String.fromCodePoint(codePoint)
                      });
                    }
                  }
                });
                if (mandatoryDigits > 0) {
                  format.primary = formats.DECIMAL;
                  format.zeroCode = zeroCode;
                  format.mandatoryDigits = mandatoryDigits;
                  format.optionalDigits = optionalDigits;
                  const regularRepeat = function(separators) {
                    if (separators.length === 0) {
                      return 0;
                    }
                    const sepChar = separators[0].character;
                    for (let ii = 1; ii < separators.length; ii++) {
                      if (separators[ii].character !== sepChar) {
                        return 0;
                      }
                    }
                    const indexes = separators.map((separator) => separator.position);
                    const gcd = function(a, b) {
                      return b === 0 ? a : gcd(b, a % b);
                    };
                    const factor = indexes.reduce(gcd);
                    for (let index = 1; index <= indexes.length; index++) {
                      if (indexes.indexOf(index * factor) === -1) {
                        return 0;
                      }
                    }
                    return factor;
                  };
                  const regular = regularRepeat(groupingSeparators);
                  if (regular > 0) {
                    format.regular = true;
                    format.groupingSeparators = {
                      position: regular,
                      character: groupingSeparators[0].character
                    };
                  } else {
                    format.regular = false;
                    format.groupingSeparators = groupingSeparators;
                  }
                } else {
                  format.primary = formats.SEQUENCE;
                  format.token = primaryFormat;
                }
              }
            }
            return format;
          }
          const defaultPresentationModifiers = {
            Y: "1",
            M: "1",
            D: "1",
            d: "1",
            F: "n",
            W: "1",
            w: "1",
            X: "1",
            x: "1",
            H: "1",
            h: "1",
            P: "n",
            m: "01",
            s: "01",
            f: "1",
            Z: "01:01",
            z: "01:01",
            C: "n",
            E: "n"
          };
          function analyseDateTimePicture(picture) {
            var spec = [];
            const format = {
              type: "datetime",
              parts: spec
            };
            const addLiteral = function(start2, end) {
              if (end > start2) {
                let literal = picture.substring(start2, end);
                literal = literal.split("]]").join("]");
                spec.push({ type: "literal", value: literal });
              }
            };
            var start = 0, pos = 0;
            while (pos < picture.length) {
              if (picture.charAt(pos) === "[") {
                if (picture.charAt(pos + 1) === "[") {
                  addLiteral(start, pos);
                  spec.push({ type: "literal", value: "[" });
                  pos += 2;
                  start = pos;
                  continue;
                }
                addLiteral(start, pos);
                start = pos;
                pos = picture.indexOf("]", start);
                if (pos === -1) {
                  throw {
                    code: "D3135"
                  };
                }
                let marker = picture.substring(start + 1, pos);
                marker = marker.split(/\s+/).join("");
                var def = {
                  type: "marker",
                  component: marker.charAt(0)
                  // 1. The component specifier is always present and is always a single letter.
                };
                var comma = marker.lastIndexOf(",");
                var presMod;
                if (comma !== -1) {
                  const widthMod = marker.substring(comma + 1);
                  const dash = widthMod.indexOf("-");
                  let min, max;
                  const parseWidth = function(wm) {
                    if (typeof wm === "undefined" || wm === "*") {
                      return void 0;
                    } else {
                      return parseInt(wm);
                    }
                  };
                  if (dash === -1) {
                    min = widthMod;
                  } else {
                    min = widthMod.substring(0, dash);
                    max = widthMod.substring(dash + 1);
                  }
                  const widthDef = {
                    min: parseWidth(min),
                    max: parseWidth(max)
                  };
                  def.width = widthDef;
                  presMod = marker.substring(1, comma);
                } else {
                  presMod = marker.substring(1);
                }
                if (presMod.length === 1) {
                  def.presentation1 = presMod;
                } else if (presMod.length > 1) {
                  var lastChar = presMod.charAt(presMod.length - 1);
                  if ("atco".indexOf(lastChar) !== -1) {
                    def.presentation2 = lastChar;
                    if (lastChar === "o") {
                      def.ordinal = true;
                    }
                    def.presentation1 = presMod.substring(0, presMod.length - 1);
                  } else {
                    def.presentation1 = presMod;
                  }
                } else {
                  def.presentation1 = defaultPresentationModifiers[def.component];
                }
                if (typeof def.presentation1 === "undefined") {
                  throw {
                    code: "D3132",
                    value: def.component
                  };
                }
                if (def.presentation1[0] === "n") {
                  def.names = tcase.LOWER;
                } else if (def.presentation1[0] === "N") {
                  if (def.presentation1[1] === "n") {
                    def.names = tcase.TITLE;
                  } else {
                    def.names = tcase.UPPER;
                  }
                } else if ("YMDdFWwXxHhmsf".indexOf(def.component) !== -1) {
                  var integerPattern = def.presentation1;
                  if (def.presentation2) {
                    integerPattern += ";" + def.presentation2;
                  }
                  def.integerFormat = analyseIntegerPicture(integerPattern);
                  if (def.width && def.width.min !== void 0) {
                    if (def.integerFormat.mandatoryDigits < def.width.min) {
                      def.integerFormat.mandatoryDigits = def.width.min;
                    }
                  }
                  if ("YMD".indexOf(def.component) !== -1) {
                    def.n = -1;
                    if (def.width && def.width.max !== void 0) {
                      def.n = def.width.max;
                      def.integerFormat.mandatoryDigits = def.n;
                    } else {
                      var w = def.integerFormat.mandatoryDigits + def.integerFormat.optionalDigits;
                      if (w >= 2) {
                        def.n = w;
                      }
                    }
                  }
                }
                if (def.component === "Z" || def.component === "z") {
                  def.integerFormat = analyseIntegerPicture(def.presentation1);
                }
                spec.push(def);
                start = pos + 1;
              }
              pos++;
            }
            addLiteral(start, pos);
            return format;
          }
          const days = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const millisInADay = 1e3 * 60 * 60 * 24;
          const startOfFirstWeek = function(ym) {
            const jan1 = Date.UTC(ym.year, ym.month);
            var dayOfJan1 = new Date(jan1).getUTCDay();
            if (dayOfJan1 === 0) {
              dayOfJan1 = 7;
            }
            return dayOfJan1 > 4 ? jan1 + (8 - dayOfJan1) * millisInADay : jan1 - (dayOfJan1 - 1) * millisInADay;
          };
          const yearMonth = function(year, month) {
            return {
              year,
              month,
              nextMonth: function() {
                return month === 11 ? yearMonth(year + 1, 0) : yearMonth(year, month + 1);
              },
              previousMonth: function() {
                return month === 0 ? yearMonth(year - 1, 11) : yearMonth(year, month - 1);
              },
              nextYear: function() {
                return yearMonth(year + 1, month);
              },
              previousYear: function() {
                return yearMonth(year - 1, month);
              }
            };
          };
          const deltaWeeks = function(start, end) {
            return (end - start) / (millisInADay * 7) + 1;
          };
          const getDateTimeFragment = (date, component) => {
            let componentValue;
            switch (component) {
              case "Y":
                componentValue = date.getUTCFullYear();
                break;
              case "M":
                componentValue = date.getUTCMonth() + 1;
                break;
              case "D":
                componentValue = date.getUTCDate();
                break;
              case "d": {
                const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                const firstJan = Date.UTC(date.getUTCFullYear(), 0);
                componentValue = (today - firstJan) / millisInADay + 1;
                break;
              }
              case "F":
                componentValue = date.getUTCDay();
                if (componentValue === 0) {
                  componentValue = 7;
                }
                break;
              case "W": {
                const thisYear = yearMonth(date.getUTCFullYear(), 0);
                const startOfWeek1 = startOfFirstWeek(thisYear);
                const today = Date.UTC(thisYear.year, date.getUTCMonth(), date.getUTCDate());
                let week = deltaWeeks(startOfWeek1, today);
                if (week > 52) {
                  const startOfFollowingYear = startOfFirstWeek(thisYear.nextYear());
                  if (today >= startOfFollowingYear) {
                    week = 1;
                  }
                } else if (week < 1) {
                  const startOfPreviousYear = startOfFirstWeek(thisYear.previousYear());
                  week = deltaWeeks(startOfPreviousYear, today);
                }
                componentValue = Math.floor(week);
                break;
              }
              case "w": {
                const thisMonth = yearMonth(date.getUTCFullYear(), date.getUTCMonth());
                const startOfWeek1 = startOfFirstWeek(thisMonth);
                const today = Date.UTC(thisMonth.year, thisMonth.month, date.getUTCDate());
                let week = deltaWeeks(startOfWeek1, today);
                if (week > 4) {
                  const startOfFollowingMonth = startOfFirstWeek(thisMonth.nextMonth());
                  if (today >= startOfFollowingMonth) {
                    week = 1;
                  }
                } else if (week < 1) {
                  const startOfPreviousMonth = startOfFirstWeek(thisMonth.previousMonth());
                  week = deltaWeeks(startOfPreviousMonth, today);
                }
                componentValue = Math.floor(week);
                break;
              }
              case "X": {
                const thisYear = yearMonth(date.getUTCFullYear(), 0);
                const startOfISOYear = startOfFirstWeek(thisYear);
                const endOfISOYear = startOfFirstWeek(thisYear.nextYear());
                const now = date.getTime();
                if (now < startOfISOYear) {
                  componentValue = thisYear.year - 1;
                } else if (now >= endOfISOYear) {
                  componentValue = thisYear.year + 1;
                } else {
                  componentValue = thisYear.year;
                }
                break;
              }
              case "x": {
                const thisMonth = yearMonth(date.getUTCFullYear(), date.getUTCMonth());
                const startOfISOMonth = startOfFirstWeek(thisMonth);
                const nextMonth = thisMonth.nextMonth();
                const endOfISOMonth = startOfFirstWeek(nextMonth);
                const now = date.getTime();
                if (now < startOfISOMonth) {
                  componentValue = thisMonth.previousMonth().month + 1;
                } else if (now >= endOfISOMonth) {
                  componentValue = nextMonth.month + 1;
                } else {
                  componentValue = thisMonth.month + 1;
                }
                break;
              }
              case "H":
                componentValue = date.getUTCHours();
                break;
              case "h":
                componentValue = date.getUTCHours();
                componentValue = componentValue % 12;
                if (componentValue === 0) {
                  componentValue = 12;
                }
                break;
              case "P":
                componentValue = date.getUTCHours() >= 12 ? "pm" : "am";
                break;
              case "m":
                componentValue = date.getUTCMinutes();
                break;
              case "s":
                componentValue = date.getUTCSeconds();
                break;
              case "f":
                componentValue = date.getUTCMilliseconds();
                break;
              case "Z":
              case "z":
                break;
              case "C":
                componentValue = "ISO";
                break;
              case "E":
                componentValue = "ISO";
                break;
            }
            return componentValue;
          };
          let iso8601Spec = null;
          function formatDateTime(millis, picture, timezone) {
            var offsetHours = 0;
            var offsetMinutes = 0;
            if (typeof timezone !== "undefined") {
              const offset = parseInt(timezone);
              offsetHours = Math.floor(offset / 100);
              offsetMinutes = offset % 100;
            }
            var formatComponent = function(date, markerSpec) {
              var componentValue = getDateTimeFragment(date, markerSpec.component);
              if ("YMDdFWwXxHhms".indexOf(markerSpec.component) !== -1) {
                if (markerSpec.component === "Y") {
                  if (markerSpec.n !== -1) {
                    componentValue = componentValue % Math.pow(10, markerSpec.n);
                  }
                }
                if (markerSpec.names) {
                  if (markerSpec.component === "M" || markerSpec.component === "x") {
                    componentValue = months[componentValue - 1];
                  } else if (markerSpec.component === "F") {
                    componentValue = days[componentValue];
                  } else {
                    throw {
                      code: "D3133",
                      value: markerSpec.component
                    };
                  }
                  if (markerSpec.names === tcase.UPPER) {
                    componentValue = componentValue.toUpperCase();
                  } else if (markerSpec.names === tcase.LOWER) {
                    componentValue = componentValue.toLowerCase();
                  }
                  if (markerSpec.width && componentValue.length > markerSpec.width.max) {
                    componentValue = componentValue.substring(0, markerSpec.width.max);
                  }
                } else {
                  componentValue = _formatInteger(componentValue, markerSpec.integerFormat);
                }
              } else if (markerSpec.component === "f") {
                componentValue = _formatInteger(componentValue, markerSpec.integerFormat);
              } else if (markerSpec.component === "Z" || markerSpec.component === "z") {
                const offset = offsetHours * 100 + offsetMinutes;
                if (markerSpec.integerFormat.regular) {
                  componentValue = _formatInteger(offset, markerSpec.integerFormat);
                } else {
                  const numDigits = markerSpec.integerFormat.mandatoryDigits;
                  if (numDigits === 1 || numDigits === 2) {
                    componentValue = _formatInteger(offsetHours, markerSpec.integerFormat);
                    if (offsetMinutes !== 0) {
                      componentValue += ":" + formatInteger(offsetMinutes, "00");
                    }
                  } else if (numDigits === 3 || numDigits === 4) {
                    componentValue = _formatInteger(offset, markerSpec.integerFormat);
                  } else {
                    throw {
                      code: "D3134",
                      value: numDigits
                    };
                  }
                }
                if (offset >= 0) {
                  componentValue = "+" + componentValue;
                }
                if (markerSpec.component === "z") {
                  componentValue = "GMT" + componentValue;
                }
                if (offset === 0 && markerSpec.presentation2 === "t") {
                  componentValue = "Z";
                }
              } else if (markerSpec.component === "P") {
                if (markerSpec.names === tcase.UPPER) {
                  componentValue = componentValue.toUpperCase();
                }
              }
              return componentValue;
            };
            let formatSpec;
            if (typeof picture === "undefined") {
              if (iso8601Spec === null) {
                iso8601Spec = analyseDateTimePicture("[Y0001]-[M01]-[D01]T[H01]:[m01]:[s01].[f001][Z01:01t]");
              }
              formatSpec = iso8601Spec;
            } else {
              formatSpec = analyseDateTimePicture(picture);
            }
            const offsetMillis = (60 * offsetHours + offsetMinutes) * 60 * 1e3;
            const dateTime2 = new Date(millis + offsetMillis);
            let result = "";
            formatSpec.parts.forEach(function(part) {
              if (part.type === "literal") {
                result += part.value;
              } else {
                result += formatComponent(dateTime2, part);
              }
            });
            return result;
          }
          function generateRegex(formatSpec) {
            var matcher = {};
            if (formatSpec.type === "datetime") {
              matcher.type = "datetime";
              matcher.parts = formatSpec.parts.map(function(part) {
                var res = {};
                if (part.type === "literal") {
                  res.regex = part.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                } else if (part.component === "Z" || part.component === "z") {
                  let separator;
                  if (!Array.isArray(part.integerFormat.groupingSeparators)) {
                    separator = part.integerFormat.groupingSeparators;
                  }
                  res.regex = "";
                  if (part.component === "z") {
                    res.regex = "GMT";
                  }
                  res.regex += "[-+][0-9]+";
                  if (separator) {
                    res.regex += separator.character + "[0-9]+";
                  }
                  res.parse = function(value) {
                    if (part.component === "z") {
                      value = value.substring(3);
                    }
                    let offsetHours = 0, offsetMinutes = 0;
                    if (separator) {
                      offsetHours = Number.parseInt(value.substring(0, value.indexOf(separator.character)));
                      offsetMinutes = Number.parseInt(value.substring(value.indexOf(separator.character) + 1));
                    } else {
                      const numdigits = value.length - 1;
                      if (numdigits <= 2) {
                        offsetHours = Number.parseInt(value);
                      } else {
                        offsetHours = Number.parseInt(value.substring(0, 3));
                        offsetMinutes = Number.parseInt(value.substring(3));
                      }
                    }
                    return offsetHours * 60 + offsetMinutes;
                  };
                } else if (part.integerFormat) {
                  part.integerFormat.n = part.n;
                  res = generateRegex(part.integerFormat);
                } else {
                  res.regex = "[a-zA-Z]+";
                  var lookup = {};
                  if (part.component === "M" || part.component === "x") {
                    months.forEach(function(name, index) {
                      if (part.width && part.width.max) {
                        lookup[name.substring(0, part.width.max)] = index + 1;
                      } else {
                        lookup[name] = index + 1;
                      }
                    });
                  } else if (part.component === "F") {
                    days.forEach(function(name, index) {
                      if (index > 0) {
                        if (part.width && part.width.max) {
                          lookup[name.substring(0, part.width.max)] = index;
                        } else {
                          lookup[name] = index;
                        }
                      }
                    });
                  } else if (part.component === "P") {
                    lookup = { "am": 0, "AM": 0, "pm": 1, "PM": 1 };
                  } else {
                    throw {
                      code: "D3133",
                      value: part.component
                    };
                  }
                  res.parse = function(value) {
                    return lookup[value];
                  };
                }
                res.component = part.component;
                return res;
              });
            } else {
              matcher.type = "integer";
              const isUpper = formatSpec.case === tcase.UPPER;
              let occurrences;
              if (formatSpec.n && formatSpec.n > 0) {
                if (formatSpec.optionalDigits === 0) {
                  occurrences = `{${formatSpec.n}}`;
                } else {
                  occurrences = `{${formatSpec.n - formatSpec.optionalDigits},${formatSpec.n}}`;
                }
              } else {
                occurrences = "+";
              }
              switch (formatSpec.primary) {
                case formats.LETTERS:
                  matcher.regex = isUpper ? "[A-Z]+" : "[a-z]+";
                  matcher.parse = function(value) {
                    return lettersToDecimal(value, isUpper ? "A" : "a");
                  };
                  break;
                case formats.ROMAN:
                  matcher.regex = isUpper ? "[MDCLXVI]+" : "[mdclxvi]+";
                  matcher.parse = function(value) {
                    return romanToDecimal(isUpper ? value : value.toUpperCase());
                  };
                  break;
                case formats.WORDS:
                  matcher.regex = "(?:" + Object.keys(wordValues).concat("and", "[\\-, ]").join("|") + ")+";
                  matcher.parse = function(value) {
                    return wordsToNumber(value.toLowerCase());
                  };
                  break;
                case formats.DECIMAL:
                  matcher.regex = `[0-9]${occurrences}`;
                  if (formatSpec.ordinal) {
                    matcher.regex += "(?:th|st|nd|rd)";
                  }
                  matcher.parse = function(value) {
                    let digits = value;
                    if (formatSpec.ordinal) {
                      digits = value.substring(0, value.length - 2);
                    }
                    if (formatSpec.regular) {
                      digits = digits.split(",").join("");
                    } else {
                      formatSpec.groupingSeparators.forEach((sep) => {
                        digits = digits.split(sep.character).join("");
                      });
                    }
                    if (formatSpec.zeroCode !== 48) {
                      digits = digits.split("").map((char) => String.fromCodePoint(char.codePointAt(0) - formatSpec.zeroCode + 48)).join("");
                    }
                    return parseInt(digits);
                  };
                  break;
                case formats.SEQUENCE:
                  throw {
                    code: "D3130",
                    value: formatSpec.token
                  };
              }
            }
            return matcher;
          }
          function parseInteger(value, picture) {
            if (typeof value === "undefined") {
              return void 0;
            }
            const formatSpec = analyseIntegerPicture(picture);
            const matchSpec = generateRegex(formatSpec);
            const result = matchSpec.parse(value);
            return result;
          }
          function parseDateTime(timestamp, picture) {
            const formatSpec = analyseDateTimePicture(picture);
            const matchSpec = generateRegex(formatSpec);
            const fullRegex = "^" + matchSpec.parts.map((part) => "(" + part.regex + ")").join("") + "$";
            const matcher = new RegExp(fullRegex, "i");
            var info = matcher.exec(timestamp);
            if (info !== null) {
              const dmA = 161;
              const dmB = 130;
              const dmC = 84;
              const dmD = 72;
              const tmA = 23;
              const tmB = 47;
              const components = {};
              for (let i = 1; i < info.length; i++) {
                const mpart = matchSpec.parts[i - 1];
                if (mpart.parse) {
                  components[mpart.component] = mpart.parse(info[i]);
                }
              }
              if (Object.getOwnPropertyNames(components).length === 0) {
                return void 0;
              }
              let mask = 0;
              const shift = (bit) => {
                mask <<= 1;
                mask += bit ? 1 : 0;
              };
              const isType = (type) => {
                return !(~type & mask) && !!(type & mask);
              };
              "YXMxWwdD".split("").forEach((part) => shift(components[part]));
              const dateA = isType(dmA);
              const dateB = !dateA && isType(dmB);
              const dateC = isType(dmC);
              const dateD = !dateC && isType(dmD);
              mask = 0;
              "PHhmsf".split("").forEach((part) => shift(components[part]));
              const timeA = isType(tmA);
              const timeB = !timeA && isType(tmB);
              const dateComps = dateB ? "YD" : dateC ? "XxwF" : dateD ? "XWF" : "YMD";
              const timeComps = timeB ? "Phmsf" : "Hmsf";
              const comps = dateComps + timeComps;
              const now = this.environment.timestamp;
              let startSpecified = false;
              let endSpecified = false;
              comps.split("").forEach((part) => {
                if (typeof components[part] === "undefined") {
                  if (startSpecified) {
                    components[part] = "MDd".indexOf(part) !== -1 ? 1 : 0;
                    endSpecified = true;
                  } else {
                    components[part] = getDateTimeFragment(now, part);
                  }
                } else {
                  startSpecified = true;
                  if (endSpecified) {
                    throw {
                      code: "D3136"
                    };
                  }
                }
              });
              if (components.M > 0) {
                components.M -= 1;
              } else {
                components.M = 0;
              }
              if (dateB) {
                const firstJan = Date.UTC(components.Y, 0);
                const offsetMillis = (components.d - 1) * 1e3 * 60 * 60 * 24;
                const derivedDate = new Date(firstJan + offsetMillis);
                components.M = derivedDate.getUTCMonth();
                components.D = derivedDate.getUTCDate();
              }
              if (dateC) {
                throw {
                  code: "D3136"
                };
              }
              if (dateD) {
                throw {
                  code: "D3136"
                };
              }
              if (timeB) {
                components.H = components.h === 12 ? 0 : components.h;
                if (components.P === 1) {
                  components.H += 12;
                }
              }
              var millis = Date.UTC(components.Y, components.M, components.D, components.H, components.m, components.s, components.f);
              if (components.Z || components.z) {
                millis -= (components.Z || components.z) * 60 * 1e3;
              }
              return millis;
            }
          }
          var iso8601regex = new RegExp("^\\d{4}(-[01]\\d)*(-[0-3]\\d)*(T[0-2]\\d:[0-5]\\d:[0-5]\\d)*(\\.\\d+)?([+-][0-2]\\d:?[0-5]\\d|Z)?$");
          function toMillis(timestamp, picture) {
            if (typeof timestamp === "undefined") {
              return void 0;
            }
            if (typeof picture === "undefined") {
              if (!iso8601regex.test(timestamp)) {
                throw {
                  stack: new Error().stack,
                  code: "D3110",
                  value: timestamp
                };
              }
              return Date.parse(timestamp);
            } else {
              return parseDateTime.call(this, timestamp, picture);
            }
          }
          function fromMillis(millis, picture, timezone) {
            if (typeof millis === "undefined") {
              return void 0;
            }
            return formatDateTime.call(this, millis, picture, timezone);
          }
          return {
            formatInteger,
            parseInteger,
            fromMillis,
            toMillis
          };
        }();
        module4.exports = dateTime;
      }, { "./utils": 6 }], 2: [function(require2, module4, exports4) {
        (function(global2) {
          (function() {
            var utils = require2("./utils");
            const functions = (() => {
              "use strict";
              var isNumeric = utils.isNumeric;
              var isArrayOfStrings = utils.isArrayOfStrings;
              var isArrayOfNumbers = utils.isArrayOfNumbers;
              var createSequence = utils.createSequence;
              var isSequence = utils.isSequence;
              var isFunction = utils.isFunction;
              var isLambda = utils.isLambda;
              var isPromise = utils.isPromise;
              var getFunctionArity = utils.getFunctionArity;
              var deepEquals = utils.isDeepEqual;
              var stringToArray = utils.stringToArray;
              function sum(args) {
                if (typeof args === "undefined") {
                  return void 0;
                }
                var total = 0;
                args.forEach(function(num) {
                  total += num;
                });
                return total;
              }
              function count(args) {
                if (typeof args === "undefined") {
                  return 0;
                }
                return args.length;
              }
              function max(args) {
                if (typeof args === "undefined" || args.length === 0) {
                  return void 0;
                }
                return Math.max.apply(Math, args);
              }
              function min(args) {
                if (typeof args === "undefined" || args.length === 0) {
                  return void 0;
                }
                return Math.min.apply(Math, args);
              }
              function average(args) {
                if (typeof args === "undefined" || args.length === 0) {
                  return void 0;
                }
                var total = 0;
                args.forEach(function(num) {
                  total += num;
                });
                return total / args.length;
              }
              function string(arg, prettify = false) {
                if (typeof arg === "undefined") {
                  return void 0;
                }
                var str;
                if (typeof arg === "string") {
                  str = arg;
                } else if (isFunction(arg)) {
                  str = "";
                } else if (typeof arg === "number" && !isFinite(arg)) {
                  throw {
                    code: "D3001",
                    value: arg,
                    stack: new Error().stack
                  };
                } else {
                  var space = prettify ? 2 : 0;
                  if (Array.isArray(arg) && arg.outerWrapper) {
                    arg = arg[0];
                  }
                  str = JSON.stringify(arg, function(key, val) {
                    return typeof val !== "undefined" && val !== null && val.toPrecision && isNumeric(val) ? Number(val.toPrecision(15)) : val && isFunction(val) ? "" : val;
                  }, space);
                }
                return str;
              }
              function substring(str, start, length2) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var strArray = stringToArray(str);
                var strLength = strArray.length;
                if (strLength + start < 0) {
                  start = 0;
                }
                if (typeof length2 !== "undefined") {
                  if (length2 <= 0) {
                    return "";
                  }
                  var end = start >= 0 ? start + length2 : strLength + start + length2;
                  return strArray.slice(start, end).join("");
                }
                return strArray.slice(start).join("");
              }
              function substringBefore(str, chars) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var pos = str.indexOf(chars);
                if (pos > -1) {
                  return str.substr(0, pos);
                } else {
                  return str;
                }
              }
              function substringAfter(str, chars) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var pos = str.indexOf(chars);
                if (pos > -1) {
                  return str.substr(pos + chars.length);
                } else {
                  return str;
                }
              }
              function lowercase(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                return str.toLowerCase();
              }
              function uppercase(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                return str.toUpperCase();
              }
              function length(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                return stringToArray(str).length;
              }
              function trim(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var result = str.replace(/[ \t\n\r]+/gm, " ");
                if (result.charAt(0) === " ") {
                  result = result.substring(1);
                }
                if (result.charAt(result.length - 1) === " ") {
                  result = result.substring(0, result.length - 1);
                }
                return result;
              }
              function pad(str, width, char) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                if (typeof char === "undefined" || char.length === 0) {
                  char = " ";
                }
                var result;
                var padLength = Math.abs(width) - length(str);
                if (padLength > 0) {
                  var padding = new Array(padLength + 1).join(char);
                  if (char.length > 1) {
                    padding = substring(padding, 0, padLength);
                  }
                  if (width > 0) {
                    result = str + padding;
                  } else {
                    result = padding + str;
                  }
                } else {
                  result = str;
                }
                return result;
              }
              async function evaluateMatcher(matcher, str) {
                var result = matcher.apply(this, [str]);
                if (isPromise(result)) {
                  result = await result;
                }
                if (result && !(typeof result.start === "number" || result.end === "number" || Array.isArray(result.groups) || isFunction(result.next))) {
                  throw {
                    code: "T1010",
                    stack: new Error().stack
                  };
                }
                return result;
              }
              async function contains(str, token) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var result;
                if (typeof token === "string") {
                  result = str.indexOf(token) !== -1;
                } else {
                  var matches = await evaluateMatcher(token, str);
                  result = typeof matches !== "undefined";
                }
                return result;
              }
              async function match(str, regex, limit) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                if (limit < 0) {
                  throw {
                    stack: new Error().stack,
                    value: limit,
                    code: "D3040",
                    index: 3
                  };
                }
                var result = createSequence();
                if (typeof limit === "undefined" || limit > 0) {
                  var count2 = 0;
                  var matches = await evaluateMatcher(regex, str);
                  if (typeof matches !== "undefined") {
                    while (typeof matches !== "undefined" && (typeof limit === "undefined" || count2 < limit)) {
                      result.push({
                        match: matches.match,
                        index: matches.start,
                        groups: matches.groups
                      });
                      matches = await evaluateMatcher(matches.next);
                      count2++;
                    }
                  }
                }
                return result;
              }
              async function replace(str, pattern, replacement, limit) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var self2 = this;
                if (pattern === "") {
                  throw {
                    code: "D3010",
                    stack: new Error().stack,
                    value: pattern,
                    index: 2
                  };
                }
                if (limit < 0) {
                  throw {
                    code: "D3011",
                    stack: new Error().stack,
                    value: limit,
                    index: 4
                  };
                }
                var replacer;
                if (typeof replacement === "string") {
                  replacer = function(regexMatch) {
                    var substitute = "";
                    var position2 = 0;
                    var index2 = replacement.indexOf("$", position2);
                    while (index2 !== -1 && position2 < replacement.length) {
                      substitute += replacement.substring(position2, index2);
                      position2 = index2 + 1;
                      var dollarVal = replacement.charAt(position2);
                      if (dollarVal === "$") {
                        substitute += "$";
                        position2++;
                      } else if (dollarVal === "0") {
                        substitute += regexMatch.match;
                        position2++;
                      } else {
                        var maxDigits;
                        if (regexMatch.groups.length === 0) {
                          maxDigits = 1;
                        } else {
                          maxDigits = Math.floor(Math.log(regexMatch.groups.length) * Math.LOG10E) + 1;
                        }
                        index2 = parseInt(replacement.substring(position2, position2 + maxDigits), 10);
                        if (maxDigits > 1 && index2 > regexMatch.groups.length) {
                          index2 = parseInt(replacement.substring(position2, position2 + maxDigits - 1), 10);
                        }
                        if (!isNaN(index2)) {
                          if (regexMatch.groups.length > 0) {
                            var submatch = regexMatch.groups[index2 - 1];
                            if (typeof submatch !== "undefined") {
                              substitute += submatch;
                            }
                          }
                          position2 += index2.toString().length;
                        } else {
                          substitute += "$";
                        }
                      }
                      index2 = replacement.indexOf("$", position2);
                    }
                    substitute += replacement.substring(position2);
                    return substitute;
                  };
                } else {
                  replacer = replacement;
                }
                var result = "";
                var position = 0;
                if (typeof limit === "undefined" || limit > 0) {
                  var count2 = 0;
                  if (typeof pattern === "string") {
                    var index = str.indexOf(pattern, position);
                    while (index !== -1 && (typeof limit === "undefined" || count2 < limit)) {
                      result += str.substring(position, index);
                      result += replacement;
                      position = index + pattern.length;
                      count2++;
                      index = str.indexOf(pattern, position);
                    }
                    result += str.substring(position);
                  } else {
                    var matches = await evaluateMatcher(pattern, str);
                    if (typeof matches !== "undefined") {
                      while (typeof matches !== "undefined" && (typeof limit === "undefined" || count2 < limit)) {
                        result += str.substring(position, matches.start);
                        var replacedWith = replacer.apply(self2, [matches]);
                        if (isPromise(replacedWith)) {
                          replacedWith = await replacedWith;
                        }
                        if (typeof replacedWith === "string") {
                          result += replacedWith;
                        } else {
                          throw {
                            code: "D3012",
                            stack: new Error().stack,
                            value: replacedWith
                          };
                        }
                        position = matches.start + matches.match.length;
                        count2++;
                        matches = await evaluateMatcher(matches.next);
                      }
                      result += str.substring(position);
                    } else {
                      result = str;
                    }
                  }
                } else {
                  result = str;
                }
                return result;
              }
              function base64encode(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var btoa = typeof window !== "undefined" ? (
                  /* istanbul ignore next */
                  window.btoa
                ) : function(str2) {
                  return new global2.Buffer.from(str2, "binary").toString("base64");
                };
                return btoa(str);
              }
              function base64decode(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var atob = typeof window !== "undefined" ? (
                  /* istanbul ignore next */
                  window.atob
                ) : function(str2) {
                  return new global2.Buffer.from(str2, "base64").toString("binary");
                };
                return atob(str);
              }
              function encodeUrlComponent(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var returnVal;
                try {
                  returnVal = encodeURIComponent(str);
                } catch (e) {
                  throw {
                    code: "D3140",
                    stack: new Error().stack,
                    value: str,
                    functionName: "encodeUrlComponent"
                  };
                }
                return returnVal;
              }
              function encodeUrl(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var returnVal;
                try {
                  returnVal = encodeURI(str);
                } catch (e) {
                  throw {
                    code: "D3140",
                    stack: new Error().stack,
                    value: str,
                    functionName: "encodeUrl"
                  };
                }
                return returnVal;
              }
              function decodeUrlComponent(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var returnVal;
                try {
                  returnVal = decodeURIComponent(str);
                } catch (e) {
                  throw {
                    code: "D3140",
                    stack: new Error().stack,
                    value: str,
                    functionName: "decodeUrlComponent"
                  };
                }
                return returnVal;
              }
              function decodeUrl(str) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                var returnVal;
                try {
                  returnVal = decodeURI(str);
                } catch (e) {
                  throw {
                    code: "D3140",
                    stack: new Error().stack,
                    value: str,
                    functionName: "decodeUrl"
                  };
                }
                return returnVal;
              }
              async function split(str, separator, limit) {
                if (typeof str === "undefined") {
                  return void 0;
                }
                if (limit < 0) {
                  throw {
                    code: "D3020",
                    stack: new Error().stack,
                    value: limit,
                    index: 3
                  };
                }
                var result = [];
                if (typeof limit === "undefined" || limit > 0) {
                  if (typeof separator === "string") {
                    result = str.split(separator, limit);
                  } else {
                    var count2 = 0;
                    var matches = await evaluateMatcher(separator, str);
                    if (typeof matches !== "undefined") {
                      var start = 0;
                      while (typeof matches !== "undefined" && (typeof limit === "undefined" || count2 < limit)) {
                        result.push(str.substring(start, matches.start));
                        start = matches.end;
                        matches = await evaluateMatcher(matches.next);
                        count2++;
                      }
                      if (typeof limit === "undefined" || count2 < limit) {
                        result.push(str.substring(start));
                      }
                    } else {
                      result.push(str);
                    }
                  }
                }
                return result;
              }
              function join(strs, separator) {
                if (typeof strs === "undefined") {
                  return void 0;
                }
                if (typeof separator === "undefined") {
                  separator = "";
                }
                return strs.join(separator);
              }
              function formatNumber(value, picture, options) {
                if (typeof value === "undefined") {
                  return void 0;
                }
                var defaults = {
                  "decimal-separator": ".",
                  "grouping-separator": ",",
                  "exponent-separator": "e",
                  "infinity": "Infinity",
                  "minus-sign": "-",
                  "NaN": "NaN",
                  "percent": "%",
                  "per-mille": "\u2030",
                  "zero-digit": "0",
                  "digit": "#",
                  "pattern-separator": ";"
                };
                var properties = defaults;
                if (typeof options !== "undefined") {
                  Object.keys(options).forEach(function(key) {
                    properties[key] = options[key];
                  });
                }
                var decimalDigitFamily = [];
                var zeroCharCode = properties["zero-digit"].charCodeAt(0);
                for (var ii = zeroCharCode; ii < zeroCharCode + 10; ii++) {
                  decimalDigitFamily.push(String.fromCharCode(ii));
                }
                var activeChars = decimalDigitFamily.concat([properties["decimal-separator"], properties["exponent-separator"], properties["grouping-separator"], properties.digit, properties["pattern-separator"]]);
                var subPictures = picture.split(properties["pattern-separator"]);
                if (subPictures.length > 2) {
                  throw {
                    code: "D3080",
                    stack: new Error().stack
                  };
                }
                var splitParts = function(subpicture) {
                  var prefix = function() {
                    var ch;
                    for (var ii2 = 0; ii2 < subpicture.length; ii2++) {
                      ch = subpicture.charAt(ii2);
                      if (activeChars.indexOf(ch) !== -1 && ch !== properties["exponent-separator"]) {
                        return subpicture.substring(0, ii2);
                      }
                    }
                  }();
                  var suffix = function() {
                    var ch;
                    for (var ii2 = subpicture.length - 1; ii2 >= 0; ii2--) {
                      ch = subpicture.charAt(ii2);
                      if (activeChars.indexOf(ch) !== -1 && ch !== properties["exponent-separator"]) {
                        return subpicture.substring(ii2 + 1);
                      }
                    }
                  }();
                  var activePart = subpicture.substring(prefix.length, subpicture.length - suffix.length);
                  var mantissaPart, exponentPart, integerPart, fractionalPart;
                  var exponentPosition = subpicture.indexOf(properties["exponent-separator"], prefix.length);
                  if (exponentPosition === -1 || exponentPosition > subpicture.length - suffix.length) {
                    mantissaPart = activePart;
                    exponentPart = void 0;
                  } else {
                    mantissaPart = activePart.substring(0, exponentPosition);
                    exponentPart = activePart.substring(exponentPosition + 1);
                  }
                  var decimalPosition = mantissaPart.indexOf(properties["decimal-separator"]);
                  if (decimalPosition === -1) {
                    integerPart = mantissaPart;
                    fractionalPart = suffix;
                  } else {
                    integerPart = mantissaPart.substring(0, decimalPosition);
                    fractionalPart = mantissaPart.substring(decimalPosition + 1);
                  }
                  return {
                    prefix,
                    suffix,
                    activePart,
                    mantissaPart,
                    exponentPart,
                    integerPart,
                    fractionalPart,
                    subpicture
                  };
                };
                var validate = function(parts2) {
                  var error2;
                  var ii2;
                  var subpicture = parts2.subpicture;
                  var decimalPos2 = subpicture.indexOf(properties["decimal-separator"]);
                  if (decimalPos2 !== subpicture.lastIndexOf(properties["decimal-separator"])) {
                    error2 = "D3081";
                  }
                  if (subpicture.indexOf(properties.percent) !== subpicture.lastIndexOf(properties.percent)) {
                    error2 = "D3082";
                  }
                  if (subpicture.indexOf(properties["per-mille"]) !== subpicture.lastIndexOf(properties["per-mille"])) {
                    error2 = "D3083";
                  }
                  if (subpicture.indexOf(properties.percent) !== -1 && subpicture.indexOf(properties["per-mille"]) !== -1) {
                    error2 = "D3084";
                  }
                  var valid = false;
                  for (ii2 = 0; ii2 < parts2.mantissaPart.length; ii2++) {
                    var ch = parts2.mantissaPart.charAt(ii2);
                    if (decimalDigitFamily.indexOf(ch) !== -1 || ch === properties.digit) {
                      valid = true;
                      break;
                    }
                  }
                  if (!valid) {
                    error2 = "D3085";
                  }
                  var charTypes = parts2.activePart.split("").map(function(char) {
                    return activeChars.indexOf(char) === -1 ? "p" : "a";
                  }).join("");
                  if (charTypes.indexOf("p") !== -1) {
                    error2 = "D3086";
                  }
                  if (decimalPos2 !== -1) {
                    if (subpicture.charAt(decimalPos2 - 1) === properties["grouping-separator"] || subpicture.charAt(decimalPos2 + 1) === properties["grouping-separator"]) {
                      error2 = "D3087";
                    }
                  } else if (parts2.integerPart.charAt(parts2.integerPart.length - 1) === properties["grouping-separator"]) {
                    error2 = "D3088";
                  }
                  if (subpicture.indexOf(properties["grouping-separator"] + properties["grouping-separator"]) !== -1) {
                    error2 = "D3089";
                  }
                  var optionalDigitPos = parts2.integerPart.indexOf(properties.digit);
                  if (optionalDigitPos !== -1 && parts2.integerPart.substring(0, optionalDigitPos).split("").filter(function(char) {
                    return decimalDigitFamily.indexOf(char) > -1;
                  }).length > 0) {
                    error2 = "D3090";
                  }
                  optionalDigitPos = parts2.fractionalPart.lastIndexOf(properties.digit);
                  if (optionalDigitPos !== -1 && parts2.fractionalPart.substring(optionalDigitPos).split("").filter(function(char) {
                    return decimalDigitFamily.indexOf(char) > -1;
                  }).length > 0) {
                    error2 = "D3091";
                  }
                  var exponentExists = typeof parts2.exponentPart === "string";
                  if (exponentExists && parts2.exponentPart.length > 0 && (subpicture.indexOf(properties.percent) !== -1 || subpicture.indexOf(properties["per-mille"]) !== -1)) {
                    error2 = "D3092";
                  }
                  if (exponentExists && (parts2.exponentPart.length === 0 || parts2.exponentPart.split("").filter(function(char) {
                    return decimalDigitFamily.indexOf(char) === -1;
                  }).length > 0)) {
                    error2 = "D3093";
                  }
                  if (error2) {
                    throw {
                      code: error2,
                      stack: new Error().stack
                    };
                  }
                };
                var analyse = function(parts2) {
                  var getGroupingPositions = function(part, toLeft) {
                    var positions = [];
                    var groupingPosition = part.indexOf(properties["grouping-separator"]);
                    while (groupingPosition !== -1) {
                      var charsToTheRight = (toLeft ? part.substring(0, groupingPosition) : part.substring(groupingPosition)).split("").filter(function(char) {
                        return decimalDigitFamily.indexOf(char) !== -1 || char === properties.digit;
                      }).length;
                      positions.push(charsToTheRight);
                      groupingPosition = parts2.integerPart.indexOf(properties["grouping-separator"], groupingPosition + 1);
                    }
                    return positions;
                  };
                  var integerPartGroupingPositions = getGroupingPositions(parts2.integerPart);
                  var regular = function(indexes) {
                    if (indexes.length === 0) {
                      return 0;
                    }
                    var gcd = function(a, b) {
                      return b === 0 ? a : gcd(b, a % b);
                    };
                    var factor = indexes.reduce(gcd);
                    for (var index = 1; index <= indexes.length; index++) {
                      if (indexes.indexOf(index * factor) === -1) {
                        return 0;
                      }
                    }
                    return factor;
                  };
                  var regularGrouping = regular(integerPartGroupingPositions);
                  var fractionalPartGroupingPositions = getGroupingPositions(parts2.fractionalPart, true);
                  var minimumIntegerPartSize = parts2.integerPart.split("").filter(function(char) {
                    return decimalDigitFamily.indexOf(char) !== -1;
                  }).length;
                  var scalingFactor = minimumIntegerPartSize;
                  var fractionalPartArray = parts2.fractionalPart.split("");
                  var minimumFactionalPartSize = fractionalPartArray.filter(function(char) {
                    return decimalDigitFamily.indexOf(char) !== -1;
                  }).length;
                  var maximumFactionalPartSize = fractionalPartArray.filter(function(char) {
                    return decimalDigitFamily.indexOf(char) !== -1 || char === properties.digit;
                  }).length;
                  var exponentPresent = typeof parts2.exponentPart === "string";
                  if (minimumIntegerPartSize === 0 && maximumFactionalPartSize === 0) {
                    if (exponentPresent) {
                      minimumFactionalPartSize = 1;
                      maximumFactionalPartSize = 1;
                    } else {
                      minimumIntegerPartSize = 1;
                    }
                  }
                  if (exponentPresent && minimumIntegerPartSize === 0 && parts2.integerPart.indexOf(properties.digit) !== -1) {
                    minimumIntegerPartSize = 1;
                  }
                  if (minimumIntegerPartSize === 0 && minimumFactionalPartSize === 0) {
                    minimumFactionalPartSize = 1;
                  }
                  var minimumExponentSize = 0;
                  if (exponentPresent) {
                    minimumExponentSize = parts2.exponentPart.split("").filter(function(char) {
                      return decimalDigitFamily.indexOf(char) !== -1;
                    }).length;
                  }
                  return {
                    integerPartGroupingPositions,
                    regularGrouping,
                    minimumIntegerPartSize,
                    scalingFactor,
                    prefix: parts2.prefix,
                    fractionalPartGroupingPositions,
                    minimumFactionalPartSize,
                    maximumFactionalPartSize,
                    minimumExponentSize,
                    suffix: parts2.suffix,
                    picture: parts2.subpicture
                  };
                };
                var parts = subPictures.map(splitParts);
                parts.forEach(validate);
                var variables = parts.map(analyse);
                var minus_sign = properties["minus-sign"];
                var zero_digit = properties["zero-digit"];
                var decimal_separator = properties["decimal-separator"];
                var grouping_separator = properties["grouping-separator"];
                if (variables.length === 1) {
                  variables.push(JSON.parse(JSON.stringify(variables[0])));
                  variables[1].prefix = minus_sign + variables[1].prefix;
                }
                var pic;
                if (value >= 0) {
                  pic = variables[0];
                } else {
                  pic = variables[1];
                }
                var adjustedNumber;
                if (pic.picture.indexOf(properties.percent) !== -1) {
                  adjustedNumber = value * 100;
                } else if (pic.picture.indexOf(properties["per-mille"]) !== -1) {
                  adjustedNumber = value * 1e3;
                } else {
                  adjustedNumber = value;
                }
                var mantissa, exponent;
                if (pic.minimumExponentSize === 0) {
                  mantissa = adjustedNumber;
                } else {
                  var maxMantissa = Math.pow(10, pic.scalingFactor);
                  var minMantissa = Math.pow(10, pic.scalingFactor - 1);
                  mantissa = adjustedNumber;
                  exponent = 0;
                  while (mantissa < minMantissa) {
                    mantissa *= 10;
                    exponent -= 1;
                  }
                  while (mantissa > maxMantissa) {
                    mantissa /= 10;
                    exponent += 1;
                  }
                }
                var roundedNumber = round(mantissa, pic.maximumFactionalPartSize);
                var makeString = function(value2, dp) {
                  var str = Math.abs(value2).toFixed(dp);
                  if (zero_digit !== "0") {
                    str = str.split("").map(function(digit) {
                      if (digit >= "0" && digit <= "9") {
                        return decimalDigitFamily[digit.charCodeAt(0) - 48];
                      } else {
                        return digit;
                      }
                    }).join("");
                  }
                  return str;
                };
                var stringValue = makeString(roundedNumber, pic.maximumFactionalPartSize);
                var decimalPos = stringValue.indexOf(".");
                if (decimalPos === -1) {
                  stringValue = stringValue + decimal_separator;
                } else {
                  stringValue = stringValue.replace(".", decimal_separator);
                }
                while (stringValue.charAt(0) === zero_digit) {
                  stringValue = stringValue.substring(1);
                }
                while (stringValue.charAt(stringValue.length - 1) === zero_digit) {
                  stringValue = stringValue.substring(0, stringValue.length - 1);
                }
                decimalPos = stringValue.indexOf(decimal_separator);
                var padLeft = pic.minimumIntegerPartSize - decimalPos;
                var padRight = pic.minimumFactionalPartSize - (stringValue.length - decimalPos - 1);
                stringValue = (padLeft > 0 ? new Array(padLeft + 1).join(zero_digit) : "") + stringValue;
                stringValue = stringValue + (padRight > 0 ? new Array(padRight + 1).join(zero_digit) : "");
                decimalPos = stringValue.indexOf(decimal_separator);
                if (pic.regularGrouping > 0) {
                  var groupCount = Math.floor((decimalPos - 1) / pic.regularGrouping);
                  for (var group = 1; group <= groupCount; group++) {
                    stringValue = [stringValue.slice(0, decimalPos - group * pic.regularGrouping), grouping_separator, stringValue.slice(decimalPos - group * pic.regularGrouping)].join("");
                  }
                } else {
                  pic.integerPartGroupingPositions.forEach(function(pos) {
                    stringValue = [stringValue.slice(0, decimalPos - pos), grouping_separator, stringValue.slice(decimalPos - pos)].join("");
                    decimalPos++;
                  });
                }
                decimalPos = stringValue.indexOf(decimal_separator);
                pic.fractionalPartGroupingPositions.forEach(function(pos) {
                  stringValue = [stringValue.slice(0, pos + decimalPos + 1), grouping_separator, stringValue.slice(pos + decimalPos + 1)].join("");
                });
                decimalPos = stringValue.indexOf(decimal_separator);
                if (pic.picture.indexOf(decimal_separator) === -1 || decimalPos === stringValue.length - 1) {
                  stringValue = stringValue.substring(0, stringValue.length - 1);
                }
                if (typeof exponent !== "undefined") {
                  var stringExponent = makeString(exponent, 0);
                  padLeft = pic.minimumExponentSize - stringExponent.length;
                  if (padLeft > 0) {
                    stringExponent = new Array(padLeft + 1).join(zero_digit) + stringExponent;
                  }
                  stringValue = stringValue + properties["exponent-separator"] + (exponent < 0 ? minus_sign : "") + stringExponent;
                }
                stringValue = pic.prefix + stringValue + pic.suffix;
                return stringValue;
              }
              function formatBase(value, radix) {
                if (typeof value === "undefined") {
                  return void 0;
                }
                value = round(value);
                if (typeof radix === "undefined") {
                  radix = 10;
                } else {
                  radix = round(radix);
                }
                if (radix < 2 || radix > 36) {
                  throw {
                    code: "D3100",
                    stack: new Error().stack,
                    value: radix
                  };
                }
                var result = value.toString(radix);
                return result;
              }
              function number(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                if (typeof arg === "number") {
                  result = arg;
                } else if (typeof arg === "string" && /^-?[0-9]+(\.[0-9]+)?([Ee][-+]?[0-9]+)?$/.test(arg) && !isNaN(parseFloat(arg)) && isFinite(arg)) {
                  result = parseFloat(arg);
                } else if (typeof arg === "string" && /^(0[xX][0-9A-Fa-f]+)|(0[oO][0-7]+)|(0[bB][0-1]+)$/.test(arg)) {
                  result = Number(arg);
                } else if (arg === true) {
                  result = 1;
                } else if (arg === false) {
                  result = 0;
                } else {
                  throw {
                    code: "D3030",
                    value: arg,
                    stack: new Error().stack,
                    index: 1
                  };
                }
                return result;
              }
              function abs(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                result = Math.abs(arg);
                return result;
              }
              function floor(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                result = Math.floor(arg);
                return result;
              }
              function ceil(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                result = Math.ceil(arg);
                return result;
              }
              function round(arg, precision) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                if (precision) {
                  var value = arg.toString().split("e");
                  arg = +(value[0] + "e" + (value[1] ? +value[1] + precision : precision));
                }
                result = Math.round(arg);
                var diff = result - arg;
                if (Math.abs(diff) === 0.5 && Math.abs(result % 2) === 1) {
                  result = result - 1;
                }
                if (precision) {
                  value = result.toString().split("e");
                  result = +(value[0] + "e" + (value[1] ? +value[1] - precision : -precision));
                }
                if (Object.is(result, -0)) {
                  result = 0;
                }
                return result;
              }
              function sqrt(arg) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                if (arg < 0) {
                  throw {
                    stack: new Error().stack,
                    code: "D3060",
                    index: 1,
                    value: arg
                  };
                }
                result = Math.sqrt(arg);
                return result;
              }
              function power(arg, exp) {
                var result;
                if (typeof arg === "undefined") {
                  return void 0;
                }
                result = Math.pow(arg, exp);
                if (!isFinite(result)) {
                  throw {
                    stack: new Error().stack,
                    code: "D3061",
                    index: 1,
                    value: arg,
                    exp
                  };
                }
                return result;
              }
              function random() {
                return Math.random();
              }
              function boolean(arg) {
                if (typeof arg === "undefined") {
                  return void 0;
                }
                var result = false;
                if (Array.isArray(arg)) {
                  if (arg.length === 1) {
                    result = boolean(arg[0]);
                  } else if (arg.length > 1) {
                    var trues = arg.filter(function(val) {
                      return boolean(val);
                    });
                    result = trues.length > 0;
                  }
                } else if (typeof arg === "string") {
                  if (arg.length > 0) {
                    result = true;
                  }
                } else if (isNumeric(arg)) {
                  if (arg !== 0) {
                    result = true;
                  }
                } else if (arg !== null && typeof arg === "object") {
                  if (Object.keys(arg).length > 0) {
                    result = true;
                  }
                } else if (typeof arg === "boolean" && arg === true) {
                  result = true;
                }
                return result;
              }
              function not(arg) {
                if (typeof arg === "undefined") {
                  return void 0;
                }
                return !boolean(arg);
              }
              function hofFuncArgs(func, arg1, arg2, arg3) {
                var func_args = [arg1];
                var length2 = getFunctionArity(func);
                if (length2 >= 2) {
                  func_args.push(arg2);
                }
                if (length2 >= 3) {
                  func_args.push(arg3);
                }
                return func_args;
              }
              async function map(arr, func) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                var result = createSequence();
                for (var i = 0; i < arr.length; i++) {
                  var func_args = hofFuncArgs(func, arr[i], i, arr);
                  var res = await func.apply(this, func_args);
                  if (typeof res !== "undefined") {
                    result.push(res);
                  }
                }
                return result;
              }
              async function filter(arr, func) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                var result = createSequence();
                for (var i = 0; i < arr.length; i++) {
                  var entry = arr[i];
                  var func_args = hofFuncArgs(func, entry, i, arr);
                  var res = await func.apply(this, func_args);
                  if (boolean(res)) {
                    result.push(entry);
                  }
                }
                return result;
              }
              async function single(arr, func) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                var hasFoundMatch = false;
                var result;
                for (var i = 0; i < arr.length; i++) {
                  var entry = arr[i];
                  var positiveResult = true;
                  if (typeof func !== "undefined") {
                    var func_args = hofFuncArgs(func, entry, i, arr);
                    var res = await func.apply(this, func_args);
                    positiveResult = boolean(res);
                  }
                  if (positiveResult) {
                    if (!hasFoundMatch) {
                      result = entry;
                      hasFoundMatch = true;
                    } else {
                      throw {
                        stack: new Error().stack,
                        code: "D3138",
                        index: i
                      };
                    }
                  }
                }
                if (!hasFoundMatch) {
                  throw {
                    stack: new Error().stack,
                    code: "D3139"
                  };
                }
                return result;
              }
              function zip() {
                var result = [];
                var args = Array.prototype.slice.call(arguments);
                var length2 = Math.min.apply(Math, args.map(function(arg) {
                  if (Array.isArray(arg)) {
                    return arg.length;
                  }
                  return 0;
                }));
                for (var i = 0; i < length2; i++) {
                  var tuple = args.map((arg) => {
                    return arg[i];
                  });
                  result.push(tuple);
                }
                return result;
              }
              async function foldLeft(sequence, func, init) {
                if (typeof sequence === "undefined") {
                  return void 0;
                }
                var result;
                var arity = getFunctionArity(func);
                if (arity < 2) {
                  throw {
                    stack: new Error().stack,
                    code: "D3050",
                    index: 1
                  };
                }
                var index;
                if (typeof init === "undefined" && sequence.length > 0) {
                  result = sequence[0];
                  index = 1;
                } else {
                  result = init;
                  index = 0;
                }
                while (index < sequence.length) {
                  var args = [result, sequence[index]];
                  if (arity >= 3) {
                    args.push(index);
                  }
                  if (arity >= 4) {
                    args.push(sequence);
                  }
                  result = await func.apply(this, args);
                  index++;
                }
                return result;
              }
              function keys(arg) {
                var result = createSequence();
                if (Array.isArray(arg)) {
                  var merge2 = {};
                  arg.forEach(function(item) {
                    var allkeys = keys(item);
                    allkeys.forEach(function(key) {
                      merge2[key] = true;
                    });
                  });
                  result = keys(merge2);
                } else if (arg !== null && typeof arg === "object" && !isFunction(arg)) {
                  Object.keys(arg).forEach((key) => result.push(key));
                }
                return result;
              }
              function lookup(input, key) {
                var result;
                if (Array.isArray(input)) {
                  result = createSequence();
                  for (var ii = 0; ii < input.length; ii++) {
                    var res = lookup(input[ii], key);
                    if (typeof res !== "undefined") {
                      if (Array.isArray(res)) {
                        res.forEach((val) => result.push(val));
                      } else {
                        result.push(res);
                      }
                    }
                  }
                } else if (input !== null && typeof input === "object" && !isFunction(input)) {
                  result = input[key];
                }
                return result;
              }
              function append(arg1, arg2) {
                if (typeof arg1 === "undefined") {
                  return arg2;
                }
                if (typeof arg2 === "undefined") {
                  return arg1;
                }
                if (!Array.isArray(arg1)) {
                  arg1 = createSequence(arg1);
                }
                if (!Array.isArray(arg2)) {
                  arg2 = [arg2];
                }
                return arg1.concat(arg2);
              }
              function exists(arg) {
                if (typeof arg === "undefined") {
                  return false;
                } else {
                  return true;
                }
              }
              function spread(arg) {
                var result = createSequence();
                if (Array.isArray(arg)) {
                  arg.forEach(function(item) {
                    result = append(result, spread(item));
                  });
                } else if (arg !== null && typeof arg === "object" && !isLambda(arg)) {
                  for (var key in arg) {
                    var obj = {};
                    obj[key] = arg[key];
                    result.push(obj);
                  }
                } else {
                  result = arg;
                }
                return result;
              }
              function merge(arg) {
                if (typeof arg === "undefined") {
                  return void 0;
                }
                var result = {};
                arg.forEach(function(obj) {
                  for (var prop in obj) {
                    result[prop] = obj[prop];
                  }
                });
                return result;
              }
              function reverse(arr) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                if (arr.length <= 1) {
                  return arr;
                }
                var length2 = arr.length;
                var result = new Array(length2);
                for (var i = 0; i < length2; i++) {
                  result[length2 - i - 1] = arr[i];
                }
                return result;
              }
              async function each(obj, func) {
                var result = createSequence();
                for (var key in obj) {
                  var func_args = hofFuncArgs(func, obj[key], key, obj);
                  var val = await func.apply(this, func_args);
                  if (typeof val !== "undefined") {
                    result.push(val);
                  }
                }
                return result;
              }
              function error(message) {
                throw {
                  code: "D3137",
                  stack: new Error().stack,
                  message: message || "$error() function evaluated"
                };
              }
              function assert(condition, message) {
                if (!condition) {
                  throw {
                    code: "D3141",
                    stack: new Error().stack,
                    message: message || "$assert() statement failed"
                  };
                }
                return void 0;
              }
              function type(value) {
                if (value === void 0) {
                  return void 0;
                }
                if (value === null) {
                  return "null";
                }
                if (isNumeric(value)) {
                  return "number";
                }
                if (typeof value === "string") {
                  return "string";
                }
                if (typeof value === "boolean") {
                  return "boolean";
                }
                if (Array.isArray(value)) {
                  return "array";
                }
                if (isFunction(value)) {
                  return "function";
                }
                return "object";
              }
              async function sort(arr, comparator) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                if (arr.length <= 1) {
                  return arr;
                }
                var comp;
                if (typeof comparator === "undefined") {
                  if (!isArrayOfNumbers(arr) && !isArrayOfStrings(arr)) {
                    throw {
                      stack: new Error().stack,
                      code: "D3070",
                      index: 1
                    };
                  }
                  comp = async function(a, b) {
                    return a > b;
                  };
                } else {
                  comp = comparator;
                }
                var merge2 = async function(l, r) {
                  var merge_iter = async function(result2, left, right) {
                    if (left.length === 0) {
                      Array.prototype.push.apply(result2, right);
                    } else if (right.length === 0) {
                      Array.prototype.push.apply(result2, left);
                    } else if (await comp(left[0], right[0])) {
                      result2.push(right[0]);
                      await merge_iter(result2, left, right.slice(1));
                    } else {
                      result2.push(left[0]);
                      await merge_iter(result2, left.slice(1), right);
                    }
                  };
                  var merged = [];
                  await merge_iter(merged, l, r);
                  return merged;
                };
                var msort = async function(array) {
                  if (!Array.isArray(array) || array.length <= 1) {
                    return array;
                  } else {
                    var middle = Math.floor(array.length / 2);
                    var left = array.slice(0, middle);
                    var right = array.slice(middle);
                    left = await msort(left);
                    right = await msort(right);
                    return await merge2(left, right);
                  }
                };
                var result = await msort(arr);
                return result;
              }
              function shuffle(arr) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                if (arr.length <= 1) {
                  return arr;
                }
                var result = new Array(arr.length);
                for (var i = 0; i < arr.length; i++) {
                  var j = Math.floor(Math.random() * (i + 1));
                  if (i !== j) {
                    result[i] = result[j];
                  }
                  result[j] = arr[i];
                }
                return result;
              }
              function distinct(arr) {
                if (typeof arr === "undefined") {
                  return void 0;
                }
                if (!Array.isArray(arr) || arr.length <= 1) {
                  return arr;
                }
                var results = isSequence(arr) ? createSequence() : [];
                for (var ii = 0; ii < arr.length; ii++) {
                  var value = arr[ii];
                  var includes = false;
                  for (var jj = 0; jj < results.length; jj++) {
                    if (deepEquals(value, results[jj])) {
                      includes = true;
                      break;
                    }
                  }
                  if (!includes) {
                    results.push(value);
                  }
                }
                return results;
              }
              async function sift(arg, func) {
                var result = {};
                for (var item in arg) {
                  var entry = arg[item];
                  var func_args = hofFuncArgs(func, entry, item, arg);
                  var res = await func.apply(this, func_args);
                  if (boolean(res)) {
                    result[item] = entry;
                  }
                }
                if (Object.keys(result).length === 0) {
                  result = void 0;
                }
                return result;
              }
              return {
                sum,
                count,
                max,
                min,
                average,
                string,
                substring,
                substringBefore,
                substringAfter,
                lowercase,
                uppercase,
                length,
                trim,
                pad,
                match,
                contains,
                replace,
                split,
                join,
                formatNumber,
                formatBase,
                number,
                floor,
                ceil,
                round,
                abs,
                sqrt,
                power,
                random,
                boolean,
                not,
                map,
                zip,
                filter,
                single,
                foldLeft,
                sift,
                keys,
                lookup,
                append,
                exists,
                spread,
                merge,
                reverse,
                each,
                error,
                assert,
                type,
                sort,
                shuffle,
                distinct,
                base64encode,
                base64decode,
                encodeUrlComponent,
                encodeUrl,
                decodeUrlComponent,
                decodeUrl
              };
            })();
            module4.exports = functions;
          }).call(this);
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "./utils": 6 }], 3: [function(require2, module4, exports4) {
        var datetime = require2("./datetime");
        var fn = require2("./functions");
        var utils = require2("./utils");
        var parser = require2("./parser");
        var parseSignature = require2("./signature");
        var jsonata2 = function() {
          "use strict";
          var isNumeric = utils.isNumeric;
          var isArrayOfStrings = utils.isArrayOfStrings;
          var isArrayOfNumbers = utils.isArrayOfNumbers;
          var createSequence = utils.createSequence;
          var isSequence = utils.isSequence;
          var isFunction = utils.isFunction;
          var isLambda = utils.isLambda;
          var isIterable = utils.isIterable;
          var isPromise = utils.isPromise;
          var getFunctionArity = utils.getFunctionArity;
          var isDeepEqual = utils.isDeepEqual;
          var staticFrame = createFrame(null);
          async function evaluate(expr, input, environment) {
            var result;
            var entryCallback = environment.lookup("__evaluate_entry");
            if (entryCallback) {
              await entryCallback(expr, input, environment);
            }
            switch (expr.type) {
              case "path":
                result = await evaluatePath(expr, input, environment);
                break;
              case "binary":
                result = await evaluateBinary(expr, input, environment);
                break;
              case "unary":
                result = await evaluateUnary(expr, input, environment);
                break;
              case "name":
                result = evaluateName(expr, input, environment);
                break;
              case "string":
              case "number":
              case "value":
                result = evaluateLiteral(expr, input, environment);
                break;
              case "wildcard":
                result = evaluateWildcard(expr, input, environment);
                break;
              case "descendant":
                result = evaluateDescendants(expr, input, environment);
                break;
              case "parent":
                result = environment.lookup(expr.slot.label);
                break;
              case "condition":
                result = await evaluateCondition(expr, input, environment);
                break;
              case "block":
                result = await evaluateBlock(expr, input, environment);
                break;
              case "bind":
                result = await evaluateBindExpression(expr, input, environment);
                break;
              case "regex":
                result = evaluateRegex(expr, input, environment);
                break;
              case "function":
                result = await evaluateFunction(expr, input, environment);
                break;
              case "variable":
                result = evaluateVariable(expr, input, environment);
                break;
              case "lambda":
                result = evaluateLambda(expr, input, environment);
                break;
              case "partial":
                result = await evaluatePartialApplication(expr, input, environment);
                break;
              case "apply":
                result = await evaluateApplyExpression(expr, input, environment);
                break;
              case "transform":
                result = evaluateTransformExpression(expr, input, environment);
                break;
            }
            if (Object.prototype.hasOwnProperty.call(expr, "predicate")) {
              for (var ii = 0; ii < expr.predicate.length; ii++) {
                result = await evaluateFilter(expr.predicate[ii].expr, result, environment);
              }
            }
            if (expr.type !== "path" && Object.prototype.hasOwnProperty.call(expr, "group")) {
              result = await evaluateGroupExpression(expr.group, result, environment);
            }
            var exitCallback = environment.lookup("__evaluate_exit");
            if (exitCallback) {
              await exitCallback(expr, input, environment, result);
            }
            if (result && isSequence(result) && !result.tupleStream) {
              if (expr.keepArray) {
                result.keepSingleton = true;
              }
              if (result.length === 0) {
                result = void 0;
              } else if (result.length === 1) {
                result = result.keepSingleton ? result : result[0];
              }
            }
            return result;
          }
          async function evaluatePath(expr, input, environment) {
            var inputSequence;
            if (Array.isArray(input) && expr.steps[0].type !== "variable") {
              inputSequence = input;
            } else {
              inputSequence = createSequence(input);
            }
            var resultSequence;
            var isTupleStream = false;
            var tupleBindings = void 0;
            for (var ii = 0; ii < expr.steps.length; ii++) {
              var step = expr.steps[ii];
              if (step.tuple) {
                isTupleStream = true;
              }
              if (ii === 0 && step.consarray) {
                resultSequence = await evaluate(step, inputSequence, environment);
              } else {
                if (isTupleStream) {
                  tupleBindings = await evaluateTupleStep(step, inputSequence, tupleBindings, environment);
                } else {
                  resultSequence = await evaluateStep(step, inputSequence, environment, ii === expr.steps.length - 1);
                }
              }
              if (!isTupleStream && (typeof resultSequence === "undefined" || resultSequence.length === 0)) {
                break;
              }
              if (typeof step.focus === "undefined") {
                inputSequence = resultSequence;
              }
            }
            if (isTupleStream) {
              if (expr.tuple) {
                resultSequence = tupleBindings;
              } else {
                resultSequence = createSequence();
                for (ii = 0; ii < tupleBindings.length; ii++) {
                  resultSequence.push(tupleBindings[ii]["@"]);
                }
              }
            }
            if (expr.keepSingletonArray) {
              if (Array.isArray(resultSequence) && resultSequence.cons && !resultSequence.sequence) {
                resultSequence = createSequence(resultSequence);
              }
              resultSequence.keepSingleton = true;
            }
            if (expr.hasOwnProperty("group")) {
              resultSequence = await evaluateGroupExpression(expr.group, isTupleStream ? tupleBindings : resultSequence, environment);
            }
            return resultSequence;
          }
          function createFrameFromTuple(environment, tuple) {
            var frame = createFrame(environment);
            for (const prop in tuple) {
              frame.bind(prop, tuple[prop]);
            }
            return frame;
          }
          async function evaluateStep(expr, input, environment, lastStep) {
            var result;
            if (expr.type === "sort") {
              result = await evaluateSortExpression(expr, input, environment);
              if (expr.stages) {
                result = await evaluateStages(expr.stages, result, environment);
              }
              return result;
            }
            result = createSequence();
            for (var ii = 0; ii < input.length; ii++) {
              var res = await evaluate(expr, input[ii], environment);
              if (expr.stages) {
                for (var ss = 0; ss < expr.stages.length; ss++) {
                  res = await evaluateFilter(expr.stages[ss].expr, res, environment);
                }
              }
              if (typeof res !== "undefined") {
                result.push(res);
              }
            }
            var resultSequence = createSequence();
            if (lastStep && result.length === 1 && Array.isArray(result[0]) && !isSequence(result[0])) {
              resultSequence = result[0];
            } else {
              result.forEach(function(res2) {
                if (!Array.isArray(res2) || res2.cons) {
                  resultSequence.push(res2);
                } else {
                  res2.forEach((val) => resultSequence.push(val));
                }
              });
            }
            return resultSequence;
          }
          async function evaluateStages(stages, input, environment) {
            var result = input;
            for (var ss = 0; ss < stages.length; ss++) {
              var stage = stages[ss];
              switch (stage.type) {
                case "filter":
                  result = await evaluateFilter(stage.expr, result, environment);
                  break;
                case "index":
                  for (var ee = 0; ee < result.length; ee++) {
                    var tuple = result[ee];
                    tuple[stage.value] = ee;
                  }
                  break;
              }
            }
            return result;
          }
          async function evaluateTupleStep(expr, input, tupleBindings, environment) {
            var result;
            if (expr.type === "sort") {
              if (tupleBindings) {
                result = await evaluateSortExpression(expr, tupleBindings, environment);
              } else {
                var sorted = await evaluateSortExpression(expr, input, environment);
                result = createSequence();
                result.tupleStream = true;
                for (var ss = 0; ss < sorted.length; ss++) {
                  var tuple = { "@": sorted[ss] };
                  tuple[expr.index] = ss;
                  result.push(tuple);
                }
              }
              if (expr.stages) {
                result = await evaluateStages(expr.stages, result, environment);
              }
              return result;
            }
            result = createSequence();
            result.tupleStream = true;
            var stepEnv = environment;
            if (tupleBindings === void 0) {
              tupleBindings = input.map((item) => {
                return { "@": item };
              });
            }
            for (var ee = 0; ee < tupleBindings.length; ee++) {
              stepEnv = createFrameFromTuple(environment, tupleBindings[ee]);
              var res = await evaluate(expr, tupleBindings[ee]["@"], stepEnv);
              if (typeof res !== "undefined") {
                if (!Array.isArray(res)) {
                  res = [res];
                }
                for (var bb = 0; bb < res.length; bb++) {
                  tuple = {};
                  Object.assign(tuple, tupleBindings[ee]);
                  if (res.tupleStream) {
                    Object.assign(tuple, res[bb]);
                  } else {
                    if (expr.focus) {
                      tuple[expr.focus] = res[bb];
                      tuple["@"] = tupleBindings[ee]["@"];
                    } else {
                      tuple["@"] = res[bb];
                    }
                    if (expr.index) {
                      tuple[expr.index] = bb;
                    }
                    if (expr.ancestor) {
                      tuple[expr.ancestor.label] = tupleBindings[ee]["@"];
                    }
                  }
                  result.push(tuple);
                }
              }
            }
            if (expr.stages) {
              result = await evaluateStages(expr.stages, result, environment);
            }
            return result;
          }
          async function evaluateFilter(predicate, input, environment) {
            var results = createSequence();
            if (input && input.tupleStream) {
              results.tupleStream = true;
            }
            if (!Array.isArray(input)) {
              input = createSequence(input);
            }
            if (predicate.type === "number") {
              var index = Math.floor(predicate.value);
              if (index < 0) {
                index = input.length + index;
              }
              var item = input[index];
              if (typeof item !== "undefined") {
                if (Array.isArray(item)) {
                  results = item;
                } else {
                  results.push(item);
                }
              }
            } else {
              for (index = 0; index < input.length; index++) {
                var item = input[index];
                var context = item;
                var env = environment;
                if (input.tupleStream) {
                  context = item["@"];
                  env = createFrameFromTuple(environment, item);
                }
                var res = await evaluate(predicate, context, env);
                if (isNumeric(res)) {
                  res = [res];
                }
                if (isArrayOfNumbers(res)) {
                  res.forEach(function(ires) {
                    var ii = Math.floor(ires);
                    if (ii < 0) {
                      ii = input.length + ii;
                    }
                    if (ii === index) {
                      results.push(item);
                    }
                  });
                } else if (fn.boolean(res)) {
                  results.push(item);
                }
              }
            }
            return results;
          }
          async function evaluateBinary(expr, input, environment) {
            var result;
            var lhs = await evaluate(expr.lhs, input, environment);
            var op = expr.value;
            var evalrhs = async () => await evaluate(expr.rhs, input, environment);
            if (op === "and" || op === "or") {
              try {
                return await evaluateBooleanExpression(lhs, evalrhs, op);
              } catch (err) {
                err.position = expr.position;
                err.token = op;
                throw err;
              }
            }
            var rhs = await evalrhs();
            try {
              switch (op) {
                case "+":
                case "-":
                case "*":
                case "/":
                case "%":
                  result = evaluateNumericExpression(lhs, rhs, op);
                  break;
                case "=":
                case "!=":
                  result = evaluateEqualityExpression(lhs, rhs, op);
                  break;
                case "<":
                case "<=":
                case ">":
                case ">=":
                  result = evaluateComparisonExpression(lhs, rhs, op);
                  break;
                case "&":
                  result = evaluateStringConcat(lhs, rhs);
                  break;
                case "..":
                  result = evaluateRangeExpression(lhs, rhs);
                  break;
                case "in":
                  result = evaluateIncludesExpression(lhs, rhs);
                  break;
              }
            } catch (err) {
              err.position = expr.position;
              err.token = op;
              throw err;
            }
            return result;
          }
          async function evaluateUnary(expr, input, environment) {
            var result;
            switch (expr.value) {
              case "-":
                result = await evaluate(expr.expression, input, environment);
                if (typeof result === "undefined") {
                  result = void 0;
                } else if (isNumeric(result)) {
                  result = -result;
                } else {
                  throw {
                    code: "D1002",
                    stack: new Error().stack,
                    position: expr.position,
                    token: expr.value,
                    value: result
                  };
                }
                break;
              case "[":
                result = [];
                let generators = await Promise.all(expr.expressions.map(async (item2, idx) => {
                  environment.isParallelCall = idx > 0;
                  return [item2, await evaluate(item2, input, environment)];
                }));
                for (let generator of generators) {
                  var [item, value] = generator;
                  if (typeof value !== "undefined") {
                    if (item.value === "[") {
                      result.push(value);
                    } else {
                      result = fn.append(result, value);
                    }
                  }
                }
                if (expr.consarray) {
                  Object.defineProperty(result, "cons", {
                    enumerable: false,
                    configurable: false,
                    value: true
                  });
                }
                break;
              case "{":
                result = await evaluateGroupExpression(expr, input, environment);
                break;
            }
            return result;
          }
          function evaluateName(expr, input, environment) {
            return fn.lookup(input, expr.value);
          }
          function evaluateLiteral(expr) {
            return expr.value;
          }
          function evaluateWildcard(expr, input) {
            var results = createSequence();
            if (Array.isArray(input) && input.outerWrapper && input.length > 0) {
              input = input[0];
            }
            if (input !== null && typeof input === "object") {
              Object.keys(input).forEach(function(key) {
                var value = input[key];
                if (Array.isArray(value)) {
                  value = flatten(value);
                  results = fn.append(results, value);
                } else {
                  results.push(value);
                }
              });
            }
            return results;
          }
          function flatten(arg, flattened) {
            if (typeof flattened === "undefined") {
              flattened = [];
            }
            if (Array.isArray(arg)) {
              arg.forEach(function(item) {
                flatten(item, flattened);
              });
            } else {
              flattened.push(arg);
            }
            return flattened;
          }
          function evaluateDescendants(expr, input) {
            var result;
            var resultSequence = createSequence();
            if (typeof input !== "undefined") {
              recurseDescendants(input, resultSequence);
              if (resultSequence.length === 1) {
                result = resultSequence[0];
              } else {
                result = resultSequence;
              }
            }
            return result;
          }
          function recurseDescendants(input, results) {
            if (!Array.isArray(input)) {
              results.push(input);
            }
            if (Array.isArray(input)) {
              input.forEach(function(member) {
                recurseDescendants(member, results);
              });
            } else if (input !== null && typeof input === "object") {
              Object.keys(input).forEach(function(key) {
                recurseDescendants(input[key], results);
              });
            }
          }
          function evaluateNumericExpression(lhs, rhs, op) {
            var result;
            if (typeof lhs !== "undefined" && !isNumeric(lhs)) {
              throw {
                code: "T2001",
                stack: new Error().stack,
                value: lhs
              };
            }
            if (typeof rhs !== "undefined" && !isNumeric(rhs)) {
              throw {
                code: "T2002",
                stack: new Error().stack,
                value: rhs
              };
            }
            if (typeof lhs === "undefined" || typeof rhs === "undefined") {
              return result;
            }
            switch (op) {
              case "+":
                result = lhs + rhs;
                break;
              case "-":
                result = lhs - rhs;
                break;
              case "*":
                result = lhs * rhs;
                break;
              case "/":
                result = lhs / rhs;
                break;
              case "%":
                result = lhs % rhs;
                break;
            }
            return result;
          }
          function evaluateEqualityExpression(lhs, rhs, op) {
            var result;
            var ltype = typeof lhs;
            var rtype = typeof rhs;
            if (ltype === "undefined" || rtype === "undefined") {
              return false;
            }
            switch (op) {
              case "=":
                result = isDeepEqual(lhs, rhs);
                break;
              case "!=":
                result = !isDeepEqual(lhs, rhs);
                break;
            }
            return result;
          }
          function evaluateComparisonExpression(lhs, rhs, op) {
            var result;
            var ltype = typeof lhs;
            var rtype = typeof rhs;
            var lcomparable = ltype === "undefined" || ltype === "string" || ltype === "number";
            var rcomparable = rtype === "undefined" || rtype === "string" || rtype === "number";
            if (!lcomparable || !rcomparable) {
              throw {
                code: "T2010",
                stack: new Error().stack,
                value: !(ltype === "string" || ltype === "number") ? lhs : rhs
              };
            }
            if (ltype === "undefined" || rtype === "undefined") {
              return void 0;
            }
            if (ltype !== rtype) {
              throw {
                code: "T2009",
                stack: new Error().stack,
                value: lhs,
                value2: rhs
              };
            }
            switch (op) {
              case "<":
                result = lhs < rhs;
                break;
              case "<=":
                result = lhs <= rhs;
                break;
              case ">":
                result = lhs > rhs;
                break;
              case ">=":
                result = lhs >= rhs;
                break;
            }
            return result;
          }
          function evaluateIncludesExpression(lhs, rhs) {
            var result = false;
            if (typeof lhs === "undefined" || typeof rhs === "undefined") {
              return false;
            }
            if (!Array.isArray(rhs)) {
              rhs = [rhs];
            }
            for (var i = 0; i < rhs.length; i++) {
              if (rhs[i] === lhs) {
                result = true;
                break;
              }
            }
            return result;
          }
          async function evaluateBooleanExpression(lhs, evalrhs, op) {
            var result;
            var lBool = boolize(lhs);
            switch (op) {
              case "and":
                result = lBool && boolize(await evalrhs());
                break;
              case "or":
                result = lBool || boolize(await evalrhs());
                break;
            }
            return result;
          }
          function boolize(value) {
            var booledValue = fn.boolean(value);
            return typeof booledValue === "undefined" ? false : booledValue;
          }
          function evaluateStringConcat(lhs, rhs) {
            var result;
            var lstr = "";
            var rstr = "";
            if (typeof lhs !== "undefined") {
              lstr = fn.string(lhs);
            }
            if (typeof rhs !== "undefined") {
              rstr = fn.string(rhs);
            }
            result = lstr.concat(rstr);
            return result;
          }
          async function evaluateGroupExpression(expr, input, environment) {
            var result = {};
            var groups = {};
            var reduce = input && input.tupleStream ? true : false;
            if (!Array.isArray(input)) {
              input = createSequence(input);
            }
            if (input.length === 0) {
              input.push(void 0);
            }
            for (var itemIndex = 0; itemIndex < input.length; itemIndex++) {
              var item = input[itemIndex];
              var env = reduce ? createFrameFromTuple(environment, item) : environment;
              for (var pairIndex = 0; pairIndex < expr.lhs.length; pairIndex++) {
                var pair = expr.lhs[pairIndex];
                var key = await evaluate(pair[0], reduce ? item["@"] : item, env);
                if (typeof key !== "string" && key !== void 0) {
                  throw {
                    code: "T1003",
                    stack: new Error().stack,
                    position: expr.position,
                    value: key
                  };
                }
                if (key !== void 0) {
                  var entry = { data: item, exprIndex: pairIndex };
                  if (groups.hasOwnProperty(key)) {
                    if (groups[key].exprIndex !== pairIndex) {
                      throw {
                        code: "D1009",
                        stack: new Error().stack,
                        position: expr.position,
                        value: key
                      };
                    }
                    groups[key].data = fn.append(groups[key].data, item);
                  } else {
                    groups[key] = entry;
                  }
                }
              }
            }
            let generators = await Promise.all(Object.keys(groups).map(async (key2, idx) => {
              let entry2 = groups[key2];
              var context = entry2.data;
              var env2 = environment;
              if (reduce) {
                var tuple = reduceTupleStream(entry2.data);
                context = tuple["@"];
                delete tuple["@"];
                env2 = createFrameFromTuple(environment, tuple);
              }
              environment.isParallelCall = idx > 0;
              return [key2, await evaluate(expr.lhs[entry2.exprIndex][1], context, env2)];
            }));
            for (let generator of generators) {
              var [key, value] = await generator;
              if (typeof value !== "undefined") {
                result[key] = value;
              }
            }
            return result;
          }
          function reduceTupleStream(tupleStream) {
            if (!Array.isArray(tupleStream)) {
              return tupleStream;
            }
            var result = {};
            Object.assign(result, tupleStream[0]);
            for (var ii = 1; ii < tupleStream.length; ii++) {
              for (const prop in tupleStream[ii]) {
                result[prop] = fn.append(result[prop], tupleStream[ii][prop]);
              }
            }
            return result;
          }
          function evaluateRangeExpression(lhs, rhs) {
            var result;
            if (typeof lhs !== "undefined" && !Number.isInteger(lhs)) {
              throw {
                code: "T2003",
                stack: new Error().stack,
                value: lhs
              };
            }
            if (typeof rhs !== "undefined" && !Number.isInteger(rhs)) {
              throw {
                code: "T2004",
                stack: new Error().stack,
                value: rhs
              };
            }
            if (typeof lhs === "undefined" || typeof rhs === "undefined") {
              return result;
            }
            if (lhs > rhs) {
              return result;
            }
            var size = rhs - lhs + 1;
            if (size > 1e7) {
              throw {
                code: "D2014",
                stack: new Error().stack,
                value: size
              };
            }
            result = new Array(size);
            for (var item = lhs, index = 0; item <= rhs; item++, index++) {
              result[index] = item;
            }
            result.sequence = true;
            return result;
          }
          async function evaluateBindExpression(expr, input, environment) {
            var value = await evaluate(expr.rhs, input, environment);
            environment.bind(expr.lhs.value, value);
            return value;
          }
          async function evaluateCondition(expr, input, environment) {
            var result;
            var condition = await evaluate(expr.condition, input, environment);
            if (fn.boolean(condition)) {
              result = await evaluate(expr.then, input, environment);
            } else if (typeof expr.else !== "undefined") {
              result = await evaluate(expr.else, input, environment);
            }
            return result;
          }
          async function evaluateBlock(expr, input, environment) {
            var result;
            var frame = createFrame(environment);
            for (var ii = 0; ii < expr.expressions.length; ii++) {
              result = await evaluate(expr.expressions[ii], input, frame);
            }
            return result;
          }
          function evaluateRegex(expr) {
            var re = new jsonata3.RegexEngine(expr.value);
            var closure = function(str, fromIndex) {
              var result;
              re.lastIndex = fromIndex || 0;
              var match = re.exec(str);
              if (match !== null) {
                result = {
                  match: match[0],
                  start: match.index,
                  end: match.index + match[0].length,
                  groups: []
                };
                if (match.length > 1) {
                  for (var i = 1; i < match.length; i++) {
                    result.groups.push(match[i]);
                  }
                }
                result.next = function() {
                  if (re.lastIndex >= str.length) {
                    return void 0;
                  } else {
                    var next = closure(str, re.lastIndex);
                    if (next && next.match === "") {
                      throw {
                        code: "D1004",
                        stack: new Error().stack,
                        position: expr.position,
                        value: expr.value.source
                      };
                    }
                    return next;
                  }
                };
              }
              return result;
            };
            return closure;
          }
          function evaluateVariable(expr, input, environment) {
            var result;
            if (expr.value === "") {
              result = input && input.outerWrapper ? input[0] : input;
            } else {
              result = environment.lookup(expr.value);
            }
            return result;
          }
          async function evaluateSortExpression(expr, input, environment) {
            var result;
            var lhs = input;
            var isTupleSort = input.tupleStream ? true : false;
            var comparator = async function(a, b) {
              var comp = 0;
              for (var index = 0; comp === 0 && index < expr.terms.length; index++) {
                var term = expr.terms[index];
                var context = a;
                var env = environment;
                if (isTupleSort) {
                  context = a["@"];
                  env = createFrameFromTuple(environment, a);
                }
                var aa = await evaluate(term.expression, context, env);
                context = b;
                env = environment;
                if (isTupleSort) {
                  context = b["@"];
                  env = createFrameFromTuple(environment, b);
                }
                var bb = await evaluate(term.expression, context, env);
                var atype = typeof aa;
                var btype = typeof bb;
                if (atype === "undefined") {
                  comp = btype === "undefined" ? 0 : 1;
                  continue;
                }
                if (btype === "undefined") {
                  comp = -1;
                  continue;
                }
                if (!(atype === "string" || atype === "number") || !(btype === "string" || btype === "number")) {
                  throw {
                    code: "T2008",
                    stack: new Error().stack,
                    position: expr.position,
                    value: !(atype === "string" || atype === "number") ? aa : bb
                  };
                }
                if (atype !== btype) {
                  throw {
                    code: "T2007",
                    stack: new Error().stack,
                    position: expr.position,
                    value: aa,
                    value2: bb
                  };
                }
                if (aa === bb) {
                  continue;
                } else if (aa < bb) {
                  comp = -1;
                } else {
                  comp = 1;
                }
                if (term.descending === true) {
                  comp = -comp;
                }
              }
              return comp === 1;
            };
            var focus = {
              environment,
              input
            };
            result = await fn.sort.apply(focus, [lhs, comparator]);
            return result;
          }
          function evaluateTransformExpression(expr, input, environment) {
            var transformer = async function(obj) {
              if (typeof obj === "undefined") {
                return void 0;
              }
              var cloneFunction = environment.lookup("clone");
              if (!isFunction(cloneFunction)) {
                throw {
                  code: "T2013",
                  stack: new Error().stack,
                  position: expr.position
                };
              }
              var result = await apply(cloneFunction, [obj], null, environment);
              var matches = await evaluate(expr.pattern, result, environment);
              if (typeof matches !== "undefined") {
                if (!Array.isArray(matches)) {
                  matches = [matches];
                }
                for (var ii = 0; ii < matches.length; ii++) {
                  var match = matches[ii];
                  if (match && (match.isPrototypeOf(result) || match instanceof Object.constructor)) {
                    throw {
                      code: "D1010",
                      stack: new Error().stack,
                      position: expr.position
                    };
                  }
                  var update = await evaluate(expr.update, match, environment);
                  var updateType = typeof update;
                  if (updateType !== "undefined") {
                    if (updateType !== "object" || update === null || Array.isArray(update)) {
                      throw {
                        code: "T2011",
                        stack: new Error().stack,
                        position: expr.update.position,
                        value: update
                      };
                    }
                    for (var prop in update) {
                      match[prop] = update[prop];
                    }
                  }
                  if (typeof expr.delete !== "undefined") {
                    var deletions = await evaluate(expr.delete, match, environment);
                    if (typeof deletions !== "undefined") {
                      var val = deletions;
                      if (!Array.isArray(deletions)) {
                        deletions = [deletions];
                      }
                      if (!isArrayOfStrings(deletions)) {
                        throw {
                          code: "T2012",
                          stack: new Error().stack,
                          position: expr.delete.position,
                          value: val
                        };
                      }
                      for (var jj = 0; jj < deletions.length; jj++) {
                        if (typeof match === "object" && match !== null) {
                          delete match[deletions[jj]];
                        }
                      }
                    }
                  }
                }
              }
              return result;
            };
            return defineFunction(transformer, "<(oa):o>");
          }
          var chainAST = parser("function($f, $g) { function($x){ $g($f($x)) } }");
          async function evaluateApplyExpression(expr, input, environment) {
            var result;
            var lhs = await evaluate(expr.lhs, input, environment);
            if (expr.rhs.type === "function") {
              result = await evaluateFunction(expr.rhs, input, environment, { context: lhs });
            } else {
              var func = await evaluate(expr.rhs, input, environment);
              if (!isFunction(func)) {
                throw {
                  code: "T2006",
                  stack: new Error().stack,
                  position: expr.position,
                  value: func
                };
              }
              if (isFunction(lhs)) {
                var chain = await evaluate(chainAST, null, environment);
                result = await apply(chain, [lhs, func], null, environment);
              } else {
                result = await apply(func, [lhs], null, environment);
              }
            }
            return result;
          }
          async function evaluateFunction(expr, input, environment, applyto) {
            var result;
            var proc = await evaluate(expr.procedure, input, environment);
            if (typeof proc === "undefined" && expr.procedure.type === "path" && environment.lookup(expr.procedure.steps[0].value)) {
              throw {
                code: "T1005",
                stack: new Error().stack,
                position: expr.position,
                token: expr.procedure.steps[0].value
              };
            }
            var evaluatedArgs = [];
            if (typeof applyto !== "undefined") {
              evaluatedArgs.push(applyto.context);
            }
            for (var jj = 0; jj < expr.arguments.length; jj++) {
              const arg = await evaluate(expr.arguments[jj], input, environment);
              if (isFunction(arg)) {
                const closure = async function(...params) {
                  return await apply(arg, params, null, environment);
                };
                closure.arity = getFunctionArity(arg);
                evaluatedArgs.push(closure);
              } else {
                evaluatedArgs.push(arg);
              }
            }
            var procName = expr.procedure.type === "path" ? expr.procedure.steps[0].value : expr.procedure.value;
            try {
              if (typeof proc === "object") {
                proc.token = procName;
                proc.position = expr.position;
              }
              result = await apply(proc, evaluatedArgs, input, environment);
            } catch (err) {
              if (!err.position) {
                err.position = expr.position;
              }
              if (!err.token) {
                err.token = procName;
              }
              throw err;
            }
            return result;
          }
          async function apply(proc, args, input, environment) {
            var result;
            result = await applyInner(proc, args, input, environment);
            while (isLambda(result) && result.thunk === true) {
              var next = await evaluate(result.body.procedure, result.input, result.environment);
              if (result.body.procedure.type === "variable") {
                next.token = result.body.procedure.value;
              }
              next.position = result.body.procedure.position;
              var evaluatedArgs = [];
              for (var ii = 0; ii < result.body.arguments.length; ii++) {
                evaluatedArgs.push(await evaluate(result.body.arguments[ii], result.input, result.environment));
              }
              result = await applyInner(next, evaluatedArgs, input, environment);
            }
            return result;
          }
          async function applyInner(proc, args, input, environment) {
            var result;
            try {
              var validatedArgs = args;
              if (proc) {
                validatedArgs = validateArguments(proc.signature, args, input);
              }
              if (isLambda(proc)) {
                result = await applyProcedure(proc, validatedArgs);
              } else if (proc && proc._jsonata_function === true) {
                var focus = {
                  environment,
                  input
                };
                result = proc.implementation.apply(focus, validatedArgs);
                if (isIterable(result)) {
                  result = result.next().value;
                }
                if (isPromise(result)) {
                  result = await result;
                }
              } else if (typeof proc === "function") {
                result = proc.apply(input, validatedArgs);
                if (isPromise(result)) {
                  result = await result;
                }
              } else {
                throw {
                  code: "T1006",
                  stack: new Error().stack
                };
              }
            } catch (err) {
              if (proc) {
                if (typeof err.token == "undefined" && typeof proc.token !== "undefined") {
                  err.token = proc.token;
                }
                err.position = proc.position || err.position;
              }
              throw err;
            }
            return result;
          }
          function evaluateLambda(expr, input, environment) {
            var procedure = {
              _jsonata_lambda: true,
              input,
              environment,
              arguments: expr.arguments,
              signature: expr.signature,
              body: expr.body
            };
            if (expr.thunk === true) {
              procedure.thunk = true;
            }
            procedure.apply = async function(self2, args) {
              return await apply(procedure, args, input, !!self2 ? self2.environment : environment);
            };
            return procedure;
          }
          async function evaluatePartialApplication(expr, input, environment) {
            var result;
            var evaluatedArgs = [];
            for (var ii = 0; ii < expr.arguments.length; ii++) {
              var arg = expr.arguments[ii];
              if (arg.type === "operator" && arg.value === "?") {
                evaluatedArgs.push(arg);
              } else {
                evaluatedArgs.push(await evaluate(arg, input, environment));
              }
            }
            var proc = await evaluate(expr.procedure, input, environment);
            if (typeof proc === "undefined" && expr.procedure.type === "path" && environment.lookup(expr.procedure.steps[0].value)) {
              throw {
                code: "T1007",
                stack: new Error().stack,
                position: expr.position,
                token: expr.procedure.steps[0].value
              };
            }
            if (isLambda(proc)) {
              result = partialApplyProcedure(proc, evaluatedArgs);
            } else if (proc && proc._jsonata_function === true) {
              result = partialApplyNativeFunction(proc.implementation, evaluatedArgs);
            } else if (typeof proc === "function") {
              result = partialApplyNativeFunction(proc, evaluatedArgs);
            } else {
              throw {
                code: "T1008",
                stack: new Error().stack,
                position: expr.position,
                token: expr.procedure.type === "path" ? expr.procedure.steps[0].value : expr.procedure.value
              };
            }
            return result;
          }
          function validateArguments(signature, args, context) {
            if (typeof signature === "undefined") {
              return args;
            }
            var validatedArgs = signature.validate(args, context);
            return validatedArgs;
          }
          async function applyProcedure(proc, args) {
            var result;
            var env = createFrame(proc.environment);
            proc.arguments.forEach(function(param, index) {
              env.bind(param.value, args[index]);
            });
            if (typeof proc.body === "function") {
              result = await applyNativeFunction(proc.body, env);
            } else {
              result = await evaluate(proc.body, proc.input, env);
            }
            return result;
          }
          function partialApplyProcedure(proc, args) {
            var env = createFrame(proc.environment);
            var unboundArgs = [];
            proc.arguments.forEach(function(param, index) {
              var arg = args[index];
              if (arg && arg.type === "operator" && arg.value === "?") {
                unboundArgs.push(param);
              } else {
                env.bind(param.value, arg);
              }
            });
            var procedure = {
              _jsonata_lambda: true,
              input: proc.input,
              environment: env,
              arguments: unboundArgs,
              body: proc.body
            };
            return procedure;
          }
          function partialApplyNativeFunction(native, args) {
            var sigArgs = getNativeFunctionArguments(native);
            sigArgs = sigArgs.map(function(sigArg) {
              return "$" + sigArg.trim();
            });
            var body = "function(" + sigArgs.join(", ") + "){ _ }";
            var bodyAST = parser(body);
            bodyAST.body = native;
            var partial = partialApplyProcedure(bodyAST, args);
            return partial;
          }
          async function applyNativeFunction(proc, env) {
            var sigArgs = getNativeFunctionArguments(proc);
            var args = sigArgs.map(function(sigArg) {
              return env.lookup(sigArg.trim());
            });
            var focus = {
              environment: env
            };
            var result = proc.apply(focus, args);
            if (isPromise(result)) {
              result = await result;
            }
            return result;
          }
          function getNativeFunctionArguments(func) {
            var signature = func.toString();
            var sigParens = /\(([^)]*)\)/.exec(signature)[1];
            var sigArgs = sigParens.split(",");
            return sigArgs;
          }
          function defineFunction(func, signature) {
            var definition = {
              _jsonata_function: true,
              implementation: func
            };
            if (typeof signature !== "undefined") {
              definition.signature = parseSignature(signature);
            }
            return definition;
          }
          async function functionEval(expr, focus) {
            if (typeof expr === "undefined") {
              return void 0;
            }
            var input = this.input;
            if (typeof focus !== "undefined") {
              input = focus;
              if (Array.isArray(input) && !isSequence(input)) {
                input = createSequence(input);
                input.outerWrapper = true;
              }
            }
            try {
              var ast = parser(expr, false);
            } catch (err) {
              populateMessage(err);
              throw {
                stack: new Error().stack,
                code: "D3120",
                value: err.message,
                error: err
              };
            }
            try {
              var result = await evaluate(ast, input, this.environment);
            } catch (err) {
              populateMessage(err);
              throw {
                stack: new Error().stack,
                code: "D3121",
                value: err.message,
                error: err
              };
            }
            return result;
          }
          function functionClone(arg) {
            if (typeof arg === "undefined") {
              return void 0;
            }
            return JSON.parse(fn.string(arg));
          }
          function createFrame(enclosingEnvironment) {
            var bindings = {};
            return {
              bind: function(name, value) {
                bindings[name] = value;
              },
              lookup: function(name) {
                var value;
                if (bindings.hasOwnProperty(name)) {
                  value = bindings[name];
                } else if (enclosingEnvironment) {
                  value = enclosingEnvironment.lookup(name);
                }
                return value;
              },
              timestamp: enclosingEnvironment ? enclosingEnvironment.timestamp : null,
              async: enclosingEnvironment ? enclosingEnvironment.async : false,
              isParallelCall: enclosingEnvironment ? enclosingEnvironment.isParallelCall : false,
              global: enclosingEnvironment ? enclosingEnvironment.global : {
                ancestry: [null]
              }
            };
          }
          staticFrame.bind("sum", defineFunction(fn.sum, "<a<n>:n>"));
          staticFrame.bind("count", defineFunction(fn.count, "<a:n>"));
          staticFrame.bind("max", defineFunction(fn.max, "<a<n>:n>"));
          staticFrame.bind("min", defineFunction(fn.min, "<a<n>:n>"));
          staticFrame.bind("average", defineFunction(fn.average, "<a<n>:n>"));
          staticFrame.bind("string", defineFunction(fn.string, "<x-b?:s>"));
          staticFrame.bind("substring", defineFunction(fn.substring, "<s-nn?:s>"));
          staticFrame.bind("substringBefore", defineFunction(fn.substringBefore, "<s-s:s>"));
          staticFrame.bind("substringAfter", defineFunction(fn.substringAfter, "<s-s:s>"));
          staticFrame.bind("lowercase", defineFunction(fn.lowercase, "<s-:s>"));
          staticFrame.bind("uppercase", defineFunction(fn.uppercase, "<s-:s>"));
          staticFrame.bind("length", defineFunction(fn.length, "<s-:n>"));
          staticFrame.bind("trim", defineFunction(fn.trim, "<s-:s>"));
          staticFrame.bind("pad", defineFunction(fn.pad, "<s-ns?:s>"));
          staticFrame.bind("match", defineFunction(fn.match, "<s-f<s:o>n?:a<o>>"));
          staticFrame.bind("contains", defineFunction(fn.contains, "<s-(sf):b>"));
          staticFrame.bind("replace", defineFunction(fn.replace, "<s-(sf)(sf)n?:s>"));
          staticFrame.bind("split", defineFunction(fn.split, "<s-(sf)n?:a<s>>"));
          staticFrame.bind("join", defineFunction(fn.join, "<a<s>s?:s>"));
          staticFrame.bind("formatNumber", defineFunction(fn.formatNumber, "<n-so?:s>"));
          staticFrame.bind("formatBase", defineFunction(fn.formatBase, "<n-n?:s>"));
          staticFrame.bind("formatInteger", defineFunction(datetime.formatInteger, "<n-s:s>"));
          staticFrame.bind("parseInteger", defineFunction(datetime.parseInteger, "<s-s:n>"));
          staticFrame.bind("number", defineFunction(fn.number, "<(nsb)-:n>"));
          staticFrame.bind("floor", defineFunction(fn.floor, "<n-:n>"));
          staticFrame.bind("ceil", defineFunction(fn.ceil, "<n-:n>"));
          staticFrame.bind("round", defineFunction(fn.round, "<n-n?:n>"));
          staticFrame.bind("abs", defineFunction(fn.abs, "<n-:n>"));
          staticFrame.bind("sqrt", defineFunction(fn.sqrt, "<n-:n>"));
          staticFrame.bind("power", defineFunction(fn.power, "<n-n:n>"));
          staticFrame.bind("random", defineFunction(fn.random, "<:n>"));
          staticFrame.bind("boolean", defineFunction(fn.boolean, "<x-:b>"));
          staticFrame.bind("not", defineFunction(fn.not, "<x-:b>"));
          staticFrame.bind("map", defineFunction(fn.map, "<af>"));
          staticFrame.bind("zip", defineFunction(fn.zip, "<a+>"));
          staticFrame.bind("filter", defineFunction(fn.filter, "<af>"));
          staticFrame.bind("single", defineFunction(fn.single, "<af?>"));
          staticFrame.bind("reduce", defineFunction(fn.foldLeft, "<afj?:j>"));
          staticFrame.bind("sift", defineFunction(fn.sift, "<o-f?:o>"));
          staticFrame.bind("keys", defineFunction(fn.keys, "<x-:a<s>>"));
          staticFrame.bind("lookup", defineFunction(fn.lookup, "<x-s:x>"));
          staticFrame.bind("append", defineFunction(fn.append, "<xx:a>"));
          staticFrame.bind("exists", defineFunction(fn.exists, "<x:b>"));
          staticFrame.bind("spread", defineFunction(fn.spread, "<x-:a<o>>"));
          staticFrame.bind("merge", defineFunction(fn.merge, "<a<o>:o>"));
          staticFrame.bind("reverse", defineFunction(fn.reverse, "<a:a>"));
          staticFrame.bind("each", defineFunction(fn.each, "<o-f:a>"));
          staticFrame.bind("error", defineFunction(fn.error, "<s?:x>"));
          staticFrame.bind("assert", defineFunction(fn.assert, "<bs?:x>"));
          staticFrame.bind("type", defineFunction(fn.type, "<x:s>"));
          staticFrame.bind("sort", defineFunction(fn.sort, "<af?:a>"));
          staticFrame.bind("shuffle", defineFunction(fn.shuffle, "<a:a>"));
          staticFrame.bind("distinct", defineFunction(fn.distinct, "<x:x>"));
          staticFrame.bind("base64encode", defineFunction(fn.base64encode, "<s-:s>"));
          staticFrame.bind("base64decode", defineFunction(fn.base64decode, "<s-:s>"));
          staticFrame.bind("encodeUrlComponent", defineFunction(fn.encodeUrlComponent, "<s-:s>"));
          staticFrame.bind("encodeUrl", defineFunction(fn.encodeUrl, "<s-:s>"));
          staticFrame.bind("decodeUrlComponent", defineFunction(fn.decodeUrlComponent, "<s-:s>"));
          staticFrame.bind("decodeUrl", defineFunction(fn.decodeUrl, "<s-:s>"));
          staticFrame.bind("eval", defineFunction(functionEval, "<sx?:x>"));
          staticFrame.bind("toMillis", defineFunction(datetime.toMillis, "<s-s?:n>"));
          staticFrame.bind("fromMillis", defineFunction(datetime.fromMillis, "<n-s?s?:s>"));
          staticFrame.bind("clone", defineFunction(functionClone, "<(oa)-:o>"));
          var errorCodes = {
            "S0101": "String literal must be terminated by a matching quote",
            "S0102": "Number out of range: {{token}}",
            "S0103": "Unsupported escape sequence: \\{{token}}",
            "S0104": "The escape sequence \\u must be followed by 4 hex digits",
            "S0105": "Quoted property name must be terminated with a backquote (`)",
            "S0106": "Comment has no closing tag",
            "S0201": "Syntax error: {{token}}",
            "S0202": "Expected {{value}}, got {{token}}",
            "S0203": "Expected {{value}} before end of expression",
            "S0204": "Unknown operator: {{token}}",
            "S0205": "Unexpected token: {{token}}",
            "S0206": "Unknown expression type: {{token}}",
            "S0207": "Unexpected end of expression",
            "S0208": "Parameter {{value}} of function definition must be a variable name (start with $)",
            "S0209": "A predicate cannot follow a grouping expression in a step",
            "S0210": "Each step can only have one grouping expression",
            "S0211": "The symbol {{token}} cannot be used as a unary operator",
            "S0212": "The left side of := must be a variable name (start with $)",
            "S0213": "The literal value {{value}} cannot be used as a step within a path expression",
            "S0214": "The right side of {{token}} must be a variable name (start with $)",
            "S0215": "A context variable binding must precede any predicates on a step",
            "S0216": "A context variable binding must precede the 'order-by' clause on a step",
            "S0217": "The object representing the 'parent' cannot be derived from this expression",
            "S0301": "Empty regular expressions are not allowed",
            "S0302": "No terminating / in regular expression",
            "S0402": "Choice groups containing parameterized types are not supported",
            "S0401": "Type parameters can only be applied to functions and arrays",
            "S0500": "Attempted to evaluate an expression containing syntax error(s)",
            "T0410": "Argument {{index}} of function {{token}} does not match function signature",
            "T0411": "Context value is not a compatible type with argument {{index}} of function {{token}}",
            "T0412": "Argument {{index}} of function {{token}} must be an array of {{type}}",
            "D1001": "Number out of range: {{value}}",
            "D1002": "Cannot negate a non-numeric value: {{value}}",
            "T1003": "Key in object structure must evaluate to a string; got: {{value}}",
            "D1004": "Regular expression matches zero length string",
            "T1005": "Attempted to invoke a non-function. Did you mean ${{{token}}}?",
            "T1006": "Attempted to invoke a non-function",
            "T1007": "Attempted to partially apply a non-function. Did you mean ${{{token}}}?",
            "T1008": "Attempted to partially apply a non-function",
            "D1009": "Multiple key definitions evaluate to same key: {{value}}",
            "D1010": "Attempted to access the Javascript object prototype",
            // Javascript specific 
            "T1010": "The matcher function argument passed to function {{token}} does not return the correct object structure",
            "T2001": "The left side of the {{token}} operator must evaluate to a number",
            "T2002": "The right side of the {{token}} operator must evaluate to a number",
            "T2003": "The left side of the range operator (..) must evaluate to an integer",
            "T2004": "The right side of the range operator (..) must evaluate to an integer",
            "D2005": "The left side of := must be a variable name (start with $)",
            // defunct - replaced by S0212 parser error
            "T2006": "The right side of the function application operator ~> must be a function",
            "T2007": "Type mismatch when comparing values {{value}} and {{value2}} in order-by clause",
            "T2008": "The expressions within an order-by clause must evaluate to numeric or string values",
            "T2009": "The values {{value}} and {{value2}} either side of operator {{token}} must be of the same data type",
            "T2010": "The expressions either side of operator {{token}} must evaluate to numeric or string values",
            "T2011": "The insert/update clause of the transform expression must evaluate to an object: {{value}}",
            "T2012": "The delete clause of the transform expression must evaluate to a string or array of strings: {{value}}",
            "T2013": "The transform expression clones the input object using the $clone() function.  This has been overridden in the current scope by a non-function.",
            "D2014": "The size of the sequence allocated by the range operator (..) must not exceed 1e6.  Attempted to allocate {{value}}.",
            "D3001": "Attempting to invoke string function on Infinity or NaN",
            "D3010": "Second argument of replace function cannot be an empty string",
            "D3011": "Fourth argument of replace function must evaluate to a positive number",
            "D3012": "Attempted to replace a matched string with a non-string value",
            "D3020": "Third argument of split function must evaluate to a positive number",
            "D3030": "Unable to cast value to a number: {{value}}",
            "D3040": "Third argument of match function must evaluate to a positive number",
            "D3050": "The second argument of reduce function must be a function with at least two arguments",
            "D3060": "The sqrt function cannot be applied to a negative number: {{value}}",
            "D3061": "The power function has resulted in a value that cannot be represented as a JSON number: base={{value}}, exponent={{exp}}",
            "D3070": "The single argument form of the sort function can only be applied to an array of strings or an array of numbers.  Use the second argument to specify a comparison function",
            "D3080": "The picture string must only contain a maximum of two sub-pictures",
            "D3081": "The sub-picture must not contain more than one instance of the 'decimal-separator' character",
            "D3082": "The sub-picture must not contain more than one instance of the 'percent' character",
            "D3083": "The sub-picture must not contain more than one instance of the 'per-mille' character",
            "D3084": "The sub-picture must not contain both a 'percent' and a 'per-mille' character",
            "D3085": "The mantissa part of a sub-picture must contain at least one character that is either an 'optional digit character' or a member of the 'decimal digit family'",
            "D3086": "The sub-picture must not contain a passive character that is preceded by an active character and that is followed by another active character",
            "D3087": "The sub-picture must not contain a 'grouping-separator' character that appears adjacent to a 'decimal-separator' character",
            "D3088": "The sub-picture must not contain a 'grouping-separator' at the end of the integer part",
            "D3089": "The sub-picture must not contain two adjacent instances of the 'grouping-separator' character",
            "D3090": "The integer part of the sub-picture must not contain a member of the 'decimal digit family' that is followed by an instance of the 'optional digit character'",
            "D3091": "The fractional part of the sub-picture must not contain an instance of the 'optional digit character' that is followed by a member of the 'decimal digit family'",
            "D3092": "A sub-picture that contains a 'percent' or 'per-mille' character must not contain a character treated as an 'exponent-separator'",
            "D3093": "The exponent part of the sub-picture must comprise only of one or more characters that are members of the 'decimal digit family'",
            "D3100": "The radix of the formatBase function must be between 2 and 36.  It was given {{value}}",
            "D3110": "The argument of the toMillis function must be an ISO 8601 formatted timestamp. Given {{value}}",
            "D3120": "Syntax error in expression passed to function eval: {{value}}",
            "D3121": "Dynamic error evaluating the expression passed to function eval: {{value}}",
            "D3130": "Formatting or parsing an integer as a sequence starting with {{value}} is not supported by this implementation",
            "D3131": "In a decimal digit pattern, all digits must be from the same decimal group",
            "D3132": "Unknown component specifier {{value}} in date/time picture string",
            "D3133": "The 'name' modifier can only be applied to months and days in the date/time picture string, not {{value}}",
            "D3134": "The timezone integer format specifier cannot have more than four digits",
            "D3135": "No matching closing bracket ']' in date/time picture string",
            "D3136": "The date/time picture string is missing specifiers required to parse the timestamp",
            "D3137": "{{{message}}}",
            "D3138": "The $single() function expected exactly 1 matching result.  Instead it matched more.",
            "D3139": "The $single() function expected exactly 1 matching result.  Instead it matched 0.",
            "D3140": "Malformed URL passed to ${{{functionName}}}(): {{value}}",
            "D3141": "{{{message}}}"
          };
          function populateMessage(err) {
            var template = errorCodes[err.code];
            if (typeof template !== "undefined") {
              var message = template.replace(/\{\{\{([^}]+)}}}/g, function() {
                return err[arguments[1]];
              });
              message = message.replace(/\{\{([^}]+)}}/g, function() {
                return JSON.stringify(err[arguments[1]]);
              });
              err.message = message;
            }
          }
          function jsonata3(expr, options) {
            var ast;
            var errors;
            try {
              ast = parser(expr, options && options.recover);
              errors = ast.errors;
              delete ast.errors;
            } catch (err) {
              populateMessage(err);
              throw err;
            }
            var environment = createFrame(staticFrame);
            var timestamp = /* @__PURE__ */ new Date();
            environment.bind("now", defineFunction(function(picture, timezone) {
              return datetime.fromMillis(timestamp.getTime(), picture, timezone);
            }, "<s?s?:s>"));
            environment.bind("millis", defineFunction(function() {
              return timestamp.getTime();
            }, "<:n>"));
            if (options && options.RegexEngine) {
              jsonata3.RegexEngine = options.RegexEngine;
            } else {
              jsonata3.RegexEngine = RegExp;
            }
            return {
              evaluate: async function(input, bindings, callback) {
                if (typeof errors !== "undefined") {
                  var err = {
                    code: "S0500",
                    position: 0
                  };
                  populateMessage(err);
                  throw err;
                }
                if (typeof bindings !== "undefined") {
                  var exec_env;
                  exec_env = createFrame(environment);
                  for (var v in bindings) {
                    exec_env.bind(v, bindings[v]);
                  }
                } else {
                  exec_env = environment;
                }
                exec_env.bind("$", input);
                timestamp = /* @__PURE__ */ new Date();
                exec_env.timestamp = timestamp;
                if (Array.isArray(input) && !isSequence(input)) {
                  input = createSequence(input);
                  input.outerWrapper = true;
                }
                var it;
                try {
                  it = await evaluate(ast, input, exec_env);
                  if (typeof callback === "function") {
                    callback(null, it);
                  }
                  return it;
                } catch (err2) {
                  populateMessage(err2);
                  throw err2;
                }
              },
              assign: function(name, value) {
                environment.bind(name, value);
              },
              registerFunction: function(name, implementation, signature) {
                var func = defineFunction(implementation, signature);
                environment.bind(name, func);
              },
              ast: function() {
                return ast;
              },
              errors: function() {
                return errors;
              }
            };
          }
          jsonata3.parser = parser;
          return jsonata3;
        }();
        module4.exports = jsonata2;
      }, { "./datetime": 1, "./functions": 2, "./parser": 4, "./signature": 5, "./utils": 6 }], 4: [function(require2, module4, exports4) {
        var parseSignature = require2("./signature");
        const parser = (() => {
          "use strict";
          var operators = {
            ".": 75,
            "[": 80,
            "]": 0,
            "{": 70,
            "}": 0,
            "(": 80,
            ")": 0,
            ",": 0,
            "@": 80,
            "#": 80,
            ";": 80,
            ":": 80,
            "?": 20,
            "+": 50,
            "-": 50,
            "*": 60,
            "/": 60,
            "%": 60,
            "|": 20,
            "=": 40,
            "<": 40,
            ">": 40,
            "^": 40,
            "**": 60,
            "..": 20,
            ":=": 10,
            "!=": 40,
            "<=": 40,
            ">=": 40,
            "~>": 40,
            "and": 30,
            "or": 25,
            "in": 40,
            "&": 50,
            "!": 0,
            // not an operator, but needed as a stop character for name tokens
            "~": 0
            // not an operator, but needed as a stop character for name tokens
          };
          var escapes = {
            // JSON string escape sequences - see json.org
            '"': '"',
            "\\": "\\",
            "/": "/",
            "b": "\b",
            "f": "\f",
            "n": "\n",
            "r": "\r",
            "t": "	"
          };
          var tokenizer = function(path) {
            var position = 0;
            var length = path.length;
            var create = function(type, value) {
              var obj = { type, value, position };
              return obj;
            };
            var scanRegex = function() {
              var start = position;
              var depth = 0;
              var pattern;
              var flags;
              var isClosingSlash = function(position2) {
                if (path.charAt(position2) === "/" && depth === 0) {
                  var backslashCount = 0;
                  while (path.charAt(position2 - (backslashCount + 1)) === "\\") {
                    backslashCount++;
                  }
                  if (backslashCount % 2 === 0) {
                    return true;
                  }
                }
                return false;
              };
              while (position < length) {
                var currentChar = path.charAt(position);
                if (isClosingSlash(position)) {
                  pattern = path.substring(start, position);
                  if (pattern === "") {
                    throw {
                      code: "S0301",
                      stack: new Error().stack,
                      position
                    };
                  }
                  position++;
                  currentChar = path.charAt(position);
                  start = position;
                  while (currentChar === "i" || currentChar === "m") {
                    position++;
                    currentChar = path.charAt(position);
                  }
                  flags = path.substring(start, position) + "g";
                  return new RegExp(pattern, flags);
                }
                if ((currentChar === "(" || currentChar === "[" || currentChar === "{") && path.charAt(position - 1) !== "\\") {
                  depth++;
                }
                if ((currentChar === ")" || currentChar === "]" || currentChar === "}") && path.charAt(position - 1) !== "\\") {
                  depth--;
                }
                position++;
              }
              throw {
                code: "S0302",
                stack: new Error().stack,
                position
              };
            };
            var next = function(prefix) {
              if (position >= length)
                return null;
              var currentChar = path.charAt(position);
              while (position < length && " 	\n\r\v".indexOf(currentChar) > -1) {
                position++;
                currentChar = path.charAt(position);
              }
              if (currentChar === "/" && path.charAt(position + 1) === "*") {
                var commentStart = position;
                position += 2;
                currentChar = path.charAt(position);
                while (!(currentChar === "*" && path.charAt(position + 1) === "/")) {
                  currentChar = path.charAt(++position);
                  if (position >= length) {
                    throw {
                      code: "S0106",
                      stack: new Error().stack,
                      position: commentStart
                    };
                  }
                }
                position += 2;
                currentChar = path.charAt(position);
                return next(prefix);
              }
              if (prefix !== true && currentChar === "/") {
                position++;
                return create("regex", scanRegex());
              }
              if (currentChar === "." && path.charAt(position + 1) === ".") {
                position += 2;
                return create("operator", "..");
              }
              if (currentChar === ":" && path.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", ":=");
              }
              if (currentChar === "!" && path.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", "!=");
              }
              if (currentChar === ">" && path.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", ">=");
              }
              if (currentChar === "<" && path.charAt(position + 1) === "=") {
                position += 2;
                return create("operator", "<=");
              }
              if (currentChar === "*" && path.charAt(position + 1) === "*") {
                position += 2;
                return create("operator", "**");
              }
              if (currentChar === "~" && path.charAt(position + 1) === ">") {
                position += 2;
                return create("operator", "~>");
              }
              if (Object.prototype.hasOwnProperty.call(operators, currentChar)) {
                position++;
                return create("operator", currentChar);
              }
              if (currentChar === '"' || currentChar === "'") {
                var quoteType = currentChar;
                position++;
                var qstr = "";
                while (position < length) {
                  currentChar = path.charAt(position);
                  if (currentChar === "\\") {
                    position++;
                    currentChar = path.charAt(position);
                    if (Object.prototype.hasOwnProperty.call(escapes, currentChar)) {
                      qstr += escapes[currentChar];
                    } else if (currentChar === "u") {
                      var octets = path.substr(position + 1, 4);
                      if (/^[0-9a-fA-F]+$/.test(octets)) {
                        var codepoint = parseInt(octets, 16);
                        qstr += String.fromCharCode(codepoint);
                        position += 4;
                      } else {
                        throw {
                          code: "S0104",
                          stack: new Error().stack,
                          position
                        };
                      }
                    } else {
                      throw {
                        code: "S0103",
                        stack: new Error().stack,
                        position,
                        token: currentChar
                      };
                    }
                  } else if (currentChar === quoteType) {
                    position++;
                    return create("string", qstr);
                  } else {
                    qstr += currentChar;
                  }
                  position++;
                }
                throw {
                  code: "S0101",
                  stack: new Error().stack,
                  position
                };
              }
              var numregex = /^-?(0|([1-9][0-9]*))(\.[0-9]+)?([Ee][-+]?[0-9]+)?/;
              var match = numregex.exec(path.substring(position));
              if (match !== null) {
                var num = parseFloat(match[0]);
                if (!isNaN(num) && isFinite(num)) {
                  position += match[0].length;
                  return create("number", num);
                } else {
                  throw {
                    code: "S0102",
                    stack: new Error().stack,
                    position,
                    token: match[0]
                  };
                }
              }
              var name;
              if (currentChar === "`") {
                position++;
                var end = path.indexOf("`", position);
                if (end !== -1) {
                  name = path.substring(position, end);
                  position = end + 1;
                  return create("name", name);
                }
                position = length;
                throw {
                  code: "S0105",
                  stack: new Error().stack,
                  position
                };
              }
              var i = position;
              var ch;
              for (; ; ) {
                ch = path.charAt(i);
                if (i === length || " 	\n\r\v".indexOf(ch) > -1 || Object.prototype.hasOwnProperty.call(operators, ch)) {
                  if (path.charAt(position) === "$") {
                    name = path.substring(position + 1, i);
                    position = i;
                    return create("variable", name);
                  } else {
                    name = path.substring(position, i);
                    position = i;
                    switch (name) {
                      case "or":
                      case "in":
                      case "and":
                        return create("operator", name);
                      case "true":
                        return create("value", true);
                      case "false":
                        return create("value", false);
                      case "null":
                        return create("value", null);
                      default:
                        if (position === length && name === "") {
                          return null;
                        }
                        return create("name", name);
                    }
                  }
                } else {
                  i++;
                }
              }
            };
            return next;
          };
          var parser2 = function(source, recover) {
            var node;
            var lexer;
            var symbol_table = {};
            var errors = [];
            var remainingTokens = function() {
              var remaining = [];
              if (node.id !== "(end)") {
                remaining.push({ type: node.type, value: node.value, position: node.position });
              }
              var nxt = lexer();
              while (nxt !== null) {
                remaining.push(nxt);
                nxt = lexer();
              }
              return remaining;
            };
            var base_symbol = {
              nud: function() {
                var err2 = {
                  code: "S0211",
                  token: this.value,
                  position: this.position
                };
                if (recover) {
                  err2.remaining = remainingTokens();
                  err2.type = "error";
                  errors.push(err2);
                  return err2;
                } else {
                  err2.stack = new Error().stack;
                  throw err2;
                }
              }
            };
            var symbol = function(id, bp) {
              var s = symbol_table[id];
              bp = bp || 0;
              if (s) {
                if (bp >= s.lbp) {
                  s.lbp = bp;
                }
              } else {
                s = Object.create(base_symbol);
                s.id = s.value = id;
                s.lbp = bp;
                symbol_table[id] = s;
              }
              return s;
            };
            var handleError = function(err2) {
              if (recover) {
                err2.remaining = remainingTokens();
                errors.push(err2);
                var symbol2 = symbol_table["(error)"];
                node = Object.create(symbol2);
                node.error = err2;
                node.type = "(error)";
                return node;
              } else {
                err2.stack = new Error().stack;
                throw err2;
              }
            };
            var advance = function(id, infix2) {
              if (id && node.id !== id) {
                var code;
                if (node.id === "(end)") {
                  code = "S0203";
                } else {
                  code = "S0202";
                }
                var err2 = {
                  code,
                  position: node.position,
                  token: node.value,
                  value: id
                };
                return handleError(err2);
              }
              var next_token = lexer(infix2);
              if (next_token === null) {
                node = symbol_table["(end)"];
                node.position = source.length;
                return node;
              }
              var value = next_token.value;
              var type = next_token.type;
              var symbol2;
              switch (type) {
                case "name":
                case "variable":
                  symbol2 = symbol_table["(name)"];
                  break;
                case "operator":
                  symbol2 = symbol_table[value];
                  if (!symbol2) {
                    return handleError({
                      code: "S0204",
                      stack: new Error().stack,
                      position: next_token.position,
                      token: value
                    });
                  }
                  break;
                case "string":
                case "number":
                case "value":
                  symbol2 = symbol_table["(literal)"];
                  break;
                case "regex":
                  type = "regex";
                  symbol2 = symbol_table["(regex)"];
                  break;
                default:
                  return handleError({
                    code: "S0205",
                    stack: new Error().stack,
                    position: next_token.position,
                    token: value
                  });
              }
              node = Object.create(symbol2);
              node.value = value;
              node.type = type;
              node.position = next_token.position;
              return node;
            };
            var expression = function(rbp) {
              var left;
              var t = node;
              advance(null, true);
              left = t.nud();
              while (rbp < node.lbp) {
                t = node;
                advance();
                left = t.led(left);
              }
              return left;
            };
            var terminal = function(id) {
              var s = symbol(id, 0);
              s.nud = function() {
                return this;
              };
            };
            var infix = function(id, bp, led) {
              var bindingPower = bp || operators[id];
              var s = symbol(id, bindingPower);
              s.led = led || function(left) {
                this.lhs = left;
                this.rhs = expression(bindingPower);
                this.type = "binary";
                return this;
              };
              return s;
            };
            var infixr = function(id, bp, led) {
              var s = symbol(id, bp);
              s.led = led;
              return s;
            };
            var prefix = function(id, nud) {
              var s = symbol(id);
              s.nud = nud || function() {
                this.expression = expression(70);
                this.type = "unary";
                return this;
              };
              return s;
            };
            terminal("(end)");
            terminal("(name)");
            terminal("(literal)");
            terminal("(regex)");
            symbol(":");
            symbol(";");
            symbol(",");
            symbol(")");
            symbol("]");
            symbol("}");
            symbol("..");
            infix(".");
            infix("+");
            infix("-");
            infix("*");
            infix("/");
            infix("%");
            infix("=");
            infix("<");
            infix(">");
            infix("!=");
            infix("<=");
            infix(">=");
            infix("&");
            infix("and");
            infix("or");
            infix("in");
            terminal("and");
            terminal("or");
            terminal("in");
            prefix("-");
            infix("~>");
            infixr("(error)", 10, function(left) {
              this.lhs = left;
              this.error = node.error;
              this.remaining = remainingTokens();
              this.type = "error";
              return this;
            });
            prefix("*", function() {
              this.type = "wildcard";
              return this;
            });
            prefix("**", function() {
              this.type = "descendant";
              return this;
            });
            prefix("%", function() {
              this.type = "parent";
              return this;
            });
            infix("(", operators["("], function(left) {
              this.procedure = left;
              this.type = "function";
              this.arguments = [];
              if (node.id !== ")") {
                for (; ; ) {
                  if (node.type === "operator" && node.id === "?") {
                    this.type = "partial";
                    this.arguments.push(node);
                    advance("?");
                  } else {
                    this.arguments.push(expression(0));
                  }
                  if (node.id !== ",")
                    break;
                  advance(",");
                }
              }
              advance(")", true);
              if (left.type === "name" && (left.value === "function" || left.value === "\u03BB")) {
                this.arguments.forEach(function(arg, index) {
                  if (arg.type !== "variable") {
                    return handleError({
                      code: "S0208",
                      stack: new Error().stack,
                      position: arg.position,
                      token: arg.value,
                      value: index + 1
                    });
                  }
                });
                this.type = "lambda";
                if (node.id === "<") {
                  var sigPos = node.position;
                  var depth = 1;
                  var sig = "<";
                  while (depth > 0 && node.id !== "{" && node.id !== "(end)") {
                    var tok = advance();
                    if (tok.id === ">") {
                      depth--;
                    } else if (tok.id === "<") {
                      depth++;
                    }
                    sig += tok.value;
                  }
                  advance(">");
                  try {
                    this.signature = parseSignature(sig);
                  } catch (err2) {
                    err2.position = sigPos + err2.offset;
                    return handleError(err2);
                  }
                }
                advance("{");
                this.body = expression(0);
                advance("}");
              }
              return this;
            });
            prefix("(", function() {
              var expressions = [];
              while (node.id !== ")") {
                expressions.push(expression(0));
                if (node.id !== ";") {
                  break;
                }
                advance(";");
              }
              advance(")", true);
              this.type = "block";
              this.expressions = expressions;
              return this;
            });
            prefix("[", function() {
              var a = [];
              if (node.id !== "]") {
                for (; ; ) {
                  var item = expression(0);
                  if (node.id === "..") {
                    var range = { type: "binary", value: "..", position: node.position, lhs: item };
                    advance("..");
                    range.rhs = expression(0);
                    item = range;
                  }
                  a.push(item);
                  if (node.id !== ",") {
                    break;
                  }
                  advance(",");
                }
              }
              advance("]", true);
              this.expressions = a;
              this.type = "unary";
              return this;
            });
            infix("[", operators["["], function(left) {
              if (node.id === "]") {
                var step = left;
                while (step && step.type === "binary" && step.value === "[") {
                  step = step.lhs;
                }
                step.keepArray = true;
                advance("]");
                return left;
              } else {
                this.lhs = left;
                this.rhs = expression(operators["]"]);
                this.type = "binary";
                advance("]", true);
                return this;
              }
            });
            infix("^", operators["^"], function(left) {
              advance("(");
              var terms = [];
              for (; ; ) {
                var term = {
                  descending: false
                };
                if (node.id === "<") {
                  advance("<");
                } else if (node.id === ">") {
                  term.descending = true;
                  advance(">");
                } else {
                }
                term.expression = expression(0);
                terms.push(term);
                if (node.id !== ",") {
                  break;
                }
                advance(",");
              }
              advance(")");
              this.lhs = left;
              this.rhs = terms;
              this.type = "binary";
              return this;
            });
            var objectParser = function(left) {
              var a = [];
              if (node.id !== "}") {
                for (; ; ) {
                  var n = expression(0);
                  advance(":");
                  var v = expression(0);
                  a.push([n, v]);
                  if (node.id !== ",") {
                    break;
                  }
                  advance(",");
                }
              }
              advance("}", true);
              if (typeof left === "undefined") {
                this.lhs = a;
                this.type = "unary";
              } else {
                this.lhs = left;
                this.rhs = a;
                this.type = "binary";
              }
              return this;
            };
            prefix("{", objectParser);
            infix("{", operators["{"], objectParser);
            infixr(":=", operators[":="], function(left) {
              if (left.type !== "variable") {
                return handleError({
                  code: "S0212",
                  stack: new Error().stack,
                  position: left.position,
                  token: left.value
                });
              }
              this.lhs = left;
              this.rhs = expression(operators[":="] - 1);
              this.type = "binary";
              return this;
            });
            infix("@", operators["@"], function(left) {
              this.lhs = left;
              this.rhs = expression(operators["@"]);
              if (this.rhs.type !== "variable") {
                return handleError({
                  code: "S0214",
                  stack: new Error().stack,
                  position: this.rhs.position,
                  token: "@"
                });
              }
              this.type = "binary";
              return this;
            });
            infix("#", operators["#"], function(left) {
              this.lhs = left;
              this.rhs = expression(operators["#"]);
              if (this.rhs.type !== "variable") {
                return handleError({
                  code: "S0214",
                  stack: new Error().stack,
                  position: this.rhs.position,
                  token: "#"
                });
              }
              this.type = "binary";
              return this;
            });
            infix("?", operators["?"], function(left) {
              this.type = "condition";
              this.condition = left;
              this.then = expression(0);
              if (node.id === ":") {
                advance(":");
                this.else = expression(0);
              }
              return this;
            });
            prefix("|", function() {
              this.type = "transform";
              this.pattern = expression(0);
              advance("|");
              this.update = expression(0);
              if (node.id === ",") {
                advance(",");
                this.delete = expression(0);
              }
              advance("|");
              return this;
            });
            var tailCallOptimize = function(expr2) {
              var result;
              if (expr2.type === "function" && !expr2.predicate) {
                var thunk = { type: "lambda", thunk: true, arguments: [], position: expr2.position };
                thunk.body = expr2;
                result = thunk;
              } else if (expr2.type === "condition") {
                expr2.then = tailCallOptimize(expr2.then);
                if (typeof expr2.else !== "undefined") {
                  expr2.else = tailCallOptimize(expr2.else);
                }
                result = expr2;
              } else if (expr2.type === "block") {
                var length = expr2.expressions.length;
                if (length > 0) {
                  expr2.expressions[length - 1] = tailCallOptimize(expr2.expressions[length - 1]);
                }
                result = expr2;
              } else {
                result = expr2;
              }
              return result;
            };
            var ancestorLabel = 0;
            var ancestorIndex = 0;
            var ancestry = [];
            var seekParent = function(node2, slot) {
              switch (node2.type) {
                case "name":
                case "wildcard":
                  slot.level--;
                  if (slot.level === 0) {
                    if (typeof node2.ancestor === "undefined") {
                      node2.ancestor = slot;
                    } else {
                      ancestry[slot.index].slot.label = node2.ancestor.label;
                      node2.ancestor = slot;
                    }
                    node2.tuple = true;
                  }
                  break;
                case "parent":
                  slot.level++;
                  break;
                case "block":
                  if (node2.expressions.length > 0) {
                    node2.tuple = true;
                    slot = seekParent(node2.expressions[node2.expressions.length - 1], slot);
                  }
                  break;
                case "path":
                  node2.tuple = true;
                  var index = node2.steps.length - 1;
                  slot = seekParent(node2.steps[index--], slot);
                  while (slot.level > 0 && index >= 0) {
                    slot = seekParent(node2.steps[index--], slot);
                  }
                  break;
                default:
                  throw {
                    code: "S0217",
                    token: node2.type,
                    position: node2.position
                  };
              }
              return slot;
            };
            var pushAncestry = function(result, value) {
              if (typeof value.seekingParent !== "undefined" || value.type === "parent") {
                var slots = typeof value.seekingParent !== "undefined" ? value.seekingParent : [];
                if (value.type === "parent") {
                  slots.push(value.slot);
                }
                if (typeof result.seekingParent === "undefined") {
                  result.seekingParent = slots;
                } else {
                  Array.prototype.push.apply(result.seekingParent, slots);
                }
              }
            };
            var resolveAncestry = function(path) {
              var index = path.steps.length - 1;
              var laststep = path.steps[index];
              var slots = typeof laststep.seekingParent !== "undefined" ? laststep.seekingParent : [];
              if (laststep.type === "parent") {
                slots.push(laststep.slot);
              }
              for (var is = 0; is < slots.length; is++) {
                var slot = slots[is];
                index = path.steps.length - 2;
                while (slot.level > 0) {
                  if (index < 0) {
                    if (typeof path.seekingParent === "undefined") {
                      path.seekingParent = [slot];
                    } else {
                      path.seekingParent.push(slot);
                    }
                    break;
                  }
                  var step = path.steps[index--];
                  while (index >= 0 && step.focus && path.steps[index].focus) {
                    step = path.steps[index--];
                  }
                  slot = seekParent(step, slot);
                }
              }
            };
            var processAST = function(expr2) {
              var result;
              switch (expr2.type) {
                case "binary":
                  switch (expr2.value) {
                    case ".":
                      var lstep = processAST(expr2.lhs);
                      if (lstep.type === "path") {
                        result = lstep;
                      } else {
                        result = { type: "path", steps: [lstep] };
                      }
                      if (lstep.type === "parent") {
                        result.seekingParent = [lstep.slot];
                      }
                      var rest = processAST(expr2.rhs);
                      if (rest.type === "function" && rest.procedure.type === "path" && rest.procedure.steps.length === 1 && rest.procedure.steps[0].type === "name" && result.steps[result.steps.length - 1].type === "function") {
                        result.steps[result.steps.length - 1].nextFunction = rest.procedure.steps[0].value;
                      }
                      if (rest.type === "path") {
                        Array.prototype.push.apply(result.steps, rest.steps);
                      } else {
                        if (typeof rest.predicate !== "undefined") {
                          rest.stages = rest.predicate;
                          delete rest.predicate;
                        }
                        result.steps.push(rest);
                      }
                      result.steps.filter(function(step2) {
                        if (step2.type === "number" || step2.type === "value") {
                          throw {
                            code: "S0213",
                            stack: new Error().stack,
                            position: step2.position,
                            value: step2.value
                          };
                        }
                        return step2.type === "string";
                      }).forEach(function(lit) {
                        lit.type = "name";
                      });
                      if (result.steps.filter(function(step2) {
                        return step2.keepArray === true;
                      }).length > 0) {
                        result.keepSingletonArray = true;
                      }
                      var firststep = result.steps[0];
                      if (firststep.type === "unary" && firststep.value === "[") {
                        firststep.consarray = true;
                      }
                      var laststep = result.steps[result.steps.length - 1];
                      if (laststep.type === "unary" && laststep.value === "[") {
                        laststep.consarray = true;
                      }
                      resolveAncestry(result);
                      break;
                    case "[":
                      result = processAST(expr2.lhs);
                      var step = result;
                      var type = "predicate";
                      if (result.type === "path") {
                        step = result.steps[result.steps.length - 1];
                        type = "stages";
                      }
                      if (typeof step.group !== "undefined") {
                        throw {
                          code: "S0209",
                          stack: new Error().stack,
                          position: expr2.position
                        };
                      }
                      if (typeof step[type] === "undefined") {
                        step[type] = [];
                      }
                      var predicate = processAST(expr2.rhs);
                      if (typeof predicate.seekingParent !== "undefined") {
                        predicate.seekingParent.forEach((slot) => {
                          if (slot.level === 1) {
                            seekParent(step, slot);
                          } else {
                            slot.level--;
                          }
                        });
                        pushAncestry(step, predicate);
                      }
                      step[type].push({ type: "filter", expr: predicate, position: expr2.position });
                      break;
                    case "{":
                      result = processAST(expr2.lhs);
                      if (typeof result.group !== "undefined") {
                        throw {
                          code: "S0210",
                          stack: new Error().stack,
                          position: expr2.position
                        };
                      }
                      result.group = {
                        lhs: expr2.rhs.map(function(pair) {
                          return [processAST(pair[0]), processAST(pair[1])];
                        }),
                        position: expr2.position
                      };
                      break;
                    case "^":
                      result = processAST(expr2.lhs);
                      if (result.type !== "path") {
                        result = { type: "path", steps: [result] };
                      }
                      var sortStep = { type: "sort", position: expr2.position };
                      sortStep.terms = expr2.rhs.map(function(terms) {
                        var expression2 = processAST(terms.expression);
                        pushAncestry(sortStep, expression2);
                        return {
                          descending: terms.descending,
                          expression: expression2
                        };
                      });
                      result.steps.push(sortStep);
                      resolveAncestry(result);
                      break;
                    case ":=":
                      result = { type: "bind", value: expr2.value, position: expr2.position };
                      result.lhs = processAST(expr2.lhs);
                      result.rhs = processAST(expr2.rhs);
                      pushAncestry(result, result.rhs);
                      break;
                    case "@":
                      result = processAST(expr2.lhs);
                      step = result;
                      if (result.type === "path") {
                        step = result.steps[result.steps.length - 1];
                      }
                      if (typeof step.stages !== "undefined" || typeof step.predicate !== "undefined") {
                        throw {
                          code: "S0215",
                          stack: new Error().stack,
                          position: expr2.position
                        };
                      }
                      if (step.type === "sort") {
                        throw {
                          code: "S0216",
                          stack: new Error().stack,
                          position: expr2.position
                        };
                      }
                      if (expr2.keepArray) {
                        step.keepArray = true;
                      }
                      step.focus = expr2.rhs.value;
                      step.tuple = true;
                      break;
                    case "#":
                      result = processAST(expr2.lhs);
                      step = result;
                      if (result.type === "path") {
                        step = result.steps[result.steps.length - 1];
                      } else {
                        result = { type: "path", steps: [result] };
                        if (typeof step.predicate !== "undefined") {
                          step.stages = step.predicate;
                          delete step.predicate;
                        }
                      }
                      if (typeof step.stages === "undefined") {
                        step.index = expr2.rhs.value;
                      } else {
                        step.stages.push({ type: "index", value: expr2.rhs.value, position: expr2.position });
                      }
                      step.tuple = true;
                      break;
                    case "~>":
                      result = { type: "apply", value: expr2.value, position: expr2.position };
                      result.lhs = processAST(expr2.lhs);
                      result.rhs = processAST(expr2.rhs);
                      break;
                    default:
                      result = { type: expr2.type, value: expr2.value, position: expr2.position };
                      result.lhs = processAST(expr2.lhs);
                      result.rhs = processAST(expr2.rhs);
                      pushAncestry(result, result.lhs);
                      pushAncestry(result, result.rhs);
                  }
                  break;
                case "unary":
                  result = { type: expr2.type, value: expr2.value, position: expr2.position };
                  if (expr2.value === "[") {
                    result.expressions = expr2.expressions.map(function(item) {
                      var value = processAST(item);
                      pushAncestry(result, value);
                      return value;
                    });
                  } else if (expr2.value === "{") {
                    result.lhs = expr2.lhs.map(function(pair) {
                      var key = processAST(pair[0]);
                      pushAncestry(result, key);
                      var value = processAST(pair[1]);
                      pushAncestry(result, value);
                      return [key, value];
                    });
                  } else {
                    result.expression = processAST(expr2.expression);
                    if (expr2.value === "-" && result.expression.type === "number") {
                      result = result.expression;
                      result.value = -result.value;
                    } else {
                      pushAncestry(result, result.expression);
                    }
                  }
                  break;
                case "function":
                case "partial":
                  result = { type: expr2.type, name: expr2.name, value: expr2.value, position: expr2.position };
                  result.arguments = expr2.arguments.map(function(arg) {
                    var argAST = processAST(arg);
                    pushAncestry(result, argAST);
                    return argAST;
                  });
                  result.procedure = processAST(expr2.procedure);
                  break;
                case "lambda":
                  result = {
                    type: expr2.type,
                    arguments: expr2.arguments,
                    signature: expr2.signature,
                    position: expr2.position
                  };
                  var body = processAST(expr2.body);
                  result.body = tailCallOptimize(body);
                  break;
                case "condition":
                  result = { type: expr2.type, position: expr2.position };
                  result.condition = processAST(expr2.condition);
                  pushAncestry(result, result.condition);
                  result.then = processAST(expr2.then);
                  pushAncestry(result, result.then);
                  if (typeof expr2.else !== "undefined") {
                    result.else = processAST(expr2.else);
                    pushAncestry(result, result.else);
                  }
                  break;
                case "transform":
                  result = { type: expr2.type, position: expr2.position };
                  result.pattern = processAST(expr2.pattern);
                  result.update = processAST(expr2.update);
                  if (typeof expr2.delete !== "undefined") {
                    result.delete = processAST(expr2.delete);
                  }
                  break;
                case "block":
                  result = { type: expr2.type, position: expr2.position };
                  result.expressions = expr2.expressions.map(function(item) {
                    var part = processAST(item);
                    pushAncestry(result, part);
                    if (part.consarray || part.type === "path" && part.steps[0].consarray) {
                      result.consarray = true;
                    }
                    return part;
                  });
                  break;
                case "name":
                  result = { type: "path", steps: [expr2] };
                  if (expr2.keepArray) {
                    result.keepSingletonArray = true;
                  }
                  break;
                case "parent":
                  result = { type: "parent", slot: { label: "!" + ancestorLabel++, level: 1, index: ancestorIndex++ } };
                  ancestry.push(result);
                  break;
                case "string":
                case "number":
                case "value":
                case "wildcard":
                case "descendant":
                case "variable":
                case "regex":
                  result = expr2;
                  break;
                case "operator":
                  if (expr2.value === "and" || expr2.value === "or" || expr2.value === "in") {
                    expr2.type = "name";
                    result = processAST(expr2);
                  } else if (expr2.value === "?") {
                    result = expr2;
                  } else {
                    throw {
                      code: "S0201",
                      stack: new Error().stack,
                      position: expr2.position,
                      token: expr2.value
                    };
                  }
                  break;
                case "error":
                  result = expr2;
                  if (expr2.lhs) {
                    result = processAST(expr2.lhs);
                  }
                  break;
                default:
                  var code = "S0206";
                  if (expr2.id === "(end)") {
                    code = "S0207";
                  }
                  var err2 = {
                    code,
                    position: expr2.position,
                    token: expr2.value
                  };
                  if (recover) {
                    errors.push(err2);
                    return { type: "error", error: err2 };
                  } else {
                    err2.stack = new Error().stack;
                    throw err2;
                  }
              }
              if (expr2.keepArray) {
                result.keepArray = true;
              }
              return result;
            };
            lexer = tokenizer(source);
            advance();
            var expr = expression(0);
            if (node.id !== "(end)") {
              var err = {
                code: "S0201",
                position: node.position,
                token: node.value
              };
              handleError(err);
            }
            expr = processAST(expr);
            if (expr.type === "parent" || typeof expr.seekingParent !== "undefined") {
              throw {
                code: "S0217",
                token: expr.type,
                position: expr.position
              };
            }
            if (errors.length > 0) {
              expr.errors = errors;
            }
            return expr;
          };
          return parser2;
        })();
        module4.exports = parser;
      }, { "./signature": 5 }], 5: [function(require2, module4, exports4) {
        var utils = require2("./utils");
        const signature = (() => {
          "use strict";
          var arraySignatureMapping = {
            "a": "arrays",
            "b": "booleans",
            "f": "functions",
            "n": "numbers",
            "o": "objects",
            "s": "strings"
          };
          function parseSignature(signature2) {
            var position = 1;
            var params = [];
            var param = {};
            var prevParam = param;
            while (position < signature2.length) {
              var symbol = signature2.charAt(position);
              if (symbol === ":") {
                break;
              }
              var next = function() {
                params.push(param);
                prevParam = param;
                param = {};
              };
              var findClosingBracket = function(str, start, openSymbol, closeSymbol) {
                var depth = 1;
                var position2 = start;
                while (position2 < str.length) {
                  position2++;
                  symbol = str.charAt(position2);
                  if (symbol === closeSymbol) {
                    depth--;
                    if (depth === 0) {
                      break;
                    }
                  } else if (symbol === openSymbol) {
                    depth++;
                  }
                }
                return position2;
              };
              switch (symbol) {
                case "s":
                case "n":
                case "b":
                case "l":
                case "o":
                  param.regex = "[" + symbol + "m]";
                  param.type = symbol;
                  next();
                  break;
                case "a":
                  param.regex = "[asnblfom]";
                  param.type = symbol;
                  param.array = true;
                  next();
                  break;
                case "f":
                  param.regex = "f";
                  param.type = symbol;
                  next();
                  break;
                case "j":
                  param.regex = "[asnblom]";
                  param.type = symbol;
                  next();
                  break;
                case "x":
                  param.regex = "[asnblfom]";
                  param.type = symbol;
                  next();
                  break;
                case "-":
                  prevParam.context = true;
                  prevParam.contextRegex = new RegExp(prevParam.regex);
                  prevParam.regex += "?";
                  break;
                case "?":
                case "+":
                  prevParam.regex += symbol;
                  break;
                case "(":
                  var endParen = findClosingBracket(signature2, position, "(", ")");
                  var choice = signature2.substring(position + 1, endParen);
                  if (choice.indexOf("<") === -1) {
                    param.regex = "[" + choice + "m]";
                  } else {
                    throw {
                      code: "S0402",
                      stack: new Error().stack,
                      value: choice,
                      offset: position
                    };
                  }
                  param.type = "(" + choice + ")";
                  position = endParen;
                  next();
                  break;
                case "<":
                  if (prevParam.type === "a" || prevParam.type === "f") {
                    var endPos = findClosingBracket(signature2, position, "<", ">");
                    prevParam.subtype = signature2.substring(position + 1, endPos);
                    position = endPos;
                  } else {
                    throw {
                      code: "S0401",
                      stack: new Error().stack,
                      value: prevParam.type,
                      offset: position
                    };
                  }
                  break;
              }
              position++;
            }
            var regexStr = "^" + params.map(function(param2) {
              return "(" + param2.regex + ")";
            }).join("") + "$";
            var regex = new RegExp(regexStr);
            var getSymbol = function(value) {
              var symbol2;
              if (utils.isFunction(value)) {
                symbol2 = "f";
              } else {
                var type = typeof value;
                switch (type) {
                  case "string":
                    symbol2 = "s";
                    break;
                  case "number":
                    symbol2 = "n";
                    break;
                  case "boolean":
                    symbol2 = "b";
                    break;
                  case "object":
                    if (value === null) {
                      symbol2 = "l";
                    } else if (Array.isArray(value)) {
                      symbol2 = "a";
                    } else {
                      symbol2 = "o";
                    }
                    break;
                  case "undefined":
                  default:
                    symbol2 = "m";
                }
              }
              return symbol2;
            };
            var throwValidationError = function(badArgs, badSig) {
              var partialPattern = "^";
              var goodTo = 0;
              for (var index = 0; index < params.length; index++) {
                partialPattern += params[index].regex;
                var match = badSig.match(partialPattern);
                if (match === null) {
                  throw {
                    code: "T0410",
                    stack: new Error().stack,
                    value: badArgs[goodTo],
                    index: goodTo + 1
                  };
                }
                goodTo = match[0].length;
              }
              throw {
                code: "T0410",
                stack: new Error().stack,
                value: badArgs[goodTo],
                index: goodTo + 1
              };
            };
            return {
              definition: signature2,
              validate: function(args, context) {
                var suppliedSig = "";
                args.forEach(function(arg) {
                  suppliedSig += getSymbol(arg);
                });
                var isValid = regex.exec(suppliedSig);
                if (isValid) {
                  var validatedArgs = [];
                  var argIndex = 0;
                  params.forEach(function(param2, index) {
                    var arg = args[argIndex];
                    var match = isValid[index + 1];
                    if (match === "") {
                      if (param2.context && param2.contextRegex) {
                        var contextType = getSymbol(context);
                        if (param2.contextRegex.test(contextType)) {
                          validatedArgs.push(context);
                        } else {
                          throw {
                            code: "T0411",
                            stack: new Error().stack,
                            value: context,
                            index: argIndex + 1
                          };
                        }
                      } else {
                        validatedArgs.push(arg);
                        argIndex++;
                      }
                    } else {
                      match.split("").forEach(function(single) {
                        if (param2.type === "a") {
                          if (single === "m") {
                            arg = void 0;
                          } else {
                            arg = args[argIndex];
                            var arrayOK = true;
                            if (typeof param2.subtype !== "undefined") {
                              if (single !== "a" && match !== param2.subtype) {
                                arrayOK = false;
                              } else if (single === "a") {
                                if (arg.length > 0) {
                                  var itemType = getSymbol(arg[0]);
                                  if (itemType !== param2.subtype.charAt(0)) {
                                    arrayOK = false;
                                  } else {
                                    var differentItems = arg.filter(function(val) {
                                      return getSymbol(val) !== itemType;
                                    });
                                    arrayOK = differentItems.length === 0;
                                  }
                                }
                              }
                            }
                            if (!arrayOK) {
                              throw {
                                code: "T0412",
                                stack: new Error().stack,
                                value: arg,
                                index: argIndex + 1,
                                type: arraySignatureMapping[param2.subtype]
                              };
                            }
                            if (single !== "a") {
                              arg = [arg];
                            }
                          }
                          validatedArgs.push(arg);
                          argIndex++;
                        } else {
                          validatedArgs.push(arg);
                          argIndex++;
                        }
                      });
                    }
                  });
                  return validatedArgs;
                }
                throwValidationError(args, suppliedSig);
              }
            };
          }
          return parseSignature;
        })();
        module4.exports = signature;
      }, { "./utils": 6 }], 6: [function(require2, module4, exports4) {
        const utils = (() => {
          "use strict";
          function isNumeric(n) {
            var isNum = false;
            if (typeof n === "number") {
              isNum = !isNaN(n);
              if (isNum && !isFinite(n)) {
                throw {
                  code: "D1001",
                  value: n,
                  stack: new Error().stack
                };
              }
            }
            return isNum;
          }
          function isArrayOfStrings(arg) {
            var result = false;
            if (Array.isArray(arg)) {
              result = arg.filter(function(item) {
                return typeof item !== "string";
              }).length === 0;
            }
            return result;
          }
          function isArrayOfNumbers(arg) {
            var result = false;
            if (Array.isArray(arg)) {
              result = arg.filter(function(item) {
                return !isNumeric(item);
              }).length === 0;
            }
            return result;
          }
          function createSequence() {
            var sequence = [];
            sequence.sequence = true;
            if (arguments.length === 1) {
              sequence.push(arguments[0]);
            }
            return sequence;
          }
          function isSequence(value) {
            return value.sequence === true && Array.isArray(value);
          }
          function isFunction(arg) {
            return arg && (arg._jsonata_function === true || arg._jsonata_lambda === true) || typeof arg === "function";
          }
          function getFunctionArity(func) {
            var arity = typeof func.arity === "number" ? func.arity : typeof func.implementation === "function" ? func.implementation.length : typeof func.length === "number" ? func.length : func.arguments.length;
            return arity;
          }
          function isLambda(arg) {
            return arg && arg._jsonata_lambda === true;
          }
          var iteratorSymbol = (typeof Symbol === "function" ? Symbol : {}).iterator || "@@iterator";
          function isIterable(arg) {
            return typeof arg === "object" && arg !== null && iteratorSymbol in arg && "next" in arg && typeof arg.next === "function";
          }
          function isDeepEqual(lhs, rhs) {
            if (lhs === rhs) {
              return true;
            }
            if (typeof lhs === "object" && typeof rhs === "object" && lhs !== null && rhs !== null) {
              if (Array.isArray(lhs) && Array.isArray(rhs)) {
                if (lhs.length !== rhs.length) {
                  return false;
                }
                for (var ii = 0; ii < lhs.length; ii++) {
                  if (!isDeepEqual(lhs[ii], rhs[ii])) {
                    return false;
                  }
                }
                return true;
              }
              var lkeys = Object.getOwnPropertyNames(lhs);
              var rkeys = Object.getOwnPropertyNames(rhs);
              if (lkeys.length !== rkeys.length) {
                return false;
              }
              lkeys = lkeys.sort();
              rkeys = rkeys.sort();
              for (ii = 0; ii < lkeys.length; ii++) {
                if (lkeys[ii] !== rkeys[ii]) {
                  return false;
                }
              }
              for (ii = 0; ii < lkeys.length; ii++) {
                var key = lkeys[ii];
                if (!isDeepEqual(lhs[key], rhs[key])) {
                  return false;
                }
              }
              return true;
            }
            return false;
          }
          function isPromise(arg) {
            return typeof arg === "object" && arg !== null && "then" in arg && typeof arg.then === "function";
          }
          function stringToArray(str) {
            var arr = [];
            for (let char of str) {
              arr.push(char);
            }
            return arr;
          }
          return {
            isNumeric,
            isArrayOfStrings,
            isArrayOfNumbers,
            createSequence,
            isSequence,
            isFunction,
            isLambda,
            isIterable,
            getFunctionArity,
            isDeepEqual,
            stringToArray,
            isPromise
          };
        })();
        module4.exports = utils;
      }, {}] }, {}, [3])(3);
    });
  }
});

// src/utils/parseJSONata/index.ts
var parseJSONata_exports = {};
__export(parseJSONata_exports, {
  parseJSONata: () => parseJSONata
});
module.exports = __toCommonJS(parseJSONata_exports);

// src/utils/parseJSONata/parseJSONata.ts
var import_jsonata = __toESM(require_jsonata());

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

// src/utils/parseJSONata/utils.ts
var isJSONataExprNode = (expr) => {
  return expr && typeof expr === "object" && typeof expr.type === "string";
};
var isJSONataBinaryNode = (expr) => isJSONataExprNode(expr) && expr.type === "binary";
var isJSONataPath = (expr) => isJSONataExprNode(expr) && expr.type === "path" && Array.isArray(expr.steps) && expr.steps.length > 0 && isJSONataExprNode(expr.steps[0]);
var isJSONataName = (expr) => isJSONataExprNode(expr) && expr.type === "name" && typeof expr.value === "string" && expr.value.length > 0;
var isJSONataIdentifier = (expr) => isJSONataPath(expr) && expr.steps.every(isJSONataName);
var isJSONataBlock = (expr) => isJSONataExprNode(expr) && expr.type === "block" && Array.isArray(expr.expressions) && expr.expressions.length > 0 && isJSONataExprNode(expr.expressions[0]);
var isJSONataString = (expr) => isJSONataExprNode(expr) && expr.type === "string" && typeof expr.value === "string";
var isJSONataNumber = (expr) => isJSONataExprNode(expr) && expr.type === "number" && typeof expr.value === "number";
var isJSONataBoolean = (expr) => isJSONataExprNode(expr) && expr.type === "value" && typeof expr.value === "boolean";
var isJSONataNull = (expr) => isJSONataExprNode(expr) && expr.type === "value" && expr.value === null;
var isJSONataRegex = (expr) => isJSONataExprNode(expr) && expr.type === "regex" && expr.value instanceof RegExp;
var isJSONataAnd = (expr) => isJSONataBinaryNode(expr) && expr.value === "and";
var isJSONataOr = (expr) => isJSONataBinaryNode(expr) && expr.value === "or";
var isJSONataEqual = (expr) => isJSONataBinaryNode(expr) && expr.value === "=";
var isJSONataNotEqual = (expr) => isJSONataBinaryNode(expr) && expr.value === "!=";
var isJSONataGreaterThan = (expr) => isJSONataBinaryNode(expr) && expr.value === ">";
var isJSONataGreaterThanOrEqual = (expr) => isJSONataBinaryNode(expr) && expr.value === ">=";
var isJSONataLessThan = (expr) => isJSONataBinaryNode(expr) && expr.value === "<";
var isJSONataLessThanOrEqual = (expr) => isJSONataBinaryNode(expr) && expr.value === "<=";
var isJSONataIn = (expr) => isJSONataBinaryNode(expr) && expr.value === "in" && isJSONataPath(expr.lhs) && isJSONataList(expr.rhs);
var isJSONataNot = (expr) => isJSONataExprNode(expr) && expr.type === "function" && expr.value === "(" && Array.isArray(expr.arguments) && isJSONataExprNode(expr.arguments[0]) && isJSONataExprNode(expr.procedure) && expr.procedure.value === "not" && expr.procedure.type === "variable";
var isJSONataContains = (expr) => isJSONataExprNode(expr) && expr.type === "function" && expr.value === "(" && Array.isArray(expr.arguments) && expr.arguments.length >= 2 && isJSONataExprNode(expr.arguments[0]) && isJSONataExprNode(expr.procedure) && expr.procedure.value === "contains" && expr.procedure.type === "variable";
var isJSONataToMillis = (expr) => isJSONataExprNode(expr) && expr.type === "function" && expr.value === "(" && Array.isArray(expr.arguments) && expr.arguments.length > 0 && isJSONataString(expr.arguments[0]) && isJSONataExprNode(expr.procedure) && expr.procedure.value === "toMillis" && expr.procedure.type === "variable";
var isJSONataList = (expr) => isJSONataExprNode(expr) && expr.type === "unary" && expr.value === "[" && Array.isArray(expr.expressions);
var isJSONataPrimitive = (expr) => {
  return isJSONataString(expr) || isJSONataNumber(expr) || isJSONataBoolean(expr) || isJSONataNull(expr) || isJSONataToMillis(expr);
};
var isJSONataPrimitiveList = (expr) => isJSONataList(expr) && expr.expressions.every(isJSONataPrimitive);
var isJSONataIdentifierList = (expr) => isJSONataList(expr) && expr.expressions.every(isJSONataIdentifier);
var isJSONataValidValue = (expr) => isJSONataPrimitive(expr) || isJSONataRegex(expr) || isJSONataIdentifier(expr) || isJSONataPrimitiveList(expr) || isJSONataIdentifierList(expr) || isJSONataToMillis(expr);
var isJSONataComparison = (expr) => isJSONataEqual(expr) || isJSONataNotEqual(expr) || isJSONataGreaterThan(expr) || isJSONataGreaterThanOrEqual(expr) || isJSONataLessThan(expr) || isJSONataLessThanOrEqual(expr);
var getValidValue = (expr) => {
  if (isJSONataToMillis(expr)) {
    return getValidValue(expr.arguments[0]);
  } else if (isJSONataIdentifier(expr)) {
    return getFieldFromPath(expr);
  } else if (isJSONataPrimitiveList(expr)) {
    return expr.expressions.map(getValidValue);
  } else if (isJSONataIdentifierList(expr)) {
    return expr.expressions.map(getFieldFromPath);
  }
  return expr.value;
};
var getFieldFromPath = (path) => isJSONataIdentifier(path) ? path.steps.map((s) => s.value).join(".") : (
  /* istanbul ignore next */
  ""
);
var normalizeOperator = (opType, flip) => {
  if (flip) {
    if (opType === "<")
      return ">";
    if (opType === "<=")
      return ">=";
    if (opType === ">")
      return "<";
    if (opType === ">=")
      return "<=";
  }
  return opType;
};
var negatedLikeOperators = {
  contains: "doesNotContain",
  beginsWith: "doesNotBeginWith",
  endsWith: "doesNotEndWith"
};
var generateFlatAndOrList = (expr) => {
  if (isJSONataAnd(expr) || isJSONataOr(expr)) {
    const { lhs, rhs, value: combinator } = expr;
    if (isJSONataAnd(lhs) || isJSONataOr(lhs)) {
      return [...generateFlatAndOrList(lhs), combinator, rhs];
    }
    return [lhs, combinator, rhs];
  }
  return [];
};
var generateMixedAndOrList = (expr) => {
  const arr = generateFlatAndOrList(expr);
  const returnArray = [];
  let startIndex = 0;
  for (let i = 0; i < arr.length; i += 2) {
    if (arr[i + 1] === "and") {
      startIndex = i;
      let j = 1;
      while (arr[startIndex + j] === "and") {
        i += 2;
        j += 2;
      }
      const tempAndArray = arr.slice(startIndex, i + 1);
      returnArray.push(tempAndArray);
      i -= 2;
    } else if (arr[i + 1] === "or") {
      if (i === 0 || i === arr.length - 3) {
        if (i === 0 || arr[i - 1] === "or") {
          returnArray.push(arr[i]);
        }
        returnArray.push(arr[i + 1]);
        if (i === arr.length - 3) {
          returnArray.push(arr[i + 2]);
        }
      } else {
        if (arr[i - 1] === "and") {
          returnArray.push(arr[i + 1]);
        } else {
          returnArray.push(arr[i]);
          returnArray.push(arr[i + 1]);
        }
      }
    }
  }
  if (returnArray.length === 1 && Array.isArray(returnArray[0])) {
    return returnArray[0];
  }
  return returnArray;
};

// src/utils/parseJSONata/parseJSONata.ts
function parseJSONata(jsonataInput, options = {}) {
  const { fields, independentCombinators, listsAsArrays: _laa } = options;
  const ic = !!independentCombinators;
  const fieldsFlat = getFieldsArray(fields);
  const fieldIsValid = (fieldName, operator, subordinateFieldName) => fieldIsValidUtil({
    fieldName,
    fieldsFlat,
    operator,
    subordinateFieldName,
    getValueSources: options?.getValueSources
  });
  const emptyQuery = {
    rules: [],
    ...ic ? {} : { combinator: "and" }
  };
  const parseJSONataAST = (expr, processOpts = {}) => {
    const { forwardNegation: _forwardedNegation, groupOnlyIfNecessary: _g } = processOpts;
    if (isJSONataBlock(expr)) {
      if (isJSONataAnd(expr.expressions[0]) || isJSONataOr(expr.expressions[0]) || isJSONataBlock(expr.expressions[0])) {
        return parseJSONataAST(expr.expressions[0]);
      }
      const blockOfExpr = parseJSONataAST(expr.expressions[0]);
      if (blockOfExpr) {
        return ic ? { rules: [blockOfExpr] } : {
          combinator: "and",
          rules: [blockOfExpr]
        };
      }
    } else if (isJSONataAnd(expr) || isJSONataOr(expr)) {
      if (ic) {
        const andOrList2 = generateFlatAndOrList(expr);
        const rules2 = andOrList2.map((v) => {
          if (typeof v === "string") {
            return v;
          }
          return parseJSONataAST(v);
        });
        if (!rules2.every(Boolean)) {
          return null;
        }
        return {
          rules: rules2
        };
      }
      const andOrList = generateMixedAndOrList(expr);
      const combinator = andOrList[1];
      const filteredList = andOrList.filter((v) => Array.isArray(v) || !!v && typeof v !== "string" && "type" in v).map(
        (v) => Array.isArray(v) ? v.filter((vf) => !!v && typeof vf !== "string" && "type" in vf) : v
      );
      const rules = filteredList.map((exp) => {
        if (Array.isArray(exp)) {
          return {
            combinator: "and",
            rules: exp.map((e) => parseJSONataAST(e)).filter(Boolean)
          };
        }
        return parseJSONataAST(exp);
      }).filter(Boolean);
      if (rules.length > 0) {
        return { combinator, rules };
      }
    } else if (isJSONataNot(expr)) {
      const negatedExpr = parseJSONataAST(expr.arguments[0]);
      if (negatedExpr) {
        if (!isRuleGroup(negatedExpr) && (negatedExpr.operator === "contains" || negatedExpr.operator === "beginsWith" || negatedExpr.operator === "endsWith")) {
          return {
            ...negatedExpr,
            operator: negatedLikeOperators[negatedExpr.operator]
          };
        }
        return ic ? { rules: [negatedExpr], not: true } : {
          combinator: "and",
          rules: [negatedExpr],
          not: true
        };
      }
    } else if (isJSONataContains(expr)) {
      const [arg1, arg2] = expr.arguments;
      let field = "";
      let regex = "";
      let valueSource = void 0;
      if (isJSONataIdentifier(arg1)) {
        field = getFieldFromPath(arg1);
        if (isJSONataIdentifier(arg2)) {
          regex = getFieldFromPath(arg2);
          valueSource = "field";
        } else {
          if (isJSONataString(arg2) || isJSONataRegex(arg2)) {
            regex = getValidValue(arg2);
          }
        }
      }
      if (valueSource === "field" ? fieldIsValid(field, "contains", regex) : fieldIsValid(field, "contains")) {
        return {
          field,
          operator: "contains",
          value: regex,
          ...valueSource ? { valueSource } : {}
        };
      }
    } else if (isJSONataIn(expr)) {
      const field = getFieldFromPath(expr.lhs);
      let valueSource = void 0;
      if (isJSONataIdentifierList(expr.rhs)) {
        valueSource = "field";
      }
      if (isJSONataValidValue(expr.rhs)) {
        const value = getValidValue(expr.rhs);
        if (field && value.every((v) => fieldIsValid(field, "in", valueSource === "field" ? v : void 0))) {
          return { field, operator: "in", value, ...valueSource ? { valueSource } : {} };
        }
      }
    } else if (isJSONataComparison(expr)) {
      let field = null;
      let value = void 0;
      let valueSource = void 0;
      let flip = false;
      const { lhs, rhs } = expr;
      if (isJSONataIdentifier(lhs) && isJSONataValidValue(rhs)) {
        field = getFieldFromPath(lhs);
        value = getValidValue(rhs);
        if (isJSONataIdentifier(rhs)) {
          valueSource = "field";
        }
      } else {
        if (isJSONataIdentifier(rhs) && isJSONataValidValue(lhs)) {
          flip = true;
          field = getFieldFromPath(rhs);
          value = getValidValue(lhs);
        }
      }
      let operator = normalizeOperator(expr.value, flip);
      if (value === null && (operator === "=" || operator === "!=")) {
        operator = operator === "=" ? "null" : "notNull";
      }
      if (field && fieldIsValid(field, operator, valueSource === "field" ? value : void 0) && typeof value !== "undefined") {
        return valueSource ? { field, operator, value, valueSource } : { field, operator, value };
      }
    }
    return null;
  };
  let jsonataExpr;
  try {
    jsonataExpr = (0, import_jsonata.default)(jsonataInput);
  } catch (err) {
    return emptyQuery;
  }
  const jsonataAST = jsonataExpr.ast();
  const result = parseJSONataAST(jsonataAST);
  if (result) {
    if (isRuleGroup(result)) {
      return result;
    }
    return { rules: [result], ...ic ? {} : { combinator: "and" } };
  }
  return emptyQuery;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseJSONata
});
//# sourceMappingURL=parseJSONata.js.map