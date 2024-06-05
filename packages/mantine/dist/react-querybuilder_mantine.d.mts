import { SelectProps, SwitchProps, ButtonProps } from '@mantine/core';
import * as React from 'react';
import * as react_querybuilder from 'react-querybuilder';
import { VersatileSelectorProps, NotToggleProps, ActionProps, ShiftActionsProps, ValueEditorProps, FullField } from 'react-querybuilder';

type MantineValueSelectorProps = VersatileSelectorProps & Partial<SelectProps>;
declare const MantineValueSelector: ({ className, handleOnChange, options, value, title, disabled, multiple, listsAsArrays, testID, field: _field, fieldData: _fieldData, rule: _rule, rules: _rules, path: _path, level: _level, context: _context, validation: _validation, schema: _schema, ...otherProps }: MantineValueSelectorProps) => React.JSX.Element;

type MantineNotToggleProps = NotToggleProps & Partial<SwitchProps>;
declare const MantineNotToggle: ({ className, handleOnChange, label, checked, title, disabled, testID, path: _path, level: _level, context: _context, validation: _validation, schema: _schema, ruleGroup: _ruleGroup, ...otherProps }: MantineNotToggleProps) => React.JSX.Element;

type MantineActionProps = ActionProps & Partial<ButtonProps>;
declare const MantineActionElement: ({ className, handleOnClick, label, title, disabled, disabledTranslation, testID, ruleOrGroup: _rg, path: _path, level: _level, context: _context, validation: _validation, schema: _schema, ...otherProps }: MantineActionProps) => React.JSX.Element;

declare const MantineShiftActions: ({ shiftUp, shiftDown, shiftUpDisabled, shiftDownDisabled, disabled, className, labels, titles, testID, }: ShiftActionsProps) => React.JSX.Element;

type MantineValueEditorProps = ValueEditorProps & {
    extraProps?: Record<string, any>;
};
declare const MantineValueEditor: (allProps: MantineValueEditorProps) => React.JSX.Element | null;

declare const mantineControlElements: {
    actionElement: ({ className, handleOnClick, label, title, disabled, disabledTranslation, testID, ruleOrGroup: _rg, path: _path, level: _level, context: _context, validation: _validation, schema: _schema, ...otherProps }: MantineActionProps) => React.JSX.Element;
    notToggle: ({ className, handleOnChange, label, checked, title, disabled, testID, path: _path, level: _level, context: _context, validation: _validation, schema: _schema, ruleGroup: _ruleGroup, ...otherProps }: MantineNotToggleProps) => React.JSX.Element;
    shiftActions: ({ shiftUp, shiftDown, shiftUpDisabled, shiftDownDisabled, disabled, className, labels, titles, testID, }: react_querybuilder.ShiftActionsProps) => React.JSX.Element;
    valueEditor: (allProps: react_querybuilder.ValueEditorProps<FullField<string, string, string, react_querybuilder.Option<string>, react_querybuilder.Option<string>>, string> & {
        extraProps?: Record<string, any> | undefined;
    }) => React.JSX.Element | null;
    valueSelector: ({ className, handleOnChange, options, value, title, disabled, multiple, listsAsArrays, testID, field: _field, fieldData: _fieldData, rule: _rule, rules: _rules, path: _path, level: _level, context: _context, validation: _validation, schema: _schema, ...otherProps }: MantineValueSelectorProps) => React.JSX.Element;
};
declare const QueryBuilderMantine: react_querybuilder.QueryBuilderContextProvider<Record<string, any>>;

export { MantineActionElement, type MantineActionProps, MantineNotToggle, type MantineNotToggleProps, MantineShiftActions, MantineValueEditor, MantineValueSelector, type MantineValueSelectorProps, QueryBuilderMantine, mantineControlElements };
