import { defineConfig } from 'vite'
import rakkas from 'rakkasjs/vite-plugin'
import unocss from 'unocss/vite'
import { presetUno, transformerDirectives } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'
import { presetIcons } from '@unocss/preset-icons'

const viteEnv = {}
Object.entries(process.env).forEach(([key, val]) => {
	if (key.startsWith(`VITE_`)) {
		console.log(key, val)
		viteEnv[`import.meta.env.${key}`] = `'${val}'`
	}
})

export default defineConfig({
	plugins: [
		unocss({
			transformers: [
				transformerDirectives(),
			],
			presets: [
				presetUno(),
				presetDaisy({
					themes: ["light"],
				}),
				presetIcons({
					prefix: 'i-',
					extraProperties: {
						display: 'inline-block'
					}
				}),
			],
		}),
		rakkas({
			adapter: 'cloudflare-workers',
		}),
	],
	define: viteEnv,
	resolve: {
		alias: {
			src: '/src',
		},
	},
})
