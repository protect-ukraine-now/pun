import cn from 'clsx'
import { useLocation } from '@tools/location'

import { Link } from '../Link'

import style from './style.module.scss'

export default function Menu({ items, className, linkClassName, activeClassName, onClick, theme = 'dark' }) {
	const { pathname } = useLocation()
	return (
		<div className={cn(style.container, className, style[theme])}>
			{items.map(([name, href]) =>
				href === pathname ? (
					<span
						className={cn(style.link, linkClassName, style.active, activeClassName)}
						key={href}
					>
						<span>{name}</span>
					</span>
				) : (
					<Link
						href={href}
						onClick={onClick}
						className={cn(style.link, linkClassName)}
						activeClass={cn(style.active, activeClassName)}
						key={href}
					>
						<span>{name}</span>
					</Link>
				)
			)}
		</div>
	)
}
