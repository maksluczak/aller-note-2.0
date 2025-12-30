import {z} from "zod";

export const emailSchema = z
    .string()
    .email("Nieprawidłowy adres email");

export const passwordSchema = z
    .string()
    .min(8, "Hasło musi mieć minimum 8 znaków");

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export const registerSchema = z.object({
    username: z.string().min(3, "Nazwa użytkownika musi mieć minimum 3 znaki"),
    email: emailSchema,
    password: passwordSchema,
    repeatedPassword: z.string()
}).refine((data) => data.password === data.repeatedPassword, {
    message: "Hasła muszą być takie same",
    path: ["repeatedPassword"]
});

export const usernameSchema = z
    .string()
    .min(3, "Nazwa użytkownika musi mieć minimum 3 znaki");

export const changePasswordSchema = z.object({
    password: passwordSchema,
    repeatedPassword: z.string()
}).refine((data) => data.password === data.repeatedPassword, {
    message: "Hasła muszą być takie same",
    path: ["repeatedPassword"]
});