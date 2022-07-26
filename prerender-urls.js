const { preparePages } = require('./src/data/prepare.js')

module.exports = async () => {
	try {
		return await preparePages()
	} catch (e) {
		console.error('prerender', e)
		throw e
	}
}
