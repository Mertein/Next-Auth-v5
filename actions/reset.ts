"use server"
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { ResetSchema } from "@/schemas"
import * as z from "zod";


export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);

  if(!validateFields.success) {
    return { error: 'Correo invalido' }
  }

  const { email } = validateFields.data;
  const emailExists = getUserByEmail(email);

  if(!emailExists) {
    return { error: 'Correo no encontrado' }
  }

  sendVerificationEmail(email, 'rwerefwefewfwegfweghweg');
  return {success: 'Correo de restablecimiento enviado'}
  
}



