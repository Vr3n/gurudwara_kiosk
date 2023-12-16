import { newsFormSchema, updateNewsFormSchema } from "~/schemas/newsSchemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const newsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.news.findMany({
      orderBy: { createdAt: "desc" },
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
