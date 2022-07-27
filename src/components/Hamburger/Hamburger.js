import cn from 'classnames';
import style from './style.scss';
import Menu from '../Menu';
import { useState } from 'preact/hooks';
import LanguageSelector from '../LanguageSelector';
import useNoScroll from '../../hooks/useNoScroll';

const Hamburger = ({ languages, navigaition, className }) => {
	const [isOpen, setIsOpen] = useState(false);

	useNoScroll(isOpen);

	return (
		<div className={cn(className, style.container, {[style.isOpen]: isOpen})}>
			<button type="button" className={style.trigger} onClick={() => setIsOpen(prev => !prev)}><span/></button>
			{isOpen && <div className={style.menus}>
				<Menu items={navigaition}/>
				<LanguageSelector items={languages}/>
			</div>}
		</div>
	);
};

export default Hamburger;
