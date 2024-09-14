import { z } from "zod";

const arabicRegex = /^[\u0600-\u06FF\s]+$/;
const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+$/;
const linkedinRegex =
  /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/;
const behanceRegex = /^(https?:\/\/)?(www\.)?behance\.net\/[a-zA-Z0-9_-]+\/?$/;

export const createTeamSchema = z.object({
  projectArabicName: z.string().regex(arabicRegex),
  projectEnglishName: z.string(),
  projectDescription: z.string().regex(arabicRegex),
  teamMembers: z.array(
    z.object({
      arabicName: z.string().regex(arabicRegex),
      username: z.string(),
    }),
  ),
  supervisor: z.string().regex(arabicRegex),
  assistantSupervisor: z.string().regex(arabicRegex),
});

export const editTeamSchema = z.object({
  projectArabicName: z.string().regex(arabicRegex),
  projectEnglishName: z.string(),
  projectDescription: z.string().regex(arabicRegex),
  supervisor: z.string().regex(arabicRegex),
  assistantSupervisor: z.string().regex(arabicRegex),
});

export const editProfileSchema = z.object({
  arabicName: z
  .string()
  .min(1, { message: "first Name is required" })
  .regex(arabicRegex, { message: "Please enter a valid name" }),
  linkedin: z
    .string()
    .regex(linkedinRegex, { message: "Please enter a valid LinkedIn URL" }),
  github: z
    .string()
    .regex(githubRegex, { message: "Please enter a valid GitHub URL" }),
  behance: z
    .string()
    .regex(behanceRegex, { message: "Please enter a valid Behance URL" }),
});


