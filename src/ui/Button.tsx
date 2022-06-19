import React, { ReactNode } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../context/ThemeState';

export type ButtonProps = PressableProps & {
  variant?: 'outline' | 'filled' | 'ghost';
  border?: 'rounded' | 'rounded-full' | 'none';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  width?: number;
  icon?: ReactNode;
  loading?: boolean;
  active?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

function Button({
  icon = null,
  variant = 'outline',
  border = 'rounded-full',
  size = 'md',
  width,
  fullWidth,
  children,
  style,
  textStyle,
  ...rest
}: ButtonProps) {
  const { theme } = useTheme();
  const borderRadiusOptions = {
    'rounded-full': 9999,
    rounded: theme.spacing.xs,
    none: 0,
  };
  const heightOptions = {
    xs: 14,
    sm: 24,
    md: 36,
    lg: 48,
  };
  const variantOptions = {
    filled: theme.colors.white,
    outline: theme.colors.blue,
    ghost: theme.colors.textAlt,
  };

  return (
    <Pressable
      {...rest}
      style={[
        {
          backgroundColor:
            variant === 'filled' ? theme.colors.upvote : undefined,
          borderWidth: variant === 'outline' ? 1 : undefined,
          borderRadius: borderRadiusOptions[border],
          borderColor: theme.colors.blue,
          paddingHorizontal: theme.spacing.sm,
          height: heightOptions[size],
          width: fullWidth ? '100%' : width,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
    >
      {icon && <View>{icon}</View>}
      <Text
        style={[
          {
            fontWeight: variant === 'ghost' ? '600' : 'bold',
            fontSize: size !== 'lg' ? 14 : 16,
            color: variantOptions[variant],
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export default Button;
