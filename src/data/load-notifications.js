import fs from 'fs'

const query = 'https://www.federalregister.gov/api/v1/documents.json?fields[]=agency_names&fields[]=publication_date&fields[]=raw_text_url&fields[]=signing_date&fields[]=title&fields[]=type&per_page=1000&order=oldest&conditions[term]=%22Section%20506%28a%29%281%29%22%20Ukraine'
const search = await fetch(query).then(x => x.json())
// console.log(search)
const list = search.results
let csv = ''
for (let i = 0; i < list.length; i++) {
	const doc = list[i]
	const date = doc.signing_date || doc.publication_date
	const text = await fetch(doc.raw_text_url).then(x => x.text())
	// console.log(text)
	let amts = text.match(/\$([^\s]*[\s]*[^\s]*)/g)
	amts = amts?.map(s => s.replace(/\s+/g, ' '))
	console.log(date, amts)
	csv += `${date}\t${doc.type}\t${doc.raw_text_url}\t${amts?.join('\t') }\n`
}

fs.writeFileSync('notifications.csv', csv)
