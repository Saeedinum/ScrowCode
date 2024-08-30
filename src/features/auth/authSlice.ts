import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  token: string | null;
  id: string | null;
  fullName: string | null;
};

type Reset = {
  email: string | null;
  otp: string | null;
  newPassword: string | null;
};

type Signup = {
  PersonalInformation: {
    fullName: string | null;
    phone: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
  };
  UniversityInformation: {
    university: string | null;
    college: string | null;
    level: number | null;
    department: string | null;
    universityEmail: string | null;
  };
  TrackInformation: {
    track: string | null;
    linkedin: string | null;
    github: string | null;
    behance: string | null;
  };
};

type Ttracks = {
  _id: string | undefined;
  name: string | undefined;
  slug: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}[];

interface AuthState {
  user: User;
  reset: Reset;
  signup: Signup;
  tracks: Ttracks;
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
  signup: {
    PersonalInformation: {
      fullName: "null",
      phone: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
    UniversityInformation: {
      university: null,
      college: null,
      level: null,
      department: null,
      universityEmail: null,
    },
    TrackInformation: {
      track: null,
      linkedin: null,
      github: null,
      behance: null,
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
    },

    logout: () => initialState,

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

    getTracks: (state, action: PayloadAction<Ttracks>) => {
      state.tracks = action.payload;
    },
  },
});

export const { login, logout, reset, signup, getTracks } = authslice.actions;

export default authslice.reducer;
