import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	user: undefined,
};

export const authslice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: () => {},
		logout: () => {},
	},
});

export const {login, logout} = authslice.actions;

export default authslice.reducer;
