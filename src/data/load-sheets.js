import fs from 'fs'
import { indexBy, assocPath, path } from 'rambda'

import categories from './categories.json' with { type: "json" }
import _countries from './countries.json' with { type: "json" }

let countries = Object.fromEntries(Object.entries(_countries).map(([k, v]) => [v, k]))

let indexText = text => text.reduce((a, [group, key, en, uk]) => {
    a.en[group] = { ...(a.en[group] || {}), [key]: en }
    a.uk[group] = { ...(a.uk[group] || {}), [key]: uk }
    return a
}, { en: {}, uk: {} })

export let modify = (p, fn, o) => assocPath(p, fn(path(p, o)), o)
function transformBalance(data) {
    data = data.reduce((o, [country, category, model, mod, _, qty, inUse]) => {
        if (!+qty) return o
        country = country.toLowerCase()
        if (inUse == '0') {
            model += ' (in store)'
        }
        let add = x => (x || 0) + +qty
        o = modify([category, country], add, o)
        o = modify([category, 'byModel', model, country], add, o)
        return o
    }, {})
    data = categories.map(category => {
        let o = data[category]
        let score = x => (x.ru|0) + (x.ua|0) + (x.us|0) - 1e5 * !!~x.model.indexOf('(in store)')
        o.byModel = Object.entries(o.byModel).map(([model, rest]) => ({ model, ...rest }))
        o.byModel.sort((a, b) => score(b) - score(a))
        return { category, ...o }
    })
    return data
}

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
    data.map(([status, category, country, code]) => [code.toLowerCase(), country])
)

const API_KEY = 'AIzaSyCX8cPcl4eAd311z9wCZ8xlQCkfmJ5sIpU'
const spreadsheets = {
    commits: {
        id: '1Q9aLVoSZ9vTKH0VLnMpFRiY6h0kV6Rcb16R4lP0rUFs',
        range: "'Weapons'",
        transform: transformCommits,
    },
    balance: {
        id: '1xgDA4BxipENhnh8vAkKgISbGyWGHMOZulbLtRZFBV-4',
        range: "'Data'",
        transform: transformBalance,
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
    },
    // losses: {
    //     id: '1Q9aLVoSZ9vTKH0VLnMpFRiY6h0kV6Rcb16R4lP0rUFs',
    //     range: "Losses",
    // },
}

async function loadSheets() {
    let tasks = Object.entries(spreadsheets).map(async ([what, { id, range, transform }]) => {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?key=${API_KEY}`
        let raw = await (await fetch(url)).json()
        try {
            raw = raw.values.slice(1)
            let data = transform ? transform(raw) : raw
            console.log(what, raw.length, data.length)
            let file = `src/data/${what}.json`
            fs.writeFileSync(file, JSON.stringify(data, null, '\t'))
            return [what, data]
        } catch (e) {
            console.error(what, e, raw)
        }
    })
    let data = Object.fromEntries(await Promise.all(tasks))
    return data
}

loadSheets()
