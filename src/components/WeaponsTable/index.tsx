import cn from 'clsx'
import Markdown from 'markdown-to-jsx'

import style from './style.module.scss'
import Article from 'src/components/Article'
import IconCell from './IconCell'
import DataCell from './DataCell'
import Section from '../Section'

const WeaponsTable = ({ title, subtitle, head, data, description }) => {
	const left = data.slice(0, data.length / 2)
	const right = data.slice(-data.length / 2)

	const headLayout = (
		<div className={cn(style.row, style.headRow)}>
			<div className={style.head}/>
			{head.map((x, i) => <div className={style.head} key={i}>{x}</div>)}
		</div>
	)

	const rowsRenderer = ({ category, values }, ix) => (
		<div className={style.row} key={ix}>
			<IconCell category={category}/>
			{values.map((x, i) =>
				<DataCell className={style.valueCell} {...x} key={i} />
			)}
		</div>
	)

	const renderTableLayout = (tableData, ix) => (
		<div className={style.table} key={ix}>
			{headLayout}
			{tableData.map(rowsRenderer)}
		</div>
	)

	return (
		<Section title={title} subtitle={subtitle} className={style.container}>
			<div className={style.splitter}>
				{[left, right].map(renderTableLayout)}
			</div>
			{description &&
				<div className={style.description}>
					<Article>
						<Markdown>
							{description}
						</Markdown>
					</Article>
				</div>
			}
		</Section>
	)
}

export default WeaponsTable
