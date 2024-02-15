'use client'

import {FaUser} from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCurrentUser } from '@/hooks/use-current-user';


const UserButton = () => {
  const user = useCurrentUser();

  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className='bg-sky-600 '>
            <FaUser className='text-white' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
      <DropdownMenuItem>
          <DropdownMenuLabel>Configuración</DropdownMenuLabel>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DropdownMenuLabel>Cerrar Sesión</DropdownMenuLabel>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
   );
}
 
export default UserButton;