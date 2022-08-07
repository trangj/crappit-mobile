import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import NotificationSettingsScreen from 'src/screens/NotificationScreens/NotificationSettingsScreen';
import PostScreen from '../screens/SharedScreens/PostScreen';
import TopicScreen from '../screens/SharedScreens/TopicScreen';
import ProfileScreen from '../screens/SharedScreens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreens/NotificationScreen';

export type NavigationStackParamList = {
  Notification: undefined;
  Post: { id: number };
  Topic: { title: string };
  Profile: { id: number };
  NotificationSettings: undefined;
};

const Stack = createNativeStackNavigator<NavigationStackParamList>();

function NotificationStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Notification" component={NotificationScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerBackTitle: '', headerTitle: '' }}>
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerBackTitle: '',
          headerTitle: '',
          headerTransparent: true,
        }}
      >
        <Stack.Screen name="Topic" component={TopicScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Group>
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={{ headerBackTitle: '', title: 'Notification Settings' }} />
    </Stack.Navigator>
  );
}

export default NotificationStackNavigator;
