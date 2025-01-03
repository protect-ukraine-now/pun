import Vega from '@components/Vega/Vega'
import spec from '@data/losses-w-data.vg.json'

export function LossesChart() {
	return (
		<Vega spec={spec} />
	)
}
