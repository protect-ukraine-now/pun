import style from './style.module.scss'
import Container from '../Container/Container'
import Share from '../Share'
import { Link } from '@components/Link'

const Footer = ({ Logo, email }) => {
	return <>
		<div className={style.socialActions}>
			<Share />
		</div>
		<footer className={style.footer}>
			<Container className={style.container}>
				<Logo theme="dark" />
				{/* <Menu className={style.nav} linkClassName={style.link} activeClassName={style.active} items={PAGES_MENU}/> */}
				<Link href={`mailto:${email}`} target="_blank" rel="noreferrer">
					{email}
				</Link>
			</Container>
		</footer>
	</>
}

export default Footer
