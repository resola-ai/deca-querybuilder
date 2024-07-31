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

// src/InlineCombinatorDnD.tsx
import * as React from "react";
import { useContext } from "react";
import { standardClassnames, TestID } from "react-querybuilder";

// src/hooks/useInlineCombinatorDnD.ts
import { useRef } from "react";
import { getParentPath, isAncestor, pathsAreEqual } from "react-querybuilder";
var useInlineCombinatorDnD = ({
  path,
  canDrop,
  schema,
  useDrop,
  rules
}) => {
  const dropRef = useRef(null);
  const hoveringItem = (rules != null ? rules : (
    /* istanbul ignore next */
    []
  ))[path[path.length - 1] - 1];
  const [{ isOver, dropMonitorId }, drop] = useDrop(
    () => ({
      accept: ["rule", "ruleGroup"],
      canDrop: (dragging) => {
        const { path: itemPath } = dragging;
        if (dragging && typeof canDrop === "function" && !canDrop({ dragging, hovering: __spreadProps(__spreadValues({}, hoveringItem), { path, qbId: schema.qbId }) })) {
          return false;
        }
        const parentHoverPath = getParentPath(path);
        const parentItemPath = getParentPath(itemPath);
        const hoverIndex = path[path.length - 1];
        const itemIndex = itemPath[itemPath.length - 1];
        return !// 1) the item is an ancestor of the drop target,
        (isAncestor(itemPath, path) || // 2) the item is hovered over itself (which should never
        // happen since combinators don't have drag handles),
        pathsAreEqual(itemPath, path) || pathsAreEqual(parentHoverPath, parentItemPath) && hoverIndex - 1 === itemIndex || // 3) independentCombinators is true and the drop target is just above the hovering item
        schema.independentCombinators && pathsAreEqual(parentHoverPath, parentItemPath) && hoverIndex === itemIndex - 1);
      },
      collect: (monitor) => {
        var _a, _b;
        return {
          isOver: monitor.canDrop() && monitor.isOver(),
          dropMonitorId: (_a = monitor.getHandlerId()) != null ? _a : "",
          dropEffect: ((_b = monitor.getDropResult()) != null ? _b : {}).dropEffect
        };
      },
      drop: () => {
        const { qbId, getQuery, dispatchQuery } = schema;
        return { type: "inlineCombinator", path, qbId, getQuery, dispatchQuery };
      }
    }),
    [path, schema.independentCombinators]
  );
  drop(dropRef);
  return { dropRef, dropMonitorId, isOver };
};

// src/hooks/useReactDnD.ts
import { useEffect, useState } from "react";
import { messages } from "react-querybuilder";
var didWarnEnabledDndWithoutReactDnD = false;
var useReactDnD = (dndParam) => {
  const [dnd, setDnd] = useState(dndParam != null ? dndParam : null);
  useEffect(() => {
    let didCancel = false;
    const getDnD = async () => {
      const [reactDnD, reactDnDHTML5Be] = await Promise.all([
        import("react-dnd").catch(() => null),
        import("react-dnd-html5-backend").catch(() => null)
      ]);
      if (!didCancel) {
        if (reactDnD && reactDnDHTML5Be) {
          setDnd(() => __spreadValues(__spreadValues({}, reactDnD), reactDnDHTML5Be));
        } else {
          if (process.env.NODE_ENV !== "production" && !didWarnEnabledDndWithoutReactDnD) {
            console.error(messages.errorEnabledDndWithoutReactDnD);
            didWarnEnabledDndWithoutReactDnD = true;
          }
        }
      }
    };
    if (!dnd) {
      getDnD();
    }
    return () => {
      didCancel = true;
    };
  }, [dnd]);
  return dnd;
};

// src/hooks/useRuleDnD.ts
import { useRef as useRef2 } from "react";
import { getParentPath as getParentPath3, isAncestor as isAncestor2, pathsAreEqual as pathsAreEqual2 } from "react-querybuilder";

