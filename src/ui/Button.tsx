import React, { ReactNode } from "react";
import {
	Pressable,
	PressableProps,
	StyleProp,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";
import { useTheme } from "../context/ThemeState";

export type ButtonProps = PressableProps & {
	variant?: "outline" | "filled" | "ghost";
	border?: "rounded" | "rounded-full" | "none";
	size?: "xs" | "sm" | "md" | "lg";
	width?: number;
	icon?: ReactNode;
	loading?: boolean;
	active?: boolean;
	fullWidth?: boolean;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
};

const Button = ({
	icon = null,
	variant = "outline",
	border = "rounded-full",
	size = "md",
	width,
	fullWidth,
	children,
	style,
	textStyle,
	...rest
}: ButtonProps) => {
	const { theme } = useTheme();

	return (
		<Pressable
			{...rest}
			style={[
				{
					backgroundColor:
						variant === "filled" ? theme.colors.upvote : undefined,
					borderWidth: variant === "outline" ? 1 : undefined,
					borderRadius:
						border === "rounded-full"
							? 9999
							: border === "rounded"
							? theme.spacing.xs
							: 0,
					borderColor: theme.colors.blue,
					paddingHorizontal: theme.spacing.sm,
					height:
						size === "xs" ? 14 : size === "sm" ? 24 : size === "md" ? 36 : 48,
					width: fullWidth ? "100%" : width,
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				},
				style,
			]}
		>
			{icon && <View>{icon}</View>}
			<Text
				style={[
					{
						fontWeight: variant === "ghost" ? "600" : "bold",
						fontSize: size !== "lg" ? 14 : 16,
						color:
							variant === "filled"
								? theme.colors.white
								: variant === "outline"
								? theme.colors.blue
								: theme.colors.textAlt,
					},
					textStyle,
				]}
			>
				{children}
			</Text>
		</Pressable>
	);
};

export default Button;
