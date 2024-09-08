import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const findTeamAPI = createApi({
  reducerPath: "findTeamAPI",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    fetchTeams: builder.query({
      query: ({ token }) => ({
        url: "team",
        method: "GET",
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmRjYTc4ZmMyMTJkOWIyMDljMzEzOGQiLCJpYXQiOjE3MjU3Nzg2MDEsImV4cCI6MTczMzU1NDYwMX0.99mZMplqF5PRPTQWKxZKyHVJ-ncvByS81sKn_diWz6w",
        },
      }),
      transformResponse: (response, meta, arg) => {
        const teams = response.data;
        console.log(teams);
      },
    }),
  }),
});

export const { useFetchTeamsQuery } = findTeamAPI;
