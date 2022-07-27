import style from './style.scss';
import { Link } from 'preact-router/match';
import LogoImage from '../../assets/icons/logo-dark-horizontal.svg';
import Menu from '../Menu';
import LanguageSelector from '../LanguageSelector';
import Container from '../Container';
import { PAGES_MENU } from '../../constants/pages';
import { LANGUAGE_MENU } from '../../constants/language';

const Footer = () => (
	<footer className={style.footer}>
		<Container className={style.container}>
			<Link href="/">
				<img className={style.logo} src={LogoImage} alt=""/>
			</Link>
			<Menu className={style.nav} linkClassName={style.link} activeClassName={style.active} items={PAGES_MENU}/>
			<LanguageSelector className={style.i18n} activeClassName={style.active} linkClassName={style.link} items={LANGUAGE_MENU}/>
			<a href="mailto:pun@mail.com" className={style.email}>pun@mail.com</a>
		</Container>
	</footer>
);

export default Footer;
