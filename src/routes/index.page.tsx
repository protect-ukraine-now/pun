import { useServerSideQuery, Redirect } from "rakkasjs"
import detectCountry from "src/tools/detectCountry"

export default function Root() {
    let { data: country } = useServerSideQuery(({ request }) => {
        // console.log('useServerSideQuery', request.headers)
        const country = request.headers.get('cf-ipcountry')
        console.log('cf-ipcountry', country)
        return country
    })
    if (import.meta.env.VITE_APP_NAME === 'uat') {
        return <Redirect href="/en/report" />
    }
    country = country ?? detectCountry()
    console.log('Root', country)
    if (!country) return null
    let map = {
        US: '/en/letter',
        UA: '/uk/report',
    }
    const to = map[country] || '/en/report'
    return <Redirect href={to} />
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
