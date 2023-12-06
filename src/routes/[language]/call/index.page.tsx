import cn from 'clsx'
import { indexBy, groupBy } from 'rambda'
import { useSubmit, PageProps, ActionContext } from 'rakkasjs'
import Markdown from 'markdown-to-jsx'

import { useText } from 'src/tools/language'
import Article from 'src/components/Article'
import Container from 'src/components/Container'
import style from './style.module.scss'
import members from 'src/data/members.json'

const API_URL = 'https://content-civicinfo.googleapis.com/civicinfo/v2/'
const API_KEY = 'AIzaSyCSvWsU49SRTe5oeWTdBCNVDYSl9drIsIw'

const officialsByName = indexBy(({ first_name, middle_name, last_name, suffix }) =>
	[first_name, middle_name, last_name, suffix].filter(x => x).join(' ')
, members.members)

const officialsByDivision = groupBy(({ state, district }) =>
	[state, district?.replace('At-Large', '')].filter(x => x).join('-')
, members.members)

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

			let o = officialsByName[official.name]
			if (!o) {
				try {
					const { state, cd } = Object.fromEntries(office.divisionId.split('/').map(x => x.split(':')))
					const id = [state.toUpperCase(), cd].filter(x => x).join('-')
					o = officialsByDivision[id].find(o => ~official.name.indexOf(o.last_name))
					if (!o) console.log('NOT FOUND', id)
				} catch(e) {
					console.error(e)
				}
			}
			official.committees = o?.committees?.map(({ name }) => name)

			delete official.urls
			delete official.channels
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
	const { submitHandler } = useSubmit({
		onSettled() {
			const scrollTo = window.scrollTo
			window.scrollTo = x => x
			setTimeout(() => {
				window.scrollTo = scrollTo
			}, 100)
		}
	})
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
						{text('call.motivation')}
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
							className="pt-8 flex gap-4 line-height-relaxed"
							key={o.name}
						>
							<div className="w-20 sm:w-30 lg:w-40 xl:w-50 shrink-0">
								{o.photoUrl
									?
									<img
										className="w-full"
										src={o.photoUrl}
									/>
									:
									<div className="i-healthicons-person-negative text-20 sm:text-30 lg:text-40 xl:text-50" />
								}
							</div>
							<div>
								<div className="text-lg font-bold">{o.name}</div>
								<div>{o.office}</div>
								<div>{o.division}</div>
								<div>{o.party}</div>
								{o.committees?.map((name, i) =>
									<div
										className={name === 'Committee on Appropriations' ? 'font-bold' : ''}
										key={i}
									>
										{name}
									</div>
								)}
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
											className={`${icon} text-2xl m-1 mt-2`}
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
						{text('call.explanation')}
					</Markdown>
				</Article>
			</section>
		</Container>
	)
}
//>