import * as Menu from '@components/Menu/Menu'

export function _MenuItem(item) {
	let { href, name, items, open, className } = item
	let { pathname } = useLocation()
	let active = href === pathname || items?.some(item => item.href === pathname)
	let openClass = isOpen ? ' menu-dropdown-show' : ''
	return (
		<li
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
						{items.map(Item)}
					</ul>
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

export default function MenuBar({ items, className }) {
	return (
		<Menu.Root className={className}>
			{items.map(item => (
				item.items ? (
					<Menu.Item key={item.name}>
						<Menu.Trigger items={item.items}>
							{item.name}
						</Menu.Trigger>
						<Menu.Drop className="bg-black absolute top-$header-height p0 m0">
							{item.items.map(item => (
								<Menu.Item key={item.href}>
									<Menu.Link href={item.href}>
										{item.name}
									</Menu.Link>
								</Menu.Item>
							))}
						</Menu.Drop>
					</Menu.Item>
				) : (
					<Menu.Item key={item.name}>
						<Menu.Link href={item.href}>
							{item.name}
						</Menu.Link>
					</Menu.Item>
				)
			))}
		</Menu.Root>
	)
}
