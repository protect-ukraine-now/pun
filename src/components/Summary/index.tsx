import money from '@data/money.json'
import { useLanguage, useText } from '@tools/language'
import { latest } from '@data/report'
import { dateFormatter } from '@tools/date'
import Section from '../Section/Section'

const population = 334565848

export default function Summary() {
	const language = useLanguage()
	const text = useText()
	const from = new Date('2022-02-24')
	const till = new Date(latest)
	const months = (till - from) / (30 * 24 * 60 * 60e3)

	const sum = money.reduce(
		(a, [date, pda, usai, fmf]) => ({
			short: (a.short || 0) + (+pda || 0),
			long: (a.long || 0) + (+usai || 0) + (+fmf || 0),
		}),
		{}
	)
	sum.short -= 6200
	const dates = {
		from: dateFormatter(language)(from),
		till: dateFormatter(language)(till),
	}
	const data = {
		short: (sum.short / 1e3).toFixed(1),
		shortPer: Math.round(sum.short * 1e6 / months / population),
		long: (sum.long / 1e3).toFixed(1),
		longPer: Math.round(sum.long * 1e6 / months / population),
	}

	const title = text('summary.title')
	const subtitle = text('summary.subtitle', dates)
	const description = text('summary.content', data)
	return <Section {...{ title, subtitle, description }} />
}
