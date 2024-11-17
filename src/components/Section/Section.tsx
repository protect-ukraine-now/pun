import slugify from 'slugify'

import style from './style.module.scss'
import Container from '../Container/Container'

export default function Section({ title, subtitle, className, children, description }) {
	const slug = slugify(title)
	return (
		<Container className={className}>
			<div id={slug} class="relative top--13" />
			<h2 className={style.title}>
				<a
					href={`#${slug}`}
					className="decoration-none text-inherit"
				>
					{title}
				</a>
				<div className={style.subtitle}>{subtitle}</div>
			</h2>
			{children}
			{description}
		</Container>
	)
}