// TODO: crawl the folder
// const { generateFileList } = require('./src/crawler');
// const [blogs] = generateFileList(join(__dirname, 'content')).nodes;
function listReports() {
    return [
        { from: '2022-07-04', till: '2022-07-17' },
        { from: '2022-07-18', till: '2022-07-31' },
    ]
}

function prepareReports(data) {
    let list = listReports()
    return listReports().map((report, i) => ({
        ...report,
        prev: (list[i - 1] || {}).till,
        next: (list[i + 1] || {}).till,
        data: prepareReport(data, report),
    }))
}

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

function prepareReport({ commits, russia, news }, { from, till }) {
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

module.exports = prepareReports