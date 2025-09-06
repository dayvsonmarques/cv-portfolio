import NextAuth, { type NextAuthOptions, SessionStrategy, DefaultSession } from "next-auth";
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
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "seu@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;
  // Se usar bcrypt para senha:
  const isValid = await compare(credentials.password, user.password);
  if (!isValid) return null;
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          group: user.groupId ? user.groupId.toString() : null
        };
      }
    })
  ],
  session: { strategy: "jwt" as SessionStrategy },
  pages: {
    signIn: "/admin/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // user pode ser AdapterUser ou User, mas groupId existe em User
        token.group = 'groupId' in user ? (user.groupId ? user.groupId.toString() : null) : null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.group = token.group as string;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
