import * as z from "zod";

export const videoFormSchema = z.object({
  gurudwaraId: z.string().min(2, {
    message: "Gurudwara id not selected!",
  }),
  url: z.string().url(),
  name: z.string(),
});

export const updateVideoFormSchema = videoFormSchema.extend({
  id: z.string().cuid(),
});
