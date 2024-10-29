import initializeUser from "@/hooks/useInitializeUser"
import { Reset, Signup, Ttracks, User } from "@/types/auth"
import { Tprofile, Tuser } from "@/types/google"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type AuthState = {
  user: User
  reset: Reset
  signup: Signup
  tracks: Ttracks[]
  google: {
    user: Tuser | null
    profile: Tprofile | null
  }
}

const initialState: AuthState = {
  user: {
    token: null,
    email: null,
    fullName: null,
    username: null,
    hasTeam: false
  },
  reset: {
    email: null,
    otp: null,
    newPassword: null
  },
  signup: {
    PersonalInformation: {
      arabicName: "",
      username: "",
      phone: "+20",
      email: "",
      password: "",
      confirmPassword: ""
    },
    UniversityInformation: {
      university: "",
      college: "",
      level: 0,
      department: "",
      universityEmail: ""
    },
    TrackInformation: {
      track: "",
      skills: [""],
      linkedin: "",
      github: "",
      behance: ""
    }
  },
  google: {
    user: null,
    profile: null
  },
  tracks: []
}

export const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      initializeUser(action.payload.token!, action.payload.fullName!, action.payload.email!, action.payload.username!, action.payload.hasTeam!)
    },

    logout: () => {
      localStorage.clear()
      return initialState
    },

    reset: (state, action: PayloadAction<Reset>) => {
      state.reset = {
        ...state.reset,
        ...action.payload
      }
    },

    signup: (state, action: PayloadAction<Partial<Signup>>) => {
      state.signup = {
        ...state.signup,
        PersonalInformation: action.payload.PersonalInformation
          ? {
              ...state.signup.PersonalInformation,
              ...action.payload.PersonalInformation
            }
          : state.signup.PersonalInformation,
        UniversityInformation: action.payload.UniversityInformation
          ? {
              ...state.signup.UniversityInformation,
              ...action.payload.UniversityInformation
            }
          : state.signup.UniversityInformation,
      }
    },

    getTracks: (state, action: PayloadAction<Ttracks[]>) => {
      state.tracks = action.payload
    }
  }
})

export const { login, logout, reset, signup, getTracks } = authslice.actions

export default authslice.reducer
