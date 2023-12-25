import { userLoginSchema } from "~/schemas/userSchemas";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gurudwaraRouter = createTRPCRouter({
  getByEmail: publicProcedure
    .input(userLoginSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),
});