// src/hooks/useDragCommon.ts
import { findPath, getParentPath as getParentPath2, insert } from "react-querybuilder";
var useDragCommon = ({
  type,
  path,
  disabled,
  // Unused for now
  // independentCombinators,
  actions,
  schema,
  useDrag
}) => useDrag(
  () => ({
    type,
    item: () => __spreadProps(__spreadValues({}, findPath(path, schema.getQuery())), { path, qbId: schema.qbId }),
    canDrag: !disabled,
    collect: (monitor) => {
      var _a;
      return {
        isDragging: !disabled && monitor.isDragging(),
        dragMonitorId: (_a = monitor.getHandlerId()) != null ? _a : ""
      };
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (!dropResult) return;
      const parentHoverPath = getParentPath2(dropResult.path);
      const hoverIndex = dropResult.path[dropResult.path.length - 1];
      const destinationPath = dropResult.type === "ruleGroup" ? [...dropResult.path, 0] : dropResult.type === "inlineCombinator" ? [...parentHoverPath, hoverIndex] : [...parentHoverPath, hoverIndex + 1];
      if (schema.qbId !== dropResult.qbId) {
        const otherBuilderQuery = dropResult.getQuery();
        if (otherBuilderQuery) {
          dropResult.dispatchQuery(insert(otherBuilderQuery, item, destinationPath));
          if (dropResult.dropEffect !== "copy") {
            actions.onRuleRemove(item.path);
          }
        }
      } else {
        actions.moveRule(item.path, destinationPath, dropResult.dropEffect === "copy");
      }
    }
  }),
  [disabled, path]
);

// src/hooks/useRuleDnD.ts
var accept = ["rule", "ruleGroup"];
var useRuleDnD = (params) => {
  const { path, rule: rule2, disabled, schema, actions, useDrag, useDrop, canDrop } = params;
  const dndRef = useRef2(null);
  const dragRef = useRef2(null);
  const [{ isDragging, dragMonitorId }, drag, preview] = useDragCommon({
    type: "rule",
    path,
    disabled,
    independentCombinators: schema.independentCombinators,
    moveRule: actions.moveRule,
    schema,
    actions,
    useDrag
  });
  const [{ isOver, dropMonitorId, dropEffect }, drop] = useDrop(
    () => ({
      accept,
      canDrop: (dragging) => {
        if (dragging && typeof canDrop === "function" && !canDrop({ dragging, hovering: __spreadProps(__spreadValues({}, rule2), { path, qbId: schema.qbId }) })) {
          return false;
        }
        if (schema.qbId !== dragging.qbId) return true;
        const parentHoverPath = getParentPath3(path);
        const parentItemPath = getParentPath3(dragging.path);
        const hoverIndex = path[path.length - 1];
        const itemIndex = dragging.path[dragging.path.length - 1];
        return !// 1) item is ancestor of drop target,
        (isAncestor2(dragging.path, path) || // 2) item is hovered over itself or the previous item
        pathsAreEqual2(parentHoverPath, parentItemPath) && (hoverIndex === itemIndex || hoverIndex === itemIndex - 1 || schema.independentCombinators && hoverIndex === itemIndex - 2));
      },
      collect: (monitor) => {
        var _a, _b;
        return {
          isOver: monitor.canDrop() && monitor.isOver(),
          dropMonitorId: (_a = monitor.getHandlerId()) != null ? _a : "",
          dropEffect: ((_b = monitor.getDropResult()) != null ? _b : {}).dropEffect
        };
      },
      drop: () => {
        const { qbId, getQuery, dispatchQuery } = schema;
        return { type: "rule", path, qbId, getQuery, dispatchQuery };
      }
    }),
    [disabled, schema.independentCombinators, actions.moveRule, path]
  );
  drag(dragRef);
  preview(drop(dndRef));
  return { isDragging, dragMonitorId, isOver, dropMonitorId, dndRef, dragRef, dropEffect };
};

