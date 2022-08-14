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
import Home from './routes/home'
import Letter from './routes/letter'
import Report from './routes/report'
import NotFoundPage from './routes/notfound'

export default function App(props) {
	console.log('App', props)
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
									<Home path="/" />
									<Letter path="/:language/letter" />
									<Report path="/:language/report/:date?" />
									<NotFoundPage type="404" default />
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
