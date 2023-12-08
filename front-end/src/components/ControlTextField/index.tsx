import { Stack, StackProps, TextField, TextFieldProps } from '@mui/material';
import React, { memo } from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  RegisterOptions
} from 'react-hook-form';

const AppFormControlTextField = <T extends FieldValues>({
  label,
  control,
  name,
  rules,
  controlProps,
  required = false,
  textfieldProps,
  onChangeValueForm,
  ...otherProps
}: AppFormControlTextFieldProps<T>) => {
  return (
    <Stack {...otherProps}>
      <Controller
        control={control}
        name={name}
        rules={{ required, ...rules }}
        {...controlProps}
        render={({ field: { onChange, ...otherFieldProps } }) => (
          <TextField
            size="small"
            margin="normal"
            label={label}
            id={name}
            required={required}
            onChange={(event) => {
              if (onChangeValueForm instanceof Function)
                onChangeValueForm(event);

              onChange(event);
            }}
            {...otherFieldProps}
            {...textfieldProps}
            fullWidth
          />
        )}
      />
    </Stack>
  );
};

export type AppFormControlTextFieldProps<T extends FieldValues> = StackProps & {
  label?: string;
  control: Control<any, object>;
  name: FieldPath<T>;

  rules?: RegisterOptions<T>;
  required?: boolean;
  controlProps?: Omit<ControllerProps, 'render' | 'name' | 'control'>;
  textfieldProps?: TextFieldProps;
  onChangeValueForm?: (event?: React.ChangeEvent) => void;
};

export default memo(AppFormControlTextField);
