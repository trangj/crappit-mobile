import React from 'react';
import { View } from 'react-native';
import { PressableCard } from '../../ui/Card';
import { Post } from '../../types/entities/post';
import { HomeScreenNavigationProp } from '../../screens/HomeScreen';
import { useTheme } from '../../context/ThemeState';
import PostToolBar from './PostToolBar';
import PostHeader from './PostHeader';
import Text from '../../ui/Text';
import RenderHTML from '../../ui/RenderHTML';

type PostItemProps = {
  post: Post;
  navigation: HomeScreenNavigationProp;
};

function PostItem({ post, navigation, ...props }: PostItemProps) {
  const { theme } = useTheme();

  return (
    <PressableCard
      onPress={() => navigation.navigate('Post', { id: post.id })}
      style={{
        marginBottom: theme.spacing.sm,
      }}
      {...props}
    >
      <PostHeader post={post} navigation={navigation} />
      {post.content ? (
        <View
          style={{
            paddingHorizontal: theme.spacing.md,
            maxHeight: 100,
            overflow: 'hidden',
          }}
        >
          {post.type === 'link' ? (
            <RenderHTML source={{ html: post.content }} />
          ) : (
            <Text>{post.content.replace(/<\/?[^>]+>/gi, ' ')}</Text>
          )}
        </View>
      ) : null}
      {/* // photo viewer goes here */}
      <PostToolBar post={post} />
    </PressableCard>
  );
}

export default PostItem;
