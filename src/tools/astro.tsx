import { getEntry } from 'astro:content'

import { useLanguage } from './language'

export async function useMd(collection, slug, lang = null) {
	lang ??= useLanguage()
	slug = slug.toLowerCase()
	let md = await getEntry(collection, `${slug}-${lang}`)
	md ??= await getEntry(collection, `${slug}-en`)
	console.log({ collection, slug, lang, md: !!md })
	md = await md?.render()
	return md?.Content ?? (_ => '')
}