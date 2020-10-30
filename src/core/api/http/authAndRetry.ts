import axios, { AxiosError, AxiosResponse } from 'axios';
import store from '../../../store';

let alreadyRefreshingAccessToken = false;
let subscribers: any = [];

/**
 * Set token to each failed request and retry.
 */
function onAccessTokenRefreshed() {
  subscribers.forEach((subscriber: any) => subscriber.onTokenRefreshed(store.auth.token));
  subscribers = [];
}

/**
 * Logout if refresh token failed.
 *
 * @param {object} error
 */
function onAccessTokenRefreshFailed(error: AxiosError) {
  subscribers.forEach((subscriber: any) => subscriber.onTokenRefreshFailed(error));
  subscribers = [];
  // logout action and redirect to login page
}

/**
 * @param onTokenRefreshed
 * @param onTokenRefreshFailed
 */
function subscribeTokenRefresh(onTokenRefreshed: any, onTokenRefreshFailed: any) {
  subscribers.push({ onTokenRefreshed, onTokenRefreshFailed });
}

/**
 * Try to refresh authorization token and repeat the latest request.
 *
 * @param authorizationError Authorization error.
 * @returns
 */
export default function tryRefreshTokenAndRepeat(authorizationError: AxiosError): Promise<AxiosResponse> {
  const { config, response } = authorizationError;
  const originalRequest = config;

  if (originalRequest.method === 'delete' && originalRequest.url?.endsWith('/auth')) {
    // User was trying to log out. Ok, he is not logged in anyway.
    return Promise.resolve(response?.data.message);
  }

  if (originalRequest.method === 'put' && originalRequest.url?.endsWith('/auth')) {
    // Previous re-authentication attempt failed - old token cannot be used to refresh JWT token
    return Promise.reject(new Error('Force user logout'));
  }

  if (!alreadyRefreshingAccessToken && store.auth.token) {
    alreadyRefreshingAccessToken = true;
    // refresh token
  } else {
    throw new Error(response?.data.message);
  }

  /**
   * Let's wait for it's result and try to execute our request again with new token.
   */
  return new Promise((resolve, reject) => {
    subscribeTokenRefresh((newToken: string) => {
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      resolve(axios(originalRequest));
    }, reject);
  });
}
