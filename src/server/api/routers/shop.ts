import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Prisma } from ".prisma/client";

export const shopRouter = createTRPCRouter({
    getFeatured: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.shop.findMany({
            take: 50,
            where: {
                featured: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                card: true,
                featured: true,
                description: true,
                id: true,
                name: true,
                url: true,
                ownerID: false,
            },
        });
    }),
    mutateShopInfo: protectedProcedure
        .input(
            z.object({
                shopId: z.string().min(1),
                info: z.object({
                    handlebar: z
                        .object({
                            uuid: z.string().min(1),
                            blockId: z.string().min(1),
                            data: z.any(),
                        })
                        .array()
                        .min(1),
                }),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const shop = await ctx.prisma.shop.findUnique({
                where: {
                    id: input.shopId,
                },
            });

            if (!shop) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Shop not found",
                });
            }

            if (shop.ownerID !== ctx.userId) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Unauthorized",
                });
            }

            await ctx.prisma.shopInfo.update({
                where: {
                    shopId: input.shopId,
                },
                data: {
                    handlebar: input.info.handlebar as Prisma.JsonArray,
                },
            });
        }),
    getShopFromCurrentAuth: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.shop.findUnique({
            where: {
                ownerID: ctx.userId as string,
            },
            select: {
                ownerID: false,
                id: true,
                name: true,
                description: true,
                url: true,
                featured: true,
                items: true,
                info: true,
                card: true,
            },
        });
    }),
    getShopCard: publicProcedure
        .input(
            z.object({
                shopId: z.string().min(1),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.shopCard.findUnique({
                where: {
                    shopId: input.shopId,
                },
            });
        }),
    getShopInfo: publicProcedure
        .input(
            z.object({
                shopId: z.string().min(1).optional(),
                shopName: z.string().min(1).optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            if (input.shopId) {
                return ctx.prisma.shopInfo.findUnique({
                    where: {
                        shopId: input.shopId,
                    },
                });
            } else if (input.shopName) {
                const shop = await ctx.prisma.shop.findUnique({
                    where: {
                        name: input.shopName,
                    },
                    select: {
                        info: true,
                    },
                });

                if (!shop)
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Shop not found",
                    });

                return shop.info;
            }
        }),
});
