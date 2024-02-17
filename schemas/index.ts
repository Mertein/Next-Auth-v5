import { UserRole } from "@prisma/client";
import * as z from "zod";


export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
  role: z.enum([UserRole.USER, UserRole.ADMIN]),
})
.refine((values) => {
  if(values.password && !values.newPassword ) {
    return false;
  }
  return true;
}, {
  message: "Se requiere una contraseña nueva",
  path: ["newPassword"],
})
.refine((values) => {
  if(values.newPassword && !values.password) {
    return false;
  }

  return true;
},{
  message: "Se requiere la contraseña actual",
  path: ["password"],
})
.refine((values) => {
  if (values.password && values.newPassword && values.password === values.newPassword) {
    return false;
  }
  return true;
}, {
  message: "La contraseña actual y la nueva no pueden ser iguales",
  path: ["newPassword"],
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Se requiere una contraseña de al menos 6 caracteres',
  }),
  confirmPassword: z.string().min(6, {
    message: 'Se requiere una contraseña de al menos 6 caracteres',
  }),
}).refine((values) => {
  return values.password === values.confirmPassword
},
{
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'El correo es requerido',
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'El correo es requerido',
  }),
  password: z.string().min(1, {
    message: 'La contraseña es requerida',
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'El correo es requerido',
  }),
  password: z.string().min(6, {
    message: 'Se requiere una contraseña de al menos 6 caracteres',
  }),
  name: z.string().min(1, {
    message: 'El nombre es requerido',
  }),
});


export const AutoSchema = z.object({
  marca: z.string().min(1, {
    message: 'La marca es requerida',
  }),
  modelo: z.string().min(1, {
    message: 'El modelo es requerido',
  }),
  año: z.string().min(1, {
    message: 'El año es requerido',
  }),
  placa: z.string().min(1, {
    message: 'La version es requerida',
  }),
  kilometraje: z.string().min(1, {
    message: 'El kilometraje es requerido',
  }),
  tipoCombustible: z.string().min(1, {
    message: 'El tipo de combustible es requerido',
  }),
  imagen: z.array(z.string()).min(1, {
    message: 'La imagen es requerida',
  }),
  conductor: z.string().min(1, {
    message: 'El conductor es requerido',
  }),
});

  
