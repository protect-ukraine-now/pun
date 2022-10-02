import cn from 'classnames';

import style from './style.scss';
import IconCell from './IconCell';
import DataCell from './DataCell';
import Container from '../Container';

const WeaponsTable = ({ title, subtitle, head, data, decription }) => {
	const left = data.slice(0, data.length / 2);
	const right = data.slice(-data.length / 2);

	const headLayout = (
		<div className={cn(style.row, style.headRow)}>
			<div className={style.head}/>
			{head.map((x, i) => <div className={style.head} key={i}>{x}</div>)}
		</div>
	);

	const rowsRenderer = ({ category, values }) => (
		<div className={style.row}>
			<IconCell category={category}/>
			{values.map((x, i) =>
				<DataCell className={style.valueCell} {...x} key={i} />
			)}
		</div>
	);

	const renderTableLayout = tableData => (
		<div className={style.table}>
			{headLayout}
			{tableData.map(rowsRenderer)}
		</div>
	);

	return (
		<Container>
			<h1 className={style.heading}>
				{title}
				<div className={style.subHeading}>{subtitle}</div>
			</h1>
			<div className={style.splitter}>
				{[left, right].map(renderTableLayout)}
			</div>
			<p className={style.description}>{decription}</p>
		</Container>
	);
};

export default WeaponsTable;
