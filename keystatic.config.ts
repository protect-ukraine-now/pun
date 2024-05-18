import { config, fields, collection } from '@keystatic/core';
import Layout from '@src/layouts/Layout.astro';

export default config({
	storage: {
		kind: 'local',
	},
	collections: {
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
		pages: collection({
			label: 'Pages',
			slugField: 'title',
			path: 'src/content/pages/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				content: fields.markdoc({
					label: 'Content',
				}),
			},
		}),
		pagesEn: collection({
			label: 'Pages EN',
			slugField: 'title',
			path: 'src/pages/en/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				layout: fields.text({
					label: 'Layout',
					default: '@layouts/Layout.astro',
				}),
				content: fields.markdoc({
					label: 'Content',
					extension: 'mdx',
					image: {
						directory: 'src/assets',
						publicPath: '@assets'
					},
				}),
			},
		}),
	},
});