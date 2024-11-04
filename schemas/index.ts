import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().nonempty({
        message: "*Digite o Email."
    }).email({
        message: "*Email inválido."
    }),
    password: z.string().min(1, {
        message: "*Digite a Senha."
    })
});

export const RegisterSchema = z.object({
    email: z.string().nonempty({
        message: "*Digite o Email."
    }).email({
        message: "*Email inválido."
    }),
    password: z.string().min(6, {
        message: "*No mínimo 6 caracteres."
    }),
    name: z.string().min(1, {
        message: "*Nome é necessário."
    })
});