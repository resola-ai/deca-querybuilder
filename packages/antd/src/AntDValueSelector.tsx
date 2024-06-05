import { Select } from 'antd';
import type { ComponentPropsWithoutRef } from 'react';
import * as React from 'react';
import type { VersatileSelectorProps } from 'react-querybuilder';
import { useValueSelector } from 'react-querybuilder';
import { toOptions } from './utils';

export type AntDValueSelectorProps = VersatileSelectorProps &
  Omit<ComponentPropsWithoutRef<typeof Select>, 'onChange' | 'defaultValue'>;

export const AntDValueSelector = ({
  className,
  handleOnChange,
  options,
  value,
  title,
  disabled,
  multiple,
  listsAsArrays,
  // Props that should not be in extraProps
  testID: _testID,
  rule: _rule,
  rules: _rules,
  level: _level,
  path: _path,
  context: _context,
  validation: _validation,
  operator: _operator,
  field: _field,
  fieldData: _fieldData,
  schema: _schema,
  ...extraProps
}: AntDValueSelectorProps) => {
  const { onChange, val } = useValueSelector({ handleOnChange, listsAsArrays, multiple, value });

  const modeObj = multiple ? { mode: 'multiple' as const } : {};

  return (
    <span title={title} className={className}>
      <Select
        {...modeObj}
        popupMatchSelectWidth={false}
        disabled={disabled}
        value={val}
        onChange={onChange}
        {...extraProps}>
        {toOptions(options)}
      </Select>
    </span>
  );
};
