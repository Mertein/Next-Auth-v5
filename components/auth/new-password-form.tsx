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
import { NewPasswordSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { newPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";

export const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSucess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const useSearch = useSearchParams();
  const token = useSearch.get('token');

  const form = useForm<z.infer<typeof NewPasswordSchema >>({
    resolver: zodResolver(NewPasswordSchema ),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema >) => {
    setError('');
    setSucess('');

    startTransition(() => {
      newPassword(values, token)
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
        headerLabel="Nueva contraseña"
        backButtonLabel="Volver a iniciar sesión"
        backButtonHref="/login"
      >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">

            {/* Password */}
            <FormField 
              control={form.control}
              name='password'
              render={({field}) => (
                <FormItem>
                  <FormLabel htmlFor="email">Correo</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="******" type='password'/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            
            {/* Repetir Contraseña */}
            <FormField 
              control={form.control}
              name='confirmPassword'
              render={({field}) => (
                <FormItem>
                  <FormLabel htmlFor="email">Repetir Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="******" type='password'/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type='submit' disabled={isPending} className="w-full">
            Cambiar contraseña
          </Button>
        </form>
      </Form>
      </CardWrapper>
  )
}