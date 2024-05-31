import { defineConfig } from 'astro/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import preact from '@astrojs/preact'
import react from '@astrojs/react'
import cloudflare from '@astrojs/cloudflare'
import unocss from 'unocss/astro'
import { presetUno, presetTypography, transformerDirectives } from 'unocss'
import { presetIcons } from '@unocss/preset-icons'
import presetTagify from '@unocss/preset-tagify'
import { presetFluid } from 'unocss-preset-fluid'
import { presetDaisy } from 'unocss-preset-daisy'
import mdx from "@astrojs/mdx"
import markdoc from "@astrojs/markdoc"
import keystatic from '@keystatic/astro'
import countries from './src/data/countries.json'
import vtbot from "astro-vtbot"
const viteEnv = {}
Object.entries(process.env).forEach(([key, val]) => {
	if (key.startsWith(`VITE_`) || key.includes(`KEYSTATIC_`)) {
		console.log(key, val)
		viteEnv[`process.env.${key}`] = `'${val}'`
	}
})

// https://astro.build/config
export default defineConfig({
	output: "server",
	experimental: {
		actions: true,
		rewriting: true
	},
	adapter: cloudflare({
		// platformProxy: {
		// 	enabled: true,
		// 	configPath: "wrangler.toml",
		// },
	}),
	vite: {
		define: viteEnv,
		plugins: [tsconfigPaths()],
		ssr: {
			external: ["node:async_hooks"]
		}
	},
	integrations: [
		preact({
			devtools: true,
			exclude: ["**/keystatic/*"]
		}),
		react({
			include: ["**/keystatic/*"]
		}),
		mdx(),
		markdoc(),
		keystatic(),
		unocss({
			// injectReset: true,
			transformers: [transformerDirectives()],
			presets: [
				presetUno(),
				presetTypography(),
				presetTagify(),
				presetDaisy({
					themes: ["light"]
				}),
				// presetFluid({
				// 	maxWidth: 1440,
				// 	minWidth: 375,
				// 	extendMaxWidth: 1980,
				// 	extendMinWidth: null,
				// 	remBase: 16,
				// 	useRemByDefault: true,
				// 	commentHelpers: process.env.NODE_ENV !== 'production',
				// }),
				presetIcons({
					prefix: 'i-',
					extraProperties: {
						display: 'inline-block',
						'vertical-align': 'text-bottom'
					}
				})
			],
			safelist: Object.keys(countries).map(c => `i-circle-flags-${c}`)
		})
	]
})
