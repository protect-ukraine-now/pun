import './index.css'
import { Provider } from '@preact/prerender-data-provider'
import { Router } from 'preact-router';

// import './style';
// import Header from './components/header';
// import Footer from './components/footer';

// Code-splitting is automated for routes
import Home from './routes/home'
// import Report from './routes/report';
import NotFoundPage from './routes/notfound';

export default function App(props) {
	return (
    <div id="preact_root">
      <Provider value={props}>
        {/* <Header /> */}
        <Router>
          <Home path="/:language?" />
          {/* <Report path="/:language/report/:date" /> */}
          <NotFoundPage type="404" default />
        </Router>
        {/* <Footer /> */}
      </Provider>
		</div>
	)
}
