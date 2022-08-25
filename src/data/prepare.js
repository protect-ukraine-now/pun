// const fs = require('fs')
// const { join } = require('path')
// const parseMD = require('parse-md').default

const loadData = require('./load')

// function loadMarkdown(folder, name) {
// 	try {
// 		const { content } = parseMD(fs.readFileSync(join('content', folder, name), 'utf-8'))
// 		return content
// 	} catch (e) {
// 		// console.error('loadMd', folder, name, e)
// 	}
// }

async function preparePages() {
	let data = await loadData()
	let { text } = data

	let seo = { cover: 'https://protectukrainenow.org/assets/og.webp' }

	let pages = [
		{ url: '/' },
		...Object.entries(text).map(([language]) => [
			{
				url: `/${language}/letter`,
				seo,
			},
			{
				url: `/${language}/news`,
				seo,
			},
			{
				url: `/${language}/report`,
				seo,
			},
		])
	].flat()
	// console.log('pages', pages)

	return pages
}

module.exports = preparePages
