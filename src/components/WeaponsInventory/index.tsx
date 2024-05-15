import { useLanguage, useText } from '@tools/language'
import { latestReport, inventoryReport } from '@data/report'
import { formatDate } from '@tools/date'
import WeaponsTable from '../WeaponsTable'
import { Fragment } from 'preact'

let data = inventoryReport()

function Details({ byModel }) {
    console.log(byModel)
    return <>
        {byModel.map(({ model, possessed, committed }, i) =>
            <Fragment key={i}>
                <div className="py-1">
                    <a
                        className="decoration-none"
                        href={`https://www.google.com/search?q=${model}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {model}
                    </a>
                </div>
                <div className="text-center py-1">
                    {possessed}
                </div>
                <div className="text-center py-1">
                    {committed}
                </div>
            </Fragment>
        )}
    </>
}

export default function WeaponsInventory({ children }) {
    const text = useText()
    const formatter = formatDate(useLanguage())
    const from = formatter('2022-02-24')
    const till = formatter(latestReport.till)
    const title = text('inventory.title')
    const subtitle = text('inventory.subtitle', { from, till })
    const head = [text('inventory.possessed'), text('inventory.pda')]
    const description = text('inventory.description')
    return <WeaponsTable {...{ title, subtitle, head, data, description: children, Details }} />
}
