import cn from 'clsx'

import style from './style.module.scss'
import { useLanguage, useText } from '@tools/language'
import { balanceReport } from '@data/report'
import { formatDate } from '@tools/date'
import WeaponsTable from '../WeaponsTable'
import { Fragment } from 'preact'

let data = balanceReport()

function Details({ byModel }) {
	return <>
		{byModel.map(({ model, ru, ua }, i) =>
			<Fragment key={i}>
				<div className="py-1">
					<a
						className="decoration-none"
						href={`https://www.google.com/search?q=${model}`}
						target="_blank"
						rel="noreferrer"
					>
						{model}
					</a>
				</div>
				<div className="text-center py-1">
					{ru}
				</div>
				<div className="text-center py-1">
					{ua}
				</div>
			</Fragment>
		)}
	</>
}

export default function WeaponsBalance({ children }) {
	const language = useLanguage()
	const text = useText()
	const formatter = formatDate(language)
	let till = formatter('2022-02-24')
	let title = text('balance.title', { till })
	let subtitle = text('balance.subtitle', { till })

	let head = [
		<span className={cn(style.countryFlag, 'i-circle-flags-ru')} title={text('country.ru')} key="ru" />,
		<span className={cn(style.countryFlag, 'i-circle-flags-ua')} title={text('country.ua')} key="ua" />,
	]

	return <WeaponsTable {...{ title, subtitle, head, data, description: children, Details }} />
}
