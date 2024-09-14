export type TCreateTeamData = {
  projectArabicName: string;
  projectEnglishName: string;
  category: string;
  projectDescription: string;
  teamMembers: {
    arabicName: string;
    username: string;
  }[];
  requirement: {
    trackID: string;
    number: number;
  }[];
  supervisor: string;
  assistantSupervisor: string;
};

export type TEditTeamData = {
  projectArabicName: string;
  projectEnglishName: string;
  category: string;
  projectDescription: string;
  teamMembers: string[];
  deletedMembers: string[];
  requirement: {
    trackID: string;
    number: number;
  }[];
  supervisor: string;
  assistantSupervisor: string;
  requirementAdded: string[];
  requirementDelete: string[];
};

export type TEditProfileData = {
  arabicName: string;
  username: string;

  linkedin: string;
  github: string;
  behance: string;

  university: string;
  college: string;
  level: number;
  department: string;
  universityEmail: string;

  track: string;
  skills: string[];
};

export type Tpartner = {
  id: string;
  imageURL?: string;
  name: string;
  track: string;
  status: "available" | "notAvailable" | "pending";
  skills: {
    name: string;
    id: string;
  }[];
};

export type Tteam = {
  id: string;
  name: {
    english: string;
    arabic: string;
  };
  category: string;
  status: "available" | "notAvailable" | "pending";
  description: string;
  members: {
    max: 8;
    current: number;
  };
  tracks: {
    id: string;
    name: string;
    maxmembers: number;
    members: {
      id: string;
      name: string;
      imageURL: string;
    }[];
  }[];
  supervisor: string;
  assistantSupervisor: string;
};

export const emptyTeam: Tteam & { admin: false } = {
  id: "",
  name: {
    english: "",
    arabic: "",
  },
  category: "",
  status: "available",
  description: "",
  members: {
    max: 8,
    current: 0,
  },
  tracks: [
    {
      id: "",
      name: "",
      maxmembers: 8,
      members: [
        {
          id: "",
          name: "",
          imageURL: "",
        },
      ],
    },
  ],
  supervisor: "",
  assistantSupervisor: "",
  admin: false,
};

export type TpersonalInformation = {
  arabicName: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TuniversityInformation = {
  university: string;
  college: string;
  level: number;
  department: string;
  universityEmail: string;
};

export type TtrackInformation = {
  track: string;
  skills: string[];
  linkedin: string;
  github: string;
  behance: string;
};
