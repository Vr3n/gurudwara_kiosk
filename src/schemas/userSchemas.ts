import * as z from "zod";

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string({ required_error: "Password is required." }).min(8, {
    message: "Password should be atleast 8 characters long.",
  }),
});
