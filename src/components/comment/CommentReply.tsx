import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeState';
import Button from '../../ui/Button';
import Text from '../../ui/Text';
import { useAddCommentContext } from './AddCommentContext';

function CommentReply({ comment }: any) {
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
          style={{
            paddingRight: theme.spacing.xs,
          }}
        />
      )}
    >
      <Text
        style={{
          alignSelf: 'center',
          textAlign: 'center',
          fontWeight: '600',
          color: theme.colors.textAlt,
        }}
      >
        Reply
      </Text>
    </Button>
  );
}
export default CommentReply;
