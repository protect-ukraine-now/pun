import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
	tags: {
		WeaponsIncome: {
			render: component('@src/components/WeaponsIncome/index.astro'),
		},
	},
});