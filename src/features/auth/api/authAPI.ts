import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {login, reset} from "../authSlice";

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
					dispatch(login({token: data.token, id: data.data._id, fullName: data.data.fullName}));
					console.log("Request completed:", data);
				} catch (error) {
					console.error("Request failed:", error);
				}
			},
		}),
		signupStudent: builder.mutation({
			query: ({token, ...data}) => ({
				url: "authen/signupStudent",
				method: "POST",
				body: {
					Username: "username", // requiredd in request but not in schema
					university: "suez canal",
					college: data.collage,
					universityemail: data.universityEmail,
					department: data.department,
					level: data.level,
					track: data.track,
					skills: data.skills,
					linkedin: data.linkedin,
					github: data.github,
					behance: data.behance,
				},
				headers: {
					Authorization: token,
				},
			}),
			async onQueryStarted(arg, {queryFulfilled}) {
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
				url: "authen/login",
				method: "POST",
				body: {
					Email: userData.email,
					password: userData.password,
				},
			}),
		}),
		forgetpass: builder.mutation({
			query: (email) => ({
				url: "authen/forgetpass",
				method: "POST",
				body: {
					Email: email,
				},
			}),
			async onQueryStarted(arg, {queryFulfilled, dispatch}) {
				try {
					await queryFulfilled;
					dispatch(reset({email: arg}));
				} catch (error) {
					console.error("Request failed:", error);
				}
			},
		}),
		verifycode: builder.mutation({
			query: (code) => ({
				url: "authen/verifycode",
				method: "POST",
				body: {
					resetCode: code,
				},
			}),
			async onQueryStarted(arg, {queryFulfilled, dispatch}) {
				try {
					await queryFulfilled;
					dispatch(reset({otp: arg}));
				} catch (error) {
					console.error("Request failed:", error);
				}
			},
		}),
		resetpassword: builder.mutation({
			query: (data) => ({
				url: "authen/resetpassword",
				method: "PUT",
				body: {
					Email: data.email,
					newPassword: data.password,
				},
			}),
		}),
	}),
});

export const {
	useSignupUserMutation,
	useSignupStudentMutation,
	useLoginUserMutation,
	useForgetpassMutation,
	useResetpasswordMutation,
	useVerifycodeMutation,
} = authAPI;
