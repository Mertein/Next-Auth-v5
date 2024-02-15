'use client'
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const SettingsPage =  () => {
  const session = useSession();
  return ( 
    <div className="">
        <Button  onClick={() => signOut()} type='submit' className="" variant="default" size="sm">LogOut </Button>
    </div>

   );
}
 
export default SettingsPage;