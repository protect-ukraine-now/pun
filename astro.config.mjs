import { defineConfig } from 'astro/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import preact from '@astrojs/preact'
import react from '@astrojs/react'
import cloudflare from '@astrojs/cloudflare'
import unocss from 'unocss/astro'
import { presetUno, transformerDirectives } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'
import { presetIcons } from '@unocss/preset-icons'
import mdx from "@astrojs/mdx"
import markdoc from "@astrojs/markdoc"
import keystatic from '@keystatic/astro'

import countries from './src/data/countries.json'

const viteEnv = {}
Object.entries(process.env).forEach(([key, val]) => {
	if (key.startsWith(`VITE_`)) {
		console.log(key, val)
		viteEnv[`import.meta.env.${key}`] = `'${val}'`
	}
})

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	vite: {
		define: viteEnv,
		plugins: [tsconfigPaths()],
	},
	integrations: [
		preact({
			devtools: true,
			exclude: ["**/keystatic/*"],
		}),
		react({
			include: ["**/keystatic/*"],
		}),
		mdx(),
		markdoc(),
		keystatic(),
		unocss({
			// injectReset: true,
			transformers: [transformerDirectives()],
			presets: [
				presetUno(),
				presetDaisy({ themes: ["light"] }),
				presetIcons({
					prefix: 'i-',
					extraProperties: {
						display: 'inline-block',
						'vertical-align': 'text-bottom'
					}
				})
			],
			safelist: Object.keys(countries).map(c => `i-circle-flags-${c}`)
		}),
	]
})