const { loadData, loadMarkdown } = require('./src/data/load.js')
// const { generateFileList } = require('./src/crawler');

// const [blogs] = generateFileList(join(__dirname, 'content')).nodes;

module.exports = async () => {
	try {
		const { text, reports } = await loadData()
		// console.log('reports', reports)
		const lastReport = reports[reports.length - 1]

		const pages = [
			{ url: '/' },
			...Object.entries(text).map(([language, text]) => [
				{
					url: `/${language}/letter`,
					seo: { cover: 'https://protectukrainenow.org/assets/og.webp' },
					data: {
						text,
						language,
					}
				},
				...[lastReport, ...reports].map((report, i) => {
					let url = `/${language}/report`
					if (i) url += `/${report.date}`
					return {
						url,
						// seo: blog.details,
						data: {
							...report,
							text,
							language: language,
							blog: loadMarkdown('blog', `${report.date}.${language}.md`),
						},
					}
				})
			]).flat()
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
