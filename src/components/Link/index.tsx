import cn from 'clsx'

import style from './style.module.scss'
import { useLocation } from '@tools/location'

export function Link({ href, active = undefined, variant = '', className = '', tag = 'a', ...rest }) {
	let { pathname } = useLocation()
	active ??= href === pathname
	const Tag = tag
	return (
		<Tag
			href={href}
			className={cn(style.link, active && style.active, style[variant], className)}
			style={{ color: "inherit", backgroundColor: 'inherit', outline: 'inherit' }}
			{...rest}
		/>
	)
}
