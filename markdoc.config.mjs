import { defineMarkdocConfig, component } from '@astrojs/markdoc/config'

export const config = {
	tags: {
		WeaponsIncome: {
			render: component('@components/WeaponsIncome/index.astro'),
		},
		WeaponsBalance: {
			render: component('@components/WeaponsBalance/index.astro'),
		},
		WeaponsInventory: {
			render: component('@components/WeaponsInventory/index.astro'),
		},
		Sankey24: {
			render: component('@components/Sankey24.astro'),
		},
		Sankey: {
			render: component('@components/Sankey.astro'),
		},
		SankeyMilitary: {
			render: component('@components/SankeyMilitary.astro'),
		},
		Loses: {
			render: component('@components/LosesChart.astro'),
		},
		Letter: {
			render: component('@components/Letter.astro'),
		},
		RepresentativesByAddress: {
			render: component('@components/RepresentativesByAddress.astro'),
		},
	},
}

export default defineMarkdocConfig(config)