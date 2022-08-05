const fs = require('fs')
const { join } = require('path')
const parseMD = require('parse-md').default

const loadData = require('./load')
const prepareReports = require('./report')
const prepareNews = require('./news')

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
	let reports = prepareReports(data)
	let lastReport = reports[reports.length - 1]

	let pages = [
		{ url: '/' },
		...Object.entries(text).map(([language]) => [
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
						news: prepareNews(data, { ...report, language }),
						blog: loadMarkdown('digest', `${report.till}.${language}.md`),
					},
				}
			})
		]).flat()
	]
	// console.log('pages', pages)

	return pages
}

module.exports = preparePages
