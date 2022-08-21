import { useMemo } from 'preact/hooks'
import { Fragment } from 'preact'
import { Text } from 'preact-i18n'
// import Markdown from 'markdown-to-jsx'

import { formatDate } from '../../tools/date'

import { prepareNews } from '../../data/news'
import style from './style.scss'
import Container from '../../components/Container'
import Article from '../../components/Article'

export default function News({ language }) {
    // console.log('News props', props)
    let news = useMemo(() => prepareNews(language), [language])
    // console.log('News data', news)
    return (
        <Container className={style.digest}>
            <Article>
                {Object.entries(news).map(([date, news]) =>
                    <Fragment key={date} >
                        <h4>{formatDate(language)(date)}</h4>
                        <ul>
                            {news.map(({ text, source }) =>
                                <li key={source}>
                                    {/* <Markdown>{text}</Markdown> */}
                                    {text}
                                    {' '}
                                    <a href={source}>(<Text id="news.source">source</Text>)</a>
                                </li>
                            )}
                        </ul>
                    </Fragment>
                )}
            </Article>
        </Container>
    )
}
