const { loadData } = require('./src/data/load.js')
// const { generateFileList } = require('./src/crawler');

// const [blogs] = generateFileList(join(__dirname, 'content')).nodes;

module.exports = async () => {
	try {
		const { text, reports } = await loadData()
		// console.log('reports', reports)

		const pages = [
			{
				url: '/',
				// seo: { cover: '/assets/profile.jpg'	},
				data: {
					...reports[reports.length - 1],
					text: text.en,
					language: 'en',
				}
			},
			{
				url: '/en',
				// seo: { cover: '/assets/profile.jpg'	},
				data: {
					...reports[reports.length - 1],
					text: text.en,
					language: 'en',
				}
			},
			{
				url: '/ua',
				// seo: { cover: '/assets/profile.jpg'	},
				data: {
					...reports[reports.length - 1],
					text: text.ua,
					language: 'ua',
				}
			},
			...Object.entries(text).map(([language, text]) =>
				reports.map(report => ({
					url: `/${language}/report/${report.date}`,
					// seo: blog.details,
					data: {
						...report,
						text,
						language,
					},
				}))
			).flat()
		]

		console.log('pages', pages)
	
		// adding blogs list posts page
		// pages.push({
		// 	url: '/blogs/',
		// 	data: blogs
		// });
	
		// adding all blog pages
		// pages.push(...blogs.edges.map(blog => {
		// 	let data;
		// 	if (blog.format === 'md') {
		// 		const { content } = parseMD(fs.readFileSync(join('content', 'blog', blog.id), 'utf-8'));
		// 		data = content;
		// 	} else {
		// 		data = fs.readFileSync(join('content', 'blog', blog.id), 'utf-8').replace(/---(.*(\r)?\n)*---/, '');
		// 	}
		// 	return {
		// 		url: `/blog/${blog.id}`,
		// 		seo: blog.details,
		// 		data: {
		// 			details: blog.details,
		// 			content: data
		// 		}
		// 	};
		// }));
	
		return pages
	} catch (e) {
		console.error('prerender', e)
		throw e
	}
}
