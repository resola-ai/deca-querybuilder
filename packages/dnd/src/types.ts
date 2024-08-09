import type {
  Controls,
  DraggedItem,
  FullField,
  QueryBuilderContextProviderProps,
} from 'react-querybuilder';

/**
 * Combination of all exports from `react-dnd` and `react-dnd-html5-backend`.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export type UseReactDnD = typeof import('react-dnd') & typeof import('react-dnd-html5-backend');

/**
 * Parameters passed to custom `canDrop` functions.
 */
export interface CustomCanDropParams {
  dragging: DraggedItem;
  hovering: DraggedItem;
}

/**
 * {@link QueryBuilderDnD} props.
 */
export type QueryBuilderDndProps = QueryBuilderContextProviderProps & {
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

export interface QueryBuilderDndContextProps {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  useDrag?: (typeof import('react-dnd'))['useDrag'];
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  useDrop?: (typeof import('react-dnd'))['useDrop'];
  baseControls: Pick<Controls<FullField, string>, 'rule' | 'ruleGroup' | 'combinatorSelector'>;
  canDrop?: (params: CustomCanDropParams) => boolean;
}
