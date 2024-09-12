import { Tteam } from "@/types";
import { BACKEND_T_teams } from "@/types/backend";
import { getTracksFromMembers } from "@/utils/teamStructure";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const findTeamAPI = createApi({
  reducerPath: "findTeamAPI",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    fetchTeams: builder.query({
      query: ({ token }) => ({
        url: "team",
        method: "GET",
        headers: {
          authorization: token,
        },
      }),
      transformResponse: (response: {
        CompletedOrNo: BACKEND_T_teams[];
        pendingSentMe: BACKEND_T_teams[];
        pendingIsent: BACKEND_T_teams[];
      }) => {
        const teams = [
          ...response.CompletedOrNo.map((item) => {
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
            };

            return team as Tteam;
          }),
          ...[...response.pendingIsent, ...response.pendingSentMe].map(
            (item) => {
              const team = {
                id: item._id,
                name: {
                  english: item.projectNameEnglish,
                  arabic: item.projectNameArabic,
                },
                category: item.projectCategory,
                status: "pending",
                description: item.projectDescription,
                members: {
                  max: 8,
                  current: item.numOfMember,
                },

                tracks: getTracksFromMembers(item.member, item.requirement),

                supervisor: item.doctorName,
                assistantSupervisor: item.doctorviceName,
              };

              return team as Tteam;
            },
          ),
        ];
        return teams;
      },
    }),

    joinTeam: builder.mutation({
      query: ({ teamID, token }) => ({
        url: `/student/joinTeam/${teamID}`,
        method: "GET",
        headers: {
          authorization: token,
        },
      }),
    }),
  }),
});

export const { useFetchTeamsQuery, useJoinTeamMutation } = findTeamAPI;
