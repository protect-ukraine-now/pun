import { config, fields, collection, singleton } from '@keystatic/core'
import { wrapper, block } from '@keystatic/core/content-components'

const components = {
	WeaponsIncome: wrapper({
		label: 'Weapons Income',
		schema: {},
	}),
	WeaponsBalance: wrapper({
		label: 'Weapons Balance',
		schema: {},
	}),
	WeaponsInventory: wrapper({
		label: 'Weapons Inventory',
		schema: {},
	}),
	Sankey24: wrapper({
		label: 'Sankey`24',
		schema: {},
	}),
	Sankey: wrapper({
		label: 'Sankey',
		schema: {},
	}),
	SankeyMilitary: wrapper({
		label: 'Sankey Military',
		schema: {},
	}),
	Letter: block({
		label: 'Letter',
		schema: {},
	}),
	RepresentativesByAddress: block({
		label: 'Representatives by Address',
		schema: {},
	}),
}

export default config({
	storage: process.env.NODE_ENV === 'production' ? {
		kind: 'github',
		repo: 'protect-ukraine-now/pun',
	} : {
		kind: 'local'
	},
	singletons: {
		readme: singleton({
			label: 'README',
			path: 'README',
			format: { contentField: 'content' },
			schema: {
				content: fields.markdoc({
					label: 'Content',
					extension: 'md',
				}),
			},
		}),
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
			slugField: 'slug',
			format: { contentField: 'content' },
			schema: {
				slug: fields.slug({ name: { label: 'Slug' } }),
				content: fields.markdoc({
					label: 'Content',
					extension: 'md',
				}),
			},
		}),
		publications: collection({
			label: 'Publications',
			slugField: 'title',
			path: 'src/content/publications/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				date: fields.date({ label: 'Date' }),
				doc: fields.file({
					label: 'Document',
					// description: '',
					// directory: 'public/files/resumes',
					// publicPath: '/files/resumes/'
				}),
				image: fields.image({
					label: 'Image',
				}),
				content: fields.markdoc({
					label: 'Content',
					components,
					options: {
						image: {
							directory: 'src/content/publications',
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
		blog: collection({
			label: 'Blog',
			slugField: 'title',
			path: 'src/content/blog/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				date: fields.date({ label: 'Date' }),
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
	ui: {
		navigation: {
			'Info': ['readme'],
			'Content': ['pages', 'notes', 'publications', 'blog'],
		},
	},
})
