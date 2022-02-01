import { View, Platform, RefreshControl, FlatList } from "react-native";
import React, { useRef } from "react";
import BottomSheet from "../../ui/BottomSheet";
import Button from "../../ui/Button";
import SortSelect from "./SortSelect";
import PostItem from "./PostItem";
import Animated from "react-native-reanimated";
import { TopicScreenProps } from "../../screens/TopicScreen";
import RNBottomSheet from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeState";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type PostsFlatListProps = {
	scrollHandler: any;
	navigation: TopicScreenProps["navigation"];
	posts: any;
	hasNextPage: boolean | undefined;
	fetchNextPage: any;
	isLoading: boolean;
	refetch: any;
	sortParam: string;
	setSortParam: (arg: string) => void;
};

const PostsFlatList = ({
	scrollHandler,
	navigation,
	posts,
	hasNextPage,
	fetchNextPage,
	isLoading,
	refetch,
	sortParam,
	setSortParam,
}: PostsFlatListProps) => {
	const ref = useRef<RNBottomSheet>(null);
	const { theme } = useTheme();

	return (
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
							borderBottomWidth: 0.5,
							borderColor: theme.colors.border,
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
					<BottomSheet ref={ref}>
						<SortSelect
							setSortParam={setSortParam}
							sortParam={sortParam}
							bottomSheetRef={ref}
						/>
					</BottomSheet>
				</>
			}
			keyExtractor={(post: any) => String(post.id)}
			onEndReached={(hasNextPage as any) && fetchNextPage}
			refreshControl={
				<RefreshControl
					refreshing={isLoading}
					onRefresh={refetch}
					tintColor={"white"}
				/>
			}
			contentInset={{ top: 265 }}
			contentOffset={Platform.select({
				ios: {
					x: 0,
					y: -265,
				},
			})}
			contentContainerStyle={{
				flexGrow: 1,
			}}
		/>
	);
};

export default React.memo(PostsFlatList);
