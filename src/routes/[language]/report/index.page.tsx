import { Link } from 'rakkasjs'

import punStyle from './pun.module.scss'
import uatStyle from './uat.module.scss'
import { useLanguage, useText } from 'src/tools/language'
import Container from 'src/components/Container'
import Summary from 'src/components/Summary'
import WeaponsBalance from 'src/components/WeaponsBalance'
import WeaponsIncome from 'src/components/WeaponsIncome'
import WeaponsInventory from 'src/components/WeaponsInventory'
import Banner from 'src/components/Banner'
import reportBannerImage from 'src/assets/banner-bg.webp'
import detectCountry from 'src/tools/detectCountry'
import { useApp } from 'src/tools/app'
import Vega from 'src/components/Vega'
import sankeyData from 'src/data/vega_sankey.json?init'

export default function Report() {
	const language = useLanguage()
	const text = useText()
	const country = detectCountry()
	const style = useApp() === 'pun' ? punStyle : uatStyle

	return (
		<>
			<Container className={style.container}>
				<Summary className={style.chart} />
				<WeaponsIncome className={style.table} />
				<WeaponsBalance className={style.table} />
				<WeaponsInventory className={style.table} />
			</Container>
			{process.env.VITE_APP_NAME === 'pun' && country === 'US' &&
				<Banner
					className={style.banner}
					title={text('report.banner_title')}
					image={reportBannerImage}
					action={
						<Link className={style.bannerBtn} href={`/${language}/letter`}>
							{text('report.banner_btn')}
						</Link>
					}
				/>
			}
			<Container className={style.chart}>
				<Vega id="test" spec={sankeyData} />
			</Container>
		</>
	)
}
