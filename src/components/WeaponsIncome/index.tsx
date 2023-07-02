import { useState, Fragment } from 'react'
import { Link } from 'rakkasjs'
import US from 'country-flag-icons/react/1x1/US'
import PL from 'country-flag-icons/react/1x1/PL'
import CA from 'country-flag-icons/react/1x1/CA'
import GB from 'country-flag-icons/react/1x1/GB'
import { IoEllipsisHorizontalCircle } from 'react-icons/io5'

import style from './style.module.scss';
import { latestReport, incomeReport, Report } from 'src/data/report'
import { useLanguage, useText } from 'src/tools/language'
import { formatDate } from 'src/tools/date'
import WeaponsTable from '../WeaponsTable'

export default function WeaponsIncome() {
    const language = useLanguage()
    const text = useText()
    const [report, setReport] = useState(latestReport)
    let goto = report => e => {
        e.preventDefault()
        setReport(Report(report))
    }
    let data = incomeReport(report)
    let { till, prev, next } = report
    const formatter = formatDate(language)
    const from = formatter('2022-02-24')
    till = formatter(till)

    let title = text('income.title', { from, till })

    let subtitle = <>
        <div className={style.subtitle}>
            {text('income.subtitle', { from, till })}
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
                {text('income.timespan')}
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
        <US className={style.countryFlag} title={text('country.us')} key="us" />,
        <Fragment key="other">
            <CA className={style.countryFlag} title={text('income.rest')} />
            <GB className={style.countryFlag} title={text('income.rest')} />
            <PL className={style.countryFlag} title={text('income.rest')} />
            <IoEllipsisHorizontalCircle className={style.ellipsis} title={text('income.rest')} />
        </Fragment>,
    ]

    let description = text('income.description')

    return <WeaponsTable {...{ title, subtitle, head, data, description }} />
}
