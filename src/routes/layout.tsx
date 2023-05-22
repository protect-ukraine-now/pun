import { Head, Layout } from 'rakkasjs'
import 'reset-css'

import 'src/style/index.module.scss'
import { useLanguage } from 'src/tools/language'
import logo1 from 'src/assets/logo/logo-horizontal-light.svg'
import logo2 from 'src/assets/logo/logo-dark-horizontal.svg'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

console.log('app:', import.meta.env.VITE_APP_NAME)

const config = {
	pun: {
		header: {
			logo: logo1,
			menu: ['news', 'report', 'letter', 'about'],
			languages: { en: 'ENG', uk: 'УКР' },
		},
		footer: {
			logo: logo2,
			email: 'contact@ProtectUkraineNOW.org',
		},
	},
	uat: {
		header: {
			logo: logo1,
			menu: ['news', 'report', 'about'],
		},
		footer: {
			logo: logo2,
			email: 'contact@UkraineAidTracker.org',
		},

	}
}

const MainLayout: Layout = ({ children }) => {
	const language = useLanguage()
	const { header, footer } = config[import.meta.env.VITE_APP_NAME ?? 'pun']
	return <>
		<Head prioritizeSeoTags>
			<html lang={language} />
			<title lang="en">Protect Ukraine NOW</title>
		</Head>
		<Header {...header} />
		{children}
		<Footer {...footer} />
	</>
}

export default MainLayout
