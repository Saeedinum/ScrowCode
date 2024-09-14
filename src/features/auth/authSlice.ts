import initializeUser from "@/hooks/useInitializeUser";
import { Reset, Signup, Ttracks, User } from "@/types/auth";
import { Tprofile, Tuser } from "@/types/google";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  user: User;
  reset: Reset;
  signup: Signup;
  tracks: Ttracks[];
  google: {
    user: Tuser | null;
    profile: Tprofile | null;
  };
}

const initialState: AuthState = {
  user: {
    token: null,
    id: null,
    fullName: null,
    username: null,
  },
  reset: {
    email: null,
    otp: null,
    newPassword: null,
  },
  signup: {
    PersonalInformation: {
      arabicName: "",
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
  google: {
    user: null,
    profile: null,
  },
  tracks: [],
};

export const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      initializeUser(
        action.payload.token!,
        action.payload.fullName!,
        action.payload.id!,
        action.payload.username!,
      );
    },

    loginWithGoogle: (
      state,
      action: PayloadAction<{ user: Tuser; profile: Tprofile }>,
    ) => {
      state.google.profile = action.payload.profile;
      state.google.user = action.payload.user;
      localStorage.setItem("token", action.payload.user.access_token);
    },

    logout: () => {
      localStorage.clear();
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

export const { login, logout, reset, signup, getTracks, loginWithGoogle } =
  authslice.actions;

export default authslice.reducer;
