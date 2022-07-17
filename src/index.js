import { Router } from 'preact-router';
import { Provider } from '@preact/prerender-data-provider';
import { useState } from 'preact/hooks';

import './style';

// Code-splitting is automated for routes
import Home from './routes/home';
import Report from './routes/report';
import NotFoundPage from './routes/notfound';
import { LANGUAGE_CODES } from './constants/shared';
import Header from './components/header';
import Footer from './components/footer';

export default function App(props) {
  const [activeLanguage, setLanguage] = useState(LANGUAGE_CODES.Ukr);

  // console.log('App', props)

  return (
    <Provider value={props}>
      <div id="app">
        <Header language={activeLanguage} onLanguageSelect={setLanguage} />
        <Router>
          <Home path="/" />
          <Report path="/report/:date" />
          <NotFoundPage type="404" default />
        </Router>
        <Footer />
      </div>
    </Provider>
  );
}
