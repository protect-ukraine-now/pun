import cn from 'clsx'
import style from './uat.module.scss'

export default function UatLogo({ theme = 'light' }) {
	return (
		<div className={cn(style.container, style[theme])}>
			<span className={style.logo} />
			<span className={style.name}>
				Ukraine Aid Tracker
			</span>
		</div>
	)
}