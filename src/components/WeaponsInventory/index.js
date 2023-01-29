import { Text } from 'preact-i18n'

import style from './style.scss'
import { translate } from '../../tools/language'
import { latestReport, inventoryReport } from '../../data/report'
import { formatDate } from '../../tools/date'
import WeaponsTable from '../WeaponsTable'

let data = inventoryReport()

export default function WeaponsInventory({ language, className }) {
    const formatter = formatDate(language)
    let till = formatter(latestReport.till)
    let title = <Text id="inventory.title" fields={{ till }} />
    let subtitle = <div className={style.subtitle}><Text id="inventory.subtitle" fields={{ till }} /></div>
    let head = [<Text id="inventory.possessed" />, <Text id="inventory.pda" />]
    let description = translate('inventory.description')
    return <WeaponsTable {...{ title, subtitle, head, data, description, className }} />
}
