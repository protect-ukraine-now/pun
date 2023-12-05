import { useEffect } from 'react'
import { clsx } from 'clsx'
import { View, parse } from 'vega'

import style from './style.module.scss'

export default function Vega({ id, spec, className }) {
	useEffect(() => {
		const view = new View(parse(spec), {
			renderer: 'canvas',  // renderer (canvas or svg)
			container: `#${id}`,   // parent DOM container
			hover: true       // enable hover processing
		})
		view.runAsync()
	}, [id, spec])
	return (
		<div className={clsx(style.container, className)}>
			<div id={id} className={style.chart} />
		</div>
	)
}

