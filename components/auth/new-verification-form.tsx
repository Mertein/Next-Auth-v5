'use client'

import { CardWrapper } from "./card-wrapper";
import {BeatLoader}  from 'react-spinners';
import {useState, useCallback, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import { getVerificationTokenByToken } from "@/data/verification-token";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSucess] = useState<string | undefined>('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    console.log(token)
    // if(!token) {
    //   setError('No se ha encontrado el token de verificación');
    //   return;
    // }
    // getVerificationTokenByToken(token);

  }, [token]);

  useEffect(() => {
    onSubmit();

  }, [onSubmit])



  
  return ( 
    <CardWrapper
      headerLabel="Confirmando tu verificación"
      backButtonHref="Volver a Iniciar Sesión"
      backButtonLabel="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {!error && !success && (
          <BeatLoader/>
        )}
       

      </div>

    </CardWrapper>
   );
}
 
export default NewVerificationForm;