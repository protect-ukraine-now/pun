import { h } from 'preact'
import { Link } from 'preact-router'
import { usePrerenderData } from '@preact/prerender-data-provider'
import Dashboard from "../../components/Dashboard"

export default function Report(props) {
	// const [{ data }, isLoading] = usePrerenderData(props)
	const [{ data }, isLoading] = [{ data: {} }]
	console.log('Report', data)
	const { date, prev, next, digest } = data
	return !isLoading && (
        <>
			{prev && <Link href={`/report/${prev}`}>Prev report</Link>}
			{next && <Link href={`/report/${next}`}>Next report</Link>}
            <div>Heavy weapons committed to Ukraine as of {date}</div>
		    <Dashboard data={data.data} />
			{/* {digest} */}
        </>
	)
}