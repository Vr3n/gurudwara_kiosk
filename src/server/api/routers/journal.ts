import {
  journalFormSchema,
  searchByIdSchema,
  updateJournalFormSchema,
} from "~/schemas/journalSchemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const journalRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.journal.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        gurudwara: true,
      },
    });
  }),

  getById: publicProcedure.input(searchByIdSchema)
    .query(({ ctx, input }) => {
      return ctx.db.journal.findUnique({
        where: {
          id: input.id,
        },
      })
    }),

  create: protectedProcedure
    .input(journalFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.journal.create({
        data: journalFormSchema.parse(input),
      });
    }),

  update: protectedProcedure
    .input(updateJournalFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.journal.update({
        where: {
          id: input.id.toString(),
        },
        data: updateJournalFormSchema.parse(input),
      });
    }),
});
