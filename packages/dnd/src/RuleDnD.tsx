import * as React from 'react';
import { useContext } from 'react';
import type { RuleProps } from 'react-querybuilder';
import { QueryBuilderDndContext } from './QueryBuilderDndContext';
import { useRuleDnD } from './hooks';

/**
 * Rule component for drag-and-drop. Renders the provided rule component
 * ({@link Rule} by default), but forwards the drag-and-drop context.
 */
export const RuleDnD = (props: RuleProps) => {
  const rqbDndContext = useContext(QueryBuilderDndContext);

  const { canDrop, useDrag, useDrop } = rqbDndContext;

  const disabled = !!props.parentDisabled || !!props.disabled;

  const dndRefs = useRuleDnD({
    ...props,
    disabled,
    useDrag: useDrag!,
    useDrop: useDrop!,
    canDrop,
  });

  const { rule: BaseRuleComponent } = rqbDndContext.baseControls;

  return (
    <QueryBuilderDndContext.Provider value={rqbDndContext}>
      <BaseRuleComponent {...props} {...dndRefs} />
    </QueryBuilderDndContext.Provider>
  );
};
