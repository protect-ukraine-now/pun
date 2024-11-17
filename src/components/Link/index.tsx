import cn from 'clsx'

import style from './style.module.scss'
import { useLocation } from '@tools/location'

export function Link({ active = undefined, variant = '', as = 'a', className = '', ...rest }) {
	let { pathname } = useLocation()
	active ??= rest.href === pathname
	const Tag = as
	return (
		<Tag
			className={cn(style.link, active && style.active, style[variant], className)}
			style={{ color: "inherit", backgroundColor: 'inherit', outline: 'inherit' }}
			{...rest}
		/>
	)
}
