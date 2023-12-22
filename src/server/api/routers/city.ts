import { cityFormSchema, updateCityFormSchema } from "~/schemas/citiesSchemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const cityRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.city.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  create: protectedProcedure
    .input(cityFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.city.create({
        data: cityFormSchema.parse(input),
      });
    }),

  update: protectedProcedure
    .input(updateCityFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.city.update({
        where: {
          id: input.id.toString(),
        },
        data: updateCityFormSchema.parse(input),
      });
    }),
});
