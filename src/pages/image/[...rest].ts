export function GET({ request }) {
	const width = 1200
	const height = 627
	const header = 77
	const crop = `0,${header},${width},${height}`
	const ttl = 601
	const page = request.url.replace('/image', '').replace('/localhost:4321/', '/protectukrainenow.org/')
	const url = `https://api.apiflash.com/v1/urltoimage?url=${page}&width=${width}&height=${header+height}&ttl=${ttl}&crop=${crop}&format=webp&access_key=c94952bab8a34be1a401fb0cd1ec60dd`
	return fetch(url, {
		cf: {
        	cacheEverything: true,
		}
	})
}