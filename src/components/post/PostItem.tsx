import React from 'react';
import { View } from 'react-native';
import Embed from '../../ui/Embed';
import { Card, PressableCard } from '../../ui/Card';
import { Post } from '../../types/entities/post';
import { HomeScreenNavigationProp } from '../../screens/HomeScreen';
import { useTheme } from '../../context/ThemeState';
import PostToolBar from './PostToolBar';
import PostHeader from './PostHeader';
import Text from '../../ui/Text';

type PostItemProps = {
  post: Post;
  navigation: HomeScreenNavigationProp;
};

function PostItem({ post, navigation, ...props }: PostItemProps) {
  const { theme } = useTheme();

  return (
    <>
      <PressableCard
        onPress={() => navigation.navigate('Post', { id: post.id })}
        {...props}
      >
        <PostHeader post={post} navigation={navigation} />
        {post.type === 'text' && (
        <View
          style={{
            paddingHorizontal: theme.spacing.md,
            maxHeight: 100,
            overflow: 'hidden',
          }}
        >
          <Text>{post.content.replace(/<\/?[^>]+>/gi, ' ')}</Text>
        </View>
        )}
      </PressableCard>
      {post.type === 'link' && (
      <Embed url={post.content} />
      )}
      {/* // photo viewer goes here */}
      <Card
        style={{
          marginBottom: theme.spacing.sm,
        }}
      >
        <PostToolBar post={post} />
      </Card>
    </>
  );
}

export default PostItem;
