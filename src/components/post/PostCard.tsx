import React from 'react';
import { View } from 'react-native';
import Embed from 'src/ui/Embed';
import { Card } from 'src/ui/Card';
import { Post, PostType } from 'src/types/entities/post';
import RenderHTML from 'src/ui/RenderHTML';
import ImageViewer from 'src/ui/ImageViewer';
import { HomeScreenNavigationProp } from '../../screens/HomeScreen';
import { useTheme } from '../../context/ThemeState';
import PostToolBar from './PostToolBar';
import PostHeader from './PostHeader';

type PostCardProps = {
  post: Post;
  navigation: HomeScreenNavigationProp;
};

function PostCard({ post, navigation, ...props }: PostCardProps) {
  const { theme } = useTheme();

  return (
    <Card {...props}>
      <PostHeader post={post} navigation={navigation} />
      {post.type === 'text' && (
        <View
          style={{
            paddingHorizontal: theme.spacing.md,
          }}
        >
          <RenderHTML source={{ html: post.type === PostType.TEXT ? post.content : `<a href=${post.content}>${post.content}</a>` }} />
        </View>
      )}
      {post.type === 'link' && (
        <Embed url={post.content} />
      )}
      {post.type === 'photo' && (
        <ImageViewer uri={post.image_url} />
      )}
      <PostToolBar post={post} />
    </Card>
  );
}

export default PostCard;
