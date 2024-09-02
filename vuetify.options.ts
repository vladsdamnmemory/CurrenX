import type { VOptions } from 'vuetify-nuxt-module';
import type { ThemeDefinition } from 'vuetify';

export default {
	theme: {
		defaultTheme: 'customTheme',
		themes: {
			customTheme: {
				dark: false,
				colors: {
					primary: '#ff5722',
					secondary: '#03a9f4',
					accent: '#e91e63',
					error: '#f44336',
					info: '#00acc1',
					success: '#4caf50',
					warning: '#ff9800',
				},
			},
		},
	} as ThemeDefinition,
} as VOptions;
