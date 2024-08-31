export type TCreateTeamData = {
  projectName: string;
  projectCategorie: string;
  projectDescription: string;
  requirement: {
    trackID: string;
    number: number;
    tech: string;
  }[];
  teamMembers: string[]
};

export type TpersonalInformation = {
  firstname: string;
  lastname: string;
  fullName: string;
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
