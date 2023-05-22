import { Link } from 'rakkasjs'

import style from './style.module.scss'
import { useLanguage, useText } from 'src/tools/language'
import Container from '../Container'
import LanguageSelector from '../LanguageSelector'
import Menu from '../Menu'
import Hamburger from '../Hamburger'

const Header = ({ logo, menu, languages }) => {
	const language = useLanguage()
	const text = useText()
	menu = menu.map(page => [text(`menu.${page}`), `/${language}/${page}`])
	return (
		<header className={style.header}>
			<Container className={style.container}>
				<Link className={style.logo}  href="/">
					<img src={logo} alt="" />
				</Link>
				<Menu
					className={style.menu}
					theme="light"
					items={menu}
				/>
				<LanguageSelector
					className={style.menu}
					theme="light"
					items={languages}
				/>
				<Hamburger
					className={style.hamburger}
					menu={menu}
					languages={languages}
			/>
			</Container>
		</header>
	)
}

export default Header
