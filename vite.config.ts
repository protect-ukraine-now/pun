import { defineConfig } from 'vite'
import rakkas from 'rakkasjs/vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'

const viteEnv = {}
Object.entries(process.env).forEach(([key, val]) => {
	if (key.startsWith(`VITE_`)) {
		console.log(key, val)
		viteEnv[`import.meta.env.${key}`] = `'${val}'`
	}
})

export default defineConfig({
	plugins: [
		tsconfigPaths(),
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
