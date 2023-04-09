import { IntlProvider, translate as intlTranslate } from 'preact-i18n'

import text from '../data/text.json'
import { useUrl } from './url'

function languageFromUrl(url) {
	return url.split('/')[1]
}

export function replaceLanguageInUrl(url, language) {
	let a = url.split('/')
	a[1] = language
	return a.join('/')
}

export function useLanguage() {
	const url = useUrl()
	return languageFromUrl(url) || 'en'
}

export function translate(id, ...rest) {
	const app = process.env.PREACT_APP_NAME
	const lang = useLanguage()
	return (
		intlTranslate(`${app}/${id}`, '', text[lang], ...rest)
		||
		intlTranslate(id, '', text[lang], ...rest)
	)
}

export function LanguageProvider({ children }) {
	const lang = useLanguage()
	return (
		<IntlProvider definition={text[lang]}>
			{children}
		</IntlProvider>
	)
}
