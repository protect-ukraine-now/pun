import { useEffect } from 'react'
import { Redirect, navigate } from 'rakkasjs'

import { useApp } from 'src/tools/app'
import { useCountry } from 'src/tools/country'
import Report from './[language]/report/index.page'
import Call from './[language]/call/index.page'

function defaults(app, country) {
    if (app === 'uat') return '/en/report'
    if (!country) return
    let page = {
        US: '/en/call',
        UA: '/uk/report',
    }[country]
    return page || '/en/report'
}

export default function Root() {
    let app = useApp()
    let country = useCountry()
    let redirect = defaults(app, country)
    console.log('Root', app, country, redirect)
    useEffect(() => {
        if (redirect) {
            console.log('Root.redirect', redirect)
            navigate(redirect, { replace: true })
        }
    }, [redirect])
    return {
        '/en/report': <Report />,
        '/en/call': <Call />,
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
