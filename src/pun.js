import 'reset-css'
import { Router } from 'preact-router'

import './style'
import './tools/scrollToTopOnNavigation'
import { LanguageProvider } from './tools/language'
import Header from './components/Header'
import Footer from './components/Footer'

// Code-splitting is automated for routes
import About from './routes_/about'
import Home from './routes_/home'
import News from './routes_/news'
import Letter from './routes_/letter'
// import Candidates from './routes_/candidates'
import Report from './routes_/report'

const config = {
	menu: ['news', 'report', 'letter', 'about'],
	languages: { en: 'ENG', uk: 'УКР' },
}

export default function App(props) {
	// console.log(' App', props.url)
	return (
		<div id="preact_root" style={{ height: '100%' }}>
			<LanguageProvider>
				<Header {...config} />
				<Router>
					<News path="/:language/news" />
					<Report path="/:language/report" />
					<Letter path="/:language/letter" />
					<About path="/:language/about" />
					<Home default />
				</Router>
				<Footer email="contact@ProtectUkraineNOW.org" />
			</LanguageProvider>
		</div>
	)
}
