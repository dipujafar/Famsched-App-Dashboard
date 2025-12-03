import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSubscription: build.query({
            query: () => ({
                url: "/packages",
                method: "GET",
            }),
           providesTags: [tagTypes.subscription],
        }),
        singleSubscription: build.query({
            query: (id) => ({
                url: `/packages/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.subscription],
        }),
        createSubscription: build.mutation({
            query: (data) => ({
                url: "/packages",
                method: "POST",
                body: data
            }),
            invalidatesTags: [tagTypes.subscription],
        }),
        updateSubscription: build.mutation({
            query: ({ id, data }) => ({
                url: `/packages/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: [tagTypes.subscription],
        })
    }),
});

export const { useGetSubscriptionQuery, useCreateSubscriptionMutation, useSingleSubscriptionQuery, useUpdateSubscriptionMutation } = subscriptionApi;