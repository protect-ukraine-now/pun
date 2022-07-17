import { Link } from 'preact-router'
import { usePrerenderData } from '@preact/prerender-data-provider'
import Dashboard from "../../components/dashboard"
import Container from '../../components/shared/Container';
import style from './style.scss';

export default function Report(props) {
	const [data, isLoading] = usePrerenderData(props)
	// console.log('Report', props, data, isLoading)
	if (isLoading) return
	const { date, prev, next, digest } = data.data

	console.log(data.data);
	return (
        <Container className={style.container}>
					<div className={style.nav}>
			{prev && <Link className={style.navLink} href={`/report/${prev}`}>Previous report</Link>}
			{next && <Link className={style.navLink} href={`/report/${next}`}>Next report</Link>}

					</div>
            {/*<div>Heavy weapons committed to Ukraine as of {date}</div>*/}
		    <Dashboard data={data.data.data} date={date} />
			{/* {digest} */}
        </Container>
	)
}
