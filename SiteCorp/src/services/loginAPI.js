import axios from 'axios';
import _ from 'lodash';
import {persistor, store } from './store';
import { setToken } from '../actions/login'
import { URL} from '../config/Api';

export function InvalidCredentialsException(message,type) {
    this.message = message;
    this.name = type;
}

export function login(username, password) {
  return axios
    .post(URL, {
      username,
      password
    })
    .then(function (response) {
      store.dispatch(setToken(response.data));           
    })
    .catch(function (error) {
      // raise different exception if due to invalid credentials
      if (_.get(error, 'response.status') === 400) {
        throw new InvalidCredentialsException(error, error.response.data.error);
      }else{
        throw new InvalidCredentialsException(error, 'Error de conexión');
      }
    });
}

export function getToken() {
  return store.getState().token;
}

export function loggOut() {
  store.dispatch(setToken(null));
  persistor.purge()
  return store.getState().token;
}
