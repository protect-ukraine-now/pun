import style from './style.module.scss'
import { useLanguage, useText } from 'src/tools/language'
import { latestReport, inventoryReport } from 'src/data/report'
import { formatDate } from 'src/tools/date'
import WeaponsTable from '../WeaponsTable'

let data = inventoryReport()

export default function WeaponsInventory({ className }) {
    const language = useLanguage()
    const text = useText()
    const formatter = formatDate(language)
    let till = formatter(latestReport.till)
    let title = text('inventory.title', { till })
    let subtitle = (
        <div className={style.subtitle}>
            {text('inventory.subtitle', { till })}
        </div>
    )
    let head = [text('inventory.possessed'), text('inventory.pda')]
    let description = text('inventory.description')
    return <WeaponsTable {...{ title, subtitle, head, data, description, className }} />
}
