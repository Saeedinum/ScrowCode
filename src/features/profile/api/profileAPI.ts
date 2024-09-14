import { TEditTeamData, Tteam } from "@/types";
import { Ttracks } from "@/types/auth";
import { BACKEND_T_profile, BACKEND_T_teams } from "@/types/backend";
import { getTracksFromMembers } from "@/utils/teamStructure";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileAPI = createApi({
  reducerPath: "profileAPI",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["profile"],
  endpoints: (builder) => ({
    getMyTeam: builder.query({
      query: ({ token }: { token: string; tracks: Ttracks[] }) => ({
        url: "team/myteam",
        method: "GET",
        headers: {
          authorization: token,
        },
      }),
      transformResponse: (
        response: {
          data: BACKEND_T_teams;
          message: string;
        },
        _,
        { tracks },
      ) => {
        const item = response.data;
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
          tracks: getTracksFromMembers(item.member, item.requirement, tracks),
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
      query: ({
        token,
        id,
        data,
      }: {
        token: string;
        id: string;
        data: TEditTeamData;
      }) => ({
        url: `team/${id}`,
        method: "PUT",
        body: {
          projectNameArabic: data.projectArabicName,
          projectNameEnglish: data.projectEnglishName,
          projectDescription: data.projectDescription,
          requirementAdded: data.requirementAdded,
          requirementDelete: data.requirementDelete,
          projectCategory: data.category,
          doctorName: data.supervisor,
          doctorviceName: data.assistantSupervisor,
          memberDelete: data.deletedMembers,
        },
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

    getMyProfile: builder.query({
      query: ({ token, id }: { token: string; id?: string }) => ({
        url: id ? `student/profile/${id}` : "student/mybaseInfo",
        method: "GET",
        headers: {
          authorization: token,
        },
      }),
      transformResponse: (response: { data: BACKEND_T_profile }) =>
        response.data,
    }),

    updateMyProfile: builder.mutation({
      query: ({ token, data }) => ({
        url: "student/update",
        method: "PUT",
        body: data,
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
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} = profileAPI;
