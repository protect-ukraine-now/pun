import AmmoTable from './shared/AmmoTable';

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


function valueAndDelta({ value, delta, sources }) {
	return (value | 0) + (delta ? `(+${delta})` : '')
}

export default function Dashboard({ date = '2022-07-17', data = mock }) {
	// console.log('Dashboard', date, data)
	return (
		<div>
			<AmmoTable data={data} date={date}/>
			<table>
				<tr>
					<th />
					<th>USA</th>
					<th>Rest</th>
				</tr>
				{data.map(({ category, values }) => (
					<tr key={category}>
						<td>{category}</td>
						<td>{valueAndDelta(values[0])}</td>
						<td>{valueAndDelta(values[1])}</td>
					</tr>
				))}
			</table>
		</div>
	)
}
