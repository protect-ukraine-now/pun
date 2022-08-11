import cn from 'classnames';
import { Text, useText } from 'preact-i18n'
import { AmmoIconMap } from './maps';
import defaultIcon from '../../assets/icons/question_mark.svg';
import style from './style.scss';

const IconCell = ({ category }) => {
  const icon = AmmoIconMap[category] || defaultIcon;

  const hint = useText(`weapon_category.${category}`);

  return (
    <div className={cn(style.category, style.cell)}>
      <div className={style.icon} style={{ backgroundImage: `url("${icon}")` }} title={hint[category]} />
    </div>
  );
};

export default IconCell;
