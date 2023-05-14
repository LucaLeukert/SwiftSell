import {
    createTRPCRouter,
    protectedProcedure,
    ratelimit,
} from "~/server/api/trpc";
import { z } from "zod";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

export const settingsRouter = createTRPCRouter({
    mutateProfile: protectedProcedure
        .input(
            z.object({
                user: z.object({
                    firstName: z.string().min(1).optional(),
                    lastName: z.string().min(1).optional(),
                    username: z.string().min(1).optional(),
                    profileImageUrl: z.string().url().min(1).optional(),
                }),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;

            const { success } = await ratelimit.limit(userId);

            if (!success) {
                throw new TRPCError({
                    code: "TOO_MANY_REQUESTS",
                    message:
                        "Du hast zu viele Anfragen gestellt. Bitte versuche es später erneut.",
                });
            }

            const user = await clerkClient.users.updateUser(userId, input.user);
            console.log(user);
        }),
    queryUserInfo: protectedProcedure.mutation(async ({ ctx }) => {
        const sessions = await clerkClient.sessions.getSessionList({
            userId: ctx.userId,
            status: "active",
        });

        sessions.forEach((session) => {
            console.log(session);
        });

        return sessions;
    }),
});
