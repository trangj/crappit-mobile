import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeStackNavigator from './HomeStackNavigator';
import TopicStackNavigator from './TopicStackNavigator';
import { useTheme } from '../context/ThemeState';

export type TabParamList = {
  HomeStackNavigator: undefined;
  AddPost: undefined;
  TopicStackNavigator: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'add';
          switch (route.name) {
            case 'HomeStackNavigator':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'TopicStackNavigator':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            default:
              break;
          }
          return (
            <Ionicons name={iconName} size={size} color={theme.colors.text} />
          );
        },
      })}
    >
      <Tab.Screen name="HomeStackNavigator" component={HomeStackNavigator} />
      <Tab.Screen
        name="AddPost"
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('AddPostStackNavigator');
          },
        })}
      >
        {() => null}
      </Tab.Screen>
      <Tab.Screen name="TopicStackNavigator" component={TopicStackNavigator} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
