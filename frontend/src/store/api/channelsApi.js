import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../routes.js';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.channelsPath(),
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
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (channelName) => ({
        method: 'POST',
        body: channelName,
      }),
    }),
    editChannel: builder.mutation({
      query: (id, editedChannel) => ({
        url: id,
        method: 'PATCH',
        body: editedChannel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;

export {
  useGetChannelsQuery as getChannels,
  useAddChannelMutation as addChannel,
  useEditChannelMutation as editChannel,
  useRemoveChannelMutation as removeChannel,
};
