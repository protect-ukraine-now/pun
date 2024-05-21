import { defineMarkdocConfig, component } from '@astrojs/markdoc/config'

export const config = {
	tags: {
		WeaponsIncome: {
			render: component('@src/components/WeaponsIncome/index.astro'),
		},
	},
}

export default defineMarkdocConfig(config)