'use server'
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";


export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
    if(!token) {
        return {error: 'Token no existe!'}
    }
    return {success: 'Contraseña actualizada!'}
}
