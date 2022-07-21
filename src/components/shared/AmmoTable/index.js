import { Text } from 'preact-i18n'
import cn from 'classnames'
import style from './style.scss';
import IconCell from './IconCell';
import DataCell from './DataCell';
import Container from '../Container';

const AmmoTable = ({ data, date: asOf }) => {
  let date = new Date(asOf).toDateString()
  return (
    <Container className={style.container}>
      <h1 className={style.heading}>
        <Text id="report.title" fields={{ date }}>
          Heavy weapons committed to Ukraine as of {date}
        </Text>
      </h1>
      <div className={style.table}>
        <div className={style.head} />
        <div className={style.head}>
          <Text id="report.usa">USA</Text>
        </div>
        <div className={style.head}>
          <Text id="report.rest">Other Countries</Text>
        </div>
        <div className={cn(style.head, style.russia)}>
          <Text id="report.russia">Russia has</Text>
        </div>

        {data.map(({ category, values: [usaValues, restValues, russiaValues] }) => (
          <div className={style.row}>
            <IconCell category={category} />
            <DataCell className={style.valueCell} {...usaValues} key={`${category}-USA`} />
            <DataCell className={style.valueCell} {...restValues} key={`${category}-rest`} />
            <DataCell className={cn(style.valueCell, style.russia)} {...russiaValues} key={`${category}-russia`} />
          </div>
        ))}
      </div>
    </Container>
  )
}

export default AmmoTable;
