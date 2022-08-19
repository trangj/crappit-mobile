import React from 'react';
import { View } from 'react-native';
import { parseTextFromHtml } from 'src/helpers/parseText';
import ImageViewer from 'src/ui/ImageViewer';
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
          <Text>{parseTextFromHtml(post.content)}</Text>
        </View>
        )}
      </PressableCard>
      {post.type === 'link' && (
      <Embed url={post.content} />
      )}
      {post.type === 'photo' && (
        <ImageViewer uri={post.image_url} name={post.image_name} />
      )}
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
