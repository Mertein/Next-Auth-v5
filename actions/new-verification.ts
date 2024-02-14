import { getVerificationTokenByToken } from "@/data/verification-token";



export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if(!existingToken) {
    return { error: 'Token no existe!' }
  }
  

}