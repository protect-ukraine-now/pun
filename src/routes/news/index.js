import { usePrerenderData } from '@preact/prerender-data-provider'
import { Fragment } from 'preact'
import { groupBy } from 'rambda'
// import Markdown from 'markdown-to-jsx'

import { formatDate } from '../../tools/dates'

import style from './style.scss'
import Container from '../../components/Container'
import Article from '../../components/Article'

export default function News(props) {
    console.log('News props', props)
    const [data, isLoading] = usePrerenderData(props)
    if (isLoading) return <div style={{ height: '200%' }} />
    console.log('News data', data)
    let { news, language } = data.data
    let byDate = groupBy(({ date }) => date, news)
    return (
        <Container className={style.digest}>
            <Article>
                {Object.entries(byDate).map(([date, news]) =>
                    <Fragment key={date} >
                        <h4>{formatDate(language)(date)}</h4>
                        <ul>
                            {news.map(({ text, source }) =>
                                <li key={source}>
                                    {/* <Markdown>{text}</Markdown> */}
                                    {text}
                                    {' '}
                                    <a href={source}>(source)</a>
                                </li>
                            )}
                        </ul>
                    </Fragment>
                )}
            </Article>
        </Container>
    )
}
