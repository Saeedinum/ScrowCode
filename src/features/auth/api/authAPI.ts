import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTracks, login, reset } from "../authSlice";

import { Ttracks } from "@/types/auth.ts";
import {
  TpersonalInformation,
  TuniversityInformation,
  TtrackInformation,
} from "@/types";

export const authAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getTracks: builder.query({
      query: () => "track",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: tracks } = await queryFulfilled;
          const tracksWithSkills: Ttracks[] = await Promise.all(
            tracks.data.map(async (track: Ttracks) => {
              const skillsResponse = await dispatch(
                authAPI.endpoints.getSkills.initiate({ trackId: track._id }),
              );
              return {
                ...track,
                skills: skillsResponse.data.data,
              };
            }),
          );
          dispatch(getTracks(tracksWithSkills));
        } catch (error) {
          console.error("Failed to fetch skills for tracks:", error);
        }
      },
    }),

    getSkills: builder.query({
      query: ({ trackId }) => `track/${trackId}/skills`,
    }),

    signupUser: builder.mutation({
      query: (userData: TpersonalInformation) => ({
        url: "authen/signupUser",
        method: "POST",
        body: {
          fullName: userData.fullName,
          Email: userData.email,
          password: userData.password,
          passwordConfirm: userData.confirmPassword,
          Username: userData.username,
          phone: userData.phone,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        console.log(arg);
        try {
          const { data } = await queryFulfilled;
          dispatch(
            login({
              token: data.token,
              id: data.data._id,
              fullName: data.data.fullName,
            }),
          );
        } catch (error) {
          console.error("Request failed:", error);
        }
      },
    }),

    signupStudent: builder.mutation({
      query: ({
        token,
        data,
      }: {
        token: string;
        data: TuniversityInformation;
      }) => ({
        url: "authen/signupStudent",
        method: "POST",
        body: {
          university: data.university,
          college: data.college,
          universityemail: data.universityEmail,
          department: data.department,
          level: data.level,
        },
        headers: {
          Authorization: token,
        },
      }),
    }),

    collectData: builder.mutation({
      query: ({ token, data }: { token: string; data: TtrackInformation }) => ({
        url: "authen/collectData",
        method: "POST",
        body: {
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
          const { data } = await queryFulfilled;
          dispatch(
            login({
              token: data.token,
              id: data.data._id,
              fullName: data.data.fullName,
            }),
          );
          console.log("Request completed:", data);
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
  }),
});

export const {
  useSignupUserMutation,
  useSignupStudentMutation,
  useCollectDataMutation,
  useGetTracksQuery,
  useLoginUserMutation,
  useForgetpassMutation,
  useResetpasswordMutation,
  useVerifycodeMutation,
} = authAPI;
