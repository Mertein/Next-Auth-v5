import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./data/user"
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passworsdMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if(passworsdMatch) return user;
        }
        return null;
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      allowDangerousEmailAccountLinking: true,
    }),
  ]

} satisfies NextAuthConfig