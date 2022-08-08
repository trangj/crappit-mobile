import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from 'src/navigators/TabNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigators/RootStackNavigator';
import { FlatList, RefreshControl } from 'react-native';
import usePosts from '../hooks/post-query/usePosts';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import PostItem from '../components/post/PostItem';
import { useTheme } from '../context/ThemeState';
import SortBottomSheet from '../components/shared/SortBottomSheet';

type HomeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Home'>,
  CompositeScreenProps<
    NativeStackScreenProps<TabParamList, 'HomeStackNavigator'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type HomeScreenNavigationProp = HomeScreenProps['navigation'];

function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme } = useTheme();
  const [sortParam, setSortParam] = useState('hot');
  const {
    data, hasNextPage, fetchNextPage, isLoading, refetch,
  } = usePosts(
    '',
    sortParam,
  );

  return (
    <FlatList
      indicatorStyle={theme.dark ? 'white' : 'black'}
      data={data as any}
      renderItem={({ item }) => (
        <PostItem post={item} navigation={navigation} />
      )}
      ListHeaderComponent={
        <SortBottomSheet sortParam={sortParam} setSortParam={setSortParam} />
        }
      keyExtractor={(post) => String(post.id)}
      onEndReached={(hasNextPage as any) && fetchNextPage}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    />
  );
}

export default HomeScreen;
