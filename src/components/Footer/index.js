import { useEffect } from 'preact/hooks'
import { Link } from 'preact-router/match';
import Helmet from 'preact-helmet';

import style from './style.scss';
import { useUrl } from '../../tools/url'
import LogoImage from '../../assets/icons/logo-dark-horizontal.svg';
import Container from '../Container';
// import Menu from '../Menu';
// import { PAGES_MENU } from '../../constants/pages';

const Footer = () => {
	let url = useUrl()
	useEffect(() => {
		if (global.__sharethis__) {
			console.log('__sharethis__.load()')
			global.__sharethis__.load('inline-share-buttons', {
				id: 'sharethis-inline-share-buttons',
				url: 'https://protectukrainenow.org/en/report',
			})
		}
	}, [url])
	return <>
		<Helmet
			script={[
				{ defer: true, src: 'https://platform-api.sharethis.com/js/sharethis.js#property=623222622d10e5001932a789&product=inline-share-buttons', type: 'text/javascript' },
			]}
		/>
		<div className={style.socialActions}>
			<div id="sharethis-inline-share-buttons" className="sharethis-inline-share-buttons" />
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
