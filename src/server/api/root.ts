import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { gurudwaraRouter } from "./routers/gurudwara";
import { locationRouter } from "./routers/location";
import { journalRouter } from "./routers/journal";
import { historyRouter } from "./routers/history";
import { newsRouter } from "./routers/news";
import { imageRouter } from "./routers/image";
import { videoRouter } from "./routers/video";
import { cityRouter } from "./routers/city";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  gurudwara: gurudwaraRouter,
  location: locationRouter,
  journal: journalRouter,
  video: videoRouter,
  image: imageRouter,
  news: newsRouter,
  history: historyRouter,
  city: cityRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
