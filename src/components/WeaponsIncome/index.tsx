import { useState, Fragment } from 'react'
import cn from 'clsx'

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
            <a
                className={style.navLink}
                {...prev && {
                    href: `#`,
                    onClick: goto(prev)
                }}
            >
                {'← '}
            </a>
            <span className={style.period}>
                {text('income.timespan')}
            </span>
            <a
                className={style.navLink}
                {...next && {
                    href: `#`,
                    onClick: goto(next)
                }}
            >
                {' →'}
            </a>
        </div>
    </>

    let head = [
        <span className={cn(style.countryFlag, 'i-circle-flags-us')} title={text('country.us')} key="us" />,
        <Fragment key="other">
            <span className={cn(style.countryFlag, 'i-circle-flags-ca')} title={text('income.rest')} />
            <span className={cn(style.countryFlag, 'i-circle-flags-gb')} title={text('income.rest')} />
            <span className={cn(style.countryFlag, 'i-circle-flags-pl')} title={text('income.rest')} />
            <span className={style.ellipsis} title={text('income.rest')}>
                <span className="i-ion-ellipsis-horizontal-circle w-full h-full" />
            </span>
        </Fragment>,
    ]

    let description = text('income.description')

    return <WeaponsTable {...{ title, subtitle, head, data, description }} />
}
