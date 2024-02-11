import * as z from "zod";

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

  
