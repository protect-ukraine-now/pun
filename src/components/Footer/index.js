import style from './style.scss';
import { Link } from 'preact-router/match';
import LogoImage from '../../assets/icons/logo-dark-horizontal.svg';
import Menu from '../Menu';
import Container from '../Container';
import { PAGES_MENU } from '../../constants/pages';

const Footer = () => (
	<footer className={style.footer}>
		<Container className={style.container}>
			<Link href="/">
				<img className={style.logo} src={LogoImage} alt=""/>
			</Link>
			<Menu className={style.nav} linkClassName={style.link} activeClassName={style.active} items={PAGES_MENU}/>
			<a href="mailto:ProtectUkraineNOW@gmail.com" className={style.email}>ProtectUkraineNOW@gmail.com</a>
		</Container>
	</footer>
);

export default Footer;
