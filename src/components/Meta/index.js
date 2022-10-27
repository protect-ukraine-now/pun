import Helmet from 'preact-helmet'

import { usePage } from '../../tools/url'
import { useLanguage } from '../../tools/language'
import text from '../../data/text.json'

export default function Meta() {
    let page = usePage() || 'root'
    let lang = useLanguage() || 'en'
    let meta = text[lang][page]
    let { title, description, image } = meta
    let { og_title, og_description, og_image } = meta
    let { twitter_title, twitter_description, twitter_image } = meta
    return (
        <Helmet
            htmlAttributes={{ lang }}
            title={title}
            meta={[
                { property: "description", content: description },
                { property: "og:title", content: og_title || title },
                { property: "og:description", content: og_description || description },
                { property: "og:image", content: og_image || image },
                { name: "twitter:title", content: twitter_title || og_title || title },
                { name: "twitter:description", content: twitter_description || og_description || description },
                { name: "twitter:image", content: twitter_image || og_image || image },
                { name: "twitter:card", content: 'summary_large_image' },
            ]}
        />
    )
}