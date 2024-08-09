import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type User = {
	token: string | null;
	id: string | null;
	fullName: string | null;
};

type Reset = {
	email?: string | null;
	otp?: string | null;
	newPassword?: string | null;
};

interface AuthState {
	user?: User;
	reset?: Reset;
}

const initialState: AuthState = {
	user: {
		token: null,
		id: null,
		fullName: null,
	},
	reset: {
		email: null,
		otp: null,
		newPassword: null,
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
		reset: (state, action: PayloadAction<Reset>) => {
			state.reset = {
				...state.reset,
				...action.payload,
			};
		},
	},
});

export const {login, logout , reset} = authslice.actions;

export default authslice.reducer;
