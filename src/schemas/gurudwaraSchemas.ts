import * as z from "zod";

export const gurudwaraFormSchema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  image: z.string().url().optional(),
});

export const updateGurudwaraFormSchema = gurudwaraFormSchema.extend({
  id: z.string({ required_error: "Gurudwara Id not selected!" }),
});

export const deleteGurudwaraFormSchema = z.object({
  id: z.string({ required_error: "Gurudwara Id not selected!" }),
});

export const searchByIdSchema = z.object({
  id: z.string({ required_error: "Gurudwara Id not selected!" }),
});

export const searchByNameSchema = z.object({
  name: z.string({ required_error: "Gurudwara name not provided!" }),
});

export const searchByCityNameSchema = z.object({
  name: z.string({ required_error: "City name not provided!" }),
});
