import { useLanguage } from '@tools/language'
import text from '@data/text.json'

export function useVega(slug, spec, data) {
	const lang = useLanguage()
	if (!Array.isArray(spec.data)) spec.data = [spec.data]
	spec = structuredClone(spec)
	spec.data.forEach(x => {
		let values = data[x.name]
		if (values) {
			Object.entries(text[lang][slug]).slice(2).forEach(([key, val]) => {
				values = values.replaceAll(key, `"${val}"`)
			})
			x.values = values
			delete x.url
		}
	})
	return spec
}
