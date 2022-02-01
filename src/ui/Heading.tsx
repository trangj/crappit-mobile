import React from "react";
import { Text, TextProps } from "react-native";
import { useTheme } from "../context/ThemeState";

export type HeadingProps = TextProps & {
	size?: "lg" | "md" | "sm";
};

const Heading = ({ style, size = "lg", children, ...rest }: HeadingProps) => {
	const { theme } = useTheme();

	return (
		<Text
			style={[
				{
					color: theme.colors.text,
					fontSize:
						size === "lg"
							? theme.textVariants.lgHeader.fontSize
							: size == "md"
							? theme.textVariants.mdHeader.fontSize
							: theme.textVariants.smHeader.fontSize,
					fontWeight:
						size === "lg"
							? theme.textVariants.lgHeader.fontWeight
							: size == "md"
							? theme.textVariants.mdHeader.fontWeight
							: (theme.textVariants.smHeader.fontWeight as any),
				},
				style,
			]}
			{...rest}
		>
			{children}
		</Text>
	);
};

export default Heading;
