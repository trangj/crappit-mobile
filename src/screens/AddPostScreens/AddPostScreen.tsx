import React from "react";
import { Button as RNButton } from "react-native";
import { Header } from "@react-navigation/elements";
import { useTheme } from "../../context/ThemeState";
import { AddPostStackParamList } from "src/navigators/AddPostStackNavigator";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import Button from "../../ui/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

type AddPostScreenProps = CompositeScreenProps<
	NativeStackScreenProps<AddPostStackParamList, "AddPost">,
	NativeStackScreenProps<RootStackParamList>
>;

const AddPostScreen = ({ navigation }: AddPostScreenProps) => {
	const { theme } = useTheme();

	return (
		<>
			<Header
				title=""
				headerLeftContainerStyle={{ paddingLeft: theme.spacing.md }}
				headerRightContainerStyle={{ paddingRight: theme.spacing.md }}
				headerLeft={() => (
					<Button
						variant="ghost"
						onPress={() => navigation.navigate("DrawerNavigator")}
						icon={
							<Ionicons
								name="close-outline"
								size={35}
								color={theme.colors.textAlt}
							/>
						}
					/>
				)}
				headerRight={() => (
					<RNButton
						title="Post"
						onPress={() => navigation.navigate("DrawerNavigator")}
					/>
				)}
			/>
		</>
	);
};

export default AddPostScreen;
