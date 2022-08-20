function news({ news }, { language }) {
    news = news.map(([date, en, ua, source]) => ({
        date,
        text: { en, ua }[language],
        source,
    }))
    // console.log(news)
    return news.sort((a, b) => new Date(b.date) - new Date(a.date))
}

module.exports = news