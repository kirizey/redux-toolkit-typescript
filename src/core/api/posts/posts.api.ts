import httpClient from '../http/httpClient';

export const fetchAllPosts = () => httpClient.get('/posts');
