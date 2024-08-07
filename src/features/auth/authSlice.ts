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
	user: undefined,
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
