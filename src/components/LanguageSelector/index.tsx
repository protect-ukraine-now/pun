import { useLocation } from 'rakkasjs'

import { replaceLanguageInUrl } from 'src/tools/language'
import Menu from '../Menu'

export default function LanguageSelector({ items, ...props }) {
	const { current: { pathname } } = useLocation()
	items = Object.entries(items).map(([key, text]) =>
		[text, replaceLanguageInUrl(pathname, key)]
	)
	return <Menu items={items} {...props} />
}
