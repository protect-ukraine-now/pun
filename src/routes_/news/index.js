import { useMemo } from 'preact/hooks';
import { Text } from 'preact-i18n';
import Markdown from 'markdown-to-jsx'

import { formatDate } from '../../tools/date';

import { prepareNews } from '../../data/news';
import style from './style.scss';
import Container from '../../components/Container';
import Article from '../../components/Article';

export default function News({ language }) {
	// console.log('News props', props)
	let news = useMemo(() => prepareNews(language), [language]);
	// console.log('News data', news)
	return (
		<Container className={style.digest}>
			{Object.entries(news).map(([date, news]) =>
				<Article className={style.article} key={date}>
					<h4 className={style.heading}>{formatDate(language)(date)}</h4>
					<ul>
						{news.map(({ text, source }, i) =>
							<li key={i}>
								<Markdown>{text}</Markdown>
								{' '}
								<a href={source} target="_blank">
									(<Text id="news.source">source</Text>)
								</a>
							</li>
						)}
					</ul>
				</Article>
			)}
		</Container>
	);
}
