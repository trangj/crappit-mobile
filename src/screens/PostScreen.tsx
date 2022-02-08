import {
	FlatList,
	RefreshControl,
	TextInput as RNTextInput,
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
import AddCommentCard from "../components/post/AddCommentCard";

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
	const [sortParam, setSortParam] = useState("hot");
	const {
		isLoading: isCommentsLoading,
		data: comments,
		refetch,
	} = useComments(String(id), sortParam);
	const [focused, setFocused] = useState(false);
	const ref = useRef<RNTextInput>(null);

	if (isLoading || !data) return <Text>Loading...</Text>;

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
			<AddCommentCard
				ref={ref}
				post={data}
				sortParam={sortParam}
				focused={focused}
				setFocused={setFocused}
			/>
		</>
	);
};

export default PostScreen;
