const fs = require('fs')
const { defaultTo } = require('rambda')

const SPREADSHEET_ID = '1zJuvhRLAKPuVrtaA-xTm2KvVwRZjInDuA4M9k7HZT1E'
const RANGE = "'Weapons'"
const API_KEY = 'AIzaSyCX8cPcl4eAd311z9wCZ8xlQCkfmJ5sIpU'

const DAY = 24*60*60e3
const formatDate = x => new Date(x).toISOString().slice(0, 10)

async function loadData() {
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
	console.log('fetching data...')
	let data = (await (await fetch(url)).json()).values
	console.log('got rows', data.length)
	try {
		fs.writeFileSync('src/data/data.json', JSON.stringify(data, null, '\t'))
		console.log('saved')
	} catch (e) {
		console.log(e)
	}
	return data
}

function weeklyReport(asOf, data) {
    const prev = formatDate(asOf - 7*DAY)
    let byCategory = data.slice(1).reduce((accumulator, r) => {
        let [date, author, reviewer, status, country, category, type, qty, qty2, notes, source] = r
        let values = accumulator[category] || [{}, {}]
        accumulator[category] = values
        let index = country === 'US' ? 0 : 1
        let x = values[index]
        x.value = (x.value || 0) + +qty
        if (date > prev) {
            x.delta = (x.delta || 0) + +qty
        }
        return accumulator
    }, {})
    
    return Object.keys(byCategory).map(category => ({ 
        category, 
        values: byCategory[category],
    }))
}

async function prepareReports() {
    let data = await loadData()
    let first = new Date('2022-07-03').valueOf()
    let reports = []
    for (let date = first; date < Date.now(); date += 7*DAY) {
        reports.push({
            date: formatDate(date),
            prev: date > first && formatDate(date - 7*DAY),
            next: date + 7*DAY < Date.now() && formatDate(date + 7*DAY),
            data: weeklyReport(date, data),
        })
    }
    return reports
}

module.exports = {
    prepareReports
}    