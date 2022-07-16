const fs = require('fs')

const SPREADSHEET_ID = '1zJuvhRLAKPuVrtaA-xTm2KvVwRZjInDuA4M9k7HZT1E'
const RANGE = "'Weapons'"
const API_KEY = 'AIzaSyCX8cPcl4eAd311z9wCZ8xlQCkfmJ5sIpU'

module.exports = async () => {
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


