import { useState, Fragment } from 'react'
import cn from 'clsx'

import style from './style.module.scss';
import countries from 'src/data/countries.json'
import { latestReport, incomeReport, Report } from 'src/data/report'
import { useLanguage, useText } from 'src/tools/language'
import { formatDate } from 'src/tools/date'
import WeaponsTable from '../WeaponsTable'

function Details({ byModel }) {
	return <>
		{byModel.map(({ model, byCountry }, i) =>
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
				<div className="col-span-2 py-1">
					{byCountry.map(({ country, qty }, i) =>
						<span key={i} title={countries[country]}>
							<span className={`i-circle-flags-${country} border-gray border-1 border-solid border-rounded-full`} />
							{' '}<span className="pr-2">{qty}</span>
						</span>
					)}
				</div>
			</Fragment>
		)}
	</>
}

export default function WeaponsIncome() {
	const language = useLanguage()
	const text = useText()
	const [report, setReport] = useState(latestReport)
	let goto = report => e => {
		e.preventDefault()
		setReport(Report(report))
	}
	let data = incomeReport(report)
	let { till, prev, next } = report
	const formatter = formatDate(language)
	const from = formatter('2022-02-24')
	till = formatter(till)

	let title = text('income.title', { from, till })

	let subtitle = <>
		<div className={style.subtitle}>
			{text('income.subtitle', { from, till })}
		</div>
		<div className={style.nav}>
			<a
				className={style.navLink}
				{...prev && {
					href: `#`,
					onClick: goto(prev)
				}}
			>
				{'← '}
			</a>
			<span className={style.period}>
				{text('income.timespan')}
			</span>
			<a
				className={style.navLink}
				{...next && {
					href: `#`,
					onClick: goto(next)
				}}
			>
				{' →'}
			</a>
		</div>
	</>

	let head = [
		<span className={cn(style.countryFlag, 'i-circle-flags-us')} title={text('country.us')} key="us" />,
		<Fragment key="other">
			<span className={cn(style.countryFlag, 'i-circle-flags-no')} title={text('income.rest')} />
			<span className={cn(style.countryFlag, 'i-circle-flags-gb')} title={text('income.rest')} />
			<span className={cn(style.countryFlag, 'i-circle-flags-de')} title={text('income.rest')} />
			<span className={style.ellipsis} title={text('income.rest')}>
				<span className="i-ion-ellipsis-horizontal-circle w-full h-full" />
			</span>
		</Fragment>,
	]

	let description = text('income.description')

	return <WeaponsTable {...{ title, subtitle, head, data, description, Details }} />
}
