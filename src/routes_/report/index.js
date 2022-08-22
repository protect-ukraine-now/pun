import style from './style.scss';
import Container from '../../components/Container';
import Dashboard from '../../components/Dashboard';
import AidChart from '../../components/AidChart'

export default function Report(props) {
	// console.log('Report props', props)
	return (
		<>
			<Container className={style.container}>
				<Dashboard {...props} />
			</Container>
			<Container className={style.chart}>
				<AidChart {...props} />
			</Container>
		</>
	);
}
