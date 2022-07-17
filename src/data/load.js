const fs = require('fs')

const CATEGORIES = [
    'Towed Artillery',
    'Self-Propelled Artillery',
    'Multiple Launch Rocket System',
    'Guided MLRS',
    'Surface-to-Air Missile System',
    'Vessel',
    'Helicopter',
    'Aircraft',
    'Tank',
    'Infantry Fighting Vehicle',
    'Armored Personnel Carrier',
    'Mine-Resistant Ambush Protected',
]

const spreadsheets = {
    commits: {
        id: '1zJuvhRLAKPuVrtaA-xTm2KvVwRZjInDuA4M9k7HZT1E',
        range: "'Weapons'",
    },
    text: {
        id: '1Cm0x0JZAO05wxfN2iHeShnoXwdoTGe5jGuE5AhhJkBs',
        range: "'Sheet1'"
    }
}

const API_KEY = 'AIzaSyCX8cPcl4eAd311z9wCZ8xlQCkfmJ5sIpU'

export async function loadData() {
    let tasks = Object.entries(spreadsheets).map(async ([what, { id, range }]) => {
        console.log(what, `fetching...`)
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?key=${API_KEY}`
        let data = (await (await fetch(url)).json()).values
        console.log(what, 'got', data.length)
        try {
            let file = `src/data/${what}.json`
            fs.writeFileSync(file, JSON.stringify(data, null, '\t'))
            console.log(what, 'saved')
            data = JSON.parse(fs.readFileSync(file))
            console.log(what, 'loaded', data.length)
        } catch (e) {
            console.error(e)
        }
        return [what, data]
    })
    return Object.fromEntries(await Promise.all(tasks))
}

const DAY = 24*60*60e3
const formatDate = x => new Date(x).toISOString().slice(0, 10)

function weeklyReport(asOf, data) {
    const from = formatDate(asOf - 7*DAY)
    const till = formatDate(asOf)
    let byCategory = data.slice(1).reduce((accumulator, r) => {
        let [date, author, reviewer, status, country, category, type, qty, qty2, notes, source] = r
        if (date <= till && (status === 'Draft' || status === 'Approved')) {
            let values = accumulator[category] || [{}, {}]
            accumulator[category] = values
            let index = country === 'US' ? 0 : 1
            let x = values[index]
            x.value = (x.value || 0) + +qty
            if (date > from) {
                x.delta = (x.delta || 0) + +qty
            }
        }
        return accumulator
    }, {})

    return CATEGORIES.map(category => ({
        category,
        values: byCategory[category],
    }))
}

function prepareReports({ commits }) {
    let first = new Date('2022-07-03').valueOf()
    let reports = []
    for (let date = first; date < Date.now(); date += 7*DAY) {
        reports.push({
            date: formatDate(date),
            prev: date > first && formatDate(date - 7*DAY),
            next: date + 7*DAY < Date.now() && formatDate(date + 7*DAY),
            data: weeklyReport(date, commits),
        })
    }
    return reports
}

module.exports = {
    loadData,
    prepareReports,
}
