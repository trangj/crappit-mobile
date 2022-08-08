import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from 'src/screens/SharedScreens/ProfileScreen';
import PostScreen from '../screens/SharedScreens/PostScreen';
import TopicScreen from '../screens/SharedScreens/TopicScreen';
import TopicsScreen from '../screens/TopicsScreen';

export type TopicStackParamList = {
  Topics: undefined;
  Post: { id: string };
  Topic: { title: string };
  Profile: { id: number };
};

const Stack = createNativeStackNavigator<TopicStackParamList>();

function TopicStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Topics" component={TopicsScreen} />
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

export default TopicStackNavigator;
