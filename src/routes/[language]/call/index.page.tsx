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

	let data = await fetch(API_URL + 'representatives?' + params).then(x => x.json())

	if (data.error) return { data: { err: data.error } }

	console.log(data)
	let { divisions, offices, officials } = data
	offices.forEach(office => {
		office.officialIndices.forEach(idx => {
			let official = officials[idx]
			official.office = office.name
			official.division = divisions[office.divisionId].name
			let { channels = [], urls = [] } = official
			let links = {}
			urls.forEach(url => {
				if (~url.indexOf('senate.gov') || ~url.indexOf('house.gov')) {
					links.gov = url
				}
				if (~url.indexOf('wikipedia.org')) {
					links.wiki = url
				}
			})
			channels.forEach(({ type, id }) => {
				type = type.toLowerCase()
				if (type === 'facebook' || type === 'twitter') {
					links[type] = `https://${type}.com/${id}`
				}
			})
			official.links = links
			// delete official.urls
			// delete official.channels
			delete official.address
		})
	})

	return { data: officials }
}

const links = {
	gov: 'i-map-local-government',
	wiki: 'i-mdi-wikipedia',
	facebook: 'i-mdi-facebook',
	twitter: 'i-mdi-twitter',
}

export default function Congress({ actionData }: PageProps) {
	actionData && console.warn(actionData)
	const { submitHandler } = useSubmit()
	const text = useText()

	// function onAddressChange(e) {
	// 	let id = 'form-' + e.target.name
	// 	let el = document.getElementById(id)
	// 	if (!el) return
	// 	el.value = e.target.value
	// }

	return (
		<Container className={style.container}>
			<section className={cn(style.section, style.banner)}>
				<h2 className={style.title}>
					{text('call.header')}
					<br /><span className={style.mobile}>&nbsp;</span>
				</h2>
			</section>
			<section className={cn(style.section, style.explanation)}>
				<Article>
					<Markdown>
						{text('call.description')}
					</Markdown>
				</Article>
			</section>
			<section className={cn(style.section)}>
				<form
					className="flex flex-col xl:flex-row flex-wrap justify-center gap-sm"
					method="POST"
					onSubmit={submitHandler}
				>
					<input
						className="input input-bordered"
						type="text"
						name="street"
						placeholder="Street Address"
						autoComplete="street-address"
						// onChange={onAddressChange}
					/>
					<input
						className="input input-bordered"
						type="text"
						name="city"
						placeholder="City"
						autoComplete="address-level2"
						// onChange={onAddressChange}
					/>
					<input
						className="input input-bordered"
						type="text"
						name="zip_code"
						placeholder="Zip/Postal Code"
						autoComplete="postal-code"
						// onChange={onAddressChange}
					/>
					<button
						className="btn btn-neutral"
						type="submit"
					>
						<span className="i-mdi-search text-xl" />
						{text('call.search')}
					</button>
				</form>
				{actionData?.err &&
					<p style={{ color: "red" }}>
						{actionData.err.message}
					</p>
				}
				<ul>
					{actionData?.length && actionData.map(o =>
						<li
							className="p4 flex gap-4 line-height-relaxed"
							key={o.name}
						>
							<div className="w-40">
								{o.photoUrl
									?
									<img
										className="w-full rounded"
										src={o.photoUrl}
									/>
									:
									<div
										className="i-mdi-person text-9xl w-full"
									/>
								}
							</div>
							<div>
								<div className="text-lg font-bold">{o.name}</div>
								<div>{o.office}</div>
								<div>{o.division}</div>
								<div>{o.party}</div>
								{o.phones?.map((p, i) =>
									<a
										className="text-lg block"
										href={'tel:' + p}
										key={i}
									>
										{p}
									</a>
								)}
								{Object.entries(links).map(([type, icon]) => {
									const href = o.links[type]
									if (!href) return null
									return (
										<a
											className={`${icon} text-4xl m-1 mt-2`}
											href={href}
											target="_blank"
											rel="noreferrer"
											key={type}
										/>
									)
								})}
							</div>
						</li>
					)}
				</ul>
			</section>
			<section className={cn(style.section, style.explanation)}>
				<Article>
					<Markdown>
						{text('call.message')}
					</Markdown>
				</Article>
			</section>
		</Container>
	)
}
//>