import 'reset-css'
import { Router } from 'preact-router'

import './style'
import './tools/scrollToTopOnNavigation'
import { LanguageProvider } from './tools/language'
import Header from './components/Header'
import Footer from './components/Footer'

// Code-splitting is automated for "routes"
import About from './routes_/about'
import News from './routes_/news'
import Report from './routes_/report'

const config = {
	menu: ['news', 'report', 'about'],
}

export default function App(props) {
	console.log(' App', props.url)
	return (
		<div id="preact_root" style={{ height: '100%' }}>
			<LanguageProvider>
				<Header {...config} />
				<Router>
					<News path="/:language/news" />
					<Report path="/:language/report" />
					<About path="/:language/about" />
					<Report default />
				</Router>
				<Footer email="contact@UAAid.org" />
			</LanguageProvider>
		</div>
	)
}
