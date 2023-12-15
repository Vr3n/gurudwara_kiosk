import * as z from "zod";

export const gurudwaraFormSchema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

export const updateGurudwaraFormSchema = z.object({
  id: z.string({ required_error: "Gurudwara Id not selected!" }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});
