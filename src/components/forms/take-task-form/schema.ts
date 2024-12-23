import { z } from "zod";


export const TakeformSchema = z.object({
  datetime: z.coerce.date(),
  username: z.string(),
  username_two: z.string(),
  username_three: z.string(),
  combobox: z.string(),
  //combobox: z.string().min(1, "Please select an assignee"),
  switch: z.boolean(),
});

export type TakeTaskFormData = z.infer<typeof TakeformSchema>;