import balance from './balance.json'
import commits from './commits.json'
import { isoDate, DAY } from '../tools/date'

const first = '2022-07-17'
export const latest = '2023-12-17'

let timespan = 14 * DAY
export let Report = till => {
    if (!till) return
    let t = new Date(till).valueOf()
    let from = isoDate(t - timespan + DAY)
    let prev = till > first  && isoDate(t - timespan)
    let next = till < latest && isoDate(t + timespan)
    return { from, till, prev, next }
}

export let latestReport = Report(latest)!

const CATEGORIES = [
    'Towed Artillery',
    'Self-Propelled Artillery',
    'Multiple Launch Rocket System',
    // 'Guided MLRS',
    'Air Defense System',
    'Warplane',
    'Helicopter',
    'Tank',
    'Infantry Fighting Vehicle',
    // 'Other Armored Vehicle',
]

let commitsByCategory = ({ report = latestReport, filter = null } = {}) => commits.reduce((byCategory, r) => {
    let [date, country, category, model, qty, fund, link, title] = r
    qty = +qty || 0
    if (date <= report.till && (!filter || filter(r))) {
        byCategory[category] ||= [{}, {}]
        let values = byCategory[category]
        let index = country === 'US' ? 0 : 1
        let x = values[index]
        x.value = (x.value || 0) + qty
        if (date >= report.from) {
            x.delta = (x.delta || 0) + qty
            x.sources = [...(x.sources || []), { country, model, qty, link }]
        }
        values.details ||= {}
        values.details[model] ||= {}
        let details = values.details[model]
        details[country] = (details[country] || 0) + qty
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

let byCategory = commitsByCategory() // { filter: x => (x[5] || 'PDA') === 'PDA' }
export function inventoryReport() {
    return balance.map(([category, ru, ua, us]) => ({
        category,
        values: [{ value: us }, byCategory[category][0]],
    }))
}
