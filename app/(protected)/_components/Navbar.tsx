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

const Navbar = () => {
  const user = useCurrentUser();
  return ( 
    <nav className="justify-around items-center flex bg-secondary p-4 shadow-sm w-full">
      <div className="flex gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              Autos
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <DropdownMenuLabel>
                 <Link href="/autos/solicitar">Solicitar</Link>
               </DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DropdownMenuLabel>
                <Link href="/autos/mis-solicitudes">Ver mis solicitudes</Link>
              </DropdownMenuLabel>
            </DropdownMenuItem>
            {user?.role === 'ADMIN' && (
              <>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DropdownMenuLabel>
                  <Link href="/autos/ver-solicitudes">Solicitudes</Link>
                </DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DropdownMenuLabel>
                  <Link href="/autos/administrar">Administrar</Link>
                </DropdownMenuLabel>
              </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button>
          Mis Solicitudes
        </Button>
        <Button>
          Ver Solicitudes
        </Button>

      </div>
      <div className="flex gap-x-2 ">
        <UserButton/>
      </div>
     
    </nav>
   );
}
 
export default Navbar;