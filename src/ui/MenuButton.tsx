import {
  Text, Pressable, PressableProps, View,
} from 'react-native';
import React, { ReactNode } from 'react';
import { useTheme } from '../context/ThemeState';

type MenuButtonProps = PressableProps & {
  children?: ReactNode;
  active?: boolean;
  icon?: ReactNode;
};

function MenuButton({
  active = false, icon = null, children, ...props
}: MenuButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        backgroundColor: pressed ? theme.colors.background : undefined,
      })}
      {...props}
    >
      {icon && <View>{icon}</View>}
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
