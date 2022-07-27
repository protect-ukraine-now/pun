import { useEffect } from 'preact/hooks'
import { route } from 'preact-router';
import detectCountry from '../../tools/detectCountry'

export default function Home(props) {
	// console.log('Home', props)

	/**
	 * Netlify CMS's accept invite link land on home page.
	 * This redirection takes it to the right place(/admin).
	 */
	useEffect(() => {
		if (global.window && window.location.href.includes('#invite_token')) {
			const { href } = window.location
			window.location.href = `${href.substring(0, href.indexOf('#'))}admin${href.substring(href.indexOf('#'))}`
		}
	}, [])

	useEffect(() => {
		if (!global.window) return // prerendering
		let country = detectCountry()
		let map = {
			US: '/en/letter',
			UA: '/ua/report',
			other: '/en/report',
		}
		route(map[country] || '/en/letter', true); // replaces the current history entry
	}, [])

	return <div style={{ height: '100%' }} />
}

