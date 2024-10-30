import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getTracks, login, reset } from "../authSlice"

import { TpersonalInformation, TuniversityInformation, TtrackInformation } from "@/types"

export const authAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: builder => ({
    getTracks: builder.query({
      query: () => "track",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: tracks } = await queryFulfilled
        dispatch(getTracks(tracks.data))
      }
    }),

    signupUser: builder.mutation({
      query: (userData: TpersonalInformation & TuniversityInformation & TtrackInformation) => ({
        url: "authen/signup",
        method: "POST",
        body: {
          fullName: userData.arabicName,
          Email: userData.email,
          password: userData.password,
          passwordConfirm: userData.confirmPassword,
          Username: userData.username,
          phone: userData.phone,
          university: userData.university,
          college: userData.college,
          universityemail: userData.universityEmail,
          department: userData.department,
          level: userData.level,
          trackId: [userData.track],
          skillId: userData.skills,
          linkedin: userData.linkedin,
          github: userData.github,
          behance: userData.behance
        }
      })
    }),

    verifyEmailStudent: builder.mutation({
      query: ({ token, code }: { token: string; code: string }) => ({
        url: "authen/verifyEmailStudent",
        method: "POST",
        body: {
          code: code
        },
        headers: {
          Authorization: token
        }
      })
    }),

    loginUser: builder.mutation({
      query: userData => ({
        url: "authen/login",
        method: "POST",
        body: {
          Email: userData.email,
          password: userData.password
        }
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const data = await queryFulfilled
          if ("data" in data) {
            dispatch(
              login({
                token: data.data.token,
                username: data.data.data.user.Username,
                fullName: data.data.data.user.fullName,
                email: data.data.data.user.Email,
                hasTeam: !data.data.data.Available
              })
            )
          }
        } catch (error) {
          console.error("invalid email or password")
        }
      }
    }),

    forgetpass: builder.mutation({
      query: email => ({
        url: "authen/forgetpass",
        method: "POST",
        body: {
          Email: email
        }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled
          dispatch(reset({ email: arg }))
        } catch (error) {
          console.error("Request failed:", error)
        }
      }
    }),

    verifycode: builder.mutation({
      query: code => ({
        url: "authen/verifycode",
        method: "POST",
        body: {
          resetCode: code
        }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled
          dispatch(reset({ otp: arg }))
        } catch (error) {
          console.error("Request failed:", error)
        }
      }
    }),

    resetpassword: builder.mutation({
      query: data => ({
        url: "authen/resetpassword",
        method: "PUT",
        body: {
          Email: data.email,
          newPassword: data.password
        }
      })
    }),

    checkUsername: builder.mutation<string, { username: string }>({
      query: ({ username }: { username: string }) => ({
        url: "authen/username",
        method: "POST",
        body: {
          Username: username
        }
      }),
      transformResponse: (response: { status: string }) => response.status
    })
  })
})

export const {
  useSignupUserMutation,
  useVerifyEmailStudentMutation,
  useGetTracksQuery,
  useLoginUserMutation,
  useForgetpassMutation,
  useResetpasswordMutation,
  useVerifycodeMutation,
  useCheckUsernameMutation
} = authAPI
