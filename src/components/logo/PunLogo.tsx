import svg1 from 'src/assets/logo/pun-logo-horizontal-light.svg'
import svg2 from 'src/assets/logo/pun-logo-horizontal-dark.svg'

export default function PunLogo({ theme = 'light' }) {
	const svg = theme === 'light' ? svg1 : svg2
	return <img src={svg} style={{ height: 44 }} alt="" />
}
