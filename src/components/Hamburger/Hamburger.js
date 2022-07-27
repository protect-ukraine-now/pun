import cn from 'classnames';
import style from './style.scss';
import Menu from '../Menu';
import { useState } from 'preact/hooks';
import LanguageSelector from '../LanguageSelector';
import useNoScroll from '../../hooks/useNoScroll';

const Hamburger = ({ languages, navigation, className }) => {
	const [isOpen, setIsOpen] = useState(false);

	useNoScroll(isOpen);

	return (
		<div className={cn(className, style.container, {[style.isOpen]: isOpen})}>
			<button type="button" className={style.trigger} onClick={() => setIsOpen(prev => !prev)}><span/></button>
			<div className={cn(style.menus)}>
				<Menu
					onClick={() => setIsOpen(false)}
					className={style.nav}
					linkClassName={style.link}
					items={navigation}
				/>
				<LanguageSelector
					onClick={() => setIsOpen(false)}
					className={style.i18n}
					linkClassName={style.link}
					items={languages}
				/>
			</div>
		</div>
	);
};

export default Hamburger;
