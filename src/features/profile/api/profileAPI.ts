import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileAPI = createApi({
  reducerPath: "profileAPI",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["profile"],
  endpoints: (builder) => ({
    getMyTeam: builder.query({
      query: ({ token }) => ({
        url: "team/myteam",
        method: "GET",
        headers: {
          authorization: token,
        },
      }),
    }),

    chooseLeader: builder.mutation({
      query: ({ token, id }) => ({
        url: `team/chooseleader/${id}`,
        method: "POST",
        headers: {
          authorization: token,
        },
      }),
    }),

    updateTeam: builder.mutation({
      query: ({ token, id, data }) => ({
        url: `team/${id}`,
        method: "PUT",
        body: data,
        headers: {
          authorization: token,
        },
      }),
    }),

    sendToDoctor: builder.mutation({
      query: ({ token, id }) => ({
        url: `team/sendToHead/${id}`,
        method: "POST",
        headers: {
          authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useGetMyTeamQuery,
  useChooseLeaderMutation,
  useSendToDoctorMutation,
  useUpdateTeamMutation,
} = profileAPI;
