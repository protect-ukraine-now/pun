import { useEffect } from 'preact/hooks'
import cn from 'classnames'
import Helmet from 'preact-helmet'
import Markdown from 'markdown-to-jsx'

import { translate } from '../../tools/language'
import Article from '../../components/Article'
import detectCountry from '../../tools/detectCountry'
import Container from '../../components/Container'
import style from './style.scss'

const checks = [
	/Foreign Affairs/i,
	/Foreign Relations/i,
	/International Affairs/i,
	/International Relations/i,
	/Military/i,
	/Armed Forces/i,
	/National Security/i,
	/Defense/i,
	/Other/i,
]

function chooseTopic(topics) {
	console.log(topics)
	for (let check of checks) {
		let found = topics.find(t => check.test(t.text))
		console.log({ check }, found)
		if (found) {
			return found
		}
	}
}

export default function Letter() {
	useEffect(() => {
		let timer = setInterval(() => {
			let selects = document.querySelectorAll('select[placeholder="$TOPIC"]')
			if (selects.length) {
				console.log('selects found', selects.length)
				clearInterval(timer)
			}
			selects.forEach(select => {
				let options = Array.from(select.children).map(o => ({
					text: o.innerText,
					value: o.value,
				}))
				let best = chooseTopic(options)
				if (best) {
					select.value = best.value
					select.parentNode.style = 'display: none'
				}
			})
		}, 200)
		return () => clearInterval(timer)
	}, [])

	let country = detectCountry()
	return (<>
		<Helmet
			link={[
				{ href: 'https://actionnetwork.org/css/style-embed-v3.css', rel: 'stylesheet', type: 'text/css' },
			]}
			script={[
				{ defer: true, src: 'https://actionnetwork.org/widgets/v5/letter/protect-ukraine-now?format=js&source=widget', type: 'text/javascript' },
			]}
		/>
		<Container className={style.container}>
			<section className={cn(style.section, style.banner)}>
				<h2 className={style.title}>
					{translate('letter.header')}
					<br /><span className={style.mobile}>&nbsp;</span>
				</h2>
			</section>
			<section className={cn(style.section, style.explanation)}>
				<Article>
					<Markdown>
						{translate('letter.description')}
					</Markdown>
				</Article>
				<br />
				{country && country !== 'US' &&
					<h3>(if you are a U.S. citizen and have a U.S. address)</h3>
				}
				<div id='can-letter-area-protect-ukraine-now' style='width: 100%'></div>
			</section>
		</Container>
	</>)
}
