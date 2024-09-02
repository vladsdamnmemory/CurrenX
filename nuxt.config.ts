// https://nuxt.com/docs/api/configuration/nuxt-config

import type { ModuleOptions } from 'vuetify-nuxt-module';

export default defineNuxtConfig({
	routeRules: {
		// Homepage pre-rendered at build time
		'/': { prerender: true },
	},
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: ['@pinia/nuxt', 'vuetify-nuxt-module', '@nuxt/eslint'],
	vuetify: {
		moduleOptions: {
			/* module specific options */
		},
		vuetifyOptions: './vuetify.options.ts',
	} as ModuleOptions,
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
			},
		},
	},
	typescript: {
		tsConfig: {
			compilerOptions: {
				module: 'esnext',
				target: 'es2017',
			},
		},
	},
});
