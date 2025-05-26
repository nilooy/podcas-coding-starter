import { publicProcedure, router } from "../lib/trpc";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  getTextString: publicProcedure.query(() => {
    return "Life in Ocean";
  }),
});
export type AppRouter = typeof appRouter;
