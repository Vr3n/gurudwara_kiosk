import {
  locationFormSchema,
  updateLocationFormSchema,
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
    });
  }),

  create: publicProcedure
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
