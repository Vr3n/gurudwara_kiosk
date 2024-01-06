import * as z from "zod";

export const historyFormSchema = z.object({
  gurudwaraId: z.string().min(2, {
    message: "Gurudwara id not selected!",
  }),
  title: z.string().min(2, {
    message: "title not provided!",
  }),
  content: z.string(),
  description: z.string(),
  source: z.string().min(2, {
    message: "source not provided!",
  }),
});

export const updateHistoryFormSchema = historyFormSchema.extend({
  id: z.string().cuid(),
});

export const searchByIdSchema = z.object({
  id: z.string({ required_error: "history Id not provided!" }),
});
