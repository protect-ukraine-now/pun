import { groupBy } from 'rambda'

import raw from './news.json'

export function prepareNews(language) {
    let news = raw.map(([date, en, uk, source]) => ({
        date,
        text: { en, uk }[language],
        source,
    }))
    // console.log(news)
    return groupBy(({ date }) => date, news)
}
