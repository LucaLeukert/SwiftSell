import { createTRPCRouter } from "~/server/api/trpc";
import { itemRouter } from "~/server/api/routers/items";
import { shopRouter } from "~/server/api/routers/shop";
import { settingsRouter } from "~/server/api/routers/settings";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    item: itemRouter,
    shop: shopRouter,
    settings: settingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
