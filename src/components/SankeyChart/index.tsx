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
	const from = formatter('2022-02-24')
	const till = formatter(latestReport.till)
	const title = text('sankey.title')
	const subtitle = text('sankey.subtitle', { from, till })
	const description = text('sankey.description')
	const spec = useLanguage() === 'uk' ? sankeySpecUk : sankeySpecEn
	return (
		<Section {...{ title, subtitle, description }} >
			<Vega id="test" spec={spec} className={style.chart} />
		</Section>
	)
}