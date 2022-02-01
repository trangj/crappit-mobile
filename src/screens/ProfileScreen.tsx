import { FlatList, Platform, RefreshControl, View } from "react-native";
import React, { useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigators/HomeStackNavigator";
import Text from "../ui/Text";
import { TabParamList } from "src/navigators/TabNavigator";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParamList } from "src/navigators/RootStackNavigator";
import { useTheme } from "../context/ThemeState";
import RNBottomSheet from "@gorhom/bottom-sheet";
import PostItem from "../components/post/PostItem";
import SortSelect from "../components/post/SortSelect";
import Button from "../ui/Button";
import BottomSheet from "../ui/BottomSheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import useProfile from "../hooks/user-query/useProfile";
import useProfilePosts from "../hooks/user-query/useProfilePosts";
import ProfileHeader from "../components/profile/ProfileHeader";

export type ProfileScreenProps = CompositeScreenProps<
	NativeStackScreenProps<HomeStackParamList, "Profile">,
	CompositeScreenProps<
		NativeStackScreenProps<TabParamList, "HomeStackNavigator">,
		NativeStackScreenProps<RootStackParamList>
	>
>;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
	const { theme } = useTheme();
	const [sortParam, setSortParam] = useState("hot");
	const ref = useRef<RNBottomSheet>(null);
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

	if (isLoading || !posts || !data || isPostsLoading)
		return <Text>Loading...</Text>;

	return (
		<>
			<ProfileHeader profile={data} translateY={translateY} />
			<AnimatedFlatList
				indicatorStyle={theme.dark ? "white" : "black"}
				scrollEventThrottle={16}
				onScroll={scrollHandler}
				data={posts as any}
				renderItem={({ item }: any) => (
					<PostItem post={item} navigation={navigation} />
				)}
				ListHeaderComponent={
					<>
						<View
							style={{
								display: "flex",
								alignItems: "flex-start",
								padding: theme.spacing.xs,
							}}
						>
							<Button
								variant="ghost"
								icon={
									<Ionicons
										name="chevron-down"
										color={theme.colors.textAlt}
										size={22}
									/>
								}
								onPress={() => ref.current?.expand()}
								style={{ flexDirection: "row-reverse" }}
								textStyle={{ fontSize: 12 }}
							>
								{sortParam.toUpperCase()} POSTS
							</Button>
						</View>
					</>
				}
				keyExtractor={(post: any) => String(post.id)}
				onEndReached={(hasNextPage as any) && fetchNextPage}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={refetch} />
				}
				contentInset={{ top: 215 }}
				contentOffset={Platform.select({
					ios: {
						x: 0,
						y: -215,
					},
				})}
			/>
			<BottomSheet ref={ref}>
				<SortSelect
					setSortParam={setSortParam}
					sortParam={sortParam}
					bottomSheetRef={ref}
				/>
			</BottomSheet>
		</>
	);
};

export default ProfileScreen;
