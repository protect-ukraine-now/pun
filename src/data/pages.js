const loadData = require('./load')

async function pages(pages, languages) {
	let data = await loadData()
	let { text } = data

	let meta = (lang, page) => {
		const meta = Object.assign(
			{},
			text[lang][page],
			text[lang][`${process.env.PREACT_APP_NAME}-${page}`],
		)
		// console.log('meta', lang, page, meta)
		return meta
	}

	pages = [
		{
			url: '/',
			lang: 'en',
			...meta('en', 'root'),
		},
		...languages.map(lang => pages.map(page => ({
			url: `/${lang}/${page}`,
			lang,
			...meta(lang, page),
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
