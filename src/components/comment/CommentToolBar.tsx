import { View } from "react-native";
import React from "react";
import { Comment } from "../../types/entities/comment";
import { useTheme } from "../../context/ThemeState";
import CommentVoting from "./CommentVoting";

type CommentToolBarProps = {
	comment: Comment;
};

const CommentToolBar = ({ comment }: CommentToolBarProps) => {
	const { theme } = useTheme();
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "flex-end",
				paddingVertical: theme.spacing.sm,
			}}
		>
			<CommentVoting comment={comment} />
		</View>
	);
};

export default CommentToolBar;
