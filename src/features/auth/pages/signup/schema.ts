import { z } from "zod";
import { email, password, phone, githubRegex, linkedinRegex, behanceRegex, universityEmailRegex } from "../../../../constants/regex";

const signupUserSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full Name is required" }),
    phone: z.string().regex(phone, { message: "Please enter a valid phone number" }),
    email: z.string().regex(email, { message: "Please enter a valid email" }),
    password: z.string().regex(password, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
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

const signupStudentSchema = z
  .object({
    university: z.string(),
    collage: z.string(),
    level: z.number(),
    department: z.string(),
    universityEmail: z.string().regex(universityEmailRegex, { message: "Please enter a valid university email" }),
    track: z.string(),
    linkedin: z.string().regex(linkedinRegex, { message: "Please enter a valid LinkedIn URL" }),
    github: z.string().regex(githubRegex, { message: "Please enter a valid GitHub URL" }),
    behance: z.string().regex(behanceRegex, { message: "Please enter a valid Behance URL" }),
  })

export { signupUserSchema, signupStudentSchema };

