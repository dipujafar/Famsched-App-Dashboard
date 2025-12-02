import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (queries) => ({
        url: "/users",
        method: "GET",
        params: queries,
      }),
      providesTags: [tagTypes.users],
    }),
    blockUnblockUser: builder.mutation({
      query: ({id, data}) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const { useGetAllUsersQuery, useBlockUnblockUserMutation } = userApi;
