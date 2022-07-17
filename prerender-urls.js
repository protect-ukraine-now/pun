const { loadData, prepareReports } = require('./src/data/load.js')
// const { generateFileList } = require('./src/crawler');
// const { join } = require('path');
// const fs = require('fs')
// const parseMD = require('parse-md').default;

// const [blogs] = generateFileList(join(__dirname, 'content')).nodes;
module.exports = async () => {
	try {
		const data = await loadData()
		const reports = await prepareReports(data)
		// console.log('reports', reports)

		const pages = [
			{
				url: '/',
				// seo: { cover: '/assets/profile.jpg'	},
				data: reports[reports.length - 1],
			},
			{ url: '/contact/' },
			{ url: '/contact/success' },
			...reports.map(({ date, ...rest }) => ({
				url: `/report/${date}`,
				// seo: blog.details,
				data: {
					date,
					...rest
				},
			}))
		]
	
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
		console.error(e)
	}
}
