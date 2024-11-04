"use server";

import bcrypt from "bcryptjs"
import * as z from "zod";
import { RegisterSchema } from "../schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "../data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields  = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos Inválidos"}
    }

    const { email, password, name} =  validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email já em uso."}
    }

    await db.user.create({ 
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    //TODO: Enviar verificação no email

    return { sucess: "Conta criada!"}
}