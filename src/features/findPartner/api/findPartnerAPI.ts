import { Tpartner } from "@/types";
import { BACKEND_T_partners } from "@/types/backend";
import { uid } from "@/utils/uid";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const findPartnerAPI = createApi({
  reducerPath: "findPartnerAPI",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: ({ token }) => ({
        url: "student",
        method: "GET",
        headers: {
          authorization: token,
        },
      }),
      transformResponse: (response: {
        AvilableOrNot: BACKEND_T_partners[];
        pendingISent: BACKEND_T_partners[];
        pendingSentMe: BACKEND_T_partners[];
        status: string;
      }) => {
        const partners: Tpartner[] = [
          ...response.AvilableOrNot.map((items) => {
            return {
              id: items._id,
              name: items.user?.fullName || "",
              imageURL: items.user?.profileImg,
              track: items.myTrack[0]?.name,
              status: items.Available
                ? "available"
                : ("notAvailable" as Tpartner["status"]),
              skills: items.mySkills.map((skill) => {
                return {
                  name: skill.name,
                  id: uid(),
                };
              }),
            };
          }),
          ...[...response.pendingISent, ...response.pendingSentMe].map(
            (items) => {
              return {
                id: items._id,
                name: items.user?.fullName || "",
                imageURL: items.user?.profileImg,
                track: items.myTrack[0]?.name,
                status: "pending" as Tpartner["status"],
                skills: items.mySkills.map((skill) => {
                  return {
                    name: skill.name,
                    id: uid(),
                  };
                }),
              };
            },
          ),
        ];
        return partners;
      },
    }),
  }),
});

export const { useGetStudentsQuery } = findPartnerAPI;
