import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import postsSlice from './posts/postsSlice';
import authSlice from './auth/authSlice';

const rootReducer = combineReducers({
  postsSlice,
  authSlice,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
export type RootState = ReturnType<typeof rootReducer>
