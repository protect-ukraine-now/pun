import cn from 'classnames';
import { Link } from 'preact-router'
import { usePrerenderData } from '@preact/prerender-data-provider'
import Dashboard from "../../components/dashboard"
import Markdown from 'markdown-to-jsx'
import Container from '../../components/shared/Container';
import style from './style.scss';

export default function Report(props) {
	const [data, isLoading] = usePrerenderData(props)
	if (isLoading) return
	const { date, prev, next, text } = data.data
	console.log('Report', data.data)
	return (
        <Container className={style.container}>
					<div className={style.nav}>
			{prev && <Link className={cn(style.navLink, style.prev)} href={`/report/${prev}`}>Previous report</Link>}
			{next && <Link className={cn(style.navLink, style.next)} href={`/report/${next}`}>Next report</Link>}

					</div>
            {/*<div>Heavy weapons committed to Ukraine as of {date}</div>*/}
		    <Dashboard data={data.data.data} date={date} />
			{text && <Markdown>{text}</Markdown>}
        </Container>
	)
}
