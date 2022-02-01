import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthStackNavigator from "./AuthStackNavigator";
import AddPostStackNavigator from "./AddPostStackNavigator";
import DrawerNavigator from "./DrawerNavigator";
import SettingsScreen from "../screens/SettingsScreen";

export type RootStackParamList = {
	DrawerNavigator: undefined;
	AddPostStackNavigator: undefined;
	AuthStackNavigator: undefined;
	Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
			<Stack.Group screenOptions={{ presentation: "fullScreenModal" }}>
				<Stack.Screen
					name="AddPostStackNavigator"
					component={AddPostStackNavigator}
				/>
				<Stack.Screen
					name="AuthStackNavigator"
					component={AuthStackNavigator}
				/>
			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen name="Settings" component={SettingsScreen} />
			</Stack.Group>
		</Stack.Navigator>
	);
};

export default RootStackNavigator;
