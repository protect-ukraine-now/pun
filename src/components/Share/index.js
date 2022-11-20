import Helmet from 'preact-helmet'
import { Facebook, Twitter, Linkedin } from 'react-social-sharing'

import { useUrl, usePage } from '../../tools/url'
import { useLanguage } from '../../tools/language'
import text from '../../data/text.json'

export default function Share() {
    let url = useUrl()
    let page = usePage() || 'root'
    let lang = useLanguage() || 'en'

    // lang should be validated to be present in text.json
    // if it's not there - we should use `en` as a default
    if (!Object.keys(text).includes(lang)) {
        lang = 'en'
    }

    let { title, description, image, og_title, og_description, og_image } = text[lang][page]
    let og = {
        link: `https://protectukrainenow.org${url}`,
        title: og_title || title,
        description: og_description || description,
        image: og_image || image,
        small: true,
    }
    return <>
        <Helmet
            htmlAttributes={{ lang }}
            title={title}
            meta={[
                { property: "description", content: description },
                { property: "og:title", content: og.title },
                { property: "og:description", content: og.description },
                { property: "og:image", content: og.image },
            ]}
        />
        <h1 style={{ display: 'none' }}>{title}</h1>
        <Facebook {...og} />
        <Twitter {...og} />
        <Linkedin {...og} />
    </>
}
