"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";
import {db} from "@/lib/db"
import { getUserByEmail } from "@/data/user";

export const register= async (values: z.infer<typeof RegisterSchema>, callbackUrl?: string | null,) => {
  const validateFields = RegisterSchema.safeParse(values);
  console.log('Values', values);
  console.log('ValidateFields', validateFields);

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

  console.log('Hashed Password', hashedPassword);
  return {success: "Usuario Registrado!"};

}