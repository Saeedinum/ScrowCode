import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTracks, login, reset, loginWithGoogle } from "../authSlice";

import {
  TpersonalInformation,
  TuniversityInformation,
  TtrackInformation,
} from "@/types";
import { Tprofile, Tuser } from "@/types/google";

export const authAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getTracks: builder.query({
      query: () => "track",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: tracks } = await queryFulfilled;
        dispatch(getTracks(tracks.data));
      },
    }),

    googleSignup: builder.query({
      query: (user: Tuser) => ({
        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data }: { data: Tprofile } = await queryFulfilled;
          dispatch(
            loginWithGoogle({
              user: arg,
              profile: data,
            }),
          );
        } catch (error) {
          console.error("Request failed:", error);
        }
      },
    }),

    signupUser: builder.mutation({
      query: (userData: TpersonalInformation) => ({
        url: "authen/signup",
        method: "POST",
        body: {
          fullName: userData.arabicName,
          Email: userData.email,
          password: userData.password,
          passwordConfirm: userData.confirmPassword,
          Username: userData.username,
          phone: userData.phone,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(login(data.token));
        } catch (error) {
          console.error("Request failed:", error);
        }
      },
    }),

    verifyEmailStudent: builder.mutation({
      query: ({
        token,
        code,
        data,
      }: {
        token: string;
        code: string;
        data: TuniversityInformation & TtrackInformation;
      }) => ({
        url: "authen/verifyEmailStudent",
        method: "POST",
        body: {
          code: code,
          university: data.university,
          college: data.college,
          universityemail: data.universityEmail,
          department: data.department,
          level: data.level,
          trackId: [data.track],
          skillId: data.skills,
          linkedin: data.linkedin,
          github: data.github,
          behance: data.behance,
        },
        headers: {
          Authorization: token,
        },
      }),
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
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data : {data : {user : {Username , fullName} , _id} , token } } = await queryFulfilled;
          dispatch(
            login({
              token: token,
              username: Username,
              fullName: fullName,
              id: _id,
            }),
          );
        } catch (error) {
          console.error("Request failed:", error);
        }
      },
    }),

    forgetpass: builder.mutation({
      query: (email) => ({
        url: "authen/forgetpass",
        method: "POST",
        body: {
          Email: email,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(reset({ email: arg }));
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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(reset({ otp: arg }));
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

    checkUsername: builder.mutation<string, { username: string }>({
      query: ({ username }: { username: string }) => ({
        url: "authen/username",
        method: "POST",
        body: {
          Username: username,
        },
      }),
      transformResponse: (response: { status: string }) => response.status,
    }),
  }),
});

export const {
  useSignupUserMutation,
  useVerifyEmailStudentMutation,
  useGetTracksQuery,
  useLoginUserMutation,
  useForgetpassMutation,
  useResetpasswordMutation,
  useVerifycodeMutation,
  useGoogleSignupQuery,
  useCheckUsernameMutation,
} = authAPI;
