import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import PostScreen from "../screens/PostScreen";
import HomeScreen from "../screens/HomeScreen";
import TopicScreen from "../screens/TopicScreen";
import ProfileScreen from "../screens/ProfileScreen";

export type HomeStackParamList = {
	Home: undefined;
	Post: { id: number };
	Topic: { title: string };
	Profile: { id: number };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Group screenOptions={{ headerBackTitle: "", headerTitle: "" }}>
				<Stack.Screen name="Post" component={PostScreen} />
			</Stack.Group>
			<Stack.Group
				screenOptions={{
					headerBackTitle: "",
					headerTitle: "",
					headerTransparent: true,
				}}
			>
				<Stack.Screen name="Topic" component={TopicScreen} />
				<Stack.Screen name="Profile" component={ProfileScreen} />
			</Stack.Group>
		</Stack.Navigator>
	);
};

export default HomeStackNavigator;
