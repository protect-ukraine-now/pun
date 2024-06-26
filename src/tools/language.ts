import { path } from 'rambda'

import { useLocation } from './location'
import { useApp } from './app'
import text from '../data/text.json'

export function useLanguage() {
	const { pathname } = useLocation()
	return pathname.split('/')[1] || 'en'
}

export function useText() {
	const lang = useLanguage()
	const app = useApp()
	return (id: string, values: object = {}) => {
		const idApp = `${app}/${id}`
		let translation: string = (
			path(idApp.split('.'), text[lang])
			??
			path(id.split('.'), text[lang])
			??
			path(idApp.split('.'), text.en)
			??
			path(id.split('.'), text.en)
			??
			id
		)
		Object.entries(values).forEach(([key, val]) => {
			translation = translation.replace(`{{${key}}}`, val)
		})
		// console.log(`[${app}/${lang}] text(${id})\t-> `, translation.slice(0, 90).replace(/\n/g, ' '))
		return translation
	}
}

export function replaceLanguageInUrl(url, language) {
	const a = url.split('/')
	a[1] = language
	return a.join('/')
}
