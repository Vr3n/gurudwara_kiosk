import { videoFormSchema, updateVideoFormSchema } from "~/schemas/videoSchemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const videoRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.video.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  create: protectedProcedure
    .input(videoFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.video.create({
        data: videoFormSchema.parse(input),
      });
    }),

  update: protectedProcedure
    .input(updateVideoFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.video.update({
        where: {
          id: input.id.toString(),
        },
        data: updateVideoFormSchema.parse(input),
      });
    }),
});
