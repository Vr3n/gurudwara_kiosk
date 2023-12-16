import * as z from "zod";

export const videoFormSchema = z.object({
  gurudwaraId: z.string().min(2, {
    message: "Gurudwara id not selected!",
  }),
  url: z.string().url(),
});

export const updateVideoFormSchema = z.object({
  id: z.string().cuid(),
  gurudwaraId: z.string().min(2, {
    message: "Gurudwara id not selected!",
  }),
  url: z.string().url(),
});
