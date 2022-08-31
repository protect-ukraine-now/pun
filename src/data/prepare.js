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

	let seoLetter = {
		title: 'US must arm Ukraine now, before it’s too late',
		cover: 'https://protectukrainenow.org/assets/letter.webp',
		subtitle: `
«With the necessary weapons and economic aid, Ukraine can defeat Russia. If it succeeds, our soldiers are less likely to have to risk their lives protecting U.S. treaty allies whom Russia also threatens»

This is a public opinion of US 20 top national security experts.
		`,
	}

	let seoWeapons = {
		title: 'US must arm Ukraine now, before it’s too late',
		cover: 'https://protectukrainenow.org/assets/weapons.jpg',
		subtitle: `
«With the necessary weapons and economic aid, Ukraine can defeat Russia. If it succeeds, our soldiers are less likely to have to risk their lives protecting U.S. treaty allies whom Russia also threatens»

This is a public opinion of US 20 top national security experts.
		`,
	}

	let pages = [
		{ url: '/' },
		...Object.entries(text).map(([language]) => [
			{
				url: `/${language}/letter`,
				seo: seoLetter,
			},
			{
				url: `/${language}/news`,
				seo: seoWeapons,
			},
			{
				url: `/${language}/report`,
				seo: seoWeapons,
			},
		])
	].flat()
	// console.log('pages', pages)

	return pages
}

module.exports = preparePages
