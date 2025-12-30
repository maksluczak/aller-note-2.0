const { z } = require("zod");

const emailSchema = z
    .string()
    .email("Invalid email format");

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters");

exports.loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
});

exports.registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: emailSchema,
    password: passwordSchema,
    defaultLocation: z.string().min(1, "Location is required")
});

exports.updatePasswordSchema = z.object({
    password: passwordSchema
});

exports.updateUsernameSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters")
});
