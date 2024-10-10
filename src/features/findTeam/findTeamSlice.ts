import { Tteam } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Tteam[] = [];

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    getTeam(_, action: PayloadAction<Tteam[]>) {
      return action.payload;
    },

    joindTeamLocally(state, action: PayloadAction<string>) {
      const index = state.findIndex((e) => e.id === action.payload);
      state[index] = { ...state[index], status: "pending" };
    },

    unJoindTeamLocally(state, action: PayloadAction<string>) {
      console.log(state);
      const index = state.findIndex((e) => e.id === action.payload);
      state[index] = { ...state[index], status: "available" };
      console.log(state);
    },
  },
});

export const { getTeam, joindTeamLocally, unJoindTeamLocally } =
  teamsSlice.actions;

export default teamsSlice.reducer;
