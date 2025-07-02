import { z } from "zod";

export const loginValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const registerValidation = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
});