import { z } from "zod";

const arabicRegex = /^[\u0600-\u06FF\s]+$/;

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
