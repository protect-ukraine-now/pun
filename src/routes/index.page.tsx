import { useEffect } from 'react'
import { useServerSideQuery, Redirect, navigate } from 'rakkasjs'

import { useApp } from 'src/tools/app'
import detectCountry from 'src/tools/detectCountry'
import Report from './[language]/report/index.page'
import Congress from './[language]/congress/index.page'

function defaults(app, country) {
    if (app === 'uat') return '/en/report'
    if (!country) return
    let page = {
        US: '/en/congress',
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
    useEffect(() => {
        if (redirect) navigate(redirect, { replace: true })
    }, [redirect])
    return {
        '/en/report': <Report />,
        '/en/congress': <Congress />,
        '/uk/report': <Redirect href={redirect} />,
    }[redirect] || null
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
