import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PostScreen from '../screens/SharedScreens/PostScreen';
import TopicScreen from '../screens/SharedScreens/TopicScreen';
import TopicsScreen from '../screens/TopicsScreen';

export type TopicStackParamList = {
  Topics: undefined;
  Post: { id: string };
  Topic: { title: string };
};

const Stack = createNativeStackNavigator<TopicStackParamList>();

function TopicStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Topics" component={TopicsScreen} />
      <Stack.Group screenOptions={{ headerBackTitle: '', headerTitle: '' }}>
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Topic" component={TopicScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default TopicStackNavigator;
