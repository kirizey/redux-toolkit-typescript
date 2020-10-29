import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';

import store from './store';

/**
 * App component.
 */
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Suspense fallback={null}>
        <AppRouter />
      </Suspense>
    </Provider>
  );
}

export default App;
