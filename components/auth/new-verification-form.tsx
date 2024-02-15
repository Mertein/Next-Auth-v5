'use client'

import { CardWrapper } from "./card-wrapper";
import {BeatLoader}  from 'react-spinners';
import {useState, useCallback, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSucess] = useState<string | undefined>('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if(success || error) return;

    if(!token) {
      setError('No se ha encontrado el token de verificación');
      return;
    }
    newVerification(token).
      then((data) => {
        setSucess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Algo salió mal');
      })

  }, [token]);

  useEffect(() => {
    onSubmit();

  }, [onSubmit])



  
  return ( 
    <CardWrapper
      headerLabel="Confirmando tu verificación"
      backButtonLabel="Volver a Iniciar Sesión"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {!error && !success && (
          <BeatLoader/>
        )}
        {!success && (
        <FormError message={error} />
        )}
        <FormSuccess message={success} />
       

      </div>

    </CardWrapper>
   );
}
 
export default NewVerificationForm;