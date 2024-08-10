import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const findTeamAPI = createApi({
	baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_BASE_URL}),
	endpoints: (builder) => ({
		fetchTeams: builder.query({
			query: (token) => ({
				url: `team`,
				method: "GET",
				header: {
					authorization: token,
				},
			}),
		}),
	}),
});

export const {useFetchTeamsQuery} = findTeamAPI;
