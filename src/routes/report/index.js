import { Link } from 'preact-router'
import { usePrerenderData } from '@preact/prerender-data-provider'
import Dashboard from "../../components/dashboard"

export default function Report(props) {
	const [data, isLoading] = usePrerenderData(props)
	// console.log('Report', props, data, isLoading)
	if (isLoading) return
	const { date, prev, next, digest } = data.data
	return (
        <>
			{prev && <Link href={`/report/${prev}`}>Prev report</Link>}
			{next && <Link href={`/report/${next}`}>Next report</Link>}
            <div>Heavy weapons committed to Ukraine as of {date}</div>
		    <Dashboard data={data.data.data} />
			{/* {digest} */}
        </>
	)
}