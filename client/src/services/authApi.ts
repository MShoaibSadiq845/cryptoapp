import { apiSlice } from './apiSlice';
import { UserProfile } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      { success: boolean; message: string; user: UserProfile },
      { name: string; email: string; password?: string }
    >({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<
      { success: boolean; token: string; user: UserProfile },
      { email: string; password?: string }
    >({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getProfile: builder.query<{ success: boolean; user: UserProfile }, void>({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
    updateWallet: builder.mutation<{ success: boolean; user: UserProfile }, { walletAddress: string }>({
      query: (body) => ({
        url: '/auth/wallet',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updatePicture: builder.mutation<{ success: boolean; user: UserProfile }, { picture: string }>({
      query: (body) => ({
        url: '/auth/picture',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateWalletMutation,
  useUpdatePictureMutation,
} = authApi;

