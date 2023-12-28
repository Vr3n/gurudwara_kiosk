import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "~/server/db";
import { env } from "~/env.js";
import { userLoginSchema } from "~/schemas/userSchemas";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "abc@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const cred = userLoginSchema.parse(credentials);

        const user = await db.user.findFirst({
          where: {
            email: cred.email,
          },
        });

        if (!user) {
          return null;
        }


        const isValidPassword = bcrypt.compareSync(
          cred.password,
          user.password,
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
