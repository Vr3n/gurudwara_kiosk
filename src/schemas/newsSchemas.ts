import * as z from "zod";

export const newsFormSchema = z.object({
  gurudwaraId: z.string().min(2, {
    message: "Gurudwara id not selected!",
  }),
  title: z.string().min(2, {
    message: "title not provided!",
  }),
  source: z.string().min(2, {
    message: "source not provided!",
  }),
  description: z.string(),
  content: z.string(),
});

export const updateNewsFormSchema = newsFormSchema.extend({
  id: z.string().cuid(),
});

export const searchByIdSchema = z.object({
  id: z.string({ required_error: "News Id not provided!" }),
});
