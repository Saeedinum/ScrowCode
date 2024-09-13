import { configureStore } from "@reduxjs/toolkit";
import { authslice } from "../features/auth/authSlice";
import { authAPI } from "../features/auth/api/authAPI";
import { findTeamAPI } from "../features/findTeam/api/findTeamAPI";
import { teamsSlice } from "@/features/findTeam/findTeamSlice";
import { partnersSlice } from "@/features/findPartner/partnersSlice";
import { profileAPI } from "@/features/profile/api/profileAPI";

export const store = configureStore({
  reducer: {
    auth: authslice.reducer,
    teams: teamsSlice.reducer,
    partners: partnersSlice.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [findTeamAPI.reducerPath]: findTeamAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      findTeamAPI.middleware,
      profileAPI.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
