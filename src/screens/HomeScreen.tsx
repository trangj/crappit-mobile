import React, { useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigators/HomeStackNavigator";
import { TabParamList } from "src/navigators/TabNavigator";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParamList } from "src/navigators/RootStackNavigator";
import usePosts from "../hooks/post-query/usePosts";
import { FlatList, RefreshControl, View } from "react-native";
import PostItem from "../components/post/PostItem";
import Button from "../ui/Button";
import BottomSheet from "../ui/BottomSheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../context/ThemeState";
import SortSelect from "../components/post/SortSelect";
import RNBottomSheet from "@gorhom/bottom-sheet";

type HomeScreenProps = CompositeScreenProps<
	NativeStackScreenProps<HomeStackParamList, "Home">,
	CompositeScreenProps<
		NativeStackScreenProps<TabParamList, "HomeStackNavigator">,
		NativeStackScreenProps<RootStackParamList>
	>
>;

export type HomeScreenNavigationProp = HomeScreenProps["navigation"];

const HomeScreen = ({ navigation }: HomeScreenProps) => {
	const { theme } = useTheme();
	const [sortParam, setSortParam] = useState("hot");
	const ref = useRef<RNBottomSheet>(null);
	const { data, hasNextPage, fetchNextPage, isLoading, refetch } = usePosts(
		"",
		sortParam
	);

	return (
		<>
			<FlatList
				indicatorStyle={theme.dark ? "white" : "black"}
				data={data as any}
				renderItem={({ item }) => (
					<PostItem post={item} navigation={navigation} />
				)}
				ListHeaderComponent={
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
				}
				keyExtractor={(post) => String(post.id)}
				onEndReached={(hasNextPage as any) && fetchNextPage}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={refetch} />
				}
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

export default HomeScreen;
