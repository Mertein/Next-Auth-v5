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
import { AutoSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import marcas from '../../models/marcas.json';
import { auto } from "@/actions/auto";

export const AutoForm = () => {
  console.log(marcas)
  const [error, setError] = useState<string | undefined>('');
  const [success, setSucess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? 
  "La cuenta de correo ya esta registrada con otro proveedor de autenticacion" : "";

  const form = useForm<z.infer<typeof AutoSchema>>({
    resolver: zodResolver(AutoSchema),
    defaultValues: {
      marca: '',
      modelo: '',
      año: '',
      placa: '',
      kilometraje: '',
      tipoCombustible: '',
      imagen: [],
      conductor: '',
    },
  });

  const onSubmit = (values: z.infer<typeof AutoSchema>) => {
    setError('');
    setSucess('');

    startTransition(() => {
      auto(values, callbackUrl)
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
  
    <div className="grid min-h-screen w-full place-items-center">
      <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        <h1 className="text-xl font-semibold">Hello there ?, <span className="font-normal">please fill in your information to continue</span></h1>
        <form className="mt-6">
          <div className="flex justify-between gap-3">
            <span className="w-1/2">
              <label for="firstname" className="block text-xs font-semibold text-gray-600 uppercase">Firstname</label>
              <input id="firstname" type="text" name="firstname" placeholder="John" autocomplete="given-name" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
            </span>
            <span className="w-1/2">
              <label for="lastname" className="block text-xs font-semibold text-gray-600 uppercase">Lastname</label>
            <input id="lastname" type="text" name="lastname" placeholder="Doe" autocomplete="family-name" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
            </span>
          </div>
          <label for="email" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
          <input id="email" type="email" name="email" placeholder="john.doe@company.com" autocomplete="email" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
          <label for="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
          <input id="password" type="password" name="password" placeholder="********" autocomplete="new-password" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
          <label for="password-confirm" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Confirm password</label>
          <input id="password-confirm" type="password" name="password-confirm" placeholder="********" autocomplete="new-password" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
          <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
            Sign up
          </button>
          <p className="flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">Already registered?</p>
        </form>
      </div>
    </div>
  )
}