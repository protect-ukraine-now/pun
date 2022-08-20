import { Text as Translate } from 'preact-i18n'
import { translate } from '../../tools/language'
// import { VictoryChart, VictoryLabel, VictoryBar, VictoryLine, VictoryAxis } from 'victory'
// import { ComposedChart, XAxis, YAxis, Tooltip, Line, Bar, Legend } from 'recharts'
import { ComposedChart } from 'recharts/es6/chart/ComposedChart'
import { Bar } from 'recharts/es6/cartesian/Bar'
import { Line } from 'recharts/es6/cartesian/Line'
import { XAxis } from 'recharts/es6/cartesian/XAxis'
import { YAxis } from 'recharts/es6/cartesian/YAxis'
import { Tooltip } from 'recharts/es6/component/Tooltip'
import { Legend } from 'recharts/es6/component/Legend'
import { ResponsiveContainer } from 'recharts/es6/component/ResponsiveContainer'

import money from '../../data/money.json'
import { formatDate } from '../../tools/date'

function Tick(props) {
    // console.log('Tick', props)
    let { x, y, stroke, payload, height } = props
    return (
        <text y={y} dy={16} stroke={stroke} textAnchor="middle" fontSize={height / 3}>
            {payload.value.split('\n').map((text, i) =>
                <tspan x={x} dy={`${1 + 0.4 * i}em`}>{text.slice(0, 3)}</tspan>
            )}
        </text>
    )
    // return <Text {...props} width={60}>{payload.value}</Text>
}

export default function AidChart({ language }) {
    let week = translate('aid_chart.week') || 'week'
    let cumulative = translate('aid_chart.cumulative') || 'cumulative'
    let format = language === 'en' ? 'MMMM d' : 'd MMMM'

    let data = money.reduce((a, [date, amt], i) => {
        amt = parseInt(amt) || 0
        return [
            ...a,
            {
                date: formatDate(language)(date, format).replace(' ', '\n'),
                [week]: amt,
                [cumulative]: (i ? a[i - 1][cumulative] : 0) + amt
            }
        ]
    }, [])

    console.log('AidChart', data)

    return (
        <>
            <h1><Translate id="aid_chart.title">US Military Aid ($$ millis)</Translate></h1>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart width={730} height={250} data={data}>
                    <XAxis
                        dataKey="date"
                        interval={1}
                        tick={<Tick />}
                        padding={{ bottom: 30 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Bar dataKey={week} barSize={20} fill="#413ea0" />
                    <Line dataKey={cumulative} stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
            {/* <VictoryChart>
                <VictoryBar data={weekly} />
                <VictoryLine data={cumulativeulative} />
                <VictoryAxis
                    tickFormat={date => formatDate(language)(date, format)}
                />
                <VictoryAxis dependentAxis />
            </VictoryChart> */}
        </>
    )
}
