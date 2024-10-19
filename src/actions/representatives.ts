import { indexBy, groupBy } from 'rambda'
import { defineAction } from "astro:actions"
import { z } from 'astro:schema'

import members from '@data/members.json'

const API_URL = 'https://content-civicinfo.googleapis.com/civicinfo/v2/'
const API_KEY = 'AIzaSyCSvWsU49SRTe5oeWTdBCNVDYSl9drIsIw'

const officialsByName = indexBy(({ first_name, middle_name, last_name, suffix }) =>
	[first_name, middle_name, last_name, suffix].filter(x => x).join(' ')
)(members.members)

const officialsByDivision = groupBy(({ state, district }) =>
	[state, district?.replace('At-Large', '')].filter(x => x).join('-')
)(members.members)

export const representatives = {
	byAddress: defineAction({
		accept: 'form',
		input: z.object({
			street: z.string().optional(),
			city: z.string().optional(),
			zip_code: z.string().optional(),
		}),
		handler: async ({ street, city, zip_code }) => {
			const address = `${street} ${city} ${zip_code}`
			// console.log(address)
			let params = new URLSearchParams({
				address,
				roles: 'legislatorLowerBody',
				levels: 'country',
				key: API_KEY,
			})
			params.append('roles', 'legislatorUpperBody')

			let data = await fetch(API_URL + 'representatives?' + params).then(x => x.json())
			// console.log('api response', data)
			if (data.error) return data

			let { divisions, offices, officials } = data
			offices.forEach(office => {
				office.officialIndices.forEach(idx => {
					let official = officials[idx]
					official.office = office.name
					official.division = divisions[office.divisionId].name

					let { channels = [], urls = [] } = official
					let links = {}
					urls.forEach(url => {
						if (~url.indexOf('senate.gov') || ~url.indexOf('house.gov')) {
							links.gov = url
						}
						if (~url.indexOf('wikipedia.org')) {
							links.wiki = url
						}
					})
					channels.forEach(({ type, id }) => {
						type = type.toLowerCase()
						if (type === 'facebook' || type === 'twitter') {
							links[type] = `https://${type}.com/${id}`
						}
					})
					official.links = links

					let o = officialsByName[official.name]
					if (!o) {
						try {
							const { state, cd } = Object.fromEntries(office.divisionId.split('/').map(x => x.split(':')))
							const id = [state.toUpperCase(), cd].filter(x => x).join('-')
							o = officialsByDivision[id].find(o => ~official.name.indexOf(o.last_name))
							if (!o) console.log('NOT FOUND', id)
						} catch (e) {
							console.error(e)
						}
					}
					official.committees = o?.committees?.map(({ name }) => name)

					delete official.urls
					delete official.channels
					delete official.address
				})
			})

			return officials
		},
	}),
}
