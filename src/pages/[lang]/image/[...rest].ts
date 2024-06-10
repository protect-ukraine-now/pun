
export function GET({ request, params }) {
	const width = 1200
	const height = 627
	const header = 77
	const crop = `0,${header},${width},${height}`
	const ttl = 600
	console.log(request)
	const url = `https://api.apiflash.com/v1/urltoimage?access_key=c94952bab8a34be1a401fb0cd1ec60dd&url=https%3A%2F%2Fprotectukrainenow.org%2Fen%2Freport&format=webp&width=1200&height=727&ttl=36000&crop=0%2C100%2C1200%2C627`
	// return fetch()
}