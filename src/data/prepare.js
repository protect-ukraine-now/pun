const fs = require('fs')
const { join } = require('path')
const parseMD = require('parse-md').default
const loadData = require('./load')
const prepareReport = require('./report')

// TODO: crawl the folder
// const { generateFileList } = require('./src/crawler');
// const [blogs] = generateFileList(join(__dirname, 'content')).nodes;
function listReports() {
	return [
		{ from: '2022-07-04', till: '2022-07-17' },
		{ from: '2022-07-18', till: '2022-07-31' },
	]
}

function prepareReports(data, list) {
	return list.map((report, i) => ({
		...report,
		prev: (list[i - 1] || {}).till,
		next: (list[i + 1] || {}).till,
		data: prepareReport(data, report),
	}))
}

function loadMarkdown(folder, name) {
	try {
		const { content } = parseMD(fs.readFileSync(join('content', folder, name), 'utf-8'))
		return content
	} catch (e) {
		// console.error('loadMd', folder, name, e)
	}
}

async function preparePages() {
	let data = await loadData()
	let { text } = data
	let reports = prepareReports(data, listReports())
	let lastReport = reports[reports.length - 1]

	let pages = [
		{ url: '/' },
		...Object.entries(text).map(([language, text]) => [
			{
				url: `/${language}/letter`,
				seo: { cover: 'https://protectukrainenow.org/assets/og.webp' },
			},
			...[lastReport, ...reports].map((report, i) => {
				let url = `/${language}/report`
				if (i) url += `/${report.till}`
				return {
					url,
					// seo: blog.details,
					seo: { cover: 'https://protectukrainenow.org/assets/og.webp' },
					data: {
						...report,
						language: language,
						blog: loadMarkdown('digest', `${report.till}.${language}.md`),
					},
				}
			})
		]).flat()
	]
	// console.log('pages', pages)

	return pages
}

module.exports = {
	preparePages,
}

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