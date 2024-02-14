'use client'

import * as z from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { reset } from "@/actions/reset";


export const FormReset = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSucess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSucess('');
    console.log(values);



    startTransition(() => {
      reset(values)
      .then((data) => {
        if(data?.error) {
          form.reset();
          setError(data.error);
        }
        if(data?.success) {
          form.reset();
          setSucess(data.success);
        }
      })
      .catch(() => setError('Algo salio mal'));
    });
  };

  return (
      <CardWrapper 
        headerLabel="Restablecer contraseña"
        backButtonLabel="Volver a iniciar sesión"
        backButtonHref="/login"
      >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">

            {/* Email */}
            <FormField 
              control={form.control}
              name='email'
              render={({field}) => (
                <FormItem>
                  <FormLabel htmlFor="email">Correo</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="john.doe@example.com" type='email'/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type='submit' disabled={isPending} className="w-full">
            Enviar correo de restablecimiento
          </Button>
        </form>
      </Form>
      </CardWrapper>
  )
}