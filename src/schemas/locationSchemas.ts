import * as z from "zod";

export const locationFormSchema = z.object({
  city: z.string().min(2, {
    message: "City must be provided!",
  }),
  country: z.string(),
  state: z.string(),
  longitude: z.string().min(2, {
    message: "Proper latitude not provided",
  }),
  latitude: z.string().min(2, {
    message: "Proper latitude not provided",
  }),
  gurudwaraId: z.string().min(2, {
    message: "Gurudwara id not selected!",
  }),
});

export const updateLocationFormSchema = z.object({
  id: z.string().cuid(),
  city: z.string().min(2, {
    message: "City must be provided!",
  }),
  country: z.string(),
  state: z.string(),
  longitude: z.string().min(2, {
    message: "Proper latitude not provided",
  }),
  latitude: z.string().min(2, {
    message: "Proper latitude not provided",
  }),
  gurudwaraId: z.string().min(2, {
    message: "Gurudwara id not selected!",
  }),
});
