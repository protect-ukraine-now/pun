import raw from './data.json';
import { groupBy } from 'rambda';

let byCategory = raw.slice(1).reduce((accumulator, r) => {
	let [date, author, reviewer, status, country, category, type, qty, qty2, notes, source] = r;
	let values = accumulator[category] || [{}, {}];
	accumulator[category] = values;
	let index = country === 'US' ? 0 : 1;
	let x = values[index];
	x.value = (x.value || 0) + +qty;
	if (date > '2022-07-01') {
		x.delta = (x.delta || 0) + +qty;
	}
	return accumulator;
}, {});

let data = Object.keys(byCategory).map(category => ({ category, values: byCategory[category] }));

export default data;
