export type TCreateTeamData = {
  projectArabicName: string;
  projectEnglishName: string;
  projectCategorie: string;
  projectDescription: string;
  teamMembers: {
    arabicName: string;
    username: string;
  }[];
  requirement: {
    trackID: string;
    number: number;
    tech: string;
  }[];
  supervisor: string;
  assistantSupervisor: string;
};

export type Tpartner = {
  id: string;
  imageURL: string;
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
