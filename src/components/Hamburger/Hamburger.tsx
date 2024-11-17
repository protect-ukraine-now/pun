import { useState } from 'preact/hooks'
import cn from 'clsx'

import style from './style.module.scss'
import * as Menu from '../Menu/Menu'
import LanguageSelector from '../LanguageSelector/LanguageSelector'
import useNoScroll from '@tools/useNoScroll'

const Hamburger = ({ menu, languages, className }) => {
	const [isOpen, setIsOpen] = useState(false)

	useNoScroll(isOpen)
	return (
		<div className={cn('text-black', className, style.container, {[style.isOpen]: isOpen})}>
			<button
				type="button"
				className={style.trigger}
				onClick={() => setIsOpen(prev => !prev)}
			>
				<span />
			</button>
			<div className={cn(style.menus)}>
				<Menu.Root
					className="self-start"
					vertical
				>
					{menu.map(item => (
						item.items ? (
							<Menu.Item key={item.name}>
								<Menu.Title>
									{item.name}
								</Menu.Title>
								<Menu.Sub className="">
									{item.items.map(item => (
										<Menu.Item key={item.href}>
											<Menu.Link href={item.href}>
												{item.name}
											</Menu.Link>
										</Menu.Item>
									))}
								</Menu.Sub>
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
				<LanguageSelector
					className={style.i18n}
					items={languages}
				/>
			</div>
		</div>
	)
}

export default Hamburger
