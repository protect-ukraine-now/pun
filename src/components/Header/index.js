import { Link } from 'preact-router/match'

import style from './style.scss'
import { useLanguage, translate } from '../../tools/language'
import Container from '../Container'
import LanguageSelector from '../LanguageSelector'
import Menu from '../Menu'
import Hamburger from '../Hamburger/Hamburger'

const Header = ({ logo, menu, languages }) => {
	const language = useLanguage()
	menu = menu.map(page => [translate(`menu.${page}`), `/${language}/${page}`])
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
};

export default Header;
