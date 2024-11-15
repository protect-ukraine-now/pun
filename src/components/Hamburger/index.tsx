import { useState } from 'preact/hooks'
import cn from 'clsx'

import style from './style.module.scss'
import Menu from '../Menu'
import LanguageSelector from '../LanguageSelector'
import useNoScroll from '@tools/useNoScroll'

const Hamburger = ({ menu, languages, className }) => {
	const [isOpen, setIsOpen] = useState(false)

	useNoScroll(isOpen)

	return (
		<div className={cn('text-black', className, style.container, {[style.isOpen]: isOpen})}>
			<button type="button" className={style.trigger} onClick={() => setIsOpen(prev => !prev)}><span/></button>
			<div className={cn(style.menus)}>
				<Menu
					onClick={() => setIsOpen(false)}
					className={style.nav}
					linkClassName={style.link}
					items={menu}
				/>
				<LanguageSelector
					onClick={() => setIsOpen(false)}
					className={style.i18n}
					linkClassName={style.link}
					items={languages}
				/>
			</div>
		</div>
	)
}

export default Hamburger
