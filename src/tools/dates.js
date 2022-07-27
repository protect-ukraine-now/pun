import ukrLocale from 'date-fns/locale/uk';
import engLocale from 'date-fns/locale/en-US';
import format from 'date-fns/format';

const LocaleDateMap = {
	en: engLocale,
	ua: ukrLocale
}

const getDateLocale = locale => {
	return LocaleDateMap[locale] ? LocaleDateMap[locale] : LocaleDateMap.en;
}

export const formatDate = language => date => {
	const locale = getDateLocale(language);

	return format(new Date(date), 'd MMMM yyyy', { locale }).toUpperCase()
}

