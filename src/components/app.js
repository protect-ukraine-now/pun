import { h } from 'preact'
import { Router } from 'preact-router'
import { Provider } from '@preact/prerender-data-provider'
// import Header from './header'

// Code-splitting is automated for routes
import Home from '../routes/home'
import Report from '../routes/report'
// import Contact from '../routes/contact'
// import ContactSuccess from '../routes/contact-success'
import NotFoundPage from '../routes/notfound'
import Dashboard from './Dashboard'

function Test() {
	return <NotFoundPage />
}

export default function App(props) {
	console.log('App', props, Home)
	// return 'App'
	return (
		<Provider value={props}>
			<div id="app">
				{/* <Header /> */}
				<Router>
					{/* <Home path="/" /> */}
					{/* <Report path="/report/:date" /> */}
					{/* <Contact path="/contact/" /> */}
					{/* <ContactSuccess path="/contact/success" /> */}
					<NotFoundPage type="404" default />
				</Router>
			</div>
		</Provider>
	)
}
