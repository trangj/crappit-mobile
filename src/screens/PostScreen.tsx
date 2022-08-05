import {
  FlatList,
  RefreshControl,
  TextInput as RNTextInput,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from 'src/navigators/TabNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigators/RootStackNavigator';
import Text from '../ui/Text';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import usePost from '../hooks/post-query/usePost';
import PostCard from '../components/post/PostCard';
import useComments from '../hooks/comment-query/useComments';
import { Card } from '../ui/Card';
import CommentItem from '../components/comment/CommentItem';
import { useTheme } from '../context/ThemeState';
import SortBottomSheet from '../components/shared/SortBottomSheet';
import AddCommentCard from '../components/comment/AddCommentCard';
import { AddCommentProvider } from '../components/comment/AddCommentContext';

type PostScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Post'>,
  CompositeScreenProps<
    NativeStackScreenProps<TabParamList, 'HomeStackNavigator'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

function PostScreen({ navigation, route }: PostScreenProps) {
  const { theme } = useTheme();
  const { id } = route.params;
  const { data, isLoading } = usePost(id);
  const [sortParam, setSortParam] = useState('hot');
  const {
    isLoading: isCommentsLoading,
    data: comments,
    refetch,
  } = useComments(String(id), sortParam);

  if (isLoading || !data) return <Text>Loading...</Text>;

  return (
    <AddCommentProvider>
      <FlatList
        indicatorStyle={theme.dark ? 'white' : 'black'}
        data={comments as any}
        renderItem={({ item }) => (
          <Card
            style={{
              marginBottom: theme.spacing.sm,
              paddingHorizontal: theme.spacing.md,
            }}
          >
            <CommentItem comment={item} />
          </Card>
        )}
        keyExtractor={(post) => String(post.id)}
        ListHeaderComponent={(
          <>
            <PostCard post={data} navigation={navigation} />
            <SortBottomSheet
              setSortParam={setSortParam}
              sortParam={sortParam}
            />
          </>
        )}
        refreshControl={
          <RefreshControl refreshing={isCommentsLoading} onRefresh={refetch} />
        }
      />
      <AddCommentCard
        post={data}
        sortParam={sortParam}
      />
    </AddCommentProvider>
  );
}

export default PostScreen;
