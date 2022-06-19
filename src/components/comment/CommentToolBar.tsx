import { View } from 'react-native';
import React, { forwardRef } from 'react';
import { Comment } from '../../types/entities/comment';
import { useTheme } from '../../context/ThemeState';
import CommentVoting from './CommentVoting';
// import Button from "../../ui/Button";
// import Ionicons from "@expo/vector-icons/Ionicons";

type CommentToolBarProps = {
  comment: Comment;
};

const CommentToolBar = forwardRef<any, CommentToolBarProps>(
  ({ comment }) => {
    const { theme } = useTheme();
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingVertical: theme.spacing.sm,
        }}
      >
        <CommentVoting comment={comment} />
      </View>
    );
  },
);

export default CommentToolBar;
