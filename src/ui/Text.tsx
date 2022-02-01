import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { useTheme } from "../context/ThemeState";

export type TextProps = RNTextProps & {};

const Text = ({ style, children, ...rest }: TextProps) => {
	const { theme } = useTheme();

	return (
		<RNText
			style={[
				{
					color: theme.colors.text,
					...theme.textVariants.body,
				},
				style,
			]}
			{...rest}
		>
			{children}
		</RNText>
	);
};

export default Text;
