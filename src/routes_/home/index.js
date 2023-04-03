import { useEffect } from 'preact/hooks'
import { route } from 'preact-router'

import detectCountry from '../../tools/detectCountry'
import Container from '../../components/Container'

export default function Home() {
	/**
	 * Netlify CMS's accept invite link land on home page.
	 * This redirection takes it to the right place(/admin).
	 */
	// useEffect(() => {
	// 	if (global.window && window.location.href.includes('#invite_token')) {
	// 		const { href } = window.location
	// 		window.location.href = `${href.substring(0, href.indexOf('#'))}admin${href.substring(href.indexOf('#'))}`
	// 	}
	// }, [])

	useEffect(() => {
		if (!global.window) return // prerendering
		let country = detectCountry()
		let map = {
			US: '/en/letter',
			UA: '/uk/report',
		}
		route(map[country] || '/en/report', true) // replaces the current history entry
	}, [])

	return (
		<Container>
			<div style={{ height: 9999 }} />
		</Container>
	)
}
