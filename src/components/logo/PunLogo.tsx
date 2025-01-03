import svg1 from '@assets/logo/pun-logo-horizontal-light.svg'
import svg2 from '@assets/logo/pun-logo-horizontal-dark.svg'
import { useLanguage } from '@tools/language'

export default function PunLogo({ theme = 'light' }) {
	const lang = useLanguage()
	const svg = theme === 'light' ? svg1 : svg2
	return (
		<a href={`/${lang}/home`}>
			<img src={svg.src} style={{ width: 218, height: 44 }} alt="" />
		</a>
	)
}
