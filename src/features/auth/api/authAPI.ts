import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authAPI = createApi({
	baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_BASE_URL}),
	endpoints: (builder) => ({
		login: builder.query({
			query: ({email, password}: {email: string; password: string}) => `auth/login`,
		}),
	}),
});

export const {useLoginQuery } = authAPI;
