import { Pressable, View, Image } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import { useTheme } from '../../context/ThemeState';
import Text from '../../ui/Text';
import { Post } from '../../types/entities/post';
import Heading from '../../ui/Heading';
import { HomeScreenNavigationProp } from '../../screens/HomeScreen';
import PostOptions from './PostOptions';

type PostHeaderProps = {
  post: Post;
  navigation: HomeScreenNavigationProp;
};

function PostHeader({ post, navigation }: PostHeaderProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        paddingTop: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: theme.spacing.sm,
        }}
      >
        {post.icon_image_url ? (
          <Image
            source={{ uri: post.icon_image_url }}
            style={{ height: 28, width: 28, marginRight: theme.spacing.sm }}
          />
        ) : (
          <View
            style={{
              height: 28,
              width: 28,
              backgroundColor: theme.colors.textAlt,
              borderRadius: 9999,
              marginRight: theme.spacing.sm,
            }}
          />
        )}
        <View
          style={{
            display: 'flex',
          }}
        >
          <Pressable
            onPress={() => navigation.navigate('Topic', { title: post.topic })}
          >
            <Text style={{ color: theme.colors.textAlt, fontWeight: 'bold' }}>
              t/
              {post.topic}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Profile', { id: post.author_id })}
          >
            <Text style={{ color: theme.colors.textAlt }}>
              u/
              {post.author}
              {' '}
              &bull;
              {' '}
              {dayjs(post.created_at).fromNow()}
            </Text>
          </Pressable>
        </View>
        <PostOptions post={post} />
      </View>
      <Heading size="sm" style={{ marginBottom: theme.spacing.xs }}>
        {post.title}
      </Heading>
    </View>
  );
}

export default PostHeader;
