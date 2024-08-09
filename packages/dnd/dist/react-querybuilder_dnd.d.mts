import * as React from 'react';
import { Ref } from 'react';
import { InlineCombinatorProps, DraggedItem, QueryBuilderContextProviderProps, Controls, FullField, RuleProps, RuleGroupProps, DropEffect, UseRuleDnD, UseRuleGroupDnD } from 'react-querybuilder';
import * as react_dnd_html5_backend from 'react-dnd-html5-backend';
import * as react_dnd from 'react-dnd';

/**
 * The drag-and-drop-enabled inline combinator component.
 */
declare const InlineCombinatorDnD: ({ component: CombinatorSelectorComponent, ...props }: InlineCombinatorProps) => React.JSX.Element;

/**
 * Combination of all exports from `react-dnd` and `react-dnd-html5-backend`.
 */
type UseReactDnD = typeof react_dnd & typeof react_dnd_html5_backend;
/**
 * Parameters passed to custom `canDrop` functions.
 */
interface CustomCanDropParams {
    dragging: DraggedItem;
    hovering: DraggedItem;
}
/**
 * {@link QueryBuilderDnD} props.
 */
type QueryBuilderDndProps = QueryBuilderContextProviderProps & {
    /**
     * Provide this prop if `enableDragAndDrop` is `true` for the child element and
     * you want the component to render immediately with drag-and-drop enabled.
     * Otherwise, the component will asynchronously load `react-dnd` and
     * `react-dnd-html5-backend` and drag-and-drop features will only be enabled
     * once those packages have loaded.
     */
    dnd?: UseReactDnD;
    canDrop?(params: CustomCanDropParams): boolean;
};
interface QueryBuilderDndContextProps {
    useDrag?: (typeof react_dnd)['useDrag'];
    useDrop?: (typeof react_dnd)['useDrop'];
    baseControls: Pick<Controls<FullField, string>, 'rule' | 'ruleGroup' | 'combinatorSelector'>;
    canDrop?: (params: CustomCanDropParams) => boolean;
}

/**
 * Context provider to enable drag-and-drop. If the application already implements
 * `react-dnd`, use {@link QueryBuilderDndWithoutProvider} instead.
 */
declare const QueryBuilderDnD: (props: QueryBuilderDndProps) => React.JSX.Element;
/**
 * Context provider to enable drag-and-drop. Only use this provider if the application
 * already implements `react-dnd`, otherwise use {@link QueryBuilderDnD}.
 */
declare const QueryBuilderDndWithoutProvider: (props: QueryBuilderDndProps) => React.JSX.Element;

/**
 * Rule component for drag-and-drop. Renders the provided rule component
 * ({@link Rule} by default), but forwards the drag-and-drop context.
 */
declare const RuleDnD: (props: RuleProps) => React.JSX.Element;

/**
 * Rule group component for drag-and-drop. Renders the provided rule group component
 * ({@link RuleGroup} by default), but forwards the drag-and-drop context so that child
 * rules and groups will render within the appropriate drag-and-drop wrappers.
 */
declare const RuleGroupDnD: (props: RuleGroupProps) => React.JSX.Element;

type UseInlineCombinatorDndParams = InlineCombinatorProps & Pick<QueryBuilderDndContextProps, 'canDrop'> & Pick<typeof react_dnd, 'useDrop'>;
interface UseInlineCombinatorDnD {
    isOver: boolean;
    dropMonitorId: string | symbol | null;
    dropRef: Ref<HTMLDivElement>;
    dropEffect?: DropEffect;
}
declare const useInlineCombinatorDnD: ({ path, canDrop, schema, useDrop, rules, }: UseInlineCombinatorDndParams) => UseInlineCombinatorDnD;

declare const useReactDnD: (dndParam?: UseReactDnD) => UseReactDnD | null;

type UseRuleDndParams = RuleProps & Pick<QueryBuilderDndContextProps, 'canDrop'> & Pick<typeof react_dnd, 'useDrag' | 'useDrop'>;
declare const useRuleDnD: (params: UseRuleDndParams) => UseRuleDnD;

type UseRuleGroupDndParams = RuleGroupProps & Pick<QueryBuilderDndContextProps, 'canDrop'> & Pick<typeof react_dnd, 'useDrag' | 'useDrop'>;
declare const useRuleGroupDnD: (params: UseRuleGroupDndParams) => UseRuleGroupDnD;

export { type CustomCanDropParams, InlineCombinatorDnD, QueryBuilderDnD, type QueryBuilderDndContextProps, type QueryBuilderDndProps, QueryBuilderDndWithoutProvider, RuleDnD, RuleGroupDnD, type UseReactDnD, useInlineCombinatorDnD, useReactDnD, useRuleDnD, useRuleGroupDnD };
