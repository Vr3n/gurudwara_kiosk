import {
  newsFormSchema,
  searchByIdSchema,
  updateNewsFormSchema,
} from "~/schemas/newsSchemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const newsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.news.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        gurudwara: true,
      },
    });
  }),
  getById: publicProcedure.input(searchByIdSchema).query(({ ctx, input }) => {
    return ctx.db.news.findUnique({
      where: {
        id: input.id,
      },
    });
  }),

  create: protectedProcedure
    .input(newsFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.news.create({
        data: newsFormSchema.parse(input),
      });
    }),

  update: protectedProcedure
    .input(updateNewsFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.news.update({
        where: {
          id: input.id.toString(),
        },
        data: updateNewsFormSchema.parse(input),
      });
    }),
});
