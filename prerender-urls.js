const pages = require('./src/data/pages')

module.exports = async () => {
	try {
		return await pages()
	} catch (e) {
		console.error('prerender', e)
		throw e
	}
}
