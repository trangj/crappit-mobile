import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Comment } from 'src/types/entities/comment';
import { View } from 'react-native';
import { HomeScreenNavigationProp } from 'src/screens/HomeScreen';
import { useUser } from '../../context/UserState';
import useCommentVoting from '../../hooks/comment-query/useCommentVoting';
import Text from '../../ui/Text';
import Button from '../../ui/Button';
import { useTheme } from '../../context/ThemeState';

type Props = {
  comment: Comment;
};

function CommentVoting({ comment }: Props) {
  const { user } = useUser();
  const { theme } = useTheme();
  const { mutate } = useCommentVoting(comment);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleUpvote = () => {
    mutate({ commentId: comment.id, vote: 'like' });
  };

  const handleDownvote = () => {
    mutate({ commentId: comment.id, vote: 'dislike' });
  };

  const getColor = () => {
    if (comment.user_vote === 1) return theme.colors.upvote;
    if (comment.user_vote === -1) return theme.colors.downvote;
    return theme.colors.textAlt;
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {user ? (
        <Button
          size="sm"
          variant="ghost"
          onPress={handleUpvote}
          icon={(
            <Ionicons
              name="arrow-up-outline"
              size={20}
              color={
                comment.user_vote === 1
                  ? theme.colors.upvote
                  : theme.colors.textAlt
              }
            />
    )}
        />
      ) : (
        <Button
          size="sm"
          variant="ghost"
          onPress={() => navigation.navigate('AuthStackNavigator')}
          icon={(
            <Ionicons
              name="arrow-up-outline"
              size={20}
              color={theme.colors.textAlt}
            />
    )}
        />
      )}
      <Text
        style={{
          alignSelf: 'center',
          textAlign: 'center',
          fontWeight: '600',
          maxWidth: 40,
          color: getColor(),
        }}
      >
        {comment.vote === 0 ? 'Vote' : comment.vote}
      </Text>
      {user ? (
        <Button
          size="sm"
          variant="ghost"
          onPress={handleDownvote}
          icon={(
            <Ionicons
              name="arrow-down-outline"
              size={20}
              color={
                comment.user_vote === -1
                  ? theme.colors.downvote
                  : theme.colors.textAlt
              }
            />
    )}
        />
      ) : (
        <Button
          size="sm"
          variant="ghost"
          onPress={() => navigation.navigate('AuthStackNavigator')}
          icon={(
            <Ionicons
              name="arrow-down-outline"
              size={20}
              color={theme.colors.textAlt}
            />
    )}
        />
      )}
    </View>
  );
}

export default CommentVoting;
