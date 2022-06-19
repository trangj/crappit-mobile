import { Text, Pressable, PressableProps } from 'react-native';
import React, { ReactNode } from 'react';
import { useTheme } from '../context/ThemeState';

type MenuButtonProps = PressableProps & {
  children?: ReactNode;
  active?: boolean;
};

function MenuButton({ active = false, children, ...props }: MenuButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => ({
        padding: theme.spacing.md,
        backgroundColor: pressed ? theme.colors.background : undefined,
      })}
      {...props}
    >
      <Text
        style={{
          fontWeight: 'bold',
          color: active ? theme.colors.text : theme.colors.textAlt,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export default MenuButton;
