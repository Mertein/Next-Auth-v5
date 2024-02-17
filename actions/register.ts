"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";
import {db} from "@/lib/db"
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register= async (values: z.infer<typeof RegisterSchema>, callbackUrl?: string | null,) => {
  const validateFields = RegisterSchema.safeParse(values);
  if(!validateFields.success) {
    return {error: "Campos Invalidos!"};
  }

  const {email, password, name} = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {error: "El email ya esta registrado!"};
  }

   await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    }
  })

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(email, verificationToken.token);

  await db.user.update({
    where: {email},
    data: {emailVerified: new Date}
  })

  return {success: "Registro completado!!. Normalmente recibirias un correo para verificar el correo y validarlo, pero actualmente no puedo enviarte correos mas que a mi mismo por falta de dominio propio. Asi que te lo valido por defecto, ya podes iniciar sesion!"};
}