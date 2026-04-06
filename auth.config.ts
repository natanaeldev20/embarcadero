import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authSchema } from "./modules/auth/schemas/auth.schema";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";
export default {
  providers: [
    Credentials({
      authorize: async (credential) => {
        const { success, data } = authSchema.safeParse(credential);

        if (!success) return null;

        const user = await prisma.user.findUnique({
          where: {
            username: data.username.toLowerCase().trim(),
          },
        });

        if (!user) return null;
        if (!user.password) return null;

        const isValidPassword = await bcrypt.compare(
          data.password,
          user.password,
        );

        if (!isValidPassword) return null;

        return {
          id: user.id,
          name: `${user.name} ${user.lastName}`,
          image: user.imgUrl,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
