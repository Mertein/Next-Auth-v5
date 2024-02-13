"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null,) => {
  const validateFields = LoginSchema.safeParse(values);

  if(!validateFields.success) {
    return {error: "Campos Invalidos!"};
  }

  const {email, password} = validateFields.data;

  const existingUser = await getUserByEmail(email);
  
  if(!existingUser || !existingUser.email || !existingUser.password) {
    return {error: "Credenciais Invalidas!"};
  }

  if(!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    return {success: 'Email de verificación enviado!'}
  }
  

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if(error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {error: "Credenciais Invalidas!"};
        default: return {error: "Algo salio mal!"}
      }
    }

    throw error;
  }
}