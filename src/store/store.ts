import {configureStore} from "@reduxjs/toolkit";
import {authslice} from "../features/auth/authSlice";
import {authAPI} from "../features/auth/api/authAPI";
import {findTeamAPI} from "../features/findTeam/api/findTeamAPI";

export const store = configureStore({
	reducer: {
		auth: authslice.reducer,
		[authAPI.reducerPath]: authAPI.reducer,
		[findTeamAPI.reducerPath]: findTeamAPI.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware, findTeamAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
