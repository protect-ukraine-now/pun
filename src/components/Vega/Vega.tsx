import { useEffect, useRef } from 'preact/hooks'
import { View, parse } from 'vega'

export default function Vega({ spec }) {
	const ref = useRef()
	useEffect(() => {
		const view = new View(parse(spec), {
			container: ref.current,
			renderer: 'svg',
			hover: true,
		})
		view.runAsync()
	}, [spec])
	return (
		<div className="w-full h-full" ref={ref} />
	)
}