// src/hooks/useRuleGroupDnD.ts
import { useRef as useRef3 } from "react";
import { getParentPath as getParentPath4, isAncestor as isAncestor3, pathsAreEqual as pathsAreEqual3 } from "react-querybuilder";
var accept2 = ["rule", "ruleGroup"];
var useRuleGroupDnD = (params) => {
  const { disabled, path, ruleGroup: ruleGroup2, schema, actions, useDrag, useDrop, canDrop } = params;
  const previewRef = useRef3(null);
  const dragRef = useRef3(null);
  const dropRef = useRef3(null);
  const [{ isDragging, dragMonitorId }, drag, preview] = useDragCommon({
    type: "ruleGroup",
    path,
    disabled,
    independentCombinators: schema.independentCombinators,
    moveRule: actions.moveRule,
    schema,
    actions,
    useDrag
  });
  const [{ isOver, dropMonitorId, dropEffect }, drop] = useDrop(
    () => ({
      accept: accept2,
      canDrop: (dragging) => {
        if (disabled || dragging && typeof canDrop === "function" && !canDrop({ dragging, hovering: __spreadProps(__spreadValues({}, ruleGroup2), { path, qbId: schema.qbId }) })) {
          return false;
        }
        if (schema.qbId !== dragging.qbId) return true;
        const parentItemPath = getParentPath4(dragging.path);
        const itemIndex = dragging.path[dragging.path.length - 1];
        return !// 1) item is ancestor of drop target,
        (isAncestor3(dragging.path, path) || // 2) item is first child and is dropped on its own group header,
        pathsAreEqual3(path, parentItemPath) && itemIndex === 0 || // 3) the group is dropped on itself
        pathsAreEqual3(path, dragging.path));
      },
      collect: (monitor) => {
        var _a, _b;
        return {
          isOver: monitor.canDrop() && monitor.isOver(),
          dropMonitorId: (_a = monitor.getHandlerId()) != null ? _a : "",
          dropEffect: ((_b = monitor.getDropResult()) != null ? _b : {}).dropEffect
        };
      },
      drop: (_item, monitor) => {
        var _a;
        const { qbId, getQuery, dispatchQuery } = schema;
        return (_a = monitor.getDropResult()) != null ? _a : { type: "ruleGroup", path, qbId, getQuery, dispatchQuery };
      }
    }),
    [disabled, actions.moveRule, path]
  );
  if (path.length > 0) {
    drag(dragRef);
    preview(previewRef);
  }
  drop(dropRef);
  return {
    isDragging,
    dragMonitorId,
    isOver,
    dropMonitorId,
    previewRef,
    dragRef,
    dropRef,
    dropEffect
  };
};

// src/QueryBuilderDndContext.ts
import { createContext } from "react";
import { defaultControlElements } from "react-querybuilder";
var { rule, ruleGroup, combinatorSelector } = defaultControlElements;
var QueryBuilderDndContext = createContext({
  baseControls: { rule, ruleGroup, combinatorSelector }
});

// src/InlineCombinatorDnD.tsx
var InlineCombinatorDnD = (_a) => {
  var _b = _a, {
    component: CombinatorSelectorComponent
  } = _b, props = __objRest(_b, [
    "component"
  ]);
  const { canDrop, useDrop } = useContext(QueryBuilderDndContext);
  const { dropRef, dropMonitorId, isOver } = useInlineCombinatorDnD(__spreadProps(__spreadValues({}, props), {
    component: CombinatorSelectorComponent,
    useDrop,
    canDrop
  }));
  const dndOver = isOver ? standardClassnames.dndOver : "";
  const wrapperClassName = `${standardClassnames.betweenRules}${dndOver ? ` ${dndOver}` : ""}`;
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      key: "dnd",
      ref: dropRef,
      className: wrapperClassName,
      "data-dropmonitorid": dropMonitorId,
      "data-testid": TestID.inlineCombinator
    },
    /* @__PURE__ */ React.createElement(CombinatorSelectorComponent, __spreadProps(__spreadValues({}, props), { testID: TestID.combinators }))
  );
};

// src/QueryBuilderDnD.tsx
import * as React4 from "react";
import { useContext as useContext4 } from "react";
import {
  QueryBuilderContext,
  useMergedContext,
  usePreferAnyProp,
  usePreferProp
} from "react-querybuilder";

// src/RuleDnD.tsx
import * as React2 from "react";
import { useContext as useContext2 } from "react";
var RuleDnD = (props) => {
  const rqbDndContext = useContext2(QueryBuilderDndContext);
  const { canDrop, useDrag, useDrop } = rqbDndContext;
  const disabled = !!props.parentDisabled || !!props.disabled;
  const dndRefs = useRuleDnD(__spreadProps(__spreadValues({}, props), {
    disabled,
    useDrag,
    useDrop,
    canDrop
  }));
  const { rule: BaseRuleComponent } = rqbDndContext.baseControls;
  return /* @__PURE__ */ React2.createElement(QueryBuilderDndContext.Provider, { value: rqbDndContext }, /* @__PURE__ */ React2.createElement(BaseRuleComponent, __spreadValues(__spreadValues({}, props), dndRefs)));
};

// src/RuleGroupDnD.tsx
import * as React3 from "react";
import { useContext as useContext3 } from "react";
var RuleGroupDnD = (props) => {
  const rqbDndContext = useContext3(QueryBuilderDndContext);
  const { canDrop, useDrag, useDrop } = rqbDndContext;
  const disabled = !!props.parentDisabled || !!props.disabled;
  const dndRefs = useRuleGroupDnD(__spreadProps(__spreadValues({}, props), {
    disabled,
    useDrag,
    useDrop,
    canDrop
  }));
  const { ruleGroup: BaseRuleGroupComponent } = rqbDndContext.baseControls;
  return /* @__PURE__ */ React3.createElement(BaseRuleGroupComponent, __spreadValues(__spreadValues({}, props), dndRefs));
};

