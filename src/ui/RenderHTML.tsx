import { useWindowDimensions } from "react-native";
import React from "react";
import RNRenderHTML, {
	RenderHTMLProps as RNRenderHTMLProps,
} from "react-native-render-html";
import { useTheme } from "../context/ThemeState";

const RenderHTML = ({ source }: RNRenderHTMLProps) => {
	const { width } = useWindowDimensions();
	const { theme } = useTheme();

	const styles = React.useMemo(
		() => ({
			p: {
				color: theme.colors.text,
				margin: 0,
			},
			h5: {
				margin: 0,
				color: theme.colors.text,
				fontSize: theme.textVariants.mdHeader.fontSize,
			},
			ul: {
				margin: 0,
				color: theme.colors.text,
			},
			ol: {
				margin: 0,
				color: theme.colors.text,
			},
		}),
		[theme]
	);

	return (
		<RNRenderHTML contentWidth={width} source={source} tagsStyles={styles} />
	);
};

export default RenderHTML;
