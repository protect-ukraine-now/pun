import { useLanguage, useText } from 'src/tools/language'
import { latestReport, inventoryReport } from 'src/data/report'
import { formatDate } from 'src/tools/date'
import WeaponsTable from '../WeaponsTable'

let data = inventoryReport()

export default function WeaponsInventory() {
    const text = useText()
    const formatter = formatDate(useLanguage())
    const from = formatter('2022-02-24')
    const till = formatter(latestReport.till)
    const title = text('inventory.title')
    const subtitle = text('inventory.subtitle', { from, till })
    const head = [text('inventory.possessed'), text('inventory.pda')]
    const description = text('inventory.description')
    return <WeaponsTable {...{ title, subtitle, head, data, description }} />
}
