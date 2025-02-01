import { xml2json } from 'xml-js'

export async function GET({ request }) {
	let query = request.url.split('/rss/')[1] ?? ''
	// const url = new URL(request.url)
	// const params = new URLSearchParams(url.search)
	const rssUrl = `https://news.google.com/rss/` + query
	console.log(rssUrl)
	let xml = await (await fetch(rssUrl)).text()
	console.log(xml)
	try {
		let feed = JSON.parse(xml2json(xml, { compact: true }))
		console.log(feed)
		let items = feed.rss.channel.item.map(({ title, link, source }) => ({
			title: title._text,
			link: link._text,
		}))
		return new Response(JSON.stringify(items, null, '	'))
	} catch(e) {
		console.error(e)
		return e
	}
}