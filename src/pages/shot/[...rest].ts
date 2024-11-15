export function GET({ request }) {
	const url = new URL(request.url)
	const params = new URLSearchParams(url.search)
	let urlToShot = params.get('url')
	let width = params.get('width')
	let height = params.get('height')
	let crop = params.get('crop')
	let ttl = params.get('ttl')
	if (!urlToShot) {
		urlToShot = request.url.replace('/shot/', '/').replace('/localhost:4321/', '/protectukrainenow.org/')
		const header = 77
		width = '1200'
		height = 627
		crop = `0,${header},${width},${height}`
		height += header
		ttl ||= 60*60*24*7
	} else {
		urlToShot = decodeURIComponent(urlToShot)
		if (!width && !height && !crop) {
			width = '1200'
			height = '1200'
			crop = '200,80,800,1000'
		}
		ttl ||= 60*60*24*30
	}
	const apiUrl = `https://api.apiflash.com/v1/urltoimage?url=${urlToShot}&width=${width}&height=${height}&crop=${crop}&ttl=${ttl}&format=webp&access_key=c94952bab8a34be1a401fb0cd1ec60dd`
	return fetch(apiUrl, {
		cf: {
        	cacheEverything: true,
		}
	})
}