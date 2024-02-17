"use server"
import { currentUser } from '@/lib/auth';
import { SettingsSchema } from '@/schemas';
import * as z from 'zod';
import {db} from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import bcrypt from "bcrypt";
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if(!user) {
    return {error: 'Unauthorized!' };
  }
 
  
  const dbUser = await db.user.findUnique({
    where: {id: user.id}
  })

  if(!dbUser) {
    return {error: 'Unauthorized!' }
  }

  if(user.isOAuth) {
    values.email = undefined;
    values.newPassword = undefined;
    values.password = undefined;
  }



  if(values.email && values.email !== user.email) {

    const existingUser = await getUserByEmail(values.email)
    {/* The same with above */}
    // const existingUser = await db.user.findUnique({
    //   where: {email: values.email}
    // })

    if(existingUser && existingUser.id !== user.id) {
      return {error: 'Email already in use!' };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    )

    return {success: 'Verification email sent!' };
  }

  
  if(values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password);
    if(!passwordMatch) {
      return {error: 'Incorrect password!' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: {id: dbUser.id},
    data: {...values},
  });

  return {success: "Settings Updated!" };
}