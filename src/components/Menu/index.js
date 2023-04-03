import cn from 'classnames'
import { Match, Link } from 'preact-router/match'

import style from './style.scss'

export default function Menu({ items, className, linkClassName, activeClassName, onClick, theme = 'dark' }) {
	// console.log('Menu', items)
	return (
		<div className={cn(style.container, className, style[theme])}>
			{items.map(([name, href]) =>
				<Match path={href}>
					{({ matches }) => (
						matches ? (
							<span
								className={cn(style.link, linkClassName, style.active, activeClassName)}><span>{name}</span>
							</span>
						) : (
							<Link onClick={onClick} {...{ href, key: href }} className={cn(style.link, linkClassName)}
									activeClassName={cn(style.active, activeClassName)}>
								<span>{name}</span>
							</Link>
						)
					)}
				</Match>
			)}
		</div>
	)
}
