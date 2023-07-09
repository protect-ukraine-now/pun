import fs from 'fs'

import sankey from './sankey.vg.json' assert { type: "json" }

let indexText = text => text.reduce((a, [group, key, en, uk]) => {
    a.en[group] = { ...(a.en[group] || {}), [key]: en }
    a.uk[group] = { ...(a.uk[group] || {}), [key]: uk }
    return a
}, { en: {}, uk: {} })

let transformCommits = data => data
    .filter(([date, status, country, category, type, qty]) => status === 'Approved' && +qty)
    .map(([date, status, country, category, type, qty, fund, notes, link, title]) => [date, country, category, type, qty, fund, link, title])

let transformNews = data => data
    .filter(([date, en, uk, author, source, status]) => (
        (status === 'Translated' || status === 'Published')
        && date >= new Date(Date.now() - 28 * 24 * 60 * 60e3).toISOString().slice(0, 10)
    ))
    .map(([date, en, uk, author, source, status]) => [date, en, uk, source])
    .sort(([a], [b]) => new Date(b) - new Date(a))

const API_KEY = 'AIzaSyCX8cPcl4eAd311z9wCZ8xlQCkfmJ5sIpU'
const spreadsheets = {
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

async function loadVega(spec, text) {
    let data = spec.data.map(async ({ url }, i) => {
        if (!url) return
        let csv = await (await fetch(url)).text()
        delete spec.data[i].url
        spec.data[i].values = csv
    })
    await Promise.all(data)
    let json = JSON.stringify(spec, null, '\t')
    Object.entries(text).forEach(([lang, { sankey }]) => {
        let translated = Object.entries(sankey).reduce((json, [key, val]) => (
            json.replaceAll(key, val)
        ), json)
        fs.writeFileSync(`src/data/sankey-w-data.${lang}.vg.json`, translated)
    })
}

const { text } = await loadSheets()
await loadVega(sankey, text)
