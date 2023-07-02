import { useState, useEffect } from 'react'
import { ClientOnly } from 'rakkasjs'
import AppendHead from 'react-append-head'
import { clsx } from 'clsx'

import style from './style.module.scss'

export default function Vega({ id, spec, className }) {
	const [loaded, setLoaded] = useState(false)
	useEffect(() => {
		if (!loaded) return
		window.vegaEmbed(`#${id}`, spec, { actions: false })
		// .then(result => {
		// 	console.log('Vega', result)
		// }).catch(console.error)
	}, [loaded, id, spec])
	return (
		<ClientOnly>
			<AppendHead onLoad={() => setLoaded(true)}>
				<script order="1" name="vega" src="https://cdn.jsdelivr.net/npm/vega@5"></script>
				<script order="2" name="vega-lite" src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
				<script order="3" name="vega-embed" src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
			</AppendHead>
			<div className={clsx(style.container, className)}>
				<div id={id} className={style.chart} />
			</div>
		</ClientOnly>
	)
}

