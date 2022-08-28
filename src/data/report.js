import commits from './commits.json'
import russia from './russia.json'
import { isoDate, DAY } from '../tools/date'

let first = '2022-07-17'
let latest = '2022-08-28'

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

export function prepareReport({ from, till }) {
    let byCategory = commits.slice(1).reduce((byCategory, r) => {
        let [date, country, category, type, qty, link, title] = r
        if (date <= till) {
            let values = byCategory[category] || [{}, {}, { value: russia[category] || '?' }]
            byCategory[category] = values
            // let indicies = country === 'US' ? [0, 1] : [1]
            let indicies = country === 'US' ? [0] : [1]
            indicies.forEach(index => {
                let x = values[index]
                x.value = (x.value || 0) + +qty
                if (date >= from) {
                    x.delta = (x.delta || 0) + +qty
                    x.sources = [...(x.sources || []), { link, title }]
                }
            })
        }
        return byCategory
    }, {})

    return CATEGORIES.map(category => ({
        category,
        values: byCategory[category],
    }))
}
