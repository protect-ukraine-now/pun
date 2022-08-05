function news({ news }, { from, till, language }) {
    news = news.map(([id, date, en, ua, author, source, status]) => ({
        date,
        text: { en, ua }[language],
        source,
        status,
    }))
    // console.log(news)
    news = news.filter(({ date, text, status }) =>
        date >= from && date <= till
        && text !== ''
        && (status === 'Translated' || status === 'Published')
    )
    // console.log(news)
    return news.sort((a, b) => new Date(a.date) - new Date(b.date))
}

module.exports = news