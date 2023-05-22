import { defineConfig } from 'vite'
import rakkas from 'rakkasjs/vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'

const viteEnv = {}
Object.keys(process.env).forEach((key) => {
	if (key.startsWith(`VITE_`)) {
		viteEnv[`import.meta.env.${key}`] = `'${process.env[key]}'`
	}
})

export default defineConfig({
	plugins: [
		tsconfigPaths(),
		rakkas({
			adapter: process.env.VITE_APP_NAME === 'pun' ? "netlify-edge" : "cloudflare-workers",
		}),
	],
	define: viteEnv,
	resolve: {
		alias: {
			src: '/src',
		},
	},
})
