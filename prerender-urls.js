const preparePages = require('./src/data/prepare')

module.exports = async () => {
	try {
		return await preparePages()
	} catch (e) {
		console.error('prerender', e)
		throw e
	}
}
