'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormMessage,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectLabel,
   SelectSeparator,
   SelectTrigger,
   SelectValue,
   SelectItem,
 } from "@/components/ui/select";
import { UserRole } from "@prisma/client";
import { settings } from "@/actions/settings";
import { useTransition, useState } from "react";
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { useSession } from "next-auth/react";
const SettingsPage =  () => {
  const { update } = useSession();
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
    }
  });


  const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
      .then((data) => {
        if(data.success) {
          update();
          setSuccess(data.success);
          setError(undefined)
        }
        if(data.error) {
          setError(data.error);
         
        }
      })
      .catch(() => {
        setError('Something went wrong!' );
        setSuccess(undefined);
      });
    })
  };

  return ( 
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🔐 Settings Page
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                disabled={isPending}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Dob" autoComplete="name"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <>
                <FormField
                control={form.control}
                name="email"
                disabled={isPending}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="johndob@gmail.com" autoComplete="email"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                disabled={isPending}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input {...field} type='password' placeholder="******" value={field.value ?? ""} autoComplete="password"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                disabled={isPending}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Nueva Contraseña</FormLabel>
                    <FormControl>
                      <Input {...field} type='password' placeholder="******" value={field.value ?? ""} autoComplete="new-password"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              </>
              )}
              <FormField
                control={form.control}
                disabled={isPending}
                name="role"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a role' />
                        </SelectTrigger>
                      </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>
                            ADMIN
                          </SelectItem>
                          <SelectItem value={UserRole.USER}>
                            USER
                          </SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between">
              <div></div>
              <Button type='submit' disabled={isPending}> Guardar </Button>
            </div>
            <FormSuccess message={success}/>
            <FormError message={error}/>
          </form>
        </Form>
      </CardContent>
    </Card>
   );
}
 
export default SettingsPage;