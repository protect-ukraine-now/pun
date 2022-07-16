import { h } from 'preact'
import { Link } from 'preact-router'
import { usePrerenderData } from '@preact/prerender-data-provider'
import Dashboard from "../../components/Dashboard"

export default function Report(props) {
	const [{ date, data, digest }, isLoading] = usePrerenderData(props)
	return !isLoading && (
        <>
            Heavy weapons committed to Ukraine as of {date}
		    <Dashboard {...{ data }} />
			{digest}
        </>
	)
}