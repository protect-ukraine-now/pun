import { useEffect } from 'react'
import cn from 'clsx'
import { useSubmit, PageProps, ActionContext, Head } from 'rakkasjs'
import Markdown from 'markdown-to-jsx'

import { useText } from 'src/tools/language'
import Article from 'src/components/Article'
import Container from 'src/components/Container'
import style from './style.module.scss'

const API_URL = 'https://content-civicinfo.googleapis.com/civicinfo/v2/'
const API_KEY = 'AIzaSyCSvWsU49SRTe5oeWTdBCNVDYSl9drIsIw'

export async function action(ctx: ActionContext) {
	let formData = await ctx.requestContext.request.formData()
	let address = ['street', 'city', 'zip_code'].map(x => formData.get(x)).join(' ')
	console.log(address)
	let params = new URLSearchParams({
		address,
		roles: 'legislatorLowerBody',
		levels: 'country',
		key: API_KEY,
	})
	params.append('roles', 'legislatorUpperBody')

	let data = await fetch(API_URL + 'representatives?' + params)
		.then(x => x.json())

	if (data.error) return { data: { err: data.error } }

	console.log(data)
	let { divisions, offices, officials } = data
	offices.forEach(office => {
		office.officialIndices.forEach(idx => {
			let official = officials[idx]
			official.office = office.name
			official.division = divisions[office.divisionId].name
			delete official.address
		})
	})

	return { data: officials }
}

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

export default function Congress({ actionData }: PageProps) {
	console.warn(actionData)
	const { submitHandler } = useSubmit()
	const text = useText()

	function onAddressChange(e) {
		let id = 'form-' + e.target.name
		let el = document.getElementById(id)
		if (!el) return
		el.value = e.target.value
	}

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

	return (
		<Container className={style.container}>
			<section className={cn(style.section, style.banner)}>
				<h2 className={style.title}>
					{text('congress.header')}
					<br /><span className={style.mobile}>&nbsp;</span>
				</h2>
			</section>
			<section className={cn(style.section, style.explanation)}>
				<Article>
					<Markdown>
						{text('congress.description')}
					</Markdown>
				</Article>
				<form method="POST" onSubmit={submitHandler}>
					<input
						type="text"
						name="street"
						placeholder="Street Address"
						autoComplete="street-address"
						onChange={onAddressChange}
					/>
					<input
						type="text"
						name="city"
						placeholder="City"
						autoComplete="address-level2"
						onChange={onAddressChange}
					/>
					<input
						type="text"
						name="zip_code"
						placeholder="Zip/Postal Code"
						autoComplete="postal-code"
						onChange={onAddressChange}
					/>
					<button type="submit">{text('congress.search')}</button>
					{actionData?.err && <p style={{ color: "red" }}>{actionData.err.message}</p>}
					{actionData?.length && actionData.map(o =>
						<div key={o.name} style={{ paddingTop: 20 }}>
							<img src={o.photoUrl} />
							<div>{o.name}</div>
							<div>{o.office}</div>
							<div>{o.division}</div>
							<div>{o.party}</div>
							{o.phones?.map((p, i) => <a key={i} href={'tel:' + p} style={{ display: 'block' }}>{p}</a>)}
							{o.urls?.map((u, i) => <a key={i} href={u} style={{ display: 'block' }}>{u}</a>)}
							{o.channels?.map((c, i) => <div key={i}>{c.type}: {c.id}</div>)}
						</div>
					)}
				</form>
			</section>
			<section className={cn(style.section, style.explanation)}>
				<Article>
					<Markdown>
						{text('congress.letter')}
					</Markdown>
				</Article>
				<br />
				<Head>
					<link href="https://actionnetwork.org/css/style-embed-v3.css" rel="stylesheet" type="text/css" />
					<script src="https://actionnetwork.org/widgets/v5/letter/protect-ukraine-now?format=js&source=widget" defer type="text/javascript" />
				</Head>
				<div id='can-letter-area-protect-ukraine-now' style={{ width: '100%' }}></div>
			</section>
		</Container>
	)
}
