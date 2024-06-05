import { DragHandleIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import type { ComponentPropsWithRef } from 'react';
import * as React from 'react';
import { forwardRef } from 'react';
import type { DragHandleProps } from 'react-querybuilder';

type IBP = ComponentPropsWithRef<typeof IconButton>;

export type ChakraDragHandleProps = DragHandleProps &
  Omit<IBP, 'aria-label'> &
  Partial<Pick<IBP, 'aria-label'>>;

export const ChakraDragHandle = forwardRef<HTMLSpanElement, ChakraDragHandleProps>(
  (
    {
      className,
      title,
      disabled,
      // Props that should not be in extraProps
      testID: _testID,
      level: _level,
      path: _path,
      label: _label,
      context: _context,
      validation: _validation,
      schema: _schema,
      ruleOrGroup: _ruleOrGroup,
      ...extraProps
    },
    dragRef
  ) => (
    <span ref={dragRef} className={className} title={title}>
      <IconButton
        isDisabled={disabled}
        icon={<DragHandleIcon />}
        aria-label={title ?? /* istanbul ignore next */ ''}
        {...extraProps}
      />
    </span>
  )
);
