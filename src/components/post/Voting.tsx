import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Post } from 'src/types/entities/post';
import { View } from 'react-native';
import { HomeScreenNavigationProp } from 'src/screens/HomeScreen';
import { useUser } from '../../context/UserState';
import useVoting from '../../hooks/post-query/useVoting';
import Text from '../../ui/Text';
import Button from '../../ui/Button';
import { useTheme } from '../../context/ThemeState';

type Props = {
  post: Post;
};

function Voting({ post }: Props) {
  const { user } = useUser();
  const { theme } = useTheme();
  const { mutate } = useVoting(post);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleUpvote = () => {
    mutate({ id: post.id, vote: 'like' });
  };

  const handleDownvote = () => {
    mutate({ id: post.id, vote: 'dislike' });
  };

  const getColor = () => {
    if (post.user_vote === 1) return theme.colors.upvote;
    if (post.user_vote === -1) return theme.colors.downvote;
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
              size={22}
              color={
                post.user_vote === 1
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
              size={22}
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
        {post.vote === 0 ? 'Vote' : post.vote}
      </Text>
      {user ? (
        <Button
          size="sm"
          variant="ghost"
          onPress={handleDownvote}
          icon={(
            <Ionicons
              name="arrow-down-outline"
              size={22}
              color={
                post.user_vote === -1
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
              size={22}
              color={theme.colors.textAlt}
            />
    )}
        />
      )}
    </View>
  );
}

export default Voting;
