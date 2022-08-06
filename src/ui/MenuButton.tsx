import {
  Text, Pressable, PressableProps,
} from 'react-native';
import React, { ReactNode } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../context/ThemeState';

type MenuButtonProps = PressableProps & {
  children?: ReactNode;
  active?: boolean;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
};

function MenuButton({
  active = false, icon = 'add', children, ...props
}: MenuButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.sm,
        backgroundColor: pressed ? theme.colors.background : undefined,
      })}
      {...props}
    >
      {icon && (
      <Ionicons
        name={icon}
        size={24}
        color={active ? theme.colors.text : theme.colors.textAlt}
        style={{ paddingRight: theme.spacing.sm }}
      />
      )}
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
