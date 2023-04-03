const pages = require('./src/data/pages')

module.exports = async () => {
	console.log('prerender', process.env.PREACT_APP_NAME)
	try {
		return await pages(...{
			uaaid: [['news', 'report'], ['en']],
			pun: [['news', 'report', 'letter'], ['en', 'uk']],
		}[process.env.PREACT_APP_NAME])
	} catch (e) {
		console.error('prerender', e)
		throw e
	}
}
