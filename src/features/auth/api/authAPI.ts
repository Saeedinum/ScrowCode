import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {login} from "../authSlice";

export const authAPI = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_BASE_URL}),
	endpoints: (builder) => ({
		signupUser: builder.mutation({
			query: (userData) => ({
				url: "authen/signupUser",
				method: "POST",
				body: userData,
			}),
			async onQueryStarted(arg, {queryFulfilled, dispatch}) {
				try {
					const {data} = await queryFulfilled;
					dispatch(login({token: data.token}));
					console.log("Request completed:", data);
				} catch (error) {
					console.error("Request failed:", error);
				}
			},
		}),
		signupStudent: builder.mutation({
			query: (userData) => ({
				url: "authen/signupStudent",
				method: "POST",
				body: userData,
			}),
			async onQueryStarted(arg, {queryFulfilled, dispatch}) {
				try {
					const {data} = await queryFulfilled;
					console.log("Request completed:", data);
				} catch (error) {
					console.error("Request failed:", error);
				}
			},
		}),
		loginUser: builder.mutation({
			query: (userData) => ({
				url: "auth/login",
				method: "POST",
				body: {
					Email: "saeed@gmail.com",
					password: "Saeed@123",
				},
			}),
		}),
	}),
});

export const {useSignupUserMutation, useSignupStudentMutation, useLoginUserMutation} = authAPI;
