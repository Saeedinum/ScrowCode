export type BACKEND_T_teams = {
  completed: boolean;
  doctorName: string;
  doctorviceName: string;
  member: {
    myTrack: {
      name: string;
    }[];
    user: {
      fullName: string;
    };
  }[];
  numOfMember: number;
  projectCategory: string;
  projectDescription: string;
  projectNameArabic: string;
  projectNameEnglish: string;
  requirement: { name: string }[];
  _id: string;
};

export type BACKEND_T_profile = {
  Available: boolean;
  chooseleader: boolean;
  college: string;
  createdAt: string;
  department: string;
  leader: boolean;
  level: string;
  mySkills: string[];
  myTracks: string[];
  pending: string[];
  resultvote: number;
  team: string;
  university: string;
  universityemail: string;
  updatedAt: string;
  user: {
    Email: string;
    Username: string;
    active: boolean;
    fullName: string;
    role: string;
    slug: string;
  };
  _id: string;
};
