import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import store from '../../../store';
import tryRefreshTokenAndRepeat from './authAndRetry';
import {
  GatewayTimeout,
  NetworkError,
  ServerError,
  ServerUnavailable,
  ServerValidationError,
  InternalServerError,
} from './exceptions';

/**
 * @param {string} url
 * @returns {boolean}
 */
function isAbsoluteURL(url: string) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Set Authorization header from storage.
 *
 * @param config
 * @returns
 */
export function requestInterceptor(config: AxiosRequestConfig) {
  const { token } = store.auth;
  const url = config.url || '';

  if (!!token && !isAbsoluteURL(url)) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

/**
 * @param success
 * @returns
 */
export function responseInterceptorSuccess(success: AxiosResponse) {
  return success;
}

/**
 * @param error
 * @returns
 */
export function responseInterceptorError(error: AxiosError): Promise<any> {
  const { response } = error;

  if (axios.isCancel(error)) {
    return Promise.reject();
  }

  if (!response) {
    return Promise.reject(new NetworkError(error.message));
  }

  let customError;

  switch (response.status) {
  case 401:
    return tryRefreshTokenAndRepeat(error);
  case 400:
    customError = new ServerValidationError(response.data);
    break;
  case 500:
    customError = new InternalServerError(response);
    break;
  case 502:
  case 503:
    customError = new ServerUnavailable();
    break;
  case 504:
    customError = new GatewayTimeout();
    break;
  default:
    customError = new ServerError(response);
  }

  return Promise.reject(customError);
}
