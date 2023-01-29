import { Text } from 'preact-i18n'
import UA from 'country-flag-icons/react/1x1/UA'
import RU from 'country-flag-icons/react/1x1/RU'

import style from './style.scss';
import { balanceReport } from '../../data/report'
import { formatDate } from '../../tools/date'
import { translate } from '../../tools/language'
import WeaponsTable from '../WeaponsTable'

let data = balanceReport()

export default function WeaponsCommitments({ language, className }) {
    const formatter = formatDate(language)
    let till = formatter('2022-02-24')

    let title = (
        <Text id="balance.title" fields={{ till }}>
            Weapons possessed
        </Text>
    )

    let subtitle = (
      <div className={style.subtitle}>
        <Text id="balance.subtitle" fields={{ till }}>
            as of {till}
        </Text>
      </div>
    )

    let head = [
        <RU className={style.countryFlag} title={translate('country.ru')} />,
        <UA className={style.countryFlag} title={translate('country.ua')} />,
    ]

    let description = translate('balance.description')

    return <WeaponsTable {...{ title, subtitle, head, data, description, className }} />
}
