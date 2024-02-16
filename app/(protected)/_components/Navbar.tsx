'use client';

import UserButton from "@/components/auth/user-button";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const user = useCurrentUser();
  const pathname = usePathname();
  return ( 
    <nav className="justify-between items-center flex bg-secondary p-4 shadow-sm w-[600px] rounded-xl">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === '/server' ? 'default' : 'outline'}
        >
          <Link href='/server'>
            Server
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === '/client' ? 'default' : 'outline'}
        >
          <Link href='/client'>
            Client
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === '/admin' ? 'default' : 'outline'}
        >
          <Link href='/admin'>
            Admin
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === '/settings' ? 'default' : 'outline'}
        >
          <Link href='/settings'>
            Settings
          </Link>
        </Button>
      
      </div>
        <UserButton/>
    </nav>
   );
}
 
export default Navbar;