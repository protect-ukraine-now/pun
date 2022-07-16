import { h } from 'preact';
import AmmoTable from './shared/AmmoTable';

function ValueAndDelta({ value, delta, sources }) {
	return `${value} (+${delta})`;
}

const mock = [
	{
		category: 'Towed Artillery',
		values: [
			{ value: 126, delta: 1, sources: ['http://example.org/1'] },
			{ value: 69 }
		]
	},
	{
		category: 'Self-Propelled Artillery',
		values: [
			{},
			{ value: 215, delta: 4, sources: ['http://example.org/2', 'http://example.org/3'] }
		]
	}
];


export default function Dashboard({ data = mock }) {
	console.log(data);
	return (
		<div>
			<AmmoTable data={data} />
			<table>
				<tr>
					<th />
					<th>USA</th>
					<th>Total</th>
				</tr>
				{data.map(({ category, values }) => (
					<tr key={category}>
						<td>{category}</td>
						<td><ValueAndDelta {...values[0]} /></td>
						<td><ValueAndDelta {...values[1]} /></td>
					</tr>
				))}
			</table>
		</div>
	);
}
