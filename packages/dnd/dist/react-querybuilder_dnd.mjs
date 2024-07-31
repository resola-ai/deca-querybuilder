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
  const hoveringItem = (rules ?? /* istanbul ignore next */
  [])[path[path.length - 1] - 1];
  const [{ isOver, dropMonitorId }, drop] = useDrop(
    () => ({
      accept: ["rule", "ruleGroup"],
      canDrop: (dragging) => {
        const { path: itemPath } = dragging;
        if (dragging && typeof canDrop === "function" && !canDrop({ dragging, hovering: { ...hoveringItem, path, qbId: schema.qbId } })) {
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
      collect: (monitor) => ({
        isOver: monitor.canDrop() && monitor.isOver(),
        dropMonitorId: monitor.getHandlerId() ?? "",
        dropEffect: (monitor.getDropResult() ?? {}).dropEffect
      }),
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
  const [dnd, setDnd] = useState(dndParam ?? null);
  useEffect(() => {
    let didCancel = false;
    const getDnD = async () => {
      const [reactDnD, reactDnDHTML5Be] = await Promise.all([
        import("react-dnd").catch(() => null),
        import("react-dnd-html5-backend").catch(() => null)
      ]);
      if (!didCancel) {
        if (reactDnD && reactDnDHTML5Be) {
          setDnd(() => ({ ...reactDnD, ...reactDnDHTML5Be }));
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
    item: () => ({ ...findPath(path, schema.getQuery()), path, qbId: schema.qbId }),
    canDrag: !disabled,
    collect: (monitor) => ({
      isDragging: !disabled && monitor.isDragging(),
      dragMonitorId: monitor.getHandlerId() ?? ""
    }),
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
        if (dragging && typeof canDrop === "function" && !canDrop({ dragging, hovering: { ...rule2, path, qbId: schema.qbId } })) {
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
      collect: (monitor) => ({
        isOver: monitor.canDrop() && monitor.isOver(),
        dropMonitorId: monitor.getHandlerId() ?? "",
        dropEffect: (monitor.getDropResult() ?? {}).dropEffect
      }),
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
        if (disabled || dragging && typeof canDrop === "function" && !canDrop({ dragging, hovering: { ...ruleGroup2, path, qbId: schema.qbId } })) {
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
      collect: (monitor) => ({
        isOver: monitor.canDrop() && monitor.isOver(),
        dropMonitorId: monitor.getHandlerId() ?? "",
        dropEffect: (monitor.getDropResult() ?? {}).dropEffect
      }),
      drop: (_item, monitor) => {
        const { qbId, getQuery, dispatchQuery } = schema;
        return monitor.getDropResult() ?? { type: "ruleGroup", path, qbId, getQuery, dispatchQuery };
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
var InlineCombinatorDnD = ({
  component: CombinatorSelectorComponent,
  ...props
}) => {
  const { canDrop, useDrop } = useContext(QueryBuilderDndContext);
  const { dropRef, dropMonitorId, isOver } = useInlineCombinatorDnD({
    ...props,
    component: CombinatorSelectorComponent,
    useDrop,
    canDrop
  });
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
    /* @__PURE__ */ React.createElement(CombinatorSelectorComponent, { ...props, testID: TestID.combinators })
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
  const dndRefs = useRuleDnD({
    ...props,
    disabled,
    useDrag,
    useDrop,
    canDrop
  });
  const { rule: BaseRuleComponent } = rqbDndContext.baseControls;
  return /* @__PURE__ */ React2.createElement(QueryBuilderDndContext.Provider, { value: rqbDndContext }, /* @__PURE__ */ React2.createElement(BaseRuleComponent, { ...props, ...dndRefs }));
};

// src/RuleGroupDnD.tsx
import * as React3 from "react";
import { useContext as useContext3 } from "react";
var RuleGroupDnD = (props) => {
  const rqbDndContext = useContext3(QueryBuilderDndContext);
  const { canDrop, useDrag, useDrop } = rqbDndContext;
  const disabled = !!props.parentDisabled || !!props.disabled;
  const dndRefs = useRuleGroupDnD({
    ...props,
    disabled,
    useDrag,
    useDrop,
    canDrop
  });
  const { ruleGroup: BaseRuleGroupComponent } = rqbDndContext.baseControls;
  return /* @__PURE__ */ React3.createElement(BaseRuleGroupComponent, { ...props, ...dndRefs });
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
    enableDragAndDrop: enableDragAndDropProp ?? true,
    enableMountQueryChange,
    translations: translations ?? {}
  });
  const { enableDragAndDrop } = rqbContext;
  const dnd = useReactDnD(props.dnd);
  const key = enableDragAndDrop && dnd ? "dnd" : "no-dnd";
  if (!enableDragAndDrop || !dnd) {
    return /* @__PURE__ */ React4.createElement(
      QueryBuilderContext.Provider,
      {
        key,
        value: { ...rqbContext, enableDragAndDrop: false, debugMode }
      },
      props.children
    );
  }
  const { DndProvider, HTML5Backend } = dnd;
  return /* @__PURE__ */ React4.createElement(DndProvider, { key, backend: HTML5Backend, debugMode }, /* @__PURE__ */ React4.createElement(
    QueryBuilderContext.Provider,
    {
      key,
      value: { ...rqbContext, enableDragAndDrop, debugMode }
    },
    /* @__PURE__ */ React4.createElement(QueryBuilderDndWithoutProvider, { dnd, canDrop }, props.children)
  ));
};
var QueryBuilderDndWithoutProvider = (props) => {
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
        value: { ...rqbContext, enableDragAndDrop: false, debugMode }
      },
      props.children
    );
  }
  const { DndContext, useDrag, useDrop } = dnd;
  const baseControls = {
    rule: props.controlElements?.rule ?? rqbContext.controlElements?.rule ?? rqbDndContext.baseControls.rule,
    ruleGroup: props.controlElements?.ruleGroup ?? rqbContext.controlElements?.ruleGroup ?? rqbDndContext.baseControls.ruleGroup,
    combinatorSelector: props.controlElements?.combinatorSelector ?? rqbContext.controlElements?.combinatorSelector ?? rqbDndContext.baseControls.combinatorSelector
  };
  const newContext = {
    ...rqbContext,
    controlElements: {
      ...rqbContext.controlElements,
      ruleGroup: RuleGroupDnD,
      rule: RuleDnD,
      inlineCombinator: InlineCombinatorDnD
    }
  };
  return /* @__PURE__ */ React4.createElement(DndContext.Consumer, { key }, () => /* @__PURE__ */ React4.createElement(QueryBuilderContext.Provider, { key, value: newContext }, /* @__PURE__ */ React4.createElement(QueryBuilderDndContext.Provider, { value: { useDrag, useDrop, baseControls, canDrop } }, props.children)));
};
export {
  InlineCombinatorDnD,
  QueryBuilderDnD,
  QueryBuilderDndWithoutProvider,
  RuleDnD,
  RuleGroupDnD
};
//# sourceMappingURL=react-querybuilder_dnd.mjs.map