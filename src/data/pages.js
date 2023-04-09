const loadData = require('./load')

async function pages(pages, languages) {
	const data = await loadData()
	const { text } = data
	const seo = lang => text[lang][`${process.env.PREACT_APP_NAME}/seo`]

	pages = [
		{
			url: '/',
			lang: 'en',
			...seo('en', 'root'),
		},
		...languages.map(lang => pages.map(page => ({
			url: `/${lang}/${page}`,
			lang,
			...seo(lang, page),
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
