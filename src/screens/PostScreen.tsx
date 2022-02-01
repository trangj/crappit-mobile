import { FlatList, RefreshControl, View } from "react-native";
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
import Button from "../ui/Button";
import RNBottomSheet from "@gorhom/bottom-sheet";
import SortSelect from "../components/post/SortSelect";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "../ui/BottomSheet";

type PostScreenProps = CompositeScreenProps<
	NativeStackScreenProps<HomeStackParamList, "Post">,
	CompositeScreenProps<
		NativeStackScreenProps<TabParamList, "HomeStackNavigator">,
		NativeStackScreenProps<RootStackParamList>
	>
>;

const PostScreen = ({ navigation, route }: PostScreenProps) => {
	const { theme } = useTheme();
	const [sortParam, setSortParam] = useState("hot");
	const ref = useRef<RNBottomSheet>(null);
	const { id } = route.params;
	const { data, isLoading } = usePost(id);
	const {
		isLoading: isCommentsLoading,
		data: comments,
		refetch,
	} = useComments(String(id), sortParam);

	if (isLoading || !data) return <Text>Loading...</Text>;

	return (
		<>
			<FlatList
				indicatorStyle={theme.dark ? "white" : "black"}
				data={comments as any}
				renderItem={({ item }) => (
					<Card
						style={{ marginBottom: 8, paddingHorizontal: theme.spacing.md }}
					>
						<CommentItem comment={item} />
					</Card>
				)}
				keyExtractor={(post) => String(post.id)}
				ListHeaderComponent={
					<>
						<PostCard post={data} navigation={navigation} />
						<View
							style={{
								display: "flex",
								alignItems: "flex-start",
								padding: theme.spacing.xs,
							}}
						>
							<Button
								variant="ghost"
								icon={
									<Ionicons
										name="chevron-down"
										color={theme.colors.textAlt}
										size={22}
									/>
								}
								onPress={() => ref.current?.expand()}
								style={{ flexDirection: "row-reverse" }}
								textStyle={{ fontSize: 12 }}
							>
								{sortParam.toUpperCase()} COMMENTS
							</Button>
						</View>
					</>
				}
				refreshControl={
					<RefreshControl refreshing={isCommentsLoading} onRefresh={refetch} />
				}
			/>
			<BottomSheet ref={ref}>
				<SortSelect
					setSortParam={setSortParam}
					sortParam={sortParam}
					bottomSheetRef={ref}
				/>
			</BottomSheet>
		</>
	);
};

export default PostScreen;
