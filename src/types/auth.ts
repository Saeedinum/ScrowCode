import {
  TpersonalInformation,
  TtrackInformation,
  TuniversityInformation,
} from ".";

export type User = {
  token: string | null;
  email: string | null;
  fullName: string | null;
  username: string | null;
};

export type Reset = {
  email?: string | null;
  otp?: string | null;
  newPassword?: string | null;
};

export type Signup = {
  PersonalInformation: TpersonalInformation;
  UniversityInformation: TuniversityInformation;
  TrackInformation: TtrackInformation;
};

export type skill = {
  // createdAt: string;
  name: string;
  // slug: string;
  // track: string;
  // updatedAt: string;
  // _id: string;
};

export type Ttracks = {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  skills: skill[];
};

export type TLoginData = {
  email: string;
  password: string;
};
