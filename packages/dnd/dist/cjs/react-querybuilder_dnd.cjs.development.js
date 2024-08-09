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
  InlineCombinatorDnD: () => InlineCombinatorDnD,
  QueryBuilderDnD: () => QueryBuilderDnD,
  QueryBuilderDndWithoutProvider: () => QueryBuilderDndWithoutProvider,
  RuleDnD: () => RuleDnD,
  RuleGroupDnD: () => RuleGroupDnD,
  useInlineCombinatorDnD: () => useInlineCombinatorDnD,
  useReactDnD: () => useReactDnD,
  useRuleDnD: () => useRuleDnD,
  useRuleGroupDnD: () => useRuleGroupDnD
});
module.exports = __toCommonJS(src_exports);

// src/InlineCombinatorDnD.tsx
var React = __toESM(require("react"));
var import_react6 = require("react");
var import_react_querybuilder7 = require("react-querybuilder");

// src/hooks/useInlineCombinatorDnD.ts
var import_react = require("react");
var import_react_querybuilder = require("react-querybuilder");
var useInlineCombinatorDnD = ({
  path,
  canDrop,
  schema,
  useDrop,
  rules
}) => {
  const dropRef = (0, import_react.useRef)(null);
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
        const parentHoverPath = (0, import_react_querybuilder.getParentPath)(path);
        const parentItemPath = (0, import_react_querybuilder.getParentPath)(itemPath);
        const hoverIndex = path[path.length - 1];
        const itemIndex = itemPath[itemPath.length - 1];
        return !// 1) the item is an ancestor of the drop target,
        ((0, import_react_querybuilder.isAncestor)(itemPath, path) || // 2) the item is hovered over itself (which should never
        // happen since combinators don't have drag handles),
        (0, import_react_querybuilder.pathsAreEqual)(itemPath, path) || (0, import_react_querybuilder.pathsAreEqual)(parentHoverPath, parentItemPath) && hoverIndex - 1 === itemIndex || // 3) independentCombinators is true and the drop target is just above the hovering item
        schema.independentCombinators && (0, import_react_querybuilder.pathsAreEqual)(parentHoverPath, parentItemPath) && hoverIndex === itemIndex - 1);
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
var import_react2 = require("react");
var import_react_querybuilder2 = require("react-querybuilder");
var didWarnEnabledDndWithoutReactDnD = false;
var useReactDnD = (dndParam) => {
  const [dnd, setDnd] = (0, import_react2.useState)(dndParam ?? null);
  (0, import_react2.useEffect)(() => {
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
            console.error(import_react_querybuilder2.messages.errorEnabledDndWithoutReactDnD);
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
var import_react3 = require("react");
var import_react_querybuilder4 = require("react-querybuilder");

// src/hooks/useDragCommon.ts
var import_react_querybuilder3 = require("react-querybuilder");
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
    item: () => ({ ...(0, import_react_querybuilder3.findPath)(path, schema.getQuery()), path, qbId: schema.qbId }),
    canDrag: !disabled,
    collect: (monitor) => ({
      isDragging: !disabled && monitor.isDragging(),
      dragMonitorId: monitor.getHandlerId() ?? ""
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (!dropResult) return;
      const parentHoverPath = (0, import_react_querybuilder3.getParentPath)(dropResult.path);
      const hoverIndex = dropResult.path[dropResult.path.length - 1];
      const destinationPath = dropResult.type === "ruleGroup" ? [...dropResult.path, 0] : dropResult.type === "inlineCombinator" ? [...parentHoverPath, hoverIndex] : [...parentHoverPath, hoverIndex + 1];
      if (schema.qbId !== dropResult.qbId) {
        const otherBuilderQuery = dropResult.getQuery();
        if (otherBuilderQuery) {
          dropResult.dispatchQuery((0, import_react_querybuilder3.insert)(otherBuilderQuery, item, destinationPath));
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
  const dndRef = (0, import_react3.useRef)(null);
  const dragRef = (0, import_react3.useRef)(null);
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
        const parentHoverPath = (0, import_react_querybuilder4.getParentPath)(path);
        const parentItemPath = (0, import_react_querybuilder4.getParentPath)(dragging.path);
        const hoverIndex = path[path.length - 1];
        const itemIndex = dragging.path[dragging.path.length - 1];
        return !// 1) item is ancestor of drop target,
        ((0, import_react_querybuilder4.isAncestor)(dragging.path, path) || // 2) item is hovered over itself or the previous item
        (0, import_react_querybuilder4.pathsAreEqual)(parentHoverPath, parentItemPath) && (hoverIndex === itemIndex || hoverIndex === itemIndex - 1 || schema.independentCombinators && hoverIndex === itemIndex - 2));
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
var import_react4 = require("react");
var import_react_querybuilder5 = require("react-querybuilder");
var accept2 = ["rule", "ruleGroup"];
var useRuleGroupDnD = (params) => {
  const { disabled, path, ruleGroup: ruleGroup2, schema, actions, useDrag, useDrop, canDrop } = params;
  const previewRef = (0, import_react4.useRef)(null);
  const dragRef = (0, import_react4.useRef)(null);
  const dropRef = (0, import_react4.useRef)(null);
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
        const parentItemPath = (0, import_react_querybuilder5.getParentPath)(dragging.path);
        const itemIndex = dragging.path[dragging.path.length - 1];
        return !// 1) item is ancestor of drop target,
        ((0, import_react_querybuilder5.isAncestor)(dragging.path, path) || // 2) item is first child and is dropped on its own group header,
        (0, import_react_querybuilder5.pathsAreEqual)(path, parentItemPath) && itemIndex === 0 || // 3) the group is dropped on itself
        (0, import_react_querybuilder5.pathsAreEqual)(path, dragging.path));
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
var import_react5 = require("react");
var import_react_querybuilder6 = require("react-querybuilder");
var { rule, ruleGroup, combinatorSelector } = import_react_querybuilder6.defaultControlElements;
var QueryBuilderDndContext = (0, import_react5.createContext)({
  baseControls: { rule, ruleGroup, combinatorSelector }
});

// src/InlineCombinatorDnD.tsx
var InlineCombinatorDnD = ({
  component: CombinatorSelectorComponent,
  ...props
}) => {
  const { canDrop, useDrop } = (0, import_react6.useContext)(QueryBuilderDndContext);
  const { dropRef, dropMonitorId, isOver } = useInlineCombinatorDnD({
    ...props,
    component: CombinatorSelectorComponent,
    useDrop,
    canDrop
  });
  const dndOver = isOver ? import_react_querybuilder7.standardClassnames.dndOver : "";
  const wrapperClassName = `${import_react_querybuilder7.standardClassnames.betweenRules}${dndOver ? ` ${dndOver}` : ""}`;
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      key: "dnd",
      ref: dropRef,
      className: wrapperClassName,
      "data-dropmonitorid": dropMonitorId,
      "data-testid": import_react_querybuilder7.TestID.inlineCombinator
    },
    /* @__PURE__ */ React.createElement(CombinatorSelectorComponent, { ...props, testID: import_react_querybuilder7.TestID.combinators })
  );
};

// src/QueryBuilderDnD.tsx
var React4 = __toESM(require("react"));
var import_react9 = require("react");
var import_react_querybuilder8 = require("react-querybuilder");

// src/RuleDnD.tsx
var React2 = __toESM(require("react"));
var import_react7 = require("react");
var RuleDnD = (props) => {
  const rqbDndContext = (0, import_react7.useContext)(QueryBuilderDndContext);
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
var React3 = __toESM(require("react"));
var import_react8 = require("react");
var RuleGroupDnD = (props) => {
  const rqbDndContext = (0, import_react8.useContext)(QueryBuilderDndContext);
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
  const rqbContext = (0, import_react_querybuilder8.useMergedContext)({
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
      import_react_querybuilder8.QueryBuilderContext.Provider,
      {
        key,
        value: { ...rqbContext, enableDragAndDrop: false, debugMode }
      },
      props.children
    );
  }
  const { DndProvider, HTML5Backend } = dnd;
  return /* @__PURE__ */ React4.createElement(DndProvider, { key, backend: HTML5Backend, debugMode }, /* @__PURE__ */ React4.createElement(
    import_react_querybuilder8.QueryBuilderContext.Provider,
    {
      key,
      value: { ...rqbContext, enableDragAndDrop, debugMode }
    },
    /* @__PURE__ */ React4.createElement(QueryBuilderDndWithoutProvider, { dnd, canDrop }, props.children)
  ));
};
var QueryBuilderDndWithoutProvider = (props) => {
  const rqbContext = (0, import_react9.useContext)(import_react_querybuilder8.QueryBuilderContext);
  const rqbDndContext = (0, import_react9.useContext)(QueryBuilderDndContext);
  const dnd = useReactDnD(props.dnd);
  const debugMode = (0, import_react_querybuilder8.usePreferProp)(false, props.debugMode, rqbContext.debugMode);
  const canDrop = (0, import_react_querybuilder8.usePreferAnyProp)(void 0, props.canDrop, rqbDndContext.canDrop);
  const enableDragAndDrop = (0, import_react_querybuilder8.usePreferProp)(
    true,
    props.enableDragAndDrop,
    rqbContext.enableDragAndDrop
  );
  const key = enableDragAndDrop && dnd ? "dnd" : "no-dnd";
  if (!enableDragAndDrop || !dnd) {
    return /* @__PURE__ */ React4.createElement(
      import_react_querybuilder8.QueryBuilderContext.Provider,
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
  return /* @__PURE__ */ React4.createElement(DndContext.Consumer, { key }, () => /* @__PURE__ */ React4.createElement(import_react_querybuilder8.QueryBuilderContext.Provider, { key, value: newContext }, /* @__PURE__ */ React4.createElement(QueryBuilderDndContext.Provider, { value: { useDrag, useDrop, baseControls, canDrop } }, props.children)));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InlineCombinatorDnD,
  QueryBuilderDnD,
  QueryBuilderDndWithoutProvider,
  RuleDnD,
  RuleGroupDnD,
  useInlineCombinatorDnD,
  useReactDnD,
  useRuleDnD,
  useRuleGroupDnD
});
//# sourceMappingURL=react-querybuilder_dnd.cjs.development.js.map