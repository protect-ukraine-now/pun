// import 'reset-css'
import { Provider as DataProvider } from '@preact/prerender-data-provider'
import { Router } from 'preact-router'

import './index.css'
import './style'
import { UrlProvider } from './tools/url'
import { LanguageProvider } from './tools/language'
import Header from './components/Header'
import Footer from './components/Footer'

// Code-splitting is automated for routes
import Home from './routes/home'
import Letter from './routes/letter'
import Report from './routes/report'
import NotFoundPage from './routes/notfound'

export default function App(props) {
	return (
		<div id="preact_root" style={{ height: '100%' }}>
			<DataProvider value={props}>
				<UrlProvider>
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
				</UrlProvider>
			</DataProvider>
		</div>
	)
}
