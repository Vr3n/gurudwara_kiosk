import {
  deleteGurudwaraFormSchema,
  gurudwaraFormSchema,
  updateGurudwaraFormSchema,
} from "~/schemas/gurudwaraSchemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const gurudwaraRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.gurudwara.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  create: protectedProcedure
    .input(gurudwaraFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gurudwara.create({
        data: {
          name: input.name,
        },
      });
    }),

  update: protectedProcedure
    .input(updateGurudwaraFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gurudwara.update({
        where: {
          id: input.id.toString(),
        },
        data: updateGurudwaraFormSchema.parse(input),
      });
    }),
});
