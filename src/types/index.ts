type TsignupUser = {
	fullName: string;
	phone: string;
	email: string;
	password: string;
	confirmPassword: string;
};
type TsignupStudent = {
	university: string;
	collage: string;
	level: string;
	department: string;
	universityEmail: string;

	track: string;
	skills: string[];
	linkedin: string;
	github: string;
	behance: string;
};

type TCreateTeamData = {
	members: number;
	teamName: string;
	projectIdea: string;
	userName: string[];
	requirement: string[];
};

export {type TsignupStudent, type TsignupUser, type TCreateTeamData};
