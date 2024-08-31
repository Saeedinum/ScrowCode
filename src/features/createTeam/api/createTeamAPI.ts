import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCreateTeamData } from "../../../types";
import { Ttracks } from "@/types/auth";

export const createTeamAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    createTeam: builder.mutation<
      void,
      { data: TCreateTeamData; token: string }
    >({
      query: ({ data, token }) => ({
        url: "team",
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
    }),
    getTracks: builder.query<Ttracks[], void>({
      query: () => "track",
      transformResponse: (response: { data: Ttracks[] }) => response.data,
    }),
  }),
});

export const { useCreateTeamMutation, useGetTracksQuery } = createTeamAPI;
