import style from './style.module.scss'
import Section from '../Section'
import { useLanguage, useText, useSankey } from '@tools/language'
import { latestReport } from '@data/report'
import { formatDate } from '@tools/date'
import Vega from '@components/Vega'
import spec from '@data/sankey-w-data.vg'

export default function Sankey({ children }) {
	const formatter = formatDate(useLanguage())
	const from = formatter('2022-02-24')
	let till = latestReport.till
	if (till === '2023-07-02') till = '2023-07-09'
	till = formatter(till)
	const text = useText()
	const title = text('sankey.title')
	const subtitle = text('sankey.subtitle', { from, till })
	return (
		<Section {...{ title, subtitle, description: children }} >
			<Vega spec={useSankey(spec)} className={style.chart} />
		</Section>
	)
}