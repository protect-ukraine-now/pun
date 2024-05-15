import style from './style.module.scss'
import Container from '../Container'
import Article from '@components/Article'

export default function Section({ title, subtitle, className, children, description }) {
	return (
		<Container className={className}>
			<h2 className={style.title}>
				{title}
				<div className={style.subtitle}>{subtitle}</div>
			</h2>
			{children}
			{description &&
				<Article className={style.description}>
					{description}
				</Article>
			}
		</Container>
	)
}