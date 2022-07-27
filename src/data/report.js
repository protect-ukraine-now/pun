const CATEGORIES = [
    'Towed Artillery',
    'Self-Propelled Artillery',
    'Multiple Launch Rocket System',
    'Guided MLRS',
    'Self-Propelled Anti-Aircraft Weapon',
    'Surface-to-Air Missile System',
    'Helicopter',
    'Aircraft',
    'Tank',
    'Infantry Fighting Vehicle',
    'Armored Personnel Carrier',
    // 'Mine-Resistant Ambush Protected',
    // 'Vessel',
]

function report({ commits, russia }, { from, till }) {
    let byCategory = commits.slice(1).reduce((accumulator, r) => {
        let [date, author, reviewer, status, country, category, type, qty, qty2, notes, link, title] = r
        if (category === 'Mine-Resistant Ambush Protected') {
            category = 'Armored Personnel Carrier'
        }
        if (date <= till && (status === 'Draft' || status === 'Approved')) {
            let values = accumulator[category] || [{}, {}, { value: russia[category] || '?' }]
            accumulator[category] = values
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
        return accumulator
    }, {})

    return CATEGORIES.map(category => ({
        category,
        values: byCategory[category],
    }))
}

module.exports = report