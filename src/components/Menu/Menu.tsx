import cn from 'clsx'
import { toChildArray, cloneElement } from 'preact'
import { useState, useRef } from 'preact/hooks'

import { useLocation } from '@tools/location'
import useClickOutside from '@tools/useClickOutside'
import { Link as A } from '@components/Link'

export function Root({ vertical = false, className = '', ...rest }) {
	className = cn('menu p0 m0 text-base font-bold', { "menu-horizontal": !vertical }, className)
	return <ul className={className} {...rest} />
}

export function Item({ children, ...rest }) {
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef()
	useClickOutside(ref, e => {
		setIsOpen(false)
	})
	if (isOpen && children.length > 1) {
		children = children.map(child => {
			const className = cn(child.props.className, 'menu-dropdown-show')
			return cloneElement(child, { className, manupulated: true })
		})
	}
	return (
		<li
			onClick={() => { console.log('click'); setIsOpen(!isOpen) }}
			ref={ref}
			{...{ children, ...rest }}
		/>
	)
}

export function Link(props) {
	return <A variant="accent" {...props} />
}

export function Title({ className = '', ...rest }) {
	className = cn('menu-dropdown-title uppercase m0 !bg-inherit', className)
	return <h6 className={className} {...rest} />
}

export function Sub(props) {
	return <ul {...props} />
}

export function Trigger({ items = undefined, href = '', className = '', ...rest }) {
	let { pathname } = useLocation()
	let active = items?.some(item => item.href === pathname)
	console.log(active, items)
	return (
		<span className={cn('menu-dropdown-toggle h-full p0 flex mr-4 !text-inherit !bg-inherit !outline-inherit', className)}>
			<Link
				className="h-full content-center py-2 pl-4 pr-7 mr--8"
				active={active}
				{...rest}
			/>
		</span>
	)
}

export function Drop({ className = '', ...rest }) {
	className = cn('menu-dropdown', className)
	return <ul className={className} {...rest} />
}
