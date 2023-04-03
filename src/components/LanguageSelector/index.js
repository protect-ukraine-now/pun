import { useUrl } from '../../tools/url'
import { replaceLanguageInUrl } from '../../tools/language'
import Menu from '../Menu'

export default function LanguageSelector({ items = {}, ...props }) {
	const url = useUrl()
	items = Object.entries(items).map(([key, text]) =>
		[text, replaceLanguageInUrl(url, key)]
	)
	return <Menu {...props} items={items} />
}
