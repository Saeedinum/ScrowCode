export type TCreateTeamData = {
  members: number;
  teamName: string;
  projectIdea: string;
  userName: { name: string }[];
  requirement: string[];
  token: string;
};

export type TpersonalInformation = {
  firstname: string;
  lastname: string;
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
