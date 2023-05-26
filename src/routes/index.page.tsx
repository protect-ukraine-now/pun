import { useServerSideQuery, Redirect } from 'rakkasjs'

import { useApp } from 'src/tools/app'
import detectCountry from 'src/tools/detectCountry'

function defaults(app, country) {
    if (app === 'uat') '/en/report'
    if (!country) return
    let page = {
        US: '/en/letter',
        UA: '/uk/report',
    }[country]
    return page || '/en/report'
}

export default function Root() {
    let app = useApp()
    let { data: country } = useServerSideQuery(({ request }) => {
        // console.log('useServerSideQuery', request.headers)
        const country = request.headers.get('cf-ipcountry')
        console.log('cf-ipcountry', country)
        return country
    })
    country = country ?? detectCountry()
    let redirect = defaults(app, country)
    console.log('Root.redirect', app, country, redirect)
    if (!redirect) return null
    return <Redirect href={redirect} />
}

// Root.preload = ({ requestContext }) => {
// 	const { request } = requestContext
// 	console.log('Root.preload', request.headers)
// 	return {
// 		redirect: {
// 			href: `/uk/report`,
// 			permanent: false,
// 		}
// 	}
// }
