import { Link } from 'preact-router/match';

import style from './style.scss';
import Container from '../Container';
import Share from '../Share'

const Footer = ({ logo, email }) => {
	return <>
		<div className={style.socialActions}>
			<Share />
		</div>
		<footer className={style.footer}>
			<Container className={style.container}>
				<Link href="/">
					<img className={style.logo} src={logo} alt=""/>
				</Link>
				{/* <Menu className={style.nav} linkClassName={style.link} activeClassName={style.active} items={PAGES_MENU}/> */}
				<a href={`mailto:${email}`} className={style.email} target="_blank">
					{email}
				</a>
			</Container>
		</footer>
	</>
}

export default Footer;
