import Vega from '@components/Vega/Vega'
import spec from '@data/losses-w-data.vg.json'

console.log('losses', spec)

export function LossesChart() {
	return (
		<Vega spec={spec} />
	)
}
