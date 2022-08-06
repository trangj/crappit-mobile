import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeState';
import Button from '../../ui/Button';
import { useAddCommentContext } from './AddCommentContext';
import { Comment } from '../../types/entities/comment';

function CommentReply({ comment }: {comment: Comment}) {
  const { theme } = useTheme();
  const { addCommentRef: ref, setType, setParentComment } = useAddCommentContext();

  return (
    <Button
      size="sm"
      variant="ghost"
      onPress={() => {
        setType('reply');
        setParentComment(comment);
        ref?.current.focus();
      }}
      icon={(
        <Ionicons
          name="return-up-back-outline"
          size={20}
          color={theme.colors.textAlt}
        />
      )}
      textStyle={{
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: '600',
        color: theme.colors.textAlt,
        marginLeft: theme.spacing.xs,
      }}
    >
      {!comment.parent_comment_id && (
        'Reply'
      )}
    </Button>
  );
}
export default CommentReply;
