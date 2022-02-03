import { View } from "react-native";
import React, { forwardRef } from "react";
import { Comment } from "../../types/entities/comment";
import { useTheme } from "../../context/ThemeState";
import CommentVoting from "./CommentVoting";
import Button from "../../ui/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

type CommentToolBarProps = {
	comment: Comment;
};

const CommentToolBar = forwardRef<any, CommentToolBarProps>(
	({ comment }, ref) => {
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
				<Button
					icon={
						<Ionicons
							name="return-up-back-outline"
							size={20}
							color={theme.colors.textAlt}
							style={{ marginRight: theme.spacing.sm }}
						/>
					}
					variant="ghost"
					size="sm"
					onPress={() => ref.current.focus()}
				>
					Reply
				</Button>
				<CommentVoting comment={comment} />
			</View>
		);
	}
);

export default CommentToolBar;
