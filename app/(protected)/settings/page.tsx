'use client'
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const SettingsPage =  () => {
  const session = useSession();
  return ( 
    <div className="">
    </div>

   );
}
 
export default SettingsPage;