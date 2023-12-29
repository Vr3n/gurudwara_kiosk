import * as z from "zod";

export const journalFormSchema = z.object({
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

export const updateJournalFormSchema = journalFormSchema.extend({
  id: z.string().cuid(),
});
