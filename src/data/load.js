const fs = require('fs')
const { join } = require('path')
const parseMD = require('parse-md').default

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

async function loadData() {
    let tasks = Object.entries(spreadsheets).map(async ([what, { id, range }]) => {
        console.log(what, `fetching...`)
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?key=${API_KEY}`
        let data = (await (await fetch(url)).json()).values
        console.log(what, 'got', data.length)
        try {
            let file = `src/data/${what}.json`
            fs.writeFileSync(file, JSON.stringify(data, null, '\t'))
            console.log(what, 'saved')
            // data = JSON.parse(fs.readFileSync(file))
            // console.log(what, 'loaded', data.length)
        } catch (e) {
            console.error(e)
        }
        return [what, data]
    })
    let data = Object.fromEntries(await Promise.all(tasks))
    data.text = prepareText(data)
    data.reports = prepareReports(data)
    return data
}

function prepareText({ text }) {
    return text.slice(1).reduce((a, [group, key, desc, en, ua]) => {
        a.en[group] = { ...(a.en[group] || {}), [key]: en }
        a.ua[group] = { ...(a.ua[group] || {}), [key]: ua }
        return a
    }, { en: {}, ua: {} })
}

function loadMarkdown(folder, name) {
    try {
        const { content } = parseMD(fs.readFileSync(join('content', folder, name), 'utf-8'))
        return content
    } catch (e) {
        // console.error('loadMd', folder, name, e)
    }
}

const DAY = 24*60*60e3
const formatDate = x => new Date(x).toISOString().slice(0, 10)

function weeklyReport(asOf, data) {
    const from = formatDate(asOf - 7*DAY)
    const till = formatDate(asOf)
    let byCategory = data.slice(1).reduce((accumulator, r) => {
        let [date, author, reviewer, status, country, category, type, qty, qty2, notes, link, title] = r
        if (category === 'Mine-Resistant Ambush Protected') {
            category = 'Armored Personnel Carrier'
        }
        if (date <= till && (status === 'Draft' || status === 'Approved')) {
            let values = accumulator[category] || [{}, {}]
            accumulator[category] = values
            // let indicies = country === 'US' ? [0, 1] : [1]
            let indicies = country === 'US' ? [0] : [1]
            indicies.forEach(index => {
                let x = values[index]
                x.value = (x.value || 0) + +qty
                if (date > from) {
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
    loadMarkdown,
}
