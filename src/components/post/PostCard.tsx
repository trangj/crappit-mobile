import React from "react";
import { Card } from "../../ui/Card";
import { Post } from "../../types/entities/post";
import { HomeScreenNavigationProp } from "../../screens/HomeScreen";
import { useTheme } from "../../context/ThemeState";
import { View } from "react-native";
import PostToolBar from "./PostToolBar";
import PostHeader from "./PostHeader";
import RenderHTML from "../../ui/RenderHTML";

type PostCardProps = {
	post: Post;
	navigation: HomeScreenNavigationProp;
};

const PostCard = ({ post, navigation, ...props }: PostCardProps) => {
	const { theme } = useTheme();

	return (
		<Card {...props}>
			<PostHeader post={post} navigation={navigation} />
			{post.content ? (
				<View
					style={{
						paddingHorizontal: theme.spacing.md,
					}}
				>
					<RenderHTML source={{ html: post.content }} />
				</View>
			) : null}
			{/* // photo viewer goes here */}
			<PostToolBar post={post} />
		</Card>
	);
};

export default PostCard;
