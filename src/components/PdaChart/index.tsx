import style from './style.module.scss'
import Section from '../Section'
import { useLanguage, useText } from '@tools/language'
import { latestReport } from '@data/report'
import { formatDate } from '@tools/date'
import Vega from '@components/Vega'
import spec from '@data/pda-w-data.vg'

export default function PdaChart({ children }) {
	const formatter = formatDate(useLanguage())
	const from = formatter('2022-02-24')
	let till = latestReport.till
	if (till === '2023-07-02') till = '2023-07-09'
	till = formatter(till)
	const text = useText()
	const title = text('pda.title')
	const subtitle = text('pda.subtitle', { from, till })
	const description = text('pda.description')
	return (
		<Section {...{ title, subtitle, description: children }}>
			<Vega spec={spec} className={style.chart} />
		</Section>
	)
}