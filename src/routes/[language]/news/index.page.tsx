import Markdown from 'markdown-to-jsx'

import style from './style.module.scss'
import { useLanguage, useText } from 'src/tools/language'
import { formatDate } from 'src/tools/date'
import { prepareNews } from 'src/data/news'
import Container from 'src/components/Container'
import Article from 'src/components/Article'

export default function News() {
	const language = useLanguage()
	const text = useText()
	const sourceLabel = text('news.source')
	const news = prepareNews(language)
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
								<a href={source} target="_blank" rel="noreferrer">
									({sourceLabel})
								</a>
							</li>
						)}
					</ul>
				</Article>
			)}
		</Container>
	)
}
