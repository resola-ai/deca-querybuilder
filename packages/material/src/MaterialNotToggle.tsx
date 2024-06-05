import type { Switch } from '@mui/material';
import type { ComponentPropsWithoutRef } from 'react';
import * as React from 'react';
import { useContext } from 'react';
import type { NotToggleProps } from 'react-querybuilder';
import { NotToggle } from 'react-querybuilder';
import { RQBMaterialContext } from './RQBMaterialContext';
import type { RQBMaterialComponents } from './types';

export type MaterialNotToggleProps = NotToggleProps &
  ComponentPropsWithoutRef<typeof Switch> & {
    muiComponents?: RQBMaterialComponents;
  };

type MaterialNotToggleComponents = Pick<RQBMaterialComponents, 'FormControlLabel' | 'Switch'>;

export const MaterialNotToggle = ({
  className,
  handleOnChange,
  label,
  checked,
  title,
  disabled,
  level,
  path,
  context,
  validation,
  testID,
  schema,
  ruleGroup,
  muiComponents: muiComponentsProp,
  ...otherProps
}: MaterialNotToggleProps) => {
  const muiComponents = useContext(RQBMaterialContext) ?? muiComponentsProp;
  const key = muiComponents ? 'mui' : 'no-mui';
  if (!muiComponents) {
    return (
      <NotToggle
        key={key}
        className={className}
        handleOnChange={handleOnChange}
        label={label}
        checked={checked}
        title={title}
        disabled={disabled}
        path={path}
        level={level}
        context={context}
        validation={validation}
        testID={testID}
        schema={schema}
        ruleGroup={ruleGroup}
      />
    );
  }

  const { FormControlLabel, Switch } = muiComponents as MaterialNotToggleComponents;

  return (
    <FormControlLabel
      key={key}
      className={className}
      title={title}
      disabled={disabled}
      control={
        <Switch
          checked={!!checked}
          onChange={e => handleOnChange(e.target.checked)}
          {...otherProps}
        />
      }
      label={label ?? /* istanbul ignore next */ ''}
    />
  );
};
