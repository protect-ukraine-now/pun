import { Link } from 'preact-router'
import { usePrerenderData } from '@preact/prerender-data-provider'
import { IntlProvider, Text } from 'preact-i18n'
import Dashboard from "../../components/dashboard"
import Markdown from 'markdown-to-jsx'
import Container from '../../components/shared/Container';
import style from './style.scss';

export default function Report(props) {
	const [data, isLoading] = usePrerenderData(props)
	if (isLoading) return
	console.log('Report', props, data)
	const { language, text, date, prev, next, blog } = data.data
	return (
		<IntlProvider definition={text}>
			<Container className={style.container}>
				<div className={style.nav}>
					{prev && 
						<Link className={style.navLink} href={`/${language}/report/${prev}`}>
							<Text id="report.prev">Prev report</Text>
						</Link>
					}
					{next && 
						<Link className={style.navLink} href={`/${language}/report/${next}`}>
							<Text id="report.next">Next report</Text>
						</Link>
					}
				</div>
				{/*<div>Heavy weapons committed to Ukraine as of {date}</div>*/}
				<Dashboard data={data.data.data} date={date} />
				{blog && <Markdown>{blog}</Markdown>}
			</Container>
		</IntlProvider>
	)
}
