import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const ordersAPI = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: builder => ({
    getOrdersOfStudent: builder.query({
      query: ({ token }) => ({
        url: "order/student",
        method: "GET",
        headers: {
          Authorization: token
        }
      })
    }),

    handleOrderOfTeam: builder.mutation({
      query: ({ token, id, status }: { token: string; id: string; status: "accept" | "reject" }) => ({
        url: `order/student/${id}`,
        method: "POST",
        body:
          status === "accept"
            ? {
                accept: true
              }
            : {
                reject: true
              },
        headers: {
          Authorization: token
        }
      })
    }),

    getOrdersOfTeam: builder.query({
      query: ({ token }) => ({
        url: "order/team",
        method: "GET",
        headers: {
          Authorization: token
        }
      })
    }),

    handleOrderOfStudent: builder.mutation({
      query: ({ token, id, status }: { token: string; id: string; status: "accept" | "reject" }) => ({
        url: `order/team/${id}`,
        method: "POST",
        body:
          status === "accept"
            ? {
                accept: true
              }
            : {
                reject: true
              },
        headers: {
          Authorization: token
        }
      })
    })
  })
})

export const { useGetOrdersOfStudentQuery, useHandleOrderOfTeamMutation, useGetOrdersOfTeamQuery, useHandleOrderOfStudentMutation } = ordersAPI
