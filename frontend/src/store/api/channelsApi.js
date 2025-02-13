import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../../routes.js';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.channelsPath(),
    prepareHeaders: (headers) => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (channelName) => ({
        method: 'POST',
        body: channelName,
        invalidatesTags: ['Channel'],
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, ...editedChannel }) => ({
        url: id,
        method: 'PATCH',
        body: editedChannel,
        invalidatesTags: ['Channel'],
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
        invalidatesTags: ['Channel'],
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
