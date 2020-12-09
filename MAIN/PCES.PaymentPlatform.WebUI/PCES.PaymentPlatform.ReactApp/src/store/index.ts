import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import homeSaga from './home/sagas';
import authSaga from './auth/sagas';

import { HomeState, homeReducer } from './home';
import { AuthState, authReducer } from './auth';

export interface ApplicationState {
  home: HomeState;
  auth: AuthState;
  router: RouterState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    home: homeReducer,
    auth: authReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(homeSaga), fork(authSaga)]);
}
