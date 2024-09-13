import { Tteam } from "@/types";
import { BACKEND_T_teams } from "@/types/backend";
import { getTracksFromMembers } from "@/utils/teamStructure";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileAPI = createApi({
  reducerPath: "profileAPI",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["profile"],
  endpoints: (builder) => ({
    getMyTeam: builder.query({
      query: ({ token }) => ({
        url: "team/myteam",
        method: "GET",
        headers: {
          authorization: token,
        },
      }),
      transformResponse: (response: {
        data: BACKEND_T_teams;
        message: string;
      }) => {
        const item = response.data;
        console.log(response);
        const team = {
          id: item._id,
          name: {
            english: item.projectNameEnglish,
            arabic: item.projectNameArabic,
          },
          category: item.projectCategory,
          status: item.completed ? "notAvailable" : "available",
          description: item.projectDescription,
          members: {
            max: 8,
            current: item.numOfMember,
          },
          tracks: getTracksFromMembers(item.member, item.requirement),
          supervisor: item.doctorName,
          assistantSupervisor: item.doctorviceName,
          admin: response.message === "the status of leader is true",
        };
        return team as Tteam & { admin: boolean };
      },
    }),

    chooseLeader: builder.mutation({
      query: ({ token, id }) => ({
        url: `team/chooseleader/${id}`,
        method: "POST",
        headers: {
          authorization: token,
        },
      }),
    }),

    updateTeam: builder.mutation({
      query: ({ token, id, data }) => ({
        url: `team/${id}`,
        method: "PUT",
        body: data,
        headers: {
          authorization: token,
        },
      }),
    }),

    sendToDoctor: builder.mutation({
      query: ({ token, id }) => ({
        url: `team/sendToHead/${id}`,
        method: "POST",
        headers: {
          authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useGetMyTeamQuery,
  useChooseLeaderMutation,
  useSendToDoctorMutation,
  useUpdateTeamMutation,
} = profileAPI;
