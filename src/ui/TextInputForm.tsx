import React from "react";
import { View, TextInput as RNTextInput } from "react-native";
import { useTheme } from "../context/ThemeState";
import Text from "./Text";
import TextInput, { TextInputProps } from "./TextInput";

export type Props = TextInputProps & {
	error: string | undefined;
	touched: boolean | undefined;
	label?: string;
};

export const TextFieldForm = React.forwardRef<RNTextInput, Props>(
	({ error, value, touched, label = "", ...props }, ref) => {
		const { theme } = useTheme();

		return (
			<View style={{ marginVertical: theme.spacing.xs }}>
				{!!label && <Text>{label}</Text>}
				<TextInput ref={ref} {...props} />
				{!!error && touched && (
					<Text
						style={{
							color: theme.colors.red,
							marginHorizontal: theme.spacing.md,
						}}
					>
						{error}
					</Text>
				)}
			</View>
		);
	}
);
