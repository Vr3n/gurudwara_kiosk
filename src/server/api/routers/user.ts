import { userLoginSchema, userRegisterSchema } from "~/schemas/userSchemas";
import bcrypt from "bcrypt";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getByEmail: publicProcedure
    .input(userLoginSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),

  signIn: protectedProcedure
    .input(userLoginSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          email: input.email,
          password: input.password,
        },
      });
    }),

  create: protectedProcedure
    .input(userRegisterSchema)
    .query(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);

      return ctx.db.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
        },
      });
    }),
});
