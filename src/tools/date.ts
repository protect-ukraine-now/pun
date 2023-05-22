import ukrLocale from 'date-fns/locale/uk'
import engLocale from 'date-fns/locale/en-US'
import format from 'date-fns/format'

export let DAY = 24 * 60 * 60e3

export let isoDate = x => new Date(x).toISOString().slice(0, 10)

const localeMap = {
	en: engLocale,
	ua: ukrLocale
}

const getDateLocale = locale => {
	return localeMap[locale] || localeMap.en
}

export const formatDate = language => (date, fmt = 'd MMMM yyyy') => {
	const locale = getDateLocale(language)
	return format(new Date(date), fmt, { locale }) // .toUpperCase()
}

