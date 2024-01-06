import {
  historyFormSchema,
  searchByIdSchema,
  updateHistoryFormSchema,
} from "~/schemas/historySchemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const historyRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.history.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        gurudwara: true,
      },
    });
  }),

  getById: publicProcedure.input(searchByIdSchema)
    .query(({ ctx, input }) => {
      return ctx.db.history.findUnique({
        where: {
          id: input.id,
        },
      })
    }),

  create: protectedProcedure
    .input(historyFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.history.create({
        data: historyFormSchema.parse(input),
      });
    }),

  update: protectedProcedure
    .input(updateHistoryFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.history.update({
        where: {
          id: input.id.toString(),
        },
        data: updateHistoryFormSchema.parse(input),
      });
    }),
});
