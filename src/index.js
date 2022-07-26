import './index.css'
import { Provider } from '@preact/prerender-data-provider'
import { Router } from 'preact-router'

import './style';
import Header from './components/Header'
import Footer from './components/Footer'

// Code-splitting is automated for routes
import Home from './routes/home'
import Letter from './routes/letter'
import Report from './routes/report'
import NotFoundPage from './routes/notfound'

export default function App(props) {
  return (
    <div id="preact_root">
      <Provider value={props}>
        <Header />
        <Router>
          <Home path="/" />
          <Letter path="/:language/letter" />
          <Report path="/:language/report/:date?" />
          <NotFoundPage type="404" default />
        </Router>
        <Footer />
      </Provider>
    </div>
  )
}
