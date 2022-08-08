import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import useNotifications from 'src/hooks/notification-query/useNotifications';
import { View } from 'react-native';
import HomeStackNavigator from './HomeStackNavigator';
import TopicStackNavigator from './TopicStackNavigator';
import { useTheme } from '../context/ThemeState';
import NotificationStackNavigator from './NotificationStackNavigator';

export type TabParamList = {
  HomeStackNavigator: undefined;
  AddPost: undefined;
  NotificationStackNavigator: undefined;
  TopicStackNavigator: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  const { theme } = useTheme();
  const { data } = useNotifications();

  const hasReadAll = useMemo(
    () => (data
      ? data.pages[0].notifications.every((notification) => notification.read_at) : true),
    [data],
  );

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
            case 'NotificationStackNavigator':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            default:
              break;
          }
          return (
            <View style={{ position: 'relative' }}>
              <Ionicons name={iconName} size={size} color={theme.colors.text} />
              {!hasReadAll && route.name === 'NotificationStackNavigator' && (
                <View style={{
                  backgroundColor: theme.colors.upvote,
                  height: 7,
                  width: 7,
                  borderRadius: 9999,
                  position: 'absolute',
                  right: 0,
                }}
                />
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="HomeStackNavigator" component={HomeStackNavigator} />
      <Tab.Screen name="TopicStackNavigator" component={TopicStackNavigator} />
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
      <Tab.Screen name="NotificationStackNavigator" component={NotificationStackNavigator} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
