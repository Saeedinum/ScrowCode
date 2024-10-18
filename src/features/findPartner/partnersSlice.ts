import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Tpartner } from "@/types"

const initialState: Tpartner[] = []

export const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    getPartners(_, action: PayloadAction<Tpartner[]>) {
      return action.payload
    },

    requestPartnerLocally(state, action: PayloadAction<string>) {
      const index = state.findIndex(e => e.id === action.payload)
      state[index] = { ...state[index], status: "pending" }
    },

    unrequestPartnerLocally(state, action: PayloadAction<string>) {
      const index = state.findIndex(e => e.id === action.payload)
      state[index] = { ...state[index], status: "available" }
    }
  }
})

export const { getPartners, requestPartnerLocally, unrequestPartnerLocally } = partnersSlice.actions

export default partnersSlice.reducer
