import { z } from "zod"

import { name, behanceRegex, githubRegex, linkedinRegex } from "./regex"

export const createTeamSchema = z.object({
  projectArabicName: z.string().regex(name),
  projectEnglishName: z.string(),
  // projectDescription: z.string().regex(name),
  teamMembers: z.array(
    z.object({
      // arabicName: z.string().regex(name),
      username: z.string()
    })
  ),
  supervisor: z.string().regex(name),
  assistantSupervisor: z.string().regex(name)
})

export const editTeamSchema = z.object({
  projectArabicName: z.string().regex(name),
  projectEnglishName: z.string(),
  projectDescription: z.string().regex(name),
  supervisor: z.string().regex(name),
  assistantSupervisor: z.string().regex(name)
})

export const editProfileSchema = z.object({
  arabicName: z.string().min(1, { message: "first Name is required" }).regex(name, { message: "Please enter a valid name" }),
  linkedin: z.string().regex(linkedinRegex, { message: "Please enter a valid LinkedIn URL" }),
  github: z.string().regex(githubRegex, { message: "Please enter a valid GitHub URL" }),
  behance: z.string().regex(behanceRegex, { message: "Please enter a valid Behance URL" })
})
