import React from "react";
import { PressableCard } from "../../ui/Card";
import { Post } from "../../types/entities/post";
import { HomeScreenNavigationProp } from "../../screens/HomeScreen";
import { useTheme } from "../../context/ThemeState";
import { View } from "react-native";
import PostToolBar from "./PostToolBar";
import PostHeader from "./PostHeader";
import RenderHTML from "../../ui/RenderHTML";

type PostItemProps = {
	post: Post;
	navigation: HomeScreenNavigationProp;
};

const PostItem = ({ post, navigation, ...props }: PostItemProps) => {
	const { theme } = useTheme();

	return (
		<PressableCard
			onPress={() => navigation.navigate("Post", { id: post.id })}
			style={{
				marginBottom: theme.spacing.sm,
			}}
			{...props}
		>
			<PostHeader post={post} navigation={navigation} />
			{post.content ? (
				<View
					style={{
						paddingHorizontal: theme.spacing.md,
						maxHeight: 100,
						overflow: "hidden",
					}}
				>
					<RenderHTML source={{ html: post.content }} />
				</View>
			) : null}
			{/* // photo viewer goes here */}
			<PostToolBar post={post} />
		</PressableCard>
	);
};

export default PostItem;
