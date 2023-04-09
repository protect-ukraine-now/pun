import { useEffect } from 'preact/hooks'
import { route } from 'preact-router'

import style from './style.scss'
import { useLanguage } from '../../tools/language'
import { useUrl } from '../../tools/url'
import Container from '../../components/Container'
import Summary from '../../components/Summary'
import WeaponsBalance from '../../components/WeaponsBalance'
import WeaponsIncome from '../../components/WeaponsIncome'
import WeaponsInventory from '../../components/WeaponsInventory'
import AidChart from '../../components/AidChart'
import Banner from '../../components/Banner'
import { Link } from 'preact-router'
import { Text } from 'preact-i18n'
import reportBannerImage from '../../assets/banner-bg.webp'
import detectCountry from '../../tools/detectCountry'

export default function Report() {
	const language = useLanguage()
	const country = detectCountry()
	const url = useUrl()

	useEffect(() => {
		if (url === '/') {
			route('/en/report', true) // replace the current history entry
		}
	}, [])

	return (
		<>
			<Container className={style.container}>
				<Summary className={style.chart} />
				<WeaponsIncome className={style.table} />
				<WeaponsBalance className={style.table} />
				<WeaponsInventory className={style.table} />
			</Container>
			{process.env.PREACT_APP_NAME === 'pun' && country === 'US' &&
				<Banner
					className={style.banner}
					title={<Text id="report.banner_title">Protect Ukraine now before it's too late!</Text>}
					image={reportBannerImage}
					action={
						<Link className={style.bannerBtn} href={`/${language}/letter`}>
							<Text id="report.banner_btn">Click here</Text>
						</Link>
					}
				/>
			}
			<Container className={style.chart}>
				<AidChart />
			</Container>
		</>
	)
}
