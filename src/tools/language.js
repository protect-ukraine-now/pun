import { IntlProvider } from 'preact-i18n'

import { useUrl } from './url'
import text from '../data/text.json'

export function useLanguage() {
    let url = useUrl()
    return url.split('/')[1]
}

export function LanguageProvider({ children }) {
    let language = useLanguage()
    // console.log('LanguageProvider', language)
    return (
        <IntlProvider definition={text[language]}>
            {children}
        </IntlProvider>
    )
}
