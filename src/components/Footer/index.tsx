import style from './style.module.scss'
import Container from '../Container'
import Share from '../Share'

const Footer = ({ logo, email }) => {
	return <>
		<div className={style.socialActions}>
			<Share />
		</div>
		<footer className={style.footer}>
			<Container className={style.container}>
				{logo}
				{/* <Menu className={style.nav} linkClassName={style.link} activeClassName={style.active} items={PAGES_MENU}/> */}
				<a href={`mailto:${email}`} className={style.email} target="_blank" rel="noreferrer">
					{email}
				</a>
			</Container>
		</footer>
	</>
}

export default Footer
