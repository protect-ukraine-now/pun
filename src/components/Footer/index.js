import { Link } from 'preact-router/match';

import style from './style.scss';
import LogoImage from '../../assets/icons/logo-dark-horizontal.svg';
import Container from '../Container';
import Share from '../Share'
// import Menu from '../Menu';
// import { PAGES_MENU } from '../../constants/pages';

const Footer = () => {
	return <>
		<div className={style.socialActions}>
			<Share />
		</div>
		<footer className={style.footer}>
			<Container className={style.container}>
				<Link href="/">
					<img className={style.logo} src={LogoImage} alt=""/>
				</Link>
				{/* <Menu className={style.nav} linkClassName={style.link} activeClassName={style.active} items={PAGES_MENU}/> */}
				<a href="mailto:ProtectUkraineNOW@gmail.com" className={style.email}>ProtectUkraineNOW@gmail.com</a>
			</Container>
		</footer>
	</>
}

export default Footer;
