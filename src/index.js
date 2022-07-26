import './index.css'
import { Provider } from '@preact/prerender-data-provider'
import { Router } from 'preact-router'

// import './style';
// import Header from './components/header'
// import Footer from './components/footer'

// Code-splitting is automated for routes
import EntryPoint from './routes/entrypoint'
import Home from './routes/home'
import Report from './routes/report'
import NotFoundPage from './routes/notfound'

export default function App(props) {
  return (
    <div id="preact_root">
      <Provider value={props}>
        {/* <Header /> */}
        <Router>
          <Report path="/report/:date?" />
          <Report path="/:language/report/:date?" />
          <Home path="/home" />
          <Home path="/:language/home" />
          <EntryPoint path="/:language?" />
          <NotFoundPage type="404" default />
        </Router>
        {/* <Footer /> */}
      </Provider>
    </div>
  )
}
