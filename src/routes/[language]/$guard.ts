import { replaceLanguageInUrl } from "src/tools/language"

export function pageGuard({ params, url }) {
    if (['en', 'uk'].includes(params.language)) return true
    return {
        redirect: replaceLanguageInUrl(url.pathname, 'uk')
    }
}