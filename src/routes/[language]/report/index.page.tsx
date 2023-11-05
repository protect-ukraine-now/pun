import { Link, ClientOnly } from 'rakkasjs'

import punStyle from './pun.module.scss'
import uatStyle from './uat.module.scss'
import { useApp } from 'src/tools/app'
import { useLanguage, useText } from 'src/tools/language'
import detectCountry from 'src/tools/detectCountry'
import Container from 'src/components/Container'
import WeaponsBalance from 'src/components/WeaponsBalance'
import WeaponsIncome from 'src/components/WeaponsIncome'
import WeaponsInventory from 'src/components/WeaponsInventory'
import Banner from 'src/components/Banner'
import reportBannerImage from 'src/assets/banner-bg.webp'
import SankeyChart from 'src/components/SankeyChart'
import PdaChart from 'src/components/PdaChart'
import Summary from 'src/components/Summary'

export default function Report() {
	const language = useLanguage()
	const text = useText()
	const country = detectCountry()
	const app = useApp()
	const style = app === 'pun' ? punStyle : uatStyle

	return (
		<>
			<Container className={style.container}>
				<Summary />
				<WeaponsIncome />
				<WeaponsBalance />
				<WeaponsInventory />
			</Container>
			{app === 'pun' && country === 'US' &&
				<ClientOnly fallback="">
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
				</ClientOnly>
			}
			<Container className={style.container}>
				<SankeyChart />
			</Container>
			<Container className={style.container}>
				<PdaChart />
			</Container>
		</>
	)
}
