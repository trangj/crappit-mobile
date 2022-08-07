import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from 'src/navigators/TabNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import Animated, {
  Extrapolate,
  interpolate,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { TabView, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { HomeStackParamList } from '../../navigators/HomeStackNavigator';
import { RootStackParamList } from '../../navigators/RootStackNavigator';
import useTopic from '../../hooks/topic-query/useTopic';
import TopicHeader from '../../components/topic/TopicHeader';
import PostsFlatList from '../../components/post/PostsFlatList';
import { useTheme } from '../../context/ThemeState';
import usePosts from '../../hooks/post-query/usePosts';
import TopicAbout from '../../components/topic/TopicAbout';
import LoadingScreen from '../../components/util/LoadingScreen';

export type TopicScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Topic'>,
  CompositeScreenProps<
    NativeStackScreenProps<TabParamList, 'HomeStackNavigator'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

const HEADER_SIZE = 265;

const CustomTabBar = React.memo(({ translateY, ...props }: any) => {
  const { theme } = useTheme();
  const tabStyle = useAnimatedStyle(() => {
    const moveY = interpolate(
      translateY.value,
      [-265, 0],
      [0, -265],
      Extrapolate.CLAMP,
    );

    return { transform: [{ translateY: moveY }] };
  });

  return (
    <Animated.View
      style={[{ top: 215, position: 'absolute', width: '100%' }, tabStyle]}
    >
      <TabBar
        {...props}
        activeColor={theme.colors.text}
        labelStyle={{
          color: theme.colors.textAlt,
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}
        style={{
          backgroundColor: theme.colors.card,
          borderBottomWidth: 0.5,
          borderColor: theme.colors.border,
        }}
        indicatorStyle={{ backgroundColor: theme.colors.blue }}
        tabStyle={{
          height: 49,
        }}
      />
    </Animated.View>
  );
});

function TopicScreen({ navigation, route }: TopicScreenProps) {
  // query
  const { title } = route.params;
  const { data: topic, isLoading: isTopicLoading } = useTopic(title);
  const [sortParam, setSortParam] = useState('hot');
  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isLoading,
    refetch,
  } = usePosts(title, sortParam);

  // tab bar
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'posts', title: 'Posts' },
    { key: 'about', title: 'About' },
  ]);

  // tab refs and scroll stuff
  const postsRef = useAnimatedRef();
  const aboutRef = useAnimatedRef();

  // animations
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      translateY.value = e.contentOffset.y;
      if (index === 0) {
        scrollTo(aboutRef, 0, e.contentOffset.y, false);
      } else if (index === 1) {
        scrollTo(postsRef, 0, e.contentOffset.y, false);
      }
    },
  });

  if (!topic || isTopicLoading) return <LoadingScreen />;

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'posts':
        return (
          <PostsFlatList
            ref={postsRef}
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
        );
      case 'about':
        return (
          <TopicAbout
            ref={aboutRef}
            scrollHandler={scrollHandler}
            navigation={navigation}
            topic={topic}
            headerSize={HEADER_SIZE}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <TopicHeader
        topic={topic}
        translateY={translateY}
        navigation={navigation}
        headerSize={HEADER_SIZE}
      />
      <TabView
        renderTabBar={(props) => (
          <CustomTabBar translateY={translateY} {...props} />
        )}
        renderScene={renderScene}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
}

export default TopicScreen;
