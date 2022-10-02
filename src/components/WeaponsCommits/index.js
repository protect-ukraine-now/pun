import { useState, useMemo } from 'preact/hooks'
import { Link } from 'preact-router'
import { Text } from 'preact-i18n'
import US from 'country-flag-icons/react/1x1/US'
import PL from 'country-flag-icons/react/1x1/PL'
import CA from 'country-flag-icons/react/1x1/CA'
import GB from 'country-flag-icons/react/1x1/GB'
import { IoEllipsisHorizontalCircle } from 'react-icons/io5'

import style from './style.scss';
import { latestReport, commitsReport, Report } from '../../data/report'
import { formatDate } from '../../tools/date'
import { translate } from '../../tools/language'
import WeaponsTable from '../WeaponsTable'

export default function WeaponsCommits({ language }) {
    const [report, setReport] = useState(latestReport)
    let data = useMemo(() => commitsReport(report), [report])
    let { from, till, prev, next } = report
    const formatter = formatDate(language)
    from = formatter(from)
    till = formatter(till)

    let title = (
        <Text id="report.title" fields={{ from, till }}>
            Weapons committed to Ukraine
        </Text>
    )

    let subtitle = <>
        <div className={style.subtitle}>
            <Text id="report.subtitle" fields={{ from, till }}>
                as of {till}
            </Text>
        </div>
        <div className={style.nav}>
            <Link
                className={style.navLink}
                {...prev && {
                    href: `#`,
                    onClick: () => setReport(Report(prev))
                }}
            >
                {'← '}
            </Link>
            <span className={style.period}>
                <Text id="report.timespan">2 weeks</Text>
            </span>
            <Link
                className={style.navLink}
                {...next && {
                    href: `#`,
                    onClick: () => setReport(Report(next))
                }}
            >
                {' →'}
            </Link>
        </div>
    </>

    let head = [
        <US className={style.countryFlag} title={translate('country.us')} />,
        <>
            <CA className={style.countryFlag} title={translate('report.rest')} />
            <GB className={style.countryFlag} title={translate('report.rest')} />
            <PL className={style.countryFlag} title={translate('report.rest')} />
            <IoEllipsisHorizontalCircle className={style.ellipsis} title={translate('report.rest')} />
        </>,
    ]

    let description = <Text id="report.description" />

    return <WeaponsTable {...{ title, subtitle, head, data, description }} />
}