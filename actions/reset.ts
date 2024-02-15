"use server"
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail} from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas"
import * as z from "zod";


export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);

  if(!validateFields.success) {
    return { error: 'Correo invalido' }
  }

  const { email } = validateFields.data;
  const existingUser = await getUserByEmail(email);

  if(!existingUser) {
    return { error: 'Correo no encontrado' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  if(!passwordResetToken) {
    return {error: 'Algo salio mal'};
  }

  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);  
  return {success: 'Correo de restablecimiento enviado'}
}



