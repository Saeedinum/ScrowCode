type TCreateTeamData = {
  members: number;
  teamName: string;
  projectIdea: string;
  userName: { name: string }[];
  requirement: string[];
  token: string;
};

type TpersonalInformation = {
  firstname: string;
  lastname: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type TuniversityInformation = {
  university: string;
  college: string;
  level: string;
  department: string;
  universityEmail: string;
};

type TtrackInformation = {
  track: string;
  linkedin: string;
  github: string;
  behance: string;
};

export {
  type TCreateTeamData,
  type TpersonalInformation,
  type TuniversityInformation,
  type TtrackInformation,
};
