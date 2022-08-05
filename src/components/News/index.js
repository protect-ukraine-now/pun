import { Fragment } from 'preact'
import { groupBy } from 'rambda'
import Markdown from 'markdown-to-jsx';

import { formatDate } from '../../tools/dates'

export default function News({ news, language }) {
    let byDate = groupBy(({ date }) => date, news)
    return (
        <>
            {Object.entries(byDate).map(([date, news]) =>
                <Fragment key={date} >
                    <h4>{formatDate(language)(date)}</h4>
                    <ul>
                        {news.map(({ text, source }) =>
                            <li key={source}>
                                <Markdown>{text}</Markdown>
                                {' '}
                                <a href={source}>(source)</a>
                            </li>
                        )}
                    </ul>
                </Fragment>
            )}
        </>
    )
}
