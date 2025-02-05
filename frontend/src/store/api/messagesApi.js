import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../routes.js';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.messagesPath(),
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        console.log(`token is working: ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: (builder).query({
      query: () => '',
    }),
  }),
});

const { useGetMessagesQuery } = messagesApi;

export {
  useGetMessagesQuery as getMessages,
};
