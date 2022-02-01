import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigators/HomeStackNavigator";
import Text from "../ui/Text";
import { TabParamList } from "src/navigators/TabNavigator";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParamList } from "../navigators/RootStackNavigator";
import useTopic from "../hooks/topic-query/useTopic";
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import TopicHeader from "../components/topic/TopicHeader";
import PostsFlatList from "../components/post/PostsFlatList";
import { TabView, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";
import { useTheme } from "../context/ThemeState";
import usePosts from "../hooks/post-query/usePosts";
import TopicAbout from "../components/topic/TopicAbout";

export type TopicScreenProps = CompositeScreenProps<
	NativeStackScreenProps<HomeStackParamList, "Topic">,
	CompositeScreenProps<
		NativeStackScreenProps<TabParamList, "HomeStackNavigator">,
		NativeStackScreenProps<RootStackParamList>
	>
>;

const CustomTabBar = React.memo(({ translateY, ...props }: any) => {
	const { theme } = useTheme();
	const tabStyle = useAnimatedStyle(() => {
		const moveY = interpolate(
			translateY.value,
			[-265, 0],
			[0, -265],
			Extrapolate.CLAMP
		);

		return { transform: [{ translateY: moveY }] };
	});

	return (
		<Animated.View
			style={[{ top: 215, position: "absolute", width: "100%" }, tabStyle]}
		>
			<TabBar
				{...props}
				activeColor={theme.colors.text}
				labelStyle={{
					color: theme.colors.textAlt,
					fontWeight: "bold",
					textTransform: "capitalize",
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

const TopicScreen = ({ navigation, route }: TopicScreenProps) => {
	// query
	const { title } = route.params;
	const { data: topic, isLoading: isTopicLoading } = useTopic(title);
	const [sortParam, setSortParam] = useState("hot");
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
		{ key: "posts", title: "Posts" },
		{ key: "about", title: "About" },
	]);

	// animations
	const translateY = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler((e) => {
		translateY.value = e.contentOffset.y;
	});

	const renderScene = ({ route }: { route: { key: string } }) => {
		switch (route.key) {
			case "posts":
				return (
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
					/>
				);
			case "about":
				return (
					<TopicAbout scrollHandler={scrollHandler} navigation={navigation} />
				);
			default:
				return null;
		}
	};

	if (!topic || isTopicLoading) return <Text>Loading...</Text>;

	return (
		<>
			<TopicHeader
				topic={topic}
				translateY={translateY}
				navigation={navigation}
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
};

export default TopicScreen;
