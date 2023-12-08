import fs from 'fs'
import dayjs from 'dayjs'

const what = [
	'Towed Artillery',
	'Self-Propelled Artillery',
	'Multiple Rocket Launchers',
	'Self-Propelled Anti-Aircraft Guns',
	'Surface-To-Air Missile Systems',
	'Aircraft',
	'Helicopters',
	'Tanks',
	'Infantry Fighting Vehicles',
]
const urls = {
	ru: 'https://web.archive.org/web/${date}/https://www.oryxspioenkop.com/2022/02/attack-on-europe-documenting-equipment.html',
	ua: 'https://web.archive.org/web/${date}/https://www.oryxspioenkop.com/2022/02/attack-on-europe-documenting-ukrainian.html',
}
const file = `oryx.tsv`

let data = fs.readFileSync(file, 'utf8').split('\n').map(x => x.split('\t'))
let total = data.slice(1).reduce((total, row) => {
	let [country] = row
	total[country] = row.slice(2).map((x, i) => (total[country][i] ?? 0) + parseInt(x))
	return total
}, { ru: [], ua: [] })
// console.log(total)
let [_, date] = data[data.length - 2]

function extract(page, what) {
	what = `>${what}`
	let i = page.indexOf(what) + what.length
	i = page.indexOf('(', i) + 1
	let j = page.indexOf(',', i)
	let x = page.substring(i, j)
	// console.log(what, i, j, x.substring(0, 40))
	return parseInt(x)
}

const today = dayjs().format('YYYY-MM-DD')
for(;;) {
	date = dayjs(date).add(1, 'M').endOf('M').format('YYYY-MM-DD')
	console.log(date)
	if (date >= today) break
	for (const country in urls) {
		const url = urls[country].replace('${date}', date.replace(/-/g, ''))
		// console.log(url)
		const page = await fetch(url, {
			redirect: 'follow',
			follow: 9,
		}).then(x => x.text())
		const current = what.map((what, i) => {
			let x = Math.max(0, extract(page, what) - total[country][i])
			total[country][i] += x
			return x
		})
		const row = [country, date.substring(0, 7), ...current].join('\t')
		console.log(row)
		fs.appendFileSync(file, row + '\n')
		// fs.writeFileSync('oryx.html', page)
	}
}
