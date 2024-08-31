import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const findTeamAPI = createApi({
	reducerPath: "findTeamAPI",
	baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_BASE_URL}),
	tagTypes: ["Team"],
	endpoints: (builder) => ({
		fetchTeams: builder.query({
			query: ({token}) => ({
				url: "team",
				method: "GET",
				headers: {
					authorization: token,
				},
			}),
		}),
	}),
});

export const {useFetchTeamsQuery} = findTeamAPI;
