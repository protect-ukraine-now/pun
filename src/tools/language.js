import { IntlProvider, translate as intlTranslate } from 'preact-i18n'
import { Match } from 'preact-router/match'

import { useUrl, setUrl } from './url'
import text from '../data/text.json'

const languageFromUrl = url => url.split('/')[1] || 'en'
export const useLanguage = () => languageFromUrl(useUrl())
export const translate = id => intlTranslate(id, '', text[useLanguage()])

export function replaceLanguageInUrl(url, language) {
	let a = url.split('/')
	a[1] = language
	return a.join('/')
}

export function LanguageProvider({ children }) {
	return (
		<Match>
			{({ url }) => {
				setUrl(url)
				const language = languageFromUrl(url)
				return (
					<IntlProvider definition={text[language]}>
						{typeof (children) === 'function'
							? children(language)
							: children
						}
					</IntlProvider>
				)
			}}
		</Match>
	)
}
