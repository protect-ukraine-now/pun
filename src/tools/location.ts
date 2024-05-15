let Astro
export function useLocation(astro = null) {
	Astro = astro ?? Astro
	const url = Astro?.url ?? location
	// console.log('location', url)
	return url
}
