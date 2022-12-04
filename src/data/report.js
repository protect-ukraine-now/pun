import balance from './balance.json'
import commits from './commits.json'
import { isoDate, DAY } from '../tools/date'

let first = '2022-07-17'
let latest = '2022-12-04'

let timespan = 14 * DAY
export let Report = till => {
    if (!till) return
    let t = new Date(till).valueOf()
    let from = isoDate(t - timespan + DAY)
    let prev = till > first  && isoDate(t - timespan)
    let next = till < latest && isoDate(t + timespan)
    return { from, till, prev, next }
}

export let latestReport = Report(latest)

const CATEGORIES = [
    'Towed Artillery',
    'Self-Propelled Artillery',
    'Multiple Launch Rocket System',
    'Guided MLRS',
    'Air Defense System',
    'Warplane',
    'Helicopter',
    'Tank',
    'Infantry Fighting Vehicle',
    'Other Armored Vehicle',
]

let commitsByCategory = ({ report = latestReport, filter }) => commits.reduce((byCategory, r) => {
    let [date, country, category, type, qty, fund, link, title] = r
    if (date <= report.till && (!filter || filter(r))) {
        let values = byCategory[category] || [{}, {}]
        byCategory[category] = values
        let index = country === 'US' ? 0 : 1
        let x = values[index]
        x.value = (x.value || 0) + +qty
        if (date >= report.from) {
            x.delta = (x.delta || 0) + +qty
            x.sources = { ...(x.sources || {}), [link]: title }
        }
    }
    return byCategory
}, {})

export function balanceReport() {
    return balance.map(([category, ru, ua]) => ({
        category,
        values: [{ value: ru }, { value: ua }],
    }))
}

export function incomeReport(report) {
    let byCategory = commitsByCategory({ report })
    return CATEGORIES.map(category => ({
        category,
        values: byCategory[category],
    }))
}

export function inventoryReport() {
    let byCategory = commitsByCategory({ filter: x => !x[5] }) // fund == PDA
    return balance.map(([category, ru, ua, us]) => ({
        category,
        values: [{ value: us }, byCategory[category][0]],
    }))
}
