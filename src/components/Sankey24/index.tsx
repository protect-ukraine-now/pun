import style from './style.module.scss'
import Section from '../Section'
import { useLanguage, useText, useSankey } from '@tools/language'
import { latestReport } from '@data/report'
import { formatDate } from '@tools/date'
import Vega from '@components/Vega'
import spec from '@data/sankey24-w-data.vg'

export default function Sankey24({ children }) {
	const formatter = formatDate(useLanguage())
	const from = formatter('2024-04-24')
	const text = useText()
	const title = text('sankey24.title')
	const subtitle = text('sankey24.subtitle', { from })
	return (
		<Section {...{ title, subtitle, description: children }} >
			<Vega spec={useSankey(spec)} className={style.chart} />
		</Section>
	)
}