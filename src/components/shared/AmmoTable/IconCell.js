import cn from 'classnames';
import { AmmoIconMap, AmmoLabelMap } from './maps';
import defaultIcon from '../../../assets/icons/question_mark.svg';
import style from './style.scss';


const IconCell = ({ category }) => {
	const icon = AmmoIconMap[category] || defaultIcon;
	const label = AmmoLabelMap[category] || '';

	return (
		<div className={cn(style.category, style.cell)}>
			<div className={style.icon} style={{ backgroundImage: `url("${icon}")` }} />
			<div className={style.label}>{label}</div>
		</div>
	);
};

export default IconCell;
