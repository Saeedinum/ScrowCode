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
