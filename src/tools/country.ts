let map = {
	"Kiev": "UA",
	"Uzhgorod": "UA",
	"Zaporozhye": "UA",
	"Wake": "US",
	"New_York": "US",
	"Detroit": "US",
	"Louisville": "US",
	"Monticello": "US",
	"Indianapolis": "US",
	"Vincennes": "US",
	"Winamac": "US",
	"Marengo": "US",
	"Petersburg": "US",
	"Vevay": "US",
	"Chicago": "US",
	"Tell_City": "US",
	"Knox": "US",
	"Menominee": "US",
	"Center": "US",
	"New_Salem": "US",
	"Beulah": "US",
	"Denver": "US",
	"Boise": "US",
	"Phoenix": "US",
	"Los_Angeles": "US",
	"Anchorage": "US",
	"Juneau": "US",
	"Sitka": "US",
	"Metlakatla": "US",
	"Yakutat": "US",
	"Nome": "US",
	"Adak": "US",
	"Honolulu": "US",
	"Midway": "US",
	"St_Thomas": "US",
}

 function detectCountry() {
	if (typeof Intl === 'undefined') return
	let tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
	let a = tz.split('/')
	let city = a[a.length - 1]
	let country = map[city] || 'other'
	console.log('country detected', country)
	return country
}

let Astro
export function useCountry(astro = null) {
	Astro = astro ?? Astro
	return Astro?.request.headers.get('cf-ipcountry') || 'US'
	// let { data } = useServerSideQuery(({ request }) => request.headers.get('cf-ipcountry'))

	// override country with the query parameter for testing
	// let { url } = usePageContext()
	// if (url.search) {
	// 	let params = url.search.slice(1).split('&').map(x => x.split('='))
	// 	let { country } = Object.fromEntries(params)
	// 	if (country) {
	// 		console.log('country overrided', country)
	// 		return country
	// 	}
	// }

	// let country = data || detectCountry()
	// console.log('country', data, country)
	// return country
}
