const fs = require('fs')
const { join } = require('path')
const parseMD = require('parse-md').default

const loadData = require('./load')
const prepareNews = require('./news')

// TODO: generate weekly/bi-weekly or crawl the folder?
// const { generateFileList } = require('./src/crawler');
// const [blogs] = generateFileList(join(__dirname, 'content')).nodes;
function listReports() {
	let list = [
		{ from: '2022-07-04', till: '2022-07-17' },
		{ from: '2022-07-18', till: '2022-07-31' },
		{ from: '2022-08-01', till: '2022-08-14' },
	]
	return list.map((report, i) => ({
		...report,
		prev: (list[i - 1] || {}).till,
		next: (list[i + 1] || {}).till,
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
	let reports = listReports()
	let lastReport = reports[reports.length - 1]

	let pages = [
		{ url: '/' },
		...Object.entries(text).map(([language]) => [
			{
				url: `/${language}/letter`,
				seo: { cover: 'https://protectukrainenow.org/assets/og.webp' },
			},
			{
				url: `/${language}/news`,
				seo: { cover: 'https://protectukrainenow.org/assets/og.webp' },
				data: {
					language: language,
					news: prepareNews(data, { language })
				},
			},
			...[lastReport, ...reports].map((report, i) => {
				let url = `/${language}/report`
				if (i) url += `/${report.till}`
				return {
					url,
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

module.exports = preparePages
