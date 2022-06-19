import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../context/ThemeState';

export type HeadingProps = TextProps & {
  size?: 'lg' | 'md' | 'sm';
};

function Heading({
  style, size = 'lg', children, ...rest
}: HeadingProps) {
  const { theme } = useTheme();
  const sizeOptions = {
    lg: theme.textVariants.lgHeader.fontSize,
    md: theme.textVariants.mdHeader.fontSize,
    sm: theme.textVariants.smHeader.fontSize,
  };
  const weightOptions = {
    lg: theme.textVariants.lgHeader.fontWeight,
    md: theme.textVariants.mdHeader.fontWeight,
    sm: (theme.textVariants.smHeader.fontWeight as any),
  };

  return (
    <Text
      style={[
        {
          color: theme.colors.text,
          fontSize: sizeOptions[size],
          fontWeight: weightOptions[size],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export default Heading;
