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
import LogoutButton from './logout-button';
import { ExitIcon } from '@radix-ui/react-icons';


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
      <DropdownMenuContent align='center' className='w-40'>
      <DropdownMenuItem>
          <DropdownMenuLabel>Configuración</DropdownMenuLabel>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className='h-4 w-4 mr-2' />
            <DropdownMenuLabel>Cerrar Sesión</DropdownMenuLabel>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
   );
}
 
export default UserButton;