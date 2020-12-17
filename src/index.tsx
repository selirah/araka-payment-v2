import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'swiper/swiper-bundle.min.css';
import './style.css';
import './index.css';
import './dashboard.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@popperjs/core';
import 'jquery.easing/jquery.easing.min';
import 'gsap';
import 'swiper/swiper-bundle.esm';

import App from './App';
import { I18nextProvider } from 'react-i18next';
import { i18n } from './i18n';
import { configureStore } from './configureStore';
import { secure } from './utils/secure';
import { isEmpty } from './helpers/isEmpty';
import { setUser } from './store/auth/actions';
import { authorization } from './utils/authorization';
import { logout } from './store/auth/actions';
import { path } from './helpers/path';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

const { host, protocol } = window.location;

if (host !== 'localhost:3000') {
  if (protocol === 'http:') {
    window.location.href = window.location.href.replace('http:', 'https:');
  } else if (protocol === 'https:') {
    console.log('you are accessing us via our secure HTTPS protocol.');
  }
}

declare global {
  interface Window {
    INITIAL_REDUX_STATE: any;
  }
}

const initialState = window.INITIAL_REDUX_STATE;
export const { store, persistor } = configureStore(history, initialState);

const user = secure.get('user');
const { token } = user;
if (!isEmpty(token)) {
  authorization(token);
  store.dispatch(setUser(user));

  const decoded: any = jwt_decode(token);

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    secure.removeAll();
    secure.clear();
    store.dispatch(logout());
    window.location.href = path.home;
  }
}

ReactDOM.render(
  <React.Fragment>
    <I18nextProvider i18n={i18n}>
      <App store={store} history={history} persistor={persistor} />
    </I18nextProvider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
