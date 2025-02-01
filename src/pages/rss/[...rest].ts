import xml2json from 'simple-xml-to-json'

export async function GET({ request }) {
	let query = request.url.split('/rss/')[1] ?? ''
	// const url = new URL(request.url)
	// const params = new URLSearchParams(url.search)
	const rssUrl = `https://news.google.com/rss/` + query
	console.log(rssUrl)
	let xml = await (await fetch(rssUrl)).text()
	// console.log(xml)
	try {
		let feed = xml2json.convertXML(xml)
		// console.log(JSON.stringify(feed, null, 4))
		let items = feed.rss.children[0].channel.children.map(x => x.item).filter(x => x)
		console.log(JSON.stringify(items, null, 4))
		items = items.map(i => ({
			title: i.children[0].title.content,
			link: i.children[1].link.content,
		}))
		return new Response(JSON.stringify(items, null, '	'))
	} catch(e) {
		console.error(e)
		return e
	}
}