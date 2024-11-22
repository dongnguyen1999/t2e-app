
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { missionApi } from './api/missionApi';
import { notificationApi } from './api/notificationApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [missionApi.reducerPath]: missionApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(missionApi.middleware)
      .concat(notificationApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch