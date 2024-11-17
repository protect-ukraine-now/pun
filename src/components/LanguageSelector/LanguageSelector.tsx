import { useLocation } from '@tools/location'

import { replaceLanguageInUrl } from '@tools/language'
import * as Menu from '../Menu/Menu'

export default function LanguageSelector({ items, ...props }) {
	const { pathname } = useLocation()
	if (!items) return ' '
	items = Object.entries(items).map(([key, text]) =>
		({ name: text, href: replaceLanguageInUrl(pathname, key) })
	)
	return (
		<Menu.Root {...props}>
			{items.map(item =>
				<Menu.Item key={item.href}>
					<Menu.Link href={item.href}>
						{item.name}
					</Menu.Link>
				</Menu.Item>
			)}
		</Menu.Root>
	)
}
