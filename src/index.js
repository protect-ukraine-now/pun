import { Router } from 'preact-router';
import { Provider } from '@preact/prerender-data-provider';

import './style';

// Code-splitting is automated for routes
import Home from './routes/home';
import Report from './routes/report';
import NotFoundPage from './routes/notfound';
import Header from './components/header';
import Footer from './components/footer';

export default function App(props) {
  // console.log('App', props)

  return (
    <Provider value={props}>
      <div id="app">
        <Header />
        <Router>
          <Home path="/:language?" />
          <Report path="/:language/report/:date" />
          <NotFoundPage type="404" default />
        </Router>
        <Footer />
      </div>
    </Provider>
  );
}
