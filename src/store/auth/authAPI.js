import { emptySplitApi } from '../mainAPISlice';

const authAPI = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    createUser: builder.mutation({
      query: ({ user }) => ({
        url: `/users/signup`,
        method: 'POST',
        providesTags: ['Users'],
        body: user,
      }),
    }),
    logInUser: builder.mutation({
      query: ({ user }) => ({
        url: `/users/login`,
        method: 'POST',
        providesTags: ['Users'],
        body: user,
      }),
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        method: 'POST',
        providesTags: ['Users'],
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateUserMutation,
  useLogInUserMutation,
  useLogOutUserMutation,
} = authAPI;
