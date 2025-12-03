import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarning: builder.query({
      query: (queries) => ({
        url: "/dashboard/transitions",
        method: "GET",
        params: queries,
      }),
      providesTags: [tagTypes.earning],
    }),
  }),
});

export const { useGetEarningQuery } = earningApi;
