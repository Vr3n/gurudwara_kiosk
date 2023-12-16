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
});

export const updateJournalFormSchema = z.object({
  id: z.string().cuid(),
  gurudwaraId: z.string().min(2, {
    message: "Gurudwara id not selected!",
  }),
  title: z.string().min(2, {
    message: "title not provided!",
  }),
  source: z.string().min(2, {
    message: "source not provided!",
  }),
});
