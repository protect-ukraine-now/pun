const loadData = require('./load')

async function pages() {
	let data = await loadData()
	let { text } = data
	let languages = Object.keys(text)
	let pages = ['news', 'report', 'letter']

	pages = [
		{
			url: '/',
			lang: 'en',
			...text.en.root,
		},
		...languages.map(lang => pages.map(page => ({
			url: `/${lang}/${page}`,
			lang,
			...text[lang][page],
		}))),
	].flat()
	// console.log('pages', pages)

	return pages
}

module.exports = pages

// const fs = require('fs')
// const { join } = require('path')
// const parseMD = require('parse-md').default

// function loadMarkdown(folder, name) {
// 	try {
// 		const { content } = parseMD(fs.readFileSync(join('content', folder, name), 'utf-8'))
// 		return content
// 	} catch (e) {
// 		// console.error('loadMd', folder, name, e)
// 	}
// }
