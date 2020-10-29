import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import posts from '../features/posts/routes';

/**
 * Application main router.
 *
 * @returns {React.FC}
 */
export default function AppRouter(): JSX.Element {
  const routes = [...posts];
  const renderRoutes = routes.map((route) => (
    <Route
      key={route.name}
      component={route.component}
      exact={route.exact}
      path={route.path}
    />
  ));

  return (
    <Router>
      <Switch>
        {renderRoutes}
        <Redirect
          from="/"
          to="/posts"
        />
        <Redirect
          from="**"
          to="/"
        />
      </Switch>
    </Router>
  );
}
