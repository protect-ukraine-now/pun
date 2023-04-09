import 'reset-css'
import { Router } from 'preact-router'

import './style'
import './tools/scrollToTopOnNavigation'
import logo1 from './assets/icons/logo-horizontal-light.svg'
import logo2 from './assets/icons/logo-dark-horizontal.svg'
import { LanguageProvider } from './tools/language'
import Header from './components/Header'
import Footer from './components/Footer'

// Code-splitting is automated for routes
import About from './routes_/about'
import Home from './routes_/home'
import News from './routes_/news'
import Letter from './routes_/letter'
import Report from './routes_/report'

const header = {
	logo: logo1,
	menu: ['news', 'report', 'letter', 'about'],
	languages: { en: 'ENG', uk: 'УКР' },
}

const footer = {
	logo: logo2,
	email: 'contact@ProtectUkraineNOW.org',
}

export default function App(props) {
	console.log(props?.CLI_DATA?.preRenderData)
	return (
		<div id="preact_root" style={{ height: '100%' }}>
			<LanguageProvider>
				<Header {...header} />
				<Router>
					<News path="/:language/news" />
					<Report path="/:language/report" />
					<Letter path="/:language/letter" />
					<About path="/:language/about" />
					<Home default />
				</Router>
				<Footer {...footer} />
			</LanguageProvider>
		</div>
	)
}
