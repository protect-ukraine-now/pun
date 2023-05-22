import { useEffect, useMemo, useRef } from 'react'
import useWindowSize from './useWindowSize'

export default (trigger, callback?) => {
	const { width, height } = useWindowSize()
	const bodyRef = useRef()

	const style = useMemo(
		() => (bodyRef.current && width && height ? getComputedStyle(bodyRef.current) : null),
		[width, height],
	)

	useEffect(() => {
		bodyRef.current = document?.body
		if (document && style) {
			if (trigger) {
				document.body.style.overflow = 'hidden'
				if (typeof callback === 'function') {
					callback()
				}
			} else if (style.overflow !== 'auto') {
				document.body.style.overflow = 'auto'
			}
		}
	}, [trigger, style])

	return
}
