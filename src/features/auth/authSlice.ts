import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type User = {
	token: string;
	id: string;
	fullName: string;
};

interface AuthState {
	user?: User;
}

const initialState: AuthState = {
	user: {
		id: "",
		fullName: "",
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmI0OTNkMzNkZDBlNzkxN2I5NTFiOTMiLCJpYXQiOjE3MjMxMTAzNTcsImV4cCI6MTczMDg4NjM1N30.kyrPCstAIp8B6Rs17-y1MOy6HEnvm5rwm175mO2egGI",
	},
};

export const authslice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		logout: () => initialState,
	},
});

export const {login, logout} = authslice.actions;

export default authslice.reducer;
