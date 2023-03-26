const fs = require('fs')

let indexText = text => text.slice(1).reduce((a, [group, key, desc, en, ua]) => {
    a.en[group] = { ...(a.en[group] || {}), [key]: en }
    a.ua[group] = { ...(a.ua[group] || {}), [key]: ua }
    return a
}, { en: {}, ua: {} })

let transformCommits = data => data
    .filter(([date, status, country, category, type, qty]) => status === 'Approved' && +qty)
    .map(([date, status, country, category, type, qty, fund, notes, link, title]) => [date, country, category, type, qty, fund, link, title])

let transformNews = data => data
    .filter(([date, en, ua, author, source, status]) => status === 'Translated' || status === 'Published')
    .map(([date, en, ua, author, source, status]) => [date, en, ua, source])

const API_KEY = 'AIzaSyCX8cPcl4eAd311z9wCZ8xlQCkfmJ5sIpU'
const spreadsheets = {
    text: {
        id: '1Cm0x0JZAO05wxfN2iHeShnoXwdoTGe5jGuE5AhhJkBs',
        range: "'Sheet1'",
        transform: indexText,
    },
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