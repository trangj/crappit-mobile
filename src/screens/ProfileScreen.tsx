import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from 'src/navigators/TabNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigators/RootStackNavigator';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Text from '../ui/Text';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import useProfile from '../hooks/user-query/useProfile';
import useProfilePosts from '../hooks/user-query/useProfilePosts';
import ProfileHeader from '../components/profile/ProfileHeader';
import PostsFlatList from '../components/post/PostsFlatList';

export type ProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Profile'>,
  CompositeScreenProps<
    NativeStackScreenProps<TabParamList, 'HomeStackNavigator'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

const HEADER_SIZE = 215;

function ProfileScreen({ navigation, route }: ProfileScreenProps) {
  const [sortParam, setSortParam] = useState('hot');
  const { id } = route.params;
  const { data, isLoading } = useProfile(String(id));

  const {
    data: posts,
    isLoading: isPostsLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useProfilePosts(String(id), sortParam);

  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    translateY.value = e.contentOffset.y;
  });

  if (isLoading || !posts || !data || isPostsLoading) return <Text>Loading...</Text>;

  return (
    <>
      <ProfileHeader
        profile={data}
        translateY={translateY}
        headerSize={HEADER_SIZE}
      />
      <PostsFlatList
        scrollHandler={scrollHandler}
        navigation={navigation}
        posts={posts}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        refetch={refetch}
        sortParam={sortParam}
        setSortParam={setSortParam}
        headerSize={HEADER_SIZE}
      />
    </>
  );
}

export default ProfileScreen;
