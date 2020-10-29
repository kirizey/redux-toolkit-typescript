import { lazy } from 'react';

export default [
  {
    name: 'postsList',
    path: '/posts',
    component: lazy(() => import('./pages/PostsListPage')),
    exact: true,
  },
];
