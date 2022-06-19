import { Platform, RefreshControl, FlatList } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import PostItem from './PostItem';
import { useTheme } from '../../context/ThemeState';
import SortBottomSheet from '../shared/SortBottomSheet';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type PostsFlatListProps = {
  scrollHandler: any;
  navigation: any;
  posts: any;
  hasNextPage: boolean | undefined;
  fetchNextPage: any;
  isLoading: boolean;
  refetch: any;
  sortParam: string;
  setSortParam: (arg: string) => void;
  headerSize: number;
};

function PostsFlatList({
  scrollHandler,
  navigation,
  posts,
  hasNextPage,
  fetchNextPage,
  isLoading,
  refetch,
  sortParam,
  setSortParam,
  headerSize,
}: PostsFlatListProps) {
  const { theme } = useTheme();

  return (
    <AnimatedFlatList
      indicatorStyle={theme.dark ? 'white' : 'black'}
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      data={posts as any}
      renderItem={({ item }: any) => (
        <PostItem post={item} navigation={navigation} />
      )}
      ListHeaderComponent={
        <SortBottomSheet sortParam={sortParam} setSortParam={setSortParam} />
      }
      keyExtractor={(post: any) => String(post.id)}
      onEndReached={(hasNextPage as any) && fetchNextPage}
      refreshControl={(
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          tintColor="white"
        />
  )}
      contentInset={{ top: headerSize }}
      contentOffset={Platform.select({
        ios: {
          x: 0,
          y: -headerSize,
        },
      })}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    />
  );
}

export default React.memo(PostsFlatList);
