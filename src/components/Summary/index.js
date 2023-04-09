import Markdown from 'markdown-to-jsx'
import { useMemo } from 'preact/hooks'

import style from './style.scss'
import money from '../../data/money.json'
import { useLanguage } from '../../tools/language'
import { latest } from '../../data/report'
import { formatDate } from '../../tools/date'
import Container from '../Container'
import Article from '../Article'
import { translate } from '../../tools/language'

const population = 334565848

export default function Summary() {
	const language = useLanguage()
	const from = new Date('2022-02-24')
	const till = new Date(latest)
	const months = (till - from) / (30 * 24 * 60 * 60e3)

	const fields = useMemo(() => {
		const sum = money.reduce(
			(a, [date, pda, usai, fmf]) => ({
				short: (a.short || 0) + (+pda || 0),
				long: (a.long || 0) + (+usai || 0) + (+fmf || 0),
			}),
			{}
		)
		return {
			from: formatDate(language)(from),
			short: (sum.short / 1e3).toFixed(1),
			shortPer: Math.round(sum.short * 1e6 / months / population),
			long: (sum.long / 1e3).toFixed(1),
			longPer: Math.round(sum.long * 1e6 / months / population),
		}
	}, [language])

	return (
		<Container>
			<h2 className={style.heading}>
				{translate('summary.title')}
			</h2>
			<Article className={style.content}>
				<Markdown>
					{translate('summary.content', fields)}
				</Markdown>
			</Article>
		</Container>
	)
}
