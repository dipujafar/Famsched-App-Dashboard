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
  }),
});

export const { useGetAllUsersQuery } = userApi;
