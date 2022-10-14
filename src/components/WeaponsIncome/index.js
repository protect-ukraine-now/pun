import { useState, useMemo } from 'preact/hooks'
import { Link } from 'preact-router'
import { Text } from 'preact-i18n'
import US from 'country-flag-icons/react/1x1/US'
import PL from 'country-flag-icons/react/1x1/PL'
import CA from 'country-flag-icons/react/1x1/CA'
import GB from 'country-flag-icons/react/1x1/GB'
import { IoEllipsisHorizontalCircle } from 'react-icons/io5'

import style from './style.scss';
import { latestReport, incomeReport, Report } from '../../data/report'
import { formatDate } from '../../tools/date'
import { translate } from '../../tools/language'
import WeaponsTable from '../WeaponsTable'

export default function WeaponsIncome({ language, className }) {
    const [report, setReport] = useState(latestReport)
    let goto = report => e => {
        e.preventDefault()
        setReport(Report(report))
    }
    let data = useMemo(() => incomeReport(report), [report])
    let { from, till, prev, next } = report
    const formatter = formatDate(language)
    from = formatter(from)
    till = formatter(till)

    let title = (
        <Text id="income.title" fields={{ from, till }}>
            Weapons committed to Ukraine
        </Text>
    )

    let subtitle = <>
        <div className={style.subtitle}>
            <Text id="income.subtitle" fields={{ from, till }}>
                as of {till}
            </Text>
        </div>
        <div className={style.nav}>
            <Link
                className={style.navLink}
                {...prev && {
                    href: `#`,
                    onClick: goto(prev)
                }}
            >
                {'← '}
            </Link>
            <span className={style.period}>
                <Text id="income.timespan">2 weeks</Text>
            </span>
            <Link
                className={style.navLink}
                {...next && {
                    href: `#`,
                    onClick: goto(next)
                }}
            >
                {' →'}
            </Link>
        </div>
    </>

    let head = [
        <US className={style.countryFlag} title={translate('country.us')} />,
        <>
            <CA className={style.countryFlag} title={translate('income.rest')} />
            <GB className={style.countryFlag} title={translate('income.rest')} />
            <PL className={style.countryFlag} title={translate('income.rest')} />
            <IoEllipsisHorizontalCircle className={style.ellipsis} title={translate('income.rest')} />
        </>,
    ]

    let description = <Text id="income.description" />

    return <WeaponsTable {...{ title, subtitle, head, data, description, className }} />
}
