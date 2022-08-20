const fs = require('fs')

let indexText = text => text.slice(1).reduce((a, [group, key, desc, en, ua]) => {
    a.en[group] = { ...(a.en[group] || {}), [key]: en }
    a.ua[group] = { ...(a.ua[group] || {}), [key]: ua }
    return a
}, { en: {}, ua: {} })

let transformCommits = data => data
    .filter(([date, author, reviewer, status]) => status === 'Draft' || status === 'Approved')
    .map(([date, author, reviewer, status, country, category, type, qty, qty2, notes, link, title]) => [date, country, category, type, qty, link, title])

let transformNews = data => data
    .filter(([id, date, en, ua, author, source, status]) => status === 'Translated' || status === 'Published')
    .map(([id, date, en, ua, author, source, status]) => [date, en, ua, source])

const API_KEY = 'AIzaSyCX8cPcl4eAd311z9wCZ8xlQCkfmJ5sIpU'
const spreadsheets = {
    text: {
        id: '1Cm0x0JZAO05wxfN2iHeShnoXwdoTGe5jGuE5AhhJkBs',
        range: "'Sheet1'",
        transform: indexText,
    },
    commits: {
        id: '1zJuvhRLAKPuVrtaA-xTm2KvVwRZjInDuA4M9k7HZT1E',
        range: "'Weapons'",
        transform: transformCommits,
    },
    russia: {
        id: '1zJuvhRLAKPuVrtaA-xTm2KvVwRZjInDuA4M9k7HZT1E',
        range: "'russia'",
        transform: Object.fromEntries,
    },
    news: {
        id: '1GjHht1WjPGagUo-jycLRbeCHZYgLYQWuKZrFvXiqWv4',
        range: "'News Log'",
        transform: transformNews,
    },
}

async function loadData() {
    let tasks = Object.entries(spreadsheets).map(async ([what, { id, range, transform }]) => {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?key=${API_KEY}`
        let data = (await (await fetch(url)).json()).values.slice(1)
        console.log(what, data.length)
        if (transform) {
            data = transform(data)
        }
        let file = `src/data/${what}.json`
        fs.writeFileSync(file, JSON.stringify(data, null, '\t'))
        return [what, data]
    })
    let data = Object.fromEntries(await Promise.all(tasks))
    return data
}

module.exports = loadData