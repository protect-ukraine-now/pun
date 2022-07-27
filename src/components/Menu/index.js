import cn from 'classnames';
import { Match, Link } from 'preact-router/match';

import style from './style.scss';

export default function Menu({ items }) {
	return (
		<Match>
			{({ url }) => {
				let language = url.split('/')[1];
				return (
					<div className={style.container}>
						{items(language).map(([name, href]) =>
							<Match path={href}>
								{({ matches }) => (matches ? <span className={cn(style.link, style.active)}>{name}</span> :
									<Link {...{ href, key: href }} className={style.link} activeClassName={style.active}>
										{name}
									</Link>)}
							</Match>
						)}
					</div>
				);
			}}
		</Match>
	);
}
