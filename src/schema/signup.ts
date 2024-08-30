import { z } from "zod";

const name = /^[a-zA-Z]+$/;
const username = /^[a-zA-Z0-9_-]{3,16}$/;
const email = /^[a-zA-Z0-9._%+-]+@(?:gmail\.com)$/i;
const password =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phone = /^(?:\+?20)?(10|11|12|15)[0-9]{8}$/;
const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+$/;
const linkedinRegex =
  /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/;
const behanceRegex = /^(https?:\/\/)?(www\.)?behance\.net\/[a-zA-Z0-9_-]+\/?$/;
const universityEmailRegex = /^ugs\.\d{4}@ci\.suez\.edu\.eg$/;

const personalInformationSchema = z
  .object({
    firstname: z
      .string()
      .min(1, { message: "first Name is required" })
      .regex(name, { message: "Please enter a valid name" }),
    lastname: z
      .string()
      .min(1, { message: "last Name is required" })
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

const universityInformationSchema = z.object({
  university: z.string(),
  college: z.string(),
  level: z.number(),
  department: z.string(),
  universityEmail: z.string().regex(universityEmailRegex, {
    message: "Please enter a valid university email",
  }),
});

const trackInformationSchema = z.object({
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

export {
  personalInformationSchema,
  universityInformationSchema,
  trackInformationSchema,
};
