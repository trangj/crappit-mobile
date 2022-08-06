import { View } from 'react-native';
import React from 'react';
import { Comment } from '../../types/entities/comment';
import { useTheme } from '../../context/ThemeState';
import CommentVoting from './CommentVoting';
import CommentReply from './CommentReply';
import CommentOptions from './CommentOptions';
// import Button from "../../ui/Button";
// import Ionicons from "@expo/vector-icons/Ionicons";

type CommentToolBarProps = {
  comment: Comment;
};

function CommentToolBar({ comment } : CommentToolBarProps) {
  const { theme } = useTheme();
  return !comment.is_deleted ? (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: theme.spacing.sm,
      }}
    >
      <CommentOptions comment={comment} />
      <CommentReply comment={comment} />
      <CommentVoting comment={comment} />
    </View>
  ) : null;
}

export default CommentToolBar;
