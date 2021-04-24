import { emit } from '../../store/features/notifications';
import { store } from '../../store/store';
import { BASE_URL } from './constants';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const parseStatus = <T>(res: Response, data: Promise<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (res.ok) {
      data.then(response => resolve(response));
    } else {
      if (res.status === 401) {
        localStorage.removeItem('auth_token');
        window.location.reload();
      }

      data.then(response => reject({ code: res.status, response }));
    }
  });
};

/**
 * Base request method to get data from remote source with error handling, headers and stuff
 *
 * @template T type of returned data
 * @param {string} url URL where to get data from, BASE_URL appended by default. If its full valid url like https://google.com we use it instead of appending it to BASE_URL
 * @param {RequestMethod} [method="GET"] request method
 * @param {never} [body] data passed to the request, except GET method
 * @param {RequestInit} [options] custom options, like options objects in fetch. Will be appended last.
 * @param {boolean} [skipToken=false] Authorization header appended by default, will be skipped if this param is true
 * @param {boolean} [emptyResponse=false] If true, dont try to get JSON from the response to avoid errors
 * @returns {Promise<T>} response promise of given type
 */
export const request = <T>(
  url: string,
  method: RequestMethod = 'GET',
  body?: any,
  options?: RequestInit,
  skipToken = false,
  emptyResponse = false
): Promise<T> => {
  const reqOptions: RequestInit = {
    method,
    headers: requestHeaders(skipToken),
    body: method !== 'GET' ? JSON.stringify(body) : null,
    ...options,
  };

  // If provided url is valid full url, like https://google.com we use it,
  // instead of appending it to BASE_URL
  let useBaseUrl = true;
  try {
    const validUrl = new URL(url);
    if (validUrl) useBaseUrl = false;
  } catch {}

  return fetch(`${useBaseUrl ? BASE_URL : ''}${url}`, reqOptions)
    .then(res => parseStatus(res, emptyResponse ? new Promise(resolve => resolve(null)) : res.json()))
    .catch(e => {
      store.dispatch(emit('Произошла ошибка', 'error'));
      throw new Error(e?.response?.message || 'Error');
    });
};

export const requestHeaders = (skipToken = false): Headers => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  if (!skipToken) {
    const token = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${token}`);
  }

  return headers;
};
