import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCreateTeamData } from "../../../types";

export const createTeamAPI = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("token");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		createTeam: builder.mutation<void, TCreateTeamData>({
			query: (data) => ({
				url: "team",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useCreateTeamMutation } = createTeamAPI;
