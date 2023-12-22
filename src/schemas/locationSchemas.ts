import * as z from "zod";

export const locationFormSchema = z.object({
  cityId: z.string(),
  country: z.string(),
  state: z.string(),
  longitude: z.coerce.number().min(-180).max(180),
  latitude: z.coerce.number().min(-90).max(90),
  gurudwaraId: z.string().min(2, {
    message: "Gurudwara id not selected!",
  }),
});

export const updateLocationFormSchema = z.object({
  id: z.string().cuid(),
  cityId: z.string(),
  country: z.string(),
  state: z.string(),
  longitude: z.coerce.number().min(-180).max(180),
  latitude: z.coerce.number().min(-90).max(90),
  gurudwaraId: z.string().min(2, {
    message: "Gurudwara id not selected!",
  }),
});
