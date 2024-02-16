'use server'

import { auth } from "@/auth";

const getCurrentUser = async () => {
  const user = await auth();
  return user;
}
 
export default getCurrentUser;

