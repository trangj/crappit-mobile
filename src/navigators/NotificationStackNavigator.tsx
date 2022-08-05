import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PostScreen from '../screens/PostScreen';
import TopicScreen from '../screens/TopicScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';

export type NavigationStackParamList = {
  Notification: undefined;
  Post: { id: number };
  Topic: { title: string };
  Profile: { id: number };
};

const Stack = createNativeStackNavigator<NavigationStackParamList>();

function NotificationStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notification" component={NotificationScreen} />
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
    </Stack.Navigator>
  );
}

export default NotificationStackNavigator;
