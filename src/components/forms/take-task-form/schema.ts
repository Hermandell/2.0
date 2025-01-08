import { z } from "zod";


export const TakeformSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  datetime: z.date(),
  language: z.string(),
  marketingEmails: z.boolean(),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  age: z.number().min(18, "Must be at least 18 years old"),
  terms: z.boolean().refine((val) => val, "You must accept the terms"),
  plan: z.enum(["free", "pro", "enterprise"]),
});

export type TakeTaskFormData = z.infer<typeof TakeformSchema>;

export const TakeTaskFormDefault={
  name: "",
  email: "",
  datetime: undefined,
  language: "",
  marketingEmails: false,
  bio: "",
  age: 18,
  terms: false,
  plan: undefined,
};