import { Text } from 'preact-i18n'

import { latestReport, inventoryReport } from '../../data/report'
import { formatDate } from '../../tools/date'
import WeaponsTable from '../WeaponsTable'

let data = inventoryReport()

console.log(data)

export default function WeaponsInventory({ language }) {
    const formatter = formatDate(language)
    let till = formatter(latestReport.till)
    let title = <Text id="inventory.title" fields={{ till }} />
    let subtitle = <Text id="inventory.subtitle" fields={{ till }} />
    let head = ["Supply", "PDA"]
    let description = <Text id="inventory.description" />
    return <WeaponsTable {...{ title, subtitle, head, data, description }} />
}