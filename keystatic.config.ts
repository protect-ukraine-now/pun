import { config, fields, collection } from '@keystatic/core'
import { block } from '@keystatic/core/content-components'

const components = {
	WeaponsIncome: block({
		label: 'Weapons Income',
		schema: {},
	})
}

export default config({
	storage: {
		kind: 'local',
		// kind: 'github',
		// repo: 'protect-ukraine-now/pun'
	},
	collections: {
		pages: collection({
			label: 'Pages',
			slugField: 'title',
			path: 'src/content/pages/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				content: fields.markdoc({
					label: 'Content',
					components,
					options: {
						image: {
							directory: 'src/content/pages',
							publicPath: '.',
							schema: {
								title: fields.text({
									label: 'Caption',
									description: 'The text to display under the image in a caption',
								}),
							},
						},
					},
				}),
			},
		}),
		notes: collection({
			label: 'Notes',
			path: 'src/content/notes/*',
			slugField: 'title',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				content: fields.markdoc({
					label: 'Content',
					extension: 'md',
				}),
			},
		}),
		blog: collection({
			label: 'Blog',
			slugField: 'title',
			path: 'src/content/blog/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				content: fields.markdoc({
					label: 'Content',
					components,
					options: {
						image: {
							directory: 'src/content/blog',
							publicPath: '.',
							schema: {
								title: fields.text({
									label: 'Caption',
									description: 'The text to display under the image in a caption',
								}),
							},
						},
					},
				}),
			},
		}),
	},
})
