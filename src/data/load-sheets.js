import fs from 'fs'
import { indexBy } from 'rambda'

import categories from './categories.json' with { type: "json" }
import countries from './countries.json' with { type: "json" }

let indexText = text => text.reduce((a, [group, key, en, uk]) => {
    a.en[group] = { ...(a.en[group] || {}), [key]: en }
    a.uk[group] = { ...(a.uk[group] || {}), [key]: uk }
    return a
}, { en: {}, uk: {} })

let cats = indexBy(x => x, categories)
let transformCommits = data => data
    .filter(([date, status, country, category, type, qty]) => (
        status === 'Approved' &&
        cats[category] &&
        +qty
    ))
    .map(([date, status, country, category, type, qty, price, amt, fund, notes, link, title]) => (
        [date, countries[country] || country, category, type, +qty, link]
    ))

let transformNews = data => data
    .filter(([date, en, uk, author, source, status]) => (
        (status === 'Translated' || status === 'Published')
        && date >= new Date(Date.now() - 28 * 24 * 60 * 60e3).toISOString().slice(0, 10)
    ))
    .map(([date, en, uk, author, source, status]) => [date, en, uk, source])
    .sort(([a], [b]) => new Date(b) - new Date(a))

let transformCountries = data => Object.fromEntries(
    data.map(([status, category, country, code]) => [country, code.toLowerCase()])
)

const API_KEY = 'AIzaSyCX8cPcl4eAd311z9wCZ8xlQCkfmJ5sIpU'
const spreadsheets = {
    // zccd: {
    //     id: '19TSFcSWyKmIqIhxEdQWJ4hhh6pv58kbeyXp3zyW1dWk',
    //     range: "'zccd'",
    // },
    // legislators: {
    //     id: '19TSFcSWyKmIqIhxEdQWJ4hhh6pv58kbeyXp3zyW1dWk',
    //     range: "'legislators-current'",
    // },
    // balance: {
    //     id: '1xgDA4BxipENhnh8vAkKgISbGyWGHMOZulbLtRZFBV-4',
    //     range: "'Total'",
    // },
    commits: {
        id: '1Q9aLVoSZ9vTKH0VLnMpFRiY6h0kV6Rcb16R4lP0rUFs',
        range: "'Weapons'",
        transform: transformCommits,
    },
    money: {
        id: '1Q9aLVoSZ9vTKH0VLnMpFRiY6h0kV6Rcb16R4lP0rUFs',
        range: "'Money'",
    },
    news: {
        id: '1GjHht1WjPGagUo-jycLRbeCHZYgLYQWuKZrFvXiqWv4',
        range: "'News Log'",
        transform: transformNews,
    },
    text: {
        id: '1Cm0x0JZAO05wxfN2iHeShnoXwdoTGe5jGuE5AhhJkBs',
        range: "'Sheet1'",
        transform: indexText,
    },
    countries: {
        id: '1Q9aLVoSZ9vTKH0VLnMpFRiY6h0kV6Rcb16R4lP0rUFs',
        range: "'REF'",
        transform: transformCountries,
    }
}

async function loadSheets() {
    let tasks = Object.entries(spreadsheets).map(async ([what, { id, range, transform }]) => {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?key=${API_KEY}`
        let raw = (await (await fetch(url)).json()).values.slice(1)
        let data = transform ? transform(raw) : raw
        console.log(what, raw.length, data.length)
        let file = `src/data/${what}.json`
        fs.writeFileSync(file, JSON.stringify(data, null, '\t'))
        return [what, data]
    })
    let data = Object.fromEntries(await Promise.all(tasks))
    return data
}

loadSheets()
