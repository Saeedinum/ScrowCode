import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCreateTeamData } from "../../../types";
import { Ttracks } from "@/types/auth";

export const createTeamAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    createTeam: builder.mutation<
      void,
      { data: TCreateTeamData; token: string }
    >({
      query: ({ data, token }) => ({
        url: "team",
        method: "POST",
        body: {
          projectNameArabic: data.projectArabicName,
          projectNameEnglish: data.projectEnglishName,
          projectCategory: data.category,
          projectDescription: data.projectDescription,
          userName: data.teamMembers,
          requirement: data.requirement,
          doctorName: data.supervisor,
          doctorviceName: data.assistantSupervisor,
        },
        headers: {
          Authorization: token,
        },
      }),
    }),
    getTracks: builder.query<Ttracks[], void>({
      query: () => "track",
      transformResponse: (response: { data: Ttracks[] }) => {
        return response.data;
      },
    }),
  }),
});

export const { useCreateTeamMutation, useGetTracksQuery } = createTeamAPI;
