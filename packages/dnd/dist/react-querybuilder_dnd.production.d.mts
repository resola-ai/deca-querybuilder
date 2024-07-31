import * as React from 'react';
import { ReactElement } from 'react';
import { InlineCombinatorProps, Path, QueryActions, RuleGroupProps, RuleProps, DraggedItem, QueryBuilderContextProviderProps, Controls, FullField } from 'react-querybuilder';
import * as react_dnd_html5_backend from 'react-dnd-html5-backend';
import * as react_dnd from 'react-dnd';

/**
 * The drag-and-drop-enabled inline combinator component.
 */
declare const InlineCombinatorDnD: ({ component: CombinatorSelectorComponent, ...props }: InlineCombinatorProps) => React.JSX.Element;

/**
 * {@link RuleGroupDnD} props.
 */
interface RuleGroupDndProps {
    disabled: boolean;
    parentDisabled: boolean;
    path: Path;
    moveRule: QueryActions['moveRule'];
    useDrag: (typeof react_dnd)['useDrag'];
    useDrop: (typeof react_dnd)['useDrop'];
    children: ReactElement<RuleGroupProps>;
}
/**
 * {@link RuleDnD} props.
 */
interface RuleDndProps {
    moveRule: QueryActions['moveRule'];
    disabled: boolean;
    parentDisabled: boolean;
    path: Path;
    independentCombinators: boolean;
    useDrag: (typeof react_dnd)['useDrag'];
    useDrop: (typeof react_dnd)['useDrop'];
    children: ReactElement<RuleProps>;
}
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

export { type CustomCanDropParams, InlineCombinatorDnD, QueryBuilderDnD, type QueryBuilderDndContextProps, type QueryBuilderDndProps, QueryBuilderDndWithoutProvider, RuleDnD, type RuleDndProps, RuleGroupDnD, type RuleGroupDndProps, type UseReactDnD };
