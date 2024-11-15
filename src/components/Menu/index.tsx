import cn from 'clsx'
import { useState, useRef } from 'preact/hooks'

import { useLocation } from '@tools/location'
import { Link } from '@components/Link'
import useClickOutside from '@tools/useClickOutside'

export function MenuItem(item) {
	let { href, name, items, open, className } = item
	let [isOpen, setIsOpen] = useState(open)
	let { pathname } = useLocation()
	let active = href === pathname || items?.some(item => item.href === pathname)
	let openClass = isOpen ? ' menu-dropdown-show' : ''
	let submenuRef = useRef()
	useClickOutside(submenuRef, e => {
		e.preventDefault()
		e.stopPropagation()
		setIsOpen(false)
	})
	return (
		<li
			ref={submenuRef}
			key={href}
			className="bg-black"
		>
			{items ? (
				<>
					<span
						className={'menu-dropdown-toggle h-full p0 flex mr-4' + openClass}
						style={{ color: "inherit", backgroundColor: 'inherit', outline: 'inherit' }}
						onClick={() => setIsOpen(!isOpen)}
					>
						<Link
							tag="span"
							variant="accent"
							active={active}
							className="h-full content-center py-2 pl-4 pr-7 mr--8"
						>
								{name}
						</Link>
					</span>
    				<ul	className={'menu-dropdown absolute top-$header-height bg-inherit p0 m0' + openClass}>
						{items.map(MenuItem)}
					</ul>
					{/*
					<ul
						className="bg-black rounded-none whitespace-nowrap"
						style={{ margin: 0 }}
					>
						{items.map(Item)}
					</ul> */}
				</>
			) : (
				<Link
					href={href}
					variant="accent"
					className="content-center"
				>
					{name}
				</Link>
			)}
		</li>
	)
}

export default function Menu({ items, vertical, collapsible, open, className }) {
	console.log(items)
	return (
		<ul className={cn('menu p0 m0 text-base font-bold', { "menu-horizontal": !vertical }, className)}>
			{items.map(item => MenuItem({ collapsible, open, ...item }))}
		</ul>
	)
}
