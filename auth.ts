import NextAuth from "next-auth";
import authConfig from "./auth.config"; // Importa a configuração do auth.config
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "./data/user";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

// Criação da instância do NextAuth com a configuração
export const { auth, handlers, signIn, signOut } = NextAuth({

  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      
      if  (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
     
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const exitingUser = await getUserById(token.sub)
      if(!exitingUser) return token;

      token.role = exitingUser.role;
      return token
    }
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  ...authConfig,
});
