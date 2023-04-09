import { useMemo } from 'preact/hooks'
import { Text } from 'preact-i18n'
import { translate } from '../../tools/language'
import { Chart } from "react-google-charts"

import style from './style.scss'
import { useLanguage } from '../../tools/language'
import money from '../../data/money.json'
import { formatDate } from '../../tools/date'
import Container from '../Container'

export default function AidChart() {
    const language = useLanguage()

    const data = useMemo(() => {
        const pda = translate('aid_chart.pda') || 'PDA'
        const usai = translate('aid_chart.usai') || 'USAI'
        const fmf = translate('aid_chart.fmf') || 'FMF'

        return [
            ['date', pda, usai, fmf],
            ...money.map(([date, pda, usai, fmf]) => {
                date = formatDate(language)(date, 'd MMMM')
                pda = parseInt(pda) || 0
                usai = parseInt(usai) || 0
                fmf = parseInt(fmf) || 0
                return [
                    date.split(' ').join('\n'),
                    { v: pda, f: pda ? `\xA0$${pda.toLocaleString()}M` : '\xA00' },
                    { v: usai, f: usai ? `$${usai.toLocaleString()}M` : '0' },
                    { v: fmf, f: fmf ? `$${fmf.toLocaleString()}M` : '0' },
                ]
            })
        ]
    }, [language])

    // console.log('AidChart', data)

    const options = {
        seriesType: "bars",
        isStacked: true,
        // series: { 1: { type: "line" }, },
        // trendlines: { 0: {}, 1: {}, },
        // title: translate('aid_chart.title'),
        titlePosition: 'in',
        legend: { position: 'bottom' },
        axisTitlesPosition: 'in',
        hAxis: {
            // title: "Week",
            slantedText: false,
            maxAlternation: 1,
            // maxTextLines: 2,
            // textPosition: 'in',
        },
        vAxis: {
            title: translate('aid_chart.measure'),
            // textPosition: 'in',
            // format: '$#M'
        },
        chartArea: {
            left: 100, top: 40, bottom: 100, right: 40,
            // 'width': '100%', 'height': '100%',
        },
        focusTarget: 'category',
        backgroundColor: { fill: 'transparent' },
    }

    return (
        <Container>
            <h2 className={style.heading}>
                <Text id="aid_chart.title">US Military Aid</Text>
            </h2>
            <Chart
                chartType="ComboChart"
                width="100%"
                height="500px"
                data={data}
                options={options}
            />
        </Container>
    )
}
