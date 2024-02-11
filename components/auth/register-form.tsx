'use client'

import * as z from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";


export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSucess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? 
  "La cuenta de correo ya esta registrada con otro proveedor de autenticacion" : "";

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSucess('');

    startTransition(() => {
      register(values, callbackUrl)
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
        headerLabel="Bienvenido de vuelta"
        backButtonLabel="Ya tienes una cuenta?"
        backButtonHref="/auth/login"
        showSocial
      >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">

          <FormField 
              control={form.control}
              name='name'
              render={({field}) => (
                <FormItem>
                  <FormLabel htmlFor="name">Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="John Doe"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

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
            
            {/* Password */}
            <FormField 
              control={form.control}
              name='password'
              render={({field}) => (
                <FormItem>
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="******" type='password'/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )} 
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          <Button type='submit' disabled={isPending} className="w-full">
            Registrarse
          </Button>
        </form>
      </Form>
      </CardWrapper>
  )
}