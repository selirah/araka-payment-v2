import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'swiper/swiper-bundle.min.css';
import './index.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@popperjs/core';
import 'gsap';
import 'swiper/swiper-bundle.esm';
import './script';

import App from './App';
import { I18nextProvider } from 'react-i18next';
import { i18n } from './i18n';
import configureStore from './configureStore';
import { secure } from './utils/secure';
import { isEmpty } from './helpers/isEmpty';
import { setUser } from './store/auth/actions';
import { authorization } from './utils/auhtorization';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

declare global {
  interface Window {
    INITIAL_REDUX_STATE: any;
  }
}

const initialState = window.INITIAL_REDUX_STATE;
export const store = configureStore(history, initialState);

const user = secure.get('user');
const { token } = user;
if (!isEmpty(token)) {
  authorization(token);
  store.dispatch(setUser(user));
}

ReactDOM.render(
  <React.Fragment>
    <I18nextProvider i18n={i18n}>
      <App store={store} history={history} />
    </I18nextProvider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
