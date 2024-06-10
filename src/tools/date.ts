export let DAY = 24 * 60 * 60e3

export let isoDate = x => new Date(x).toISOString().slice(0, 10)

export const dateFormatter = lang => date => {
	return new Date(date).toLocaleDateString(lang, { dateStyle: 'long' })
}

