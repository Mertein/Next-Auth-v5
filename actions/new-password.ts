'use server'
import { db } from "@/lib/db";


export const newPassword = async (token: string, password: string) => {
    if(!token) {
        return {error: 'Token no existe!'}
    }
    return {success: 'Contraseña actualizada!'}
}
