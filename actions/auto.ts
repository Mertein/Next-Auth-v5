"use server";

import { AutoSchema } from "@/schemas";
import * as z from "zod";

export const auto = async (values: z.infer<typeof AutoSchema>, callbackUrl?: string | null,) => {
  const validateFields = AutoSchema.safeParse(values);
  console.log('ValidateFields', validateFields);

  if(!validateFields.success) {
    return {error: "Campos Invalidos!"};
  }

  const {marca, modelo, año, placa, kilometraje, tipoCombustible, imagen, conductor} = validateFields.data;

}