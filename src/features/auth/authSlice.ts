import { Reset, Signup, Ttracks, User } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User;
  reset: Reset;
  signup: Signup;
  tracks: Ttracks[];
}

const initialState: AuthState = {
  user: {
    token: localStorage.getItem("token") || null,
    id: null,
    fullName: null,
  },
  reset: {
    email: null,
    otp: null,
    newPassword: null,
  },
  signup: {
    PersonalInformation: {
      firstname: "",
      lastname: "",
      fullName: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    UniversityInformation: {
      university: "",
      college: "",
      level: 0,
      department: "",
      universityEmail: "",
    },
    TrackInformation: {
      track: "",
      skills: [],
      linkedin: "",
      github: "",
      behance: "",
    },
  },
  tracks: [],
};

export const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      action.payload.token &&
        localStorage.setItem("token", action.payload.token);
    },

    logout: () => {
      localStorage.removeItem("token");
      return initialState;
    },

    reset: (state, action: PayloadAction<Reset>) => {
      state.reset = {
        ...state.reset,
        ...action.payload,
      };
    },

    signup: (state, action: PayloadAction<Partial<Signup>>) => {
      state.signup = {
        ...state.signup,
        PersonalInformation: action.payload.PersonalInformation
          ? {
              ...state.signup.PersonalInformation,
              ...action.payload.PersonalInformation,
            }
          : state.signup.PersonalInformation,
        UniversityInformation: action.payload.UniversityInformation
          ? {
              ...state.signup.UniversityInformation,
              ...action.payload.UniversityInformation,
            }
          : state.signup.UniversityInformation,
        TrackInformation: action.payload.TrackInformation
          ? {
              ...state.signup.TrackInformation,
              ...action.payload.TrackInformation,
            }
          : state.signup.TrackInformation,
      };
    },

    getTracks: (state, action: PayloadAction<Ttracks[]>) => {
      state.tracks = action.payload;
    },
  },
});

export const { login, logout, reset, signup, getTracks } = authslice.actions;

export default authslice.reducer;
