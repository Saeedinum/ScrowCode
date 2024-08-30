export type User = {
  token: string | null;
  id: string | null;
  fullName: string | null;
};

export type Reset = {
  email?: string | null;
  otp?: string | null;
  newPassword?: string | null;
};

export type Signup = {
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

export type skill = {
  createdAt: string;
  name: string;
  slug: string;
  track: string;
  updatedAt: string;
  _id: string;
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