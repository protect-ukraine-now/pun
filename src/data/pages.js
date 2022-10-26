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

async function pages() {
	let data = await loadData()
	let { text } = data

	let pages = [
		{
			url: '/',
			...text.en.root,
		},
		...Object.entries(text).map(([lang]) => [
			{
				url: `/${lang}/letter`,
				lang,
				image: 'https://protectukrainenow.org/assets/letter.webp',
				...text[lang].letter,
			},
			{
				url: `/${lang}/candidates`,
				lang,
				image: 'https://protectukrainenow.org/assets/letter.webp',
				...text[lang].candidates,
			},
			{
				url: `/${lang}/report`,
				lang,
				image: `https://protectukrainenow.org/assets/report.${lang}.webp`,
				...text[lang].report,
			},
			{
				url: `/${lang}/news`,
				lang,
				image: `https://protectukrainenow.org/assets/report.${lang}.webp`,
				...text[lang].news,
			},
		])
	].flat()
	// console.log('pages', pages)

	return pages
}

module.exports = pages
