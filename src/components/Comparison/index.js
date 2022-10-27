import { useCallback, useMemo } from 'preact/hooks';
import { Link } from 'preact-router';
import { Text } from 'preact-i18n';
import cn from 'classnames';

import style from './style.scss';
import IconCell from './IconCell';
import DataCell from './DataCell';
import Container from '../Container';
import { useLanguage } from '../../tools/language';
import { formatDate } from '../../tools/date';

const approximateNumber = n => (
    parseFloat(n)
        ? '>' + (Math.floor(parseFloat(n) / 1e3) * 1e3).toLocaleString()
        : n
);

export default function Comparison(props) {
    // console.log('Dashboard', props)
    const language = useLanguage();

    const formatter = formatDate(language);

    let { from, till, prev, next, data } = props;
    from = formatter(from);
    till = formatter(till);

    const left = data.slice(0, data.length / 2);
    const right = data.slice(-data.length / 2);

    const headLayout = useMemo(() => {
        return (
            <div className={cn(style.row, style.headRow)}>
                <div className={style.head} />
                <div className={style.head}>
                    <Text id="comparison.ukraine">Ukraine had</Text>
                </div>
                <div className={style.head}>
                    <Text id="comparison.committed">Committed to Ukraine</Text>
                </div>
                <div className={style.head}>
                    <Text id="comparison.russia">Russia had</Text>
                </div>
            </div>
        );
    }, []);

    const rowsRenderer = useCallback(({ category, values: [usa, rest, russia] }) => (
        <div className={style.row}>
            <IconCell category={category} />
            <DataCell className={style.valueCell} {...usa} key={`${category}-USA`} />
            <DataCell className={style.valueCell} {...rest} key={`${category}-rest`} />
            <DataCell className={cn(style.valueCell, style.russia)} {...{ value: approximateNumber(russia.value) }}
                key={`${category}-russia`} />
        </div>
    ), []);

    const renderTableLayout = useCallback((tableData) => (
        <div className={style.table}>
            {headLayout}
            {tableData && tableData.length ? tableData.map(rowsRenderer) : null}
        </div>
    ), [headLayout, rowsRenderer]);

    return (
        <Container>
            <h2 className={style.heading}>
                <Text id="report.title" fields={{ from, till }}>
                    Weapons committed to Ukraine
                </Text>
                <div className={style.subHeading}>
                    <div className={style.subtitle}>
                        <Text id="report.subtitle" fields={{ from, till }}>
                            as of {till}
                        </Text>
                    </div>
                    <div className={style.nav}>
                        <Link
                            className={style.navLink}
                            {...prev && { href: `/${language}/report/${prev}` }}
                        >
                            {'← '}
                        </Link>
                        <Text id="report.timespan">2 weeks</Text>
                        <Link
                            className={style.navLink}
                            {...next && { href: `/${language}/report/${next}` }}
                        >
                            {' →'}
                        </Link>
                    </div>
                </div>
            </h2>

            <div className={style.splitter}>
                {[left, right].map(renderTableLayout)}
            </div>
        </Container>
    );
}
