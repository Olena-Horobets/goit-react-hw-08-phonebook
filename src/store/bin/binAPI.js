import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const binAPI = createApi({
  reducerPath: 'binAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://61ba061948df2f0017e5a8a2.mockapi.io',
  }),
  tagTypes: ['Bin'],
  endpoints: builder => ({
    getBinContacts: builder.query({
      query: () => `/bin`,
      providesTags: ['Bin'],
    }),
    addBinContact: builder.mutation({
      query: ({ contact }) => ({
        url: `/bin`,
        method: 'POST',
        body: { ...contact },
      }),
      invalidatesTags: ['Bin'],
    }),
    deleteBinContact: builder.mutation({
      query: id => ({
        url: `/bin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bin'],
    }),
  }),
});

export const {
  useGetBinContactsQuery,
  useAddBinContactMutation,
  useDeleteBinContactMutation,
} = binAPI;
