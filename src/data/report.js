import commits from './commits.json'
import russia from './russia.json'

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

export default function report({ from, till }) {
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
