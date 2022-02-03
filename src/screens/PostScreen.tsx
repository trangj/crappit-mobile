import {
	FlatList,
	RefreshControl,
	Image,
	View,
	TextInput as RNTextInput,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigators/HomeStackNavigator";
import Text from "../ui/Text";
import { TabParamList } from "src/navigators/TabNavigator";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParamList } from "src/navigators/RootStackNavigator";
import usePost from "../hooks/post-query/usePost";
import PostCard from "../components/post/PostCard";
import useComments from "../hooks/comment-query/useComments";
import { Card } from "../ui/Card";
import CommentItem from "../components/comment/CommentItem";
import { useTheme } from "../context/ThemeState";
import SortBottomSheet from "../components/shared/SortBottomSheet";
import { useUser } from "../context/UserState";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

type PostScreenProps = CompositeScreenProps<
	NativeStackScreenProps<HomeStackParamList, "Post">,
	CompositeScreenProps<
		NativeStackScreenProps<TabParamList, "HomeStackNavigator">,
		NativeStackScreenProps<RootStackParamList>
	>
>;

const PostScreen = ({ navigation, route }: PostScreenProps) => {
	const { theme } = useTheme();
	const { id } = route.params;
	const { data, isLoading } = usePost(id);
	if (isLoading || !data) return <Text>Loading...</Text>;

	const [sortParam, setSortParam] = useState("hot");
	const {
		isLoading: isCommentsLoading,
		data: comments,
		refetch,
	} = useComments(String(id), sortParam);
	const { user } = useUser();
	const [focused, setFocused] = useState(false);
	const ref = useRef<RNTextInput>(null);

	return (
		<>
			<FlatList
				indicatorStyle={theme.dark ? "white" : "black"}
				data={comments as any}
				renderItem={({ item }) => (
					<Card
						style={{
							marginBottom: theme.spacing.sm,
							paddingHorizontal: theme.spacing.md,
						}}
					>
						<CommentItem comment={item} ref={ref} />
					</Card>
				)}
				keyExtractor={(post) => String(post.id)}
				ListHeaderComponent={
					<>
						<PostCard post={data} navigation={navigation} />
						<SortBottomSheet
							setSortParam={setSortParam}
							sortParam={sortParam}
						/>
					</>
				}
				refreshControl={
					<RefreshControl refreshing={isCommentsLoading} onRefresh={refetch} />
				}
			/>
			<KeyboardAvoidingView
				keyboardVerticalOffset={88}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<Card
					style={{
						display: "flex",
						padding: theme.spacing.sm,
					}}
				>
					{focused && (
						<View>
							<Ionicons
								onPress={() => ref.current?.blur()}
								name="close-outline"
								size={35}
								color={theme.colors.textAlt}
							/>
						</View>
					)}
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							width: "100%",
							borderBottomWidth: focused ? 1 : undefined,
							borderColor: theme.colors.border,
						}}
					>
						{!focused &&
							(user && user.avatar_image_url ? (
								<Image
									source={{ uri: user.avatar_image_url }}
									style={{
										height: 28,
										width: 28,
										marginRight: theme.spacing.sm,
									}}
								/>
							) : (
								<View
									style={{
										height: 28,
										width: 28,
										backgroundColor: theme.colors.textAlt,
										borderRadius: 9999,
										marginRight: theme.spacing.sm,
									}}
								/>
							))}
						<TextInput
							ref={ref}
							border="rounded"
							placeholder="Add a comment"
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
							style={{
								backgroundColor: focused ? "transparent" : theme.colors.border,
								height: focused ? 100 : 36,
								textAlignVertical: "top",
								paddingTop: 10,
								width: "90%",
							}}
							multiline={true}
						/>
					</View>
					{focused && (
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-end",
							}}
						>
							<Button
								variant="ghost"
								width={60}
								textStyle={{ color: theme.colors.blue, fontSize: 16 }}
							>
								Reply
							</Button>
						</View>
					)}
				</Card>
			</KeyboardAvoidingView>
		</>
	);
};

export default PostScreen;
