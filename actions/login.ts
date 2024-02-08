"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null,) => {
  const validateFields = LoginSchema.safeParse(values);
  console.log('Values', values);
  console.log('ValidateFields', validateFields);

  if(!validateFields.success) {
    return {error: "Campos Invalidos!"};
  }

  const {email, password} = validateFields.data;

}