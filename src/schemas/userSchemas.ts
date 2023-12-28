import * as z from "zod";

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string({ required_error: "Password is required." }).min(8, {
    message: "Password should be atleast 8 characters long.",
  }),
});

export const userRegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string({ required_error: "Password is required." }).min(8, {
      message: "Password should be atleast 8 characters long.",
    }),
    confirmPassword: z.string({
      required_error: "Please enter password again for confirmation.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
      });
    }
  });
