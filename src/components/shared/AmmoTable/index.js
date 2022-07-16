import style from './style.scss';
import IconCell from './IconCell';
import DataCell from './DataCell';
import Container from '../Container';

const AmmoTable = ({ data }) => (
	<Container className={style.container}>
		<div className={style.head} />
		<div className={style.head}>США</div>
		<div className={style.head}>ВЕСЬ МИР</div>
		{data.map(({ category, values: [usaValues, totalValues] }) => [
			<IconCell category={category} />,
			<DataCell {...usaValues} key={`${category}-USA`} />,
			<DataCell {...totalValues} key={`${category}-total`} />
		])}

	</Container>
);

export default AmmoTable;
