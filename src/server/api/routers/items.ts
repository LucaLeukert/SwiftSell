import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { type Prisma } from ".prisma/client";
import { TRPCError } from "@trpc/server";

export const itemRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.item.findMany();
    }),
    create: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1),
                description: z.string().min(1),
                price: z.number().min(1),
                images: z.string().array().min(1),
                shopId: z.string().min(1),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const jsonImages = {
                images: input.images,
            } as Prisma.JsonObject;

            const shop = await ctx.prisma.shop.findUnique({
                where: {
                    id: input.shopId,
                },
            });

            if (!shop)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Shop not found",
                });

            if (shop.ownerID !== ctx.userId)
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You are not the owner of this shop",
                });

            return ctx.prisma.item.create({
                data: {
                    sellerID: ctx.userId,
                    name: input.name,
                    description: input.description,
                    price: input.price,
                    images: jsonImages,
                    shopId: input.shopId,
                },
            });
        }),
});
