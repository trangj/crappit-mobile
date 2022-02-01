import React from "react";
import { View, Pressable, ViewProps, PressableProps } from "react-native";
import { useTheme } from "../context/ThemeState";

export type CardProps = ViewProps & {};

export const Card = ({ style, children, ...rest }: CardProps) => {
	const { theme } = useTheme();

	return (
		<View
			style={[
				{
					backgroundColor: theme.colors.card,
				},
				style,
			]}
			{...rest}
		>
			{children}
		</View>
	);
};

type PressableCardProps = PressableProps & {};

export const PressableCard = ({
	children,
	style,
	...rest
}: PressableCardProps) => {
	const { theme } = useTheme();

	return (
		<Pressable
			style={[
				{
					backgroundColor: theme.colors.card,
				},
				style as any,
			]}
			{...rest}
		>
			{children}
		</Pressable>
	);
};
