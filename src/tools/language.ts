import { useLocation } from 'rakkasjs'
import { path } from 'rambda'

import text from '../data/text.json'

export function useLanguage() {
	const { current } = useLocation()
	return current.pathname.split('/')[1]
}

export function useText() {
	const language = useLanguage()
	return (id: string, values: object = {}) => {
		const idApp = `${import.meta.env.VITE_APP_NAME || 'pun'}/${id}`
		let translation: string = (
			path(idApp.split('.'), text[language])
			??
			path(id.split('.'), text[language])
			??
			id
		)
		Object.entries(values).forEach(([key, val]) => {
			translation = translation.replace(`{{${key}}}`, val)
		})
		// console.log(`text(${id})\t-> `, translation.slice(0, 100).replace(/\n/g, ' '))
		return translation
	}
}

export function replaceLanguageInUrl(url, language) {
	const a = url.split('/')
	a[1] = language
	return a.join('/')
}
