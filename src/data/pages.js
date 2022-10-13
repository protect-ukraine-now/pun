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
			seo: {
				...text.en.seo_letter
			},
		},
		...Object.entries(text).map(([lang]) => [
			{
				url: `/${lang}/letter`,
				lang,
				seo: {
					...text[lang].seo_letter,
					cover: 'https://protectukrainenow.org/assets/letter.webp',
				},
			},
			{
				url: `/${lang}/news`,
				lang,
				seo: {
					...text[lang].seo_news,
					cover: `https://protectukrainenow.org/assets/report.${lang}.webp`,
				},
			},
			{
				url: `/${lang}/report`,
				lang,
				seo: {
					...text[lang].seo_report,
					cover: `https://protectukrainenow.org/assets/report.${lang}.webp`,
				},
			},
		])
	].flat()
	// console.log('pages', pages)

	return pages
}

module.exports = pages
