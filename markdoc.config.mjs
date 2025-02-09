import { defineMarkdocConfig, component } from '@astrojs/markdoc/config'

export const config = {
	tags: {
		Publications: {
			render: component('@components/Publications.astro'),
		},
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
		Losses: {
			render: component('@components/LossesChart/index.astro'),
		},
		Letter: {
			render: component('@components/Letter.astro'),
		},
		RepresentativesByAddress: {
			render: component('@components/RepresentativesByAddress.astro'),
		},
		Campaign: {
			render: component('@components/Campaign.astro'),
		},
	},
}

export default defineMarkdocConfig(config)