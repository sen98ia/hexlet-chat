import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import { channelsApi } from './api/channelsApi.js';
import { messagesApi } from './api/messagesApi.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([channelsApi.middleware, messagesApi.middleware]),
});

export default store;
