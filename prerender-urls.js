const { default: language } = require('react-syntax-highlighter/dist/esm/languages/hljs/1c')
const { loadData, loadMarkdown } = require('./src/data/load.js')
// const { generateFileList } = require('./src/crawler');

// const [blogs] = generateFileList(join(__dirname, 'content')).nodes;

module.exports = async () => {
	try {
		const { text, reports } = await loadData()
		// console.log('reports', reports)
		const lastReport = reports[reports.length - 1]

		const pages = [
			{
				url: '/',
				seo: { cover: 'https://protectukrainenow.org/assets/og.webp' },
				data: {
					...lastReport,
					text: text.en,
					language: 'en',
					blog: loadMarkdown('blog', `${lastReport.date}.en.md`),
				}
			},
			...[null, 'en', 'ua'].map(language => (
				{
					url: '/' + [language, 'home'].filter(v => v != null).join('/'),
					seo: { cover: 'https://protectukrainenow.org/assets/og.webp' },
					data: {
						...lastReport,
						text: text.en,
						language: language || 'en',
						blog: loadMarkdown('blog', `${lastReport.date}.${language || 'en'}.md`),
					}
				})),
			...Object.entries(text).concat([[null, text.en]]).map(([language, text]) =>
				reports.map(report => [report, report.date])
					.concat([[lastReport, null]]).map(([report, date]) => ({
						url: '/' + [language, 'report', date].filter(v => v != null).join('/'),
						// seo: blog.details,
						data: {
							...report,
							text,
							language: language || 'en',
							blog: loadMarkdown('blog', `${report.date}.${language || 'en'}.md`),
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
