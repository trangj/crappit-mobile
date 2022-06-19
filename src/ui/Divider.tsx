import { View } from 'react-native';
import React from 'react';
import { useTheme } from '../context/ThemeState';

function Divider() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        height: 1,
        backgroundColor: theme.colors.border,
        width: '100%',
      }}
    />
  );
}

export default Divider;
