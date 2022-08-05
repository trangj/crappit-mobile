import { useWindowDimensions } from 'react-native';
import React from 'react';
import RNRenderHTML, {
  RenderHTMLProps as RNRenderHTMLProps,
} from 'react-native-render-html';
import { useTheme } from '../context/ThemeState';

function RenderHTML({ source }: RNRenderHTMLProps) {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();

  const styles = React.useMemo(
    () => ({
      p: {
        color: theme.colors.text,
        marginTop: 0,
        marginBottom: theme.spacing.sm,
      },
      h5: {
        color: theme.colors.text,
        fontSize: theme.textVariants.mdHeader.fontSize,
      },
      ul: {
        marginVertical: theme.spacing.xs,
        color: theme.colors.text,
      },
      ol: {
        marginVertical: theme.spacing.xs,
        color: theme.colors.text,
      },
      a: {
        color: theme.colors.blue,
      },
      pre: {
        backgroundColor: theme.colors.grey,
        padding: theme.spacing.sm,
        borderRadius: theme.spacing.xs,
      },
      code: {
        backgroundColor: theme.colors.grey,
        color: theme.colors.text,
      },
    }),
    [theme],
  );

  return (
    <RNRenderHTML contentWidth={width} source={source} tagsStyles={styles} />
  );
}

export default RenderHTML;
