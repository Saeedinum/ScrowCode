import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const createTeamAPI = createApi({
	baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_BASE_URL}),
	endpoints: () => ({}),
});

// export const { } = createTeamAPI;
