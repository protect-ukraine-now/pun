import { h } from 'preact'
import { Router } from 'preact-router'
import { Provider } from '@preact/prerender-data-provider'
import Header from './header'

// Code-splitting is automated for routes
import Home from '../routes/home';
// import Blogs from '../routes/blogs';
// import Blog from '../routes/blog';
// import Contact from '../routes/contact';
// import ContactSuccess from '../routes/contact-success';
import NotFoundPage from '../routes/notfound'

export default function App() {
	return (
		<Provider>
			<div id="app">
				{/* <Header /> */}
				<Router>
					<Home path="/" />
					{/* <Blogs path="/blogs/" />
					<Blog path="/blog/:name" />
					<Contact path="/contact/" />
					<ContactSuccess path="/contact/success" /> */}
					<NotFoundPage type="404" default />
				</Router>
			</div>
		</Provider>
	)
}
