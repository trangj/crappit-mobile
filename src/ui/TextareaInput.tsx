import React, { forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { useTheme } from '../context/ThemeState';

export type TextareaInputProps = RNTextInputProps & {
  border?: 'rounded' | 'rounded-full' | 'none';
  size?: 'sm' | 'lg';
  fullWidth?: boolean;
};

const TextareaInput = forwardRef<RNTextInput, TextareaInputProps>(({
  fullWidth, style, ...rest
}, ref) => {
  const { theme } = useTheme();

  return (
    <RNTextInput
      ref={ref}
      multiline
      placeholderTextColor={theme.colors.textAlt}
      style={[
        {
          fontSize: theme.textVariants.smHeader.fontSize,
          width: fullWidth ? '100%' : undefined,
          color: theme.colors.text,
        },
        style,
      ]}
      {...rest}
    />
  );
});

export default TextareaInput;
