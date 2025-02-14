import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import channelsReducer from './slices/channelsSlice.js';
import { channelsApi } from './api/channelsApi.js';
import { messagesApi } from './api/messagesApi.js';
import { usersApi } from './api/usersApi.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([channelsApi.middleware, messagesApi.middleware, usersApi.middleware]),
});

export default store;
