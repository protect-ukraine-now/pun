import cn from 'clsx'

import style from './style.module.scss'
import Container from '../Container'

const Banner = ({ className, image, title, action }) => {
	return (
		<div className={cn(className, style.container)} style={{ backgroundImage: `url("${image.src}")` }}>
			<Container className={style.wrapper}>
				<h2 className={style.title}>
					{title}
				</h2>
				<div className={style.action}>
					{action}
				</div>
			</Container>
		</div>
	)
}

export default Banner
