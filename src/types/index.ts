type TSignUPData = {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	password: string;
	university: string;
	collage: string;
	level: string;
	department: string;
	track: string;
	linkedin: string;
	github: string;
	behance: string;
	bio: string;
};

type TCreateTeamData = {
	members: number;
	teamName: string;
	projectIdea: string;
	userName: string[];
	requirement: string[];
};

export {type TSignUPData, type TCreateTeamData};
