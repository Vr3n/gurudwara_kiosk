import * as z from "zod";

export const cityFormSchema = z.object({
  name: z.string().min(2, {
    message: "City must be provided!",
  }),
  longitude: z.coerce.number().min(-180).max(180),
  latitude: z.coerce.number().min(-90).max(90),
});

export const updateCityFormSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(2, {
    message: "City must be provided!",
  }),
  longitude: z.coerce.number().min(-180).max(180),
  latitude: z.coerce.number().min(-90).max(90),
});

export const searchByCityNameSchema = z.object({
  name: z.string().min(2, {
    message: "City name must be provided.",
  }),
});
