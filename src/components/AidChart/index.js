import { Text } from 'preact-i18n'
import { translate } from '../../tools/language'
// import { ComposedChart, XAxis, YAxis, Tooltip, Line, Bar, Legend } from 'recharts'
import { Chart } from "react-google-charts"

import style from './style.scss'
import money from '../../data/money.json'
import { formatDate } from '../../tools/date'
import Container from '../Container'

export default function AidChart({ language }) {
    let week = translate('aid_chart.week') || 'week'
    let cumulative = translate('aid_chart.cumulative') || 'cumulative'

    let data = [
        ['date', week, cumulative],
        ...money.reduce((a, [date, amt], i) => {
            date = formatDate(language)(date, 'd MMMM')
            amt = parseInt(amt) || 0
            let cum = (i ? a[i - 1][2]?.v : 0) + amt
            return [
                ...a,
                [
                    date.split(' ')/*.map(x => x.slice(0, 3))*/.join('\n'),
                    { v: amt, f: `$${amt.toLocaleString()}M` },
                    { v: cum, f: `$${cum.toLocaleString()}M` },
                ]
            ]
        }, [])    ]

    // console.log('AidChart', data)

    let options = {
        seriesType: "bars",
        series: { 1: { type: "line" }, },
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
            left: 100, top: 50, bottom: 100, right: 40,
            // 'width': '100%', 'height': '100%',
        },
        focusTarget: 'category',
        backgroundColor: { fill: 'transparent' },
    }

    return (
        <Container>
            <h1 className={style.heading}>
                <Text id="aid_chart.title">US Military Aid</Text>
            </h1>
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

// import { useMemo } from 'preact/hooks'
// import { Text as Translate } from 'preact-i18n'
// import { translate } from '../../tools/language'
// // import { ComposedChart, XAxis, YAxis, Tooltip, Line, Bar, Legend } from 'recharts'
// import { Chart } from 'react-charts'

// import money from '../../data/money.json'
// import { formatDate } from '../../tools/date'

// const primaryAxis = {
//     getValue: x => x.date
// }

// const secondaryAxes = [
//     {
//         getValue: x => x.week
//     }
// ]

// let data = [{
//     label: 'weekly',
//     data: [
//         { date: 'Feb 26', week: 100 },
//         { date: 'Mar 1', week: 0 },
//         { date: 'Mar 8', week: 200 },
//     ]
// }]

// export default function AidChart({ language }) {
//     let week = translate('aid_chart.week') || 'week'
//     let cumulative = translate('aid_chart.cumulative') || 'cumulative'
//     let format = language === 'en' ? 'MMMM d' : 'd MMMM'

//     // let data = useMemo(() => [{
//     //     label: week,
//     //     data: money.reduce((a, [date, amt], i) => {
//     //         amt = parseInt(amt) || 0
//     //         return [
//     //             ...a,
//     //             {
//     //                 date: formatDate(language)(date, format).replace(' ', '\n'),
//     //                 week: amt,
//     //                 cumulative: (i ? a[i - 1][cumulative] : 0) + amt
//     //             }
//     //         ]
//     //     }, []),
//     // }], [])

//     console.log('AidChart', data)

//     return (
//         <>
//             <h1><Translate id="aid_chart.title">US Military Aid ($$ millis)</Translate></h1>
//             <Chart
//                 options={{
//                     data,
//                     primaryAxis,
//                     secondaryAxes
//                 }}
//             />
//         </>
//     )
// }

// import { Text as Translate } from 'preact-i18n'
// import { translate } from '../../tools/language'
// // import { ComposedChart, XAxis, YAxis, Tooltip, Line, Bar, Legend } from 'recharts'
// import { ComposedChart } from 'recharts/es6/chart/ComposedChart'
// import { Bar } from 'recharts/es6/cartesian/Bar'
// import { Line } from 'recharts/es6/cartesian/Line'
// import { XAxis } from 'recharts/es6/cartesian/XAxis'
// import { YAxis } from 'recharts/es6/cartesian/YAxis'
// import { Tooltip } from 'recharts/es6/component/Tooltip'
// import { Legend } from 'recharts/es6/component/Legend'
// import { ResponsiveContainer } from 'recharts/es6/component/ResponsiveContainer'

// import money from '../../data/money.json'
// import { formatDate } from '../../tools/date'

// function Tick(props) {
//     // console.log('Tick', props)
//     let { x, y, stroke, payload, height } = props
//     return (
//         <text y={y} dy={16} stroke={stroke} textAnchor="middle" fontSize={height / 3}>
//             {payload.value.split('\n').map((text, i) =>
//                 <tspan x={x} dy={`${1 + 0.4 * i}em`}>{text.slice(0, 3)}</tspan>
//             )}
//         </text>
//     )
//     // return <Text {...props} width={60}>{payload.value}</Text>
// }

// export default function AidChart({ language }) {
//     let week = translate('aid_chart.week') || 'week'
//     let cumulative = translate('aid_chart.cumulative') || 'cumulative'
//     let format = language === 'en' ? 'MMMM d' : 'd MMMM'

//     let data = money.reduce((a, [date, amt], i) => {
//         amt = parseInt(amt) || 0
//         return [
//             ...a,
//             {
//                 date: formatDate(language)(date, format).replace(' ', '\n'),
//                 [week]: amt,
//                 [cumulative]: (i ? a[i - 1][cumulative] : 0) + amt
//             }
//         ]
//     }, [])

//     console.log('AidChart', data)

//     return (
//         <>
//             <h1><Translate id="aid_chart.title">US Military Aid ($$ millis)</Translate></h1>
//             <ResponsiveContainer width="100%" height="100%">
//                 <ComposedChart width={730} height={250} data={data}>
//                     <XAxis
//                         dataKey="date"
//                         interval={1}
//                         tick={<Tick />}
//                         padding={{ bottom: 30 }}
//                     />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend verticalAlign="top" />
//                     <Bar dataKey={week} barSize={20} fill="#413ea0" />
//                     <Line dataKey={cumulative} stroke="#ff7300" />
//                 </ComposedChart>
//             </ResponsiveContainer>
//         </>
//     )
// }

// import { Text as Translate } from 'preact-i18n'
// import { translate } from '../../tools/language'
// import { VictoryChart, VictoryLabel, VictoryBar, VictoryLine, VictoryAxis, VictoryTooltip, VictoryTheme } from 'victory'

// import './index.css'
// import money from '../../data/money.json'
// import { formatDate } from '../../tools/date'

// export default function AidChart({ language }) {
//     let week = translate('aid_chart.week') || 'week'
//     let cumulative = translate('aid_chart.cumulative') || 'cumulative'
//     let format = language === 'en' ? 'MMMM d' : 'd MMMM'

//     let data = money.reduce((a, [date, amt], i) => {
//         amt = parseInt(amt) || 0
//         return [
//             ...a,
//             {
//                 date: formatDate(language)(date, format),
//                 [week]: amt,
//                 [cumulative]: (i ? a[i - 1][cumulative] : 0) + amt
//             }
//         ]
//     }, [])

//     console.log('AidChart', data)

//     return (
//         <>
//             <h1><Translate id="aid_chart.title">US Military Aid ($$ millis)</Translate></h1>
//             <VictoryChart
//                 width={800} height={350}
//                 theme={VictoryTheme.material}
//             >
//                 <VictoryBar
//                     data={data} x="date" y={week}
//                     labels={({ datum }) => datum[week]}
//                     labelComponent={<VictoryTooltip />}
//                 />
//                 <VictoryLine data={data} x="date" y={cumulative} />
//                 <VictoryAxis
//                     tickFormat={x => x.split(' ').map(x => x.slice(0, 3)).join('\n')}
//                 />
//                 <VictoryAxis dependentAxis />
//             </VictoryChart>
//         </>
//     )
// }