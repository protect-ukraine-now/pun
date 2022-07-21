import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import { IntlProvider, Text } from 'preact-i18n';
import Dashboard from '../../components/dashboard';
import cn from 'classnames';
import Container from '../../components/shared/Container';
import style from './style.scss';
import Article from '../../components/Article';

import LargeImageHeader from '../../components/shared/LargeImageHeader';
import ActionLetter from '../../components/shared/ActionLetter';

export default function Report(props) {
	const [data, isLoading] = usePrerenderData(props);
	if (isLoading) return;
	// console.log('Report', props, data)
	const { language, text, date, prev, next, blog } = data.data;
	return (
		<IntlProvider definition={text}>
			<LargeImageHeader />
			<Container className={style.container}>
				<div className={style.nav}>
					{prev &&
						<Link className={cn(style.navLink, style.prev)} href={`/${language}/report/${prev}`}>
							<Text id="report.prev">Prev report</Text>
						</Link>
					}
					{next &&
						<Link className={cn(style.navLink, style.next)} href={`/${language}/report/${next}`}>
							<Text id="report.next">Next report</Text>
						</Link>
					}
				</div>
				<Dashboard data={data.data.data} date={date} />
			</Container>
			<ActionLetter />
			{/* <Container className={style.digest}>
				<Article content={blog} />
			</Container> */}
		</IntlProvider>
	);
}
