import style from './style.scss';

const DataCell = ({ value, delta, sources }) => (
	<div className={style.cell}>
		<span className={style.count}>{value}</span>
		{delta && <span className={style.delta}>+{delta}</span>}
		{sources && sources.length ? (
			<div className={style.popup}>
				{sources.map(source => <a className={style.source} href={source} key={source}>{source}</a>)}
			</div>
		) : null}
	</div>
);

export default DataCell;
