import { useLocation } from '@tools/location'

import { replaceLanguageInUrl } from '@tools/language'
import Menu from '../Menu'

export default function LanguageSelector({ items, ...props }) {
	const { pathname } = useLocation()
	if (!items) return ' '
	items = Object.entries(items).map(([key, text]) =>
		({ name: text, href: replaceLanguageInUrl(pathname, key) })
	)
	return <Menu items={items} {...props} />
}
