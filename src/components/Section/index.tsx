import style from './style.module.scss'
import Container from '../Container'

export default function Section({ title, subtitle, className, children }) {
	return (
		<Container className={className}>
			<h2 className={style.title}>
				{title}
				<div className={style.subtitle}>{subtitle}</div>
			</h2>
			{children}
		</Container>
	)
}