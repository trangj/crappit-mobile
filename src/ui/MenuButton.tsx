import { Text, Pressable, PressableProps } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "../context/ThemeState";

type MenuButton = PressableProps & {
	children?: ReactNode;
	active?: boolean;
};

const MenuButton = ({ active = false, children, ...props }: MenuButton) => {
	const { theme } = useTheme();

	return (
		<Pressable
			style={({ pressed }) => ({
				padding: theme.spacing.md,
				backgroundColor: pressed ? theme.colors.background : undefined,
			})}
			{...props}
		>
			<Text
				style={{
					fontWeight: "bold",
					color: active ? theme.colors.text : theme.colors.textAlt,
				}}
			>
				{children}
			</Text>
		</Pressable>
	);
};

export default MenuButton;
