import { Match, Link } from 'preact-router/match'
import cn from 'classnames';
import { LANGUAGES } from '../../constants/language';

import style from './style.scss';

const Index = ({ className }) => (
	<Match>
		{({ url }) => (
			<ul className={cn(className, style.container)}>
				{LANGUAGES.map(({ label, value }) => {
					let a = url.split('/')
					a[1] = value
					let href = a.join('/')
					return (
						<Link {...{ href, key: href }} activeClassName="active">
							{label}
						</Link>
					)
				}
				)}
			</ul>
		)}
	</Match>
);

export default Index;
