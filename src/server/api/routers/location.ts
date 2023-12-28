import {
  locationFormSchema,
  updateLocationFormSchema,
  searchByCityNameSchema,
} from "~/schemas/locationSchemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const locationRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.location.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        city: true,
        gurudwara: true,
      },
    });
  }),

  getByCity: publicProcedure
    .input(searchByCityNameSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.location.findMany({
        where: {
          city: {
            name: input.name,
          },
        },
      });
    }),

  create: protectedProcedure
    .input(locationFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.location.create({
        data: locationFormSchema.parse(input),
      });
    }),

  update: protectedProcedure
    .input(updateLocationFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.location.update({
        where: {
          id: input.id.toString(),
        },
        data: updateLocationFormSchema.parse(input),
      });
    }),
});
