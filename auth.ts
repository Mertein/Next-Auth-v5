import NextAuth from "next-auth"
import authConfig from "@/auth.config";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {db} from "@/lib/db";
import { UserRole } from "@prisma/client";
import { getUserById } from "./data/user";

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
  pages: {
    error: "/auth/error",
    signIn: "/auth/login",

  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {id: user.id },
        data: {emailVerified: new Date() }
      })
    },
  },
  callbacks: {
    async signIn({user, account}) {
      if(account?.provider !== "credentials") return true;
      
      const existingUser = await getUserById(user.id);
      if(!existingUser?.emailVerified) return false;
      return true;
    },
    async jwt ({token}) {
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
     
      return token;
    },
    async session ({token, session}) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if(token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});


