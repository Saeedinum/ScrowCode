import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {TCreateTeamData} from "../../../types";

export const createTeamAPI = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
	}),
	endpoints: (builder) => ({
		createTeam: builder.mutation<void, TCreateTeamData>({
			query: (data) => ({
				url: "team",
				method: "POST",
				body: {
					teamName: data.teamName,
					projectIdea: data.projectIdea,
					userName: data.userName.map((user) => user.name),
					requirement: data.requirement,
				},
				headers: {
					authentication: data.token,
				},
			}),
		}),
	}),
});

export const {useCreateTeamMutation} = createTeamAPI;
