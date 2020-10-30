import axios from 'axios';

/**
 * Create http Client instance via axios.
 */
const httpClient = axios.create({
  // base URL for API Calls
  // set inside .env.xxx files in the <root>/
  baseURL: process.env.REACT_APP_API_URL,

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },

  // follow up to 10 HTTP 3xx redirects
  maxRedirects: 10,
});

export default httpClient;
