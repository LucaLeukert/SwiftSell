import { createTRPCRouter } from "~/server/api/trpc";
import { itemRouter } from "~/server/api/routers/items";
import { featuredShopsRouter } from "~/server/api/routers/featuredShops";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    item: itemRouter,
    featuredShops: featuredShopsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
