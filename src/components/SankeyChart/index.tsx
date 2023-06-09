import style from './style.module.scss'
import Section from '../Section'
import { useLanguage, useText } from 'src/tools/language'
import { latestReport } from 'src/data/report'
import { formatDate } from 'src/tools/date'
import Vega from 'src/components/Vega'
import sankeySpecEn from 'src/data/sankey-w-data.en.vg.json?init'
import sankeySpecUk from 'src/data/sankey-w-data.uk.vg.json?init'

export default function SankeyChart() {
	const text = useText()
	const formatter = formatDate(useLanguage())
	const till = formatter(latestReport.till)
	const title = text('sankey.title', { till })
	const subtitle = text('sankey.subtitle', { till })
	const spec = useLanguage() === 'uk' ? sankeySpecUk : sankeySpecEn
	return (
		<Section title={title} subtitle={subtitle} >
			<Vega id="test" spec={spec} className={style.chart} />
		</Section>
	)
}