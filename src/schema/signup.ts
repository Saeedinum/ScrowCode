import { z } from "zod";

import {
  name,
  behanceRegex,
  email,
  githubRegex,
  linkedinRegex,
  password,
  phone,
  username,
  universityEmailRegex,
} from "./regex";

export const personalInformationSchema = z
  .object({
    arabicName: z
      .string()
      .min(1, { message: "first Name is required" })
      .regex(name, { message: "Please enter a valid name" }),
    username: z
      .string()
      .min(1, { message: "username is required" })
      .regex(username, { message: "Please enter a valid username" }),
    phone: z
      .string()
      .regex(phone, { message: "Please enter a valid phone number" }),
    email: z.string().regex(email, { message: "Please enter a valid email" }),
    password: z.string().regex(password, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export const continueWithGoogleSchema = z.object({
  username: z
    .string()
    .min(1, { message: "username is required" })
    .regex(username, { message: "Please enter a valid username" }),
  phone: z
    .string()
    .regex(phone, { message: "Please enter a valid phone number" }),
});

export const universityInformationSchema = z.object({
  university: z.string(),
  college: z.string(),
  level: z.number(),
  department: z.string(),
  universityEmail: z.string().regex(universityEmailRegex, {
    message: "Please enter a valid university email",
  }),
});

export const trackInformationSchema = z.object({
  track: z.string(),
  skills: z.array(z.any()),
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
