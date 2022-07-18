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
      <div className={style.head}><span>США</span><span /></div>
      <div className={style.head}><span>ВЕСЬ МИР</span><span /></div>

      {data.map(({ category, values: [usaValues, totalValues] }) => (
      <div className={style.row}>
        <IconCell category={category} />
        <DataCell className={style.valueCell} {...usaValues} key={`${category}-USA`} />
        <DataCell className={style.valueCell} {...totalValues} key={`${category}-total`} />
      </div>
      ))}
    </div>
  </Container>
);

export default AmmoTable;
