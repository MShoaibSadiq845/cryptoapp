import { apiSlice } from './apiSlice';

export interface SubscribeRequest {
  email: string;
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
  email: string;
}

export interface SubscribersListResponse {
  count: number;
  subscribers: Array<{
    _id: string;
    email: string;
    status: string;
    subscribedAt: string;
    confirmationEmailSent: boolean;
  }>;
}

export const newsletterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation<SubscribeResponse, SubscribeRequest>({
      query: (body) => ({
        url: '/newsletter/subscribe',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Subscriber'],
    }),
    getSubscribers: builder.query<SubscribersListResponse, void>({
      query: () => '/newsletter/subscribers',
      providesTags: ['Subscriber'],
    }),
  }),
});

export const { useSubscribeNewsletterMutation, useGetSubscribersQuery } =
  newsletterApi;
