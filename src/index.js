import 'reset-css'
import { Provider as DataProvider } from '@preact/prerender-data-provider'
import { Match } from 'preact-router/match'
import { Router } from 'preact-router'

import './index.css'
import './style'
import { setUrl } from './tools/url'
import { LanguageProvider } from './tools/language'
import Header from './components/Header'
import Footer from './components/Footer'

// Code-splitting is automated for routes
import About from './routes_/about'
import Home from './routes_/home'
import News from './routes_/news'
import Letter from './routes_/letter'
import Report from './routes_/report'
import NotFoundPage from './routes_/notfound'

export default function App(props) {
	// console.log('App', props)
	return (
		<div id="preact_root" style={{ height: '100%' }}>
			<DataProvider value={props}>
				<Match>
					{({ url }) => {
						setUrl(url)
						return (
							<LanguageProvider>
								<Header />
								<Router>
									{/* <Home path="/:language?" /> */}
									<News path="/:language/news" />
									<Report path="/:language/report" />
									<Letter path="/:language/letter" />
									<About path="/:language/about" />
									<Home default />
								</Router>
								<Footer />
							</LanguageProvider>
						)
					}}
				</Match>
			</DataProvider>
		</div>
	)
}
