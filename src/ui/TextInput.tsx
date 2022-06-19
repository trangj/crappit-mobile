import React, { forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { useTheme } from '../context/ThemeState';

export type TextInputProps = RNTextInputProps & {
  border?: 'rounded' | 'rounded-full' | 'none';
  size?: 'sm' | 'lg';
  fullWidth?: boolean;
};

const TextInput = forwardRef<RNTextInput, TextInputProps>(({
  border = 'rounded-full', size = 'lg', fullWidth, style, ...rest
}, ref) => {
  const { theme } = useTheme();

  const borderRadiusOptions = {
    'rounded-full': 9999,
    rounded: theme.spacing.xs,
    none: 0,
  };

  return (
    <RNTextInput
      ref={ref}
      placeholderTextColor={theme.colors.textAlt}
      style={[
        {
          fontSize: theme.textVariants.body.fontSize,
          height: size === 'sm' ? 36 : 48,
          width: fullWidth ? '100%' : undefined,
          paddingHorizontal: theme.spacing.md,
          borderRadius: borderRadiusOptions[border],
          backgroundColor: theme.colors.grey,
          color: theme.colors.text,
        },
        style,
      ]}
      {...rest}
    />
  );
});

export default TextInput;
