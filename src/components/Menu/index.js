import { Match, Link } from 'preact-router/match'

import style from './style.scss'

let pages = language => [
	['Report', `/${language}/report`],
	['Letter', `/${language}/letter`],
]

export default function Menu() {
	return (
		<Match>
			{({ url }) => {
				let language = url.split('/')[1]
				return (
					<ul className={style.container}>
						{pages(language).map(([ name, href ]) =>
							<Link {...{ href, key: href }} activeClassName="active">
								{name}
							</Link>
						)}
					</ul>
				)
			}}
		</Match>
	)
}
