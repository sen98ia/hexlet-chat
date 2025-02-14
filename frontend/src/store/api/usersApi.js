import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../routes.js';
import { setLogIn, setLogOut } from '../slices/authSlice.js';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: routes.loginPath(),
        method: 'POST',
        body: loginData,
      }),
      onQueryStarted: async (loginData, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLogIn(data));
        } catch (error) {
          dispatch(setLogOut());
        }
      },
    }),
    signUp: builder.mutation({
      query: (signUpData) => ({
        url: routes.signUpPath(),
        method: 'POST',
        body: signUpData,
      }),
      onQueryStarted: async (signUpData, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLogIn(data));
        } catch (error) {
          dispatch(setLogOut());
        }
      },
    }),
  }),
});

const {
  useLoginMutation,
  useSignUpMutation,
} = usersApi;

export {
  useLoginMutation as useLogin,
  useSignUpMutation as useSignUp,
};
