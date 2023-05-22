import { useServerSideQuery, Redirect } from "rakkasjs"
import detectCountry from "src/tools/detectCountry"

export default function NotFound(...rest) {
    // console.log('NotFound', ...rest)
    // import.meta.env.VITE_APP_NAME
    const { data: lang } = useServerSideQuery(({ request}) => {
        // console.log('useServerSideQuery', request.headers)
        const lang = request.headers.get('accept-language')?.slice(0, 2)
        console.log('useServerSideQuery', lang)
        return lang
    })
    // let clientCountry = detectCountry()
    // let map = {
    //     US: '/en/letter',
    //     UA: '/uk/report',
    // }
    // const to = map[country] || '/en/report'
    const to = `/${lang}/report`
    console.log('Redirect', to)
    return <Redirect href={to} />
}

NotFound.preload = ({ requestContext }) => {
    const { request } = requestContext
    // console.log('NotFound.preload', request.headers)
    const lang = request.headers.get('accept-language')?.slice(0, 2)
    console.log('NotFound.preload', lang)
    return lang && {
        redirect: {
            href: `/${lang}/report`,
            permanent: false,
        }
    }
}