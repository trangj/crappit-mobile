const palette = {
	red: '#ef4444',
	orange: '#ff4500',
	indigo: '#7193ff',
	black: '#000000',
	white: '#FFFFFF',
	veryLightGrey: '#F4F4F5',
	lightGrey: '#E4E4E7',
	grey: '#71717A',
	darkGrey: '#27272A',
	veryDarkGrey: '#0C0C0E',
	blue: '#3b82f6'
};

export const theme = {
	dark: false,
	colors: {
		white: palette.white,
		black: palette.black,
		grey: palette.lightGrey,
		blue: palette.blue,
		red: palette.red,
		upvote: palette.orange,
		downvote: palette.indigo,
		textAlt: palette.grey,
		
		// React navigation theme
		primary: palette.lightGrey,
		background: palette.veryLightGrey,
		card: palette.white,
		text: palette.black,
		border: palette.lightGrey,
		notification: palette.orange
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 40,
	},
	textVariants: {
		lgHeader: {
			fontSize: 28,
			fontWeight: '700',
		},
		mdHeader: {
			fontSize: 22,
			fontWeight: '700',
		},
		smHeader: {
			fontSize: 18,
			fontWeight: '700',
		},
		body: {
			fontSize: 14,
		},
	}
};

export const darkTheme = {
	...theme,
	dark: true,
	colors: {
		...theme.colors,
		grey: palette.darkGrey,

		// React navigation theme
		background: palette.veryDarkGrey,
		card: palette.black,
		text: palette.white,
		border: palette.darkGrey,
	}
};