// src/QueryBuilderDnD.tsx
var QueryBuilderDnD = (props) => {
  const {
    controlClassnames,
    controlElements,
    debugMode,
    enableDragAndDrop: enableDragAndDropProp,
    enableMountQueryChange,
    translations,
    canDrop
  } = props;
  const rqbContext = useMergedContext({
    controlClassnames,
    controlElements,
    debugMode,
    enableDragAndDrop: enableDragAndDropProp != null ? enableDragAndDropProp : true,
    enableMountQueryChange,
    translations: translations != null ? translations : {}
  });
  const { enableDragAndDrop } = rqbContext;
  const dnd = useReactDnD(props.dnd);
  const key = enableDragAndDrop && dnd ? "dnd" : "no-dnd";
  if (!enableDragAndDrop || !dnd) {
    return /* @__PURE__ */ React4.createElement(
      QueryBuilderContext.Provider,
      {
        key,
        value: __spreadProps(__spreadValues({}, rqbContext), { enableDragAndDrop: false, debugMode })
      },
      props.children
    );
  }
  const { DndProvider, HTML5Backend } = dnd;
  return /* @__PURE__ */ React4.createElement(DndProvider, { key, backend: HTML5Backend, debugMode }, /* @__PURE__ */ React4.createElement(
    QueryBuilderContext.Provider,
    {
      key,
      value: __spreadProps(__spreadValues({}, rqbContext), { enableDragAndDrop, debugMode })
    },
    /* @__PURE__ */ React4.createElement(QueryBuilderDndWithoutProvider, { dnd, canDrop }, props.children)
  ));
};
var QueryBuilderDndWithoutProvider = (props) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const rqbContext = useContext4(QueryBuilderContext);
  const rqbDndContext = useContext4(QueryBuilderDndContext);
  const dnd = useReactDnD(props.dnd);
  const debugMode = usePreferProp(false, props.debugMode, rqbContext.debugMode);
  const canDrop = usePreferAnyProp(void 0, props.canDrop, rqbDndContext.canDrop);
  const enableDragAndDrop = usePreferProp(
    true,
    props.enableDragAndDrop,
    rqbContext.enableDragAndDrop
  );
  const key = enableDragAndDrop && dnd ? "dnd" : "no-dnd";
  if (!enableDragAndDrop || !dnd) {
    return /* @__PURE__ */ React4.createElement(
      QueryBuilderContext.Provider,
      {
        key,
        value: __spreadProps(__spreadValues({}, rqbContext), { enableDragAndDrop: false, debugMode })
      },
      props.children
    );
  }
  const { DndContext, useDrag, useDrop } = dnd;
  const baseControls = {
    rule: (_d = (_c = (_a = props.controlElements) == null ? void 0 : _a.rule) != null ? _c : (_b = rqbContext.controlElements) == null ? void 0 : _b.rule) != null ? _d : rqbDndContext.baseControls.rule,
    ruleGroup: (_h = (_g = (_e = props.controlElements) == null ? void 0 : _e.ruleGroup) != null ? _g : (_f = rqbContext.controlElements) == null ? void 0 : _f.ruleGroup) != null ? _h : rqbDndContext.baseControls.ruleGroup,
    combinatorSelector: (_l = (_k = (_i = props.controlElements) == null ? void 0 : _i.combinatorSelector) != null ? _k : (_j = rqbContext.controlElements) == null ? void 0 : _j.combinatorSelector) != null ? _l : rqbDndContext.baseControls.combinatorSelector
  };
  const newContext = __spreadProps(__spreadValues({}, rqbContext), {
    controlElements: __spreadProps(__spreadValues({}, rqbContext.controlElements), {
      ruleGroup: RuleGroupDnD,
      rule: RuleDnD,
      inlineCombinator: InlineCombinatorDnD
    })
  });
  return /* @__PURE__ */ React4.createElement(DndContext.Consumer, { key }, () => /* @__PURE__ */ React4.createElement(QueryBuilderContext.Provider, { key, value: newContext }, /* @__PURE__ */ React4.createElement(QueryBuilderDndContext.Provider, { value: { useDrag, useDrop, baseControls, canDrop } }, props.children)));
};
export {
  InlineCombinatorDnD,
  QueryBuilderDnD,
  QueryBuilderDndWithoutProvider,
  RuleDnD,
  RuleGroupDnD
};
//# sourceMappingURL=react-querybuilder_dnd.legacy-esm.js.map