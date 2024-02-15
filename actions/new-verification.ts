'use server'
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if(!existingToken) {
    return { error: 'Token no existe!' }
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if(!existingUser) {
    return { error: 'El email no existe!'};
  }

  await db.user.update({
    where: {id: existingUser.id},
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });
  
  await db.verificationToken.delete({
    where: {id: existingToken.id}
  })

  return {success: 'Email verificado!'};

  

}