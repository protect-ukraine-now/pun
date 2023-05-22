import UA from 'country-flag-icons/react/1x1/UA'
import RU from 'country-flag-icons/react/1x1/RU'

import style from './style.module.scss'
import { useLanguage, useText } from 'src/tools/language'
import { balanceReport } from 'src/data/report'
import { formatDate } from 'src/tools/date'
import WeaponsTable from '../WeaponsTable'

let data = balanceReport()

export default function WeaponsCommitments({ className }) {
	const language = useLanguage()
	const text = useText()
	const formatter = formatDate(language)
	let till = formatter('2022-02-24')

	let title = text('balance.title', { till })

	let subtitle = (
		<div className={style.subtitle}>
			{text('balance.subtitle', { till })}
		</div>
	)

	let head = [
		<RU className={style.countryFlag} title={text('country.ru')} key="ru" />,
		<UA className={style.countryFlag} title={text('country.ua')} key="ua" />,
	]

	let description = text('balance.description')

	return <WeaponsTable {...{ title, subtitle, head, data, description, className }} />
}
