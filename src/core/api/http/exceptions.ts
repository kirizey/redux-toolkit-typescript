import { AxiosResponse } from 'axios';

/**
 * HTTP 400 - Laravel returns information about incorrect fields.
 * Map: field => array of related error messages.
 */
export class ServerValidationError extends Error {
  constructor({ message, errors }) {
    super(message);
    this.name = 'ServerValidationError';
    this.validationErrors = errors || [];
  }
}

/**
 * HTTP 503 - Typically, when application is updated, restarted, etc.
 */
export class ServerUnavailable extends Error {
  constructor() {
    super('Server is temporary unavailable, try in a few minutes');
    this.name = 'ServerUnavailable';
  }
}

/**
 * HTTP 500 - Most probably, unhandled error in server code.
 */
export class InternalServerError extends Error {
  constructor(response: AxiosResponse) {
    const message = response.data && response.data.message
      ? response.data.message
      : response.statusText;
    super(message);
    this.name = 'InternalServerError';
  }
}

/**
 * Server code was executing too long, and Nginx returned error without waiting for result.
 */
export class GatewayTimeout extends Error {
  constructor() {
    super('Server operation timed out');
    this.name = 'GatewayTimeout';
  }
}

/**
 * For all other cases, when server replies with error.
 */
export class ServerError extends InternalServerError {
  constructor(response: AxiosResponse) {
    super(response);
    this.name = 'ServerError';
    this.data = response.data;
    this.status = response.status;
  }
}

/**
 * HTTP Server reply was not received.
 * Probably no network connection or CORS error, AdBlock, etc.
 */
export class NetworkError extends Error {
  constructor(message: string) {
    super(message || 'Check your network connection');
    this.name = 'NetworkError';
  }
}
