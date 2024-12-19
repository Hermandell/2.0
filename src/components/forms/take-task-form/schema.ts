import { z } from "zod";

export const takeTaskSchema = z.object({
  date: z.date(),
  hours: z.string().regex(/^\d{1,2}$/).transform(Number),
  minutes: z.string().regex(/^\d{1,2}$/).transform(Number),
  seconds: z.string().regex(/^\d{1,2}$/).transform(Number),
  assignee: z.string().min(1, "Please select an assignee"),
  notes: z.string(),
});

export type TakeTaskFormData = z.infer<typeof takeTaskSchema>;