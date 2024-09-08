export type BACKEND_T_teams = {
  completed: boolean;
  doctorName: string;
  doctorviceName: string;
  member: {
    mtTrack: string[];
    user: {
      fullName: string;
    };
  }[];
  numOfMember: number;
  projectCategory: string;
  projectDescription: string;
  projectNameArabic: string;
  projectNameEnglish: string;
  requirement: string[];
  _id: string;
};
