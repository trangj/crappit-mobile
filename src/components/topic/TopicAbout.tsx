import { View, Text, Platform } from "react-native";
import React from "react";
import { Card } from "../../ui/Card";
import Animated from "react-native-reanimated";
import { TopicScreenProps } from "../../screens/TopicScreen";

type TopicAboutProps = {
	scrollHandler: any;
	navigation: TopicScreenProps["navigation"];
};

const TopicAbout = ({ scrollHandler }: TopicAboutProps) => {
	return (
		<Animated.ScrollView
			scrollEventThrottle={16}
			onScroll={scrollHandler}
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
		>
			<Card>
				<Text>iafsdjfklajsdfl</Text>
			</Card>
		</Animated.ScrollView>
	);
};

export default TopicAbout;
