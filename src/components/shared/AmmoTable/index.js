import format from 'date-fns/format';
import style from './style.scss';
import IconCell from './IconCell';
import DataCell from './DataCell';
import Container from '../Container';

const AmmoTable = ({ data, date }) => (
  <Container className={style.container}>
    <h1 className={style.heading}>ТЯЖЕЛОЕ ВООРУЖЕНИЕ ПО СОСТОЯНИЮ НА {format(new Date(date), 'd MMMM yyyy ГОДА')}</h1>
    <div className={style.table}>
      <div className={style.head} />
      <div className={style.head}>США</div>
      <div className={style.head}>ВЕСЬ МИР</div>
      {data.map(({ category, values: [usaValues, totalValues] }) => [
        <IconCell category={category} />,
        <DataCell {...usaValues} key={`${category}-USA`} />,
        <DataCell {...totalValues} key={`${category}-total`} />,
      ])}
    </div>
  </Container>
);

export default AmmoTable;
