import cn from 'classnames';
import { LANGUAGES } from '../../../constants/shared';

import style from './style.scss';

const Index = ({ className, value, onChange }) => (
	<ul className={cn(className, style.container)}>
		{LANGUAGES.map(({ label, value: optionValue }) => {
			const isActive = value === optionValue;
			return (
				<li className={cn(style.option, { [style.active]: isActive })} key={optionValue}
					// eslint-disable-next-line react/jsx-no-bind
					onClick={() => !isActive ? onChange(optionValue) : undefined}
				>
					{label}
				</li>
			);
		})}
	</ul>
);

export default Index;
