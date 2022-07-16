import { h, Component } from 'preact'
import { Router } from 'preact-router'
import { Provider } from '@preact/prerender-data-provider'
// import Header from './header'

// Code-splitting is automated for routes
import Home from '../routes/home'
import Report from '../routes/report'
// import Contact from '../routes/contact'
// import ContactSuccess from '../routes/contact-success'
import NotFoundPage from '../routes/notfound'

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](https://github.com/preactjs/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => this.currentUrl = e.url

	render(props) {
		return (
			<Provider value={props}>
				<div id="app">
					{/* <Header /> */}
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Report path="/report/:date" />
						{/* <Contact path="/contact/" /> */}
						{/* <ContactSuccess path="/contact/success" /> */}
						<NotFoundPage type="404" default />
					</Router>
				</div>
			</Provider>
		)
	}
}

// export default function App(props) {
// 	return (
// 		<Provider value={props}>
// 			<div id="app">
// 				{/* <Header /> */}
// 				<Router>
// 					<Home path="/" />
// 					<Report path="/report/:date" />
// 					{/* <Contact path="/contact/" /> */}
// 					{/* <ContactSuccess path="/contact/success" /> */}
// 					<NotFoundPage type="404" default />
// 				</Router>
// 			</div>
// 		</Provider>
// 	)
// }
