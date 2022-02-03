import { Image, View } from "react-native";
import React from "react";
import Animated, {
	Extrapolate,
	interpolate,
	SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import { useTheme } from "../../context/ThemeState";
import { LinearGradient } from "expo-linear-gradient";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import { User } from "../../types/entities/user";

type ProfileHeaderProps = {
	profile: User;
	translateY: SharedValue<number>;
	headerSize: number;
};

const ProfileHeader = ({
	profile,
	translateY,
	headerSize,
}: ProfileHeaderProps) => {
	const { theme } = useTheme();

	const headerStyle = useAnimatedStyle(() => {
		const moveY = interpolate(
			translateY.value,
			[-headerSize, -headerSize + 60],
			[0, -60],
			Extrapolate.CLAMP
		);

		return { transform: [{ translateY: moveY }] };
	});

	const bannerStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			translateY.value,
			[-headerSize + 60, -headerSize + 120],
			[1, 0],
			Extrapolate.CLAMP
		);

		return { opacity };
	});

	const iconStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			translateY.value,
			[-headerSize, -headerSize + 30],
			[1, 0],
			Extrapolate.CLAMP
		);

		return { opacity };
	});

	const cardStyle = useAnimatedStyle(() => {
		const moveY = interpolate(
			translateY.value,
			[-headerSize, -headerSize + 215],
			[0, -215],
			Extrapolate.CLAMP
		);

		return { transform: [{ translateY: moveY }] };
	});

	return (
		<>
			<Animated.View
				style={[
					{
						backgroundColor: theme.colors.card,
						zIndex: 100,
						width: "100%",
						position: "absolute",
					},
					headerStyle,
				]}
			>
				<Animated.View
					style={[
						{ backgroundColor: theme.colors.blue, height: 150 },
						bannerStyle,
					]}
				>
					<LinearGradient
						colors={["rgba(0,0,0,0.5)", "transparent"]}
						style={{
							height: "100%",
						}}
					/>
				</Animated.View>
				<Animated.View
					style={[
						{
							position: "absolute",
							bottom: -12,
							marginLeft: theme.spacing.md,
						},
						iconStyle,
					]}
				>
					{profile.avatar_image_url ? (
						<Image
							source={{ uri: profile.avatar_image_url }}
							style={{
								height: 65,
								width: 65,
								borderRadius: 9999,
								borderWidth: 2,
								borderColor: theme.colors.card,
							}}
						/>
					) : (
						<View
							style={{
								height: 65,
								width: 65,
								borderRadius: 9999,
								borderWidth: 2,
								borderColor: theme.colors.card,
								backgroundColor: theme.colors.textAlt,
							}}
						/>
					)}
				</Animated.View>
			</Animated.View>
			<Animated.View
				style={[
					{
						padding: theme.spacing.md,
						backgroundColor: theme.colors.card,
						paddingTop: theme.spacing.lg,
						height: 155,
						width: "100%",
						position: "absolute",
						top: 150,
						zIndex: 10,
					},
					cardStyle,
				]}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Heading size="md">u/{profile.username}</Heading>
				</View>
				<Text
					style={{
						color: theme.colors.textAlt,
						marginBottom: theme.spacing.sm,
						marginTop: theme.spacing.md,
					}}
				>
					{profile.karma} karma
				</Text>
			</Animated.View>
			<View style={{ height: 90 }}></View>
		</>
	);
};

export default ProfileHeader;
