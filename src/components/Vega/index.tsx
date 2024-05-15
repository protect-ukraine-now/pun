import { useEffect, useRef } from 'preact/hooks'
import { clsx } from 'clsx'
import { View, parse } from 'vega'

import style from './style.module.scss'

export default function Vega({ spec, className }) {
	const ref = useRef()
	useEffect(() => {
		const view = new View(parse(spec), {
			container: ref.current,
			hover: true,
		})
		view.runAsync()
	}, [spec])
	return (
		<div className={clsx(style.container, className)}>
			<div className={style.chart} ref={ref} />
		</div>
	)
}

