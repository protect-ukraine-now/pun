import style from './style.module.scss'
import Section from '../Section'
import { useLanguage, useText } from 'src/tools/language'
import { latestReport } from 'src/data/report'
import { formatDate } from 'src/tools/date'
import Vega from 'src/components/Vega'
import sankeyData from 'src/data/vega_sankey.json?init'

export default function SankeyChart() {
	const text = useText()
	const formatter = formatDate(useLanguage())
	const till = formatter(latestReport.till)
	const title = text('sankey.title', { till })
	const subtitle = text('sankey.subtitle', { till })
	return (
		<Section title={title} subtitle={subtitle} >
			<Vega id="test" spec={sankeyData} className={style.chart} />
		</Section>
	)
}