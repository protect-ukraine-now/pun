import { useState, useRef } from 'preact/hooks'

import useClickOutside from '@tools/useClickOutside'

export function Details({ open = false, as = '', className = '', children }) {
	const [isOpen, setIsOpen] = useState(open)
	console.log({ isOpen })
	const ref = useRef()
	useClickOutside(ref, e => {
		e.preventDefault()
		e.stopPropagation()
		setIsOpen(false)
	})
	const Tag = as || 'details'
	return (
		<Tag
			ref={ref}
			className={className}
			open={isOpen}
			// onClick={() => setIsOpen(!isOpen)}
		>
			{children(isOpen)}
		</Tag>
	)
}
