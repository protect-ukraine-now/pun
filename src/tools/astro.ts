import { useLocation } from "./location"

export function setup(Astro) {
	useLocation(Astro)
	if (import.meta.env.PROD) {
		Astro.response.headers.set('Cache-Control', 'public, max-age=3600')
	}
}
