import { useServerSideQuery, Redirect } from "rakkasjs"
import detectCountry from "src/tools/detectCountry"

export default function NotFound(...rest) {
	// import.meta.env.VITE_APP_NAME
	const { data: serverCountry } = useServerSideQuery(({ request}) => {
		// console.log('useServerSideQuery', request.headers)
		const country = request.headers.get('cf-ipcountry')
		console.log('useServerSideQuery', country)
		return country
	})
	let clientCountry = detectCountry()
	// let map = {
	//     US: '/en/letter',
	//     UA: '/uk/report',
	// }
	// const to = map[country] || '/en/report'
	// const to = `/${lang}/report`
	// return <Redirect href={to} />
	console.log('Redirect', { serverCountry, clientCountry })
	return null
}

// NotFound.preload = ({ requestContext }) => {
// 	const { request } = requestContext
// 	// console.log('NotFound.preload', request.headers)
// 	const lang = request.headers.get('accept-language')?.slice(0, 2)
// 	console.log('NotFound.preload', lang)
// 	return lang && {
// 		redirect: {
// 			href: `/${lang}/report`,
// 			permanent: false,
// 		}
// 	}
// }
