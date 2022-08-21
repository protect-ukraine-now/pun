import { usePrerenderData } from '@preact/prerender-data-provider';

import style from './style.scss';
import prepareReport from '../../data/report'
import Container from '../../components/Container';
import Dashboard from '../../components/Dashboard';
import AidChart from '../../components/AidChart'

export default function Report(props) {
	// console.log('Report props', props)
	const [data, isLoading] = usePrerenderData(props);
	if (isLoading) return <div style={{ height: '200%' }} />
	// console.log('Report data', data)
	let report = data.data
	report.data = prepareReport(report)
	return (
		<>
			<Container className={style.container}>
				<Dashboard {...report} />
			</Container>
			<Container className={style.digest}>
				<AidChart {...props} />
			</Container>
		</>
	);
}
