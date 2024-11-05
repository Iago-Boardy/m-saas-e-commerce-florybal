import NextAuth from "next-auth";
import authConfig from "./auth.config"; // Importa a configuração do auth.config
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db";

// Criação da instância do NextAuth com a configuração
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  ...authConfig,
});
