import svg1 from '@assets/logo/pun-logo-horizontal-light.svg'
import svg2 from '@assets/logo/pun-logo-horizontal-dark.svg'

export default function PunLogo({ theme = 'light' }) {
	const svg = theme === 'light' ? svg1 : svg2
	return <img src={svg.src} style={{ width: 218, height: 44 }} alt="" />
}
