import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const featuredShopsRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.featuredShops.findMany({
            take: 50,
            orderBy: {
                createdAt: "desc",
            },
        });
    }),
});
