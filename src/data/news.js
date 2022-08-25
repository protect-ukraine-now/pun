import { groupBy } from 'rambda'

import raw from './news.json'

export function prepareNews(language) {
    let news = raw.map(([date, en, ua, source]) => ({
        date,
        text: { en, ua }[language],
        source,
    }))
    // console.log(news)
    news.sort((a, b) => new Date(b.date) - new Date(a.date))
    return groupBy(({ date }) => date, news)
}
