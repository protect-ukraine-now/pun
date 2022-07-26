import cn from 'classnames';
import { Text } from 'preact-i18n'
import { AmmoIconMap } from './maps';
import defaultIcon from '../../assets/icons/question_mark.svg';
import style from './style.scss';

const IconCell = ({ category }) => {
  const icon = AmmoIconMap[category] || defaultIcon;

  return (
    <div className={cn(style.category, style.cell)}>
      <div className={style.icon} style={{ backgroundImage: `url("${icon}")` }} />
      <div className={style.label}>
        <Text id={`weapon_category.` + category}>{category}</Text>
      </div>
    </div>
  );
};

export default IconCell;
