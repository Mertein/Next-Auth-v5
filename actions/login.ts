"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null,) => {
  const validateFields = LoginSchema.safeParse(values);

  if(!validateFields.success) {
    return {error: "Campos Invalidos!"};
  }

  const {email, password} = validateFields.data;

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