const fs = require('fs')

const API_KEY = 'AIzaSyCX8cPcl4eAd311z9wCZ8xlQCkfmJ5sIpU'

const spreadsheets = {
    commits: {
        id: '1zJuvhRLAKPuVrtaA-xTm2KvVwRZjInDuA4M9k7HZT1E',
        range: "'Weapons'",
    },
    russia: {
        id: '1zJuvhRLAKPuVrtaA-xTm2KvVwRZjInDuA4M9k7HZT1E',
        range: "'russia'",
        transform: Object.fromEntries,
    },
    text: {
        id: '1Cm0x0JZAO05wxfN2iHeShnoXwdoTGe5jGuE5AhhJkBs',
        range: "'Sheet1'",
        transform: indexText,
    },
    news: {
        id: '1GjHht1WjPGagUo-jycLRbeCHZYgLYQWuKZrFvXiqWv4',
        range: "'News Log'",
    },
}

function indexText(text) {
    return text.slice(1).reduce((a, [group, key, desc, en, ua]) => {
        a.en[group] = { ...(a.en[group] || {}), [key]: en }
        a.ua[group] = { ...(a.ua[group] || {}), [key]: ua }
        return a
    }, { en: {}, ua: {} })
}

async function loadData() {
    let tasks = Object.entries(spreadsheets).map(async ([what, { id, range, transform }]) => {
        console.log(what, `fetching...`)
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?key=${API_KEY}`
        let data = (await (await fetch(url)).json()).values
        console.log(what, 'got', data.length)
        if (transform) {
            data = transform(data)
        }
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
    return data
}

module.exports = loadData