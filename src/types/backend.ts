export type BACKEND_T_teams = {
  completed: boolean
  doctorName: string
  doctorviceName: string
  member: {
    myTrack: {
      name: string
    }[]
    user: {
      fullName: string
    }
  }[]
  numOfMember: number
  projectCategory: string
  projectDescription: string
  projectNameArabic: string
  projectNameEnglish: string
  requirement: { name: string }[]
  _id: string
}

export type BACKEND_T_profile = {
  Available: boolean
  chooseleader: boolean
  college: string
  createdAt: string
  department: string
  leader: boolean
  level: string
  mySkills: string[]
  myTrack: string[]
  pending: string[]
  resultvote: number
  team: string
  university: string
  universityemail: string
  updatedAt: string
  user: {
    Email: string
    Username: string
    active: boolean
    fullName: string
    role: string
    slug: string
  }
  _id: string
  contact?: {
    behance: string
    github: string
    linkedin: string
  }
}

export type BACKEND_T_partners = {
  Available: boolean
  mySkills: { name: string }[]
  myTrack: { name: string }[]
  user: {
    fullName: string
    profileImg?: string
  }
  _id: string
}

export type BACKEND_T_error = {
  errors: {
    type: string
    value: string
    msg: string
    path: string
    location: string
  }[]
}

export type BACKEND_T_createTeamError = {
  status: number
  data: {
    errors:
      | {
          msg: string
          path: "projectNameArabic" | "projectNameEnglish" | "projectDescription"
          value: string
        }[]
      | {
          msg: string
          path: "userName"
          value: string[]
        }[]
  }
}
