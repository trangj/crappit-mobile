import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddPostContext from 'src/screens/AddPostScreens/AddPostContext';
import AddPostScreen from '../screens/AddPostScreens/AddPostScreen';
import SelectTopicScreen from '../screens/AddPostScreens/SelectTopicScreen';

export type AddPostStackParamList = {
  SelectTopic: undefined;
  AddPost: undefined;
};

const Stack = createNativeStackNavigator<AddPostStackParamList>();

function AddPostStackNavigator() {
  return (
    <AddPostContext>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AddPost" component={AddPostScreen} />
        <Stack.Screen name="SelectTopic" component={SelectTopicScreen} />
      </Stack.Navigator>
    </AddPostContext>
  );
}

export default AddPostStackNavigator;
