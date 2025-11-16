import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";
import { siteConfig } from "./siteConfig";
import crypto from "node:crypto";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      group?: string | null;
      image?: string | null;
    };
  }
}

const resolvedSecret =
  process.env.NEXTAUTH_SECRET ??
  process.env.AUTH_SECRET ??
  (process.env.NODE_ENV === "production"
    ? crypto.createHash("sha256").update(siteConfig.siteUrl).digest("hex")
    : "development-next-auth-secret");

export const authOptions: NextAuthOptions = {
  secret: resolvedSecret,
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "seu@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({ where: { email: credentials.email } });
          if (!user) {
            return null;
          }

          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            return null;
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            group: user.groupId ? user.groupId.toString() : null,
          };
        } catch (error) {
          console.error("[next-auth] authorize error", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return Boolean(user?.email);
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.group = "groupId" in user ? ((user as { groupId?: string | null }).groupId ?? null) : (user as { group?: string | null }).group ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.group = (token.group as string) ?? null;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NEXTAUTH_COOKIE_PREFIX ?? "next-auth"}.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  logger: {
    error(code, metadata) {
      console.error("[next-auth]", code, metadata);
    },
    warn(code) {
      console.warn("[next-auth]", code);
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === "development") {
        console.debug("[next-auth]", code, metadata);
      }
    },
  },
};
