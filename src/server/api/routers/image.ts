import { imageFormSchema, updateImageFormSchema } from "~/schemas/imageSchemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.image.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  create: protectedProcedure
    .input(imageFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.image.create({
        data: imageFormSchema.parse(input),
      });
    }),

  update: protectedProcedure
    .input(updateImageFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.image.update({
        where: {
          id: input.id.toString(),
        },
        data: updateImageFormSchema.parse(input),
      });
    }),
});
