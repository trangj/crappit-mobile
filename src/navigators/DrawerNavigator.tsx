import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import { useTheme } from '../context/ThemeState';
import { useUser } from '../context/UserState';

export type DrawerParamList = {
  TabNavigator: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent({ navigation }: DrawerContentComponentProps) {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logoutUser } = useUser();

  return (
    <DrawerContentScrollView>
      {user && (
      <>
        <DrawerItem
          label="My profile"
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('Profile', {
              id: user.id,
            });
          }}
        />
        <DrawerItem
          label="Create a topic"
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('HomeStackNavigator', { screen: 'Post' });
          }}
        />
      </>
      )}
      {!user ? (
        <DrawerItem
          label="Log in"
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('AuthStackNavigator');
          }}
        />
      ) : (
        <DrawerItem
          label="Log out"
          onPress={() => {
            navigation.closeDrawer();
            logoutUser();
          }}
        />
      )}
      <DrawerItem
        label={darkMode ? 'Dark mode' : 'Light mode'}
        onPress={() => toggleDarkMode()}
      />
      <DrawerItem
        label="Settings"
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Settings');
        }}
      />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
