import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { loadState, saveState } from '../asyncStorage';
import { theme, darkTheme } from '../theme';

type ThemeProviderProps = {
  theme: typeof theme;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeProviderProps>(
  {} as ThemeProviderProps,
);

export function ThemeProvider({ children }: any) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchTheme = async () => {
      const savedDarkMode = await loadState('darkMode');
      setDarkMode(savedDarkMode);
    };
    fetchTheme();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    saveState(!darkMode, 'darkMode');
  };

  const value = useMemo(() => ({
    theme: darkMode ? darkTheme : theme,
    darkMode,
    toggleDarkMode,
  }), [darkMode]);

  return (
    <ThemeContext.Provider
      value={value}
    >
      <NavigationContainer theme={darkMode ? darkTheme : theme}>
        {children}
      </NavigationContainer>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
