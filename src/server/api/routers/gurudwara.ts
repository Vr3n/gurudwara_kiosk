import {
  gurudwaraFormSchema,
  updateGurudwaraFormSchema,
  searchByIdSchema,
  searchByNameSchema,
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

  getById: publicProcedure
    .input(searchByIdSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.gurudwara.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getByName: publicProcedure
    .input(searchByNameSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.gurudwara.findFirst({
        where: {
          name: input.name,
        },
        include: {
          locations: {
            include: {
              city: true,
            },
          },
          journals: true,
          histories: true,
          news: true,
          images: true,
          videos: true,
        },
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
