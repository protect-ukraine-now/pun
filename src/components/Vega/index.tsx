import AppendHead from 'react-append-head'
import { clsx } from 'clsx'

import styles from './style.module.scss'

export default function Vega({ id, spec, className }) {
	function draw() {
		window.vegaEmbed(`#${id}`, spec).then(result => {
			console.log('Vega', result)
		}).catch(console.error)
	}
	return <>
		<AppendHead onLoad={draw}>
			<script order="1" name="vega" src="https://cdn.jsdelivr.net/npm/vega@5"></script>
			<script order="2" name="vega-lite" src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
			<script order="3" name="vega-embed" src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
		</AppendHead>
		<div id={id} className={clsx(styles.chart, className)} />
	</>
}

