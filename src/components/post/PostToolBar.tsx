import { Share, View } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '../../ui/Button';
import { useTheme } from '../../context/ThemeState';
import { Post } from '../../types/entities/post';
import Voting from './Voting';

type PostToolBarProps = {
  post: Post;
};

function PostToolBar({ post }: PostToolBarProps) {
  const { theme } = useTheme();

  const onShare = async () => {
    try {
      await Share.share(
        {
          url: `https://crappit.me/t/${post.topic}/comments/${post.id}`,
          title: post.title,
          message: `https://crappit.me/t/${post.topic}/comments/${post.id}`,
        },
        {
          dialogTitle: post.title,
          subject: post.title,
        },
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
      }}
    >
      <Voting post={post} />
      <Button
        variant="ghost"
        size="sm"
        icon={(
          <Ionicons
            name="chatbox-outline"
            color={theme.colors.textAlt}
            size={22}
            style={{ marginRight: theme.spacing.sm }}
          />
   )}
      >
        {post.number_of_comments ? post.number_of_comments : 'Comment'}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onPress={onShare}
        icon={(
          <Ionicons
            name="share-outline"
            color={theme.colors.textAlt}
            size={22}
            style={{ marginRight: theme.spacing.sm }}
          />
   )}
      >
        Share
      </Button>
    </View>
  );
}

export default PostToolBar;
