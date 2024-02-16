'use client';

import {
  Card,
  CardHeader,
  CardContent
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import { admin } from '@/actions/admin';
import {toast} from 'sonner';
import RoleGate from '@/components/role.gate';
import { UserRole } from '@prisma/client';

const AdminPage = () => {

  
  const onApiRouteClick = async () => {
    fetch('api/admin')
      .then((response) => {
        if(response.ok) {
          toast.success('Allowed API Route!' );
        } else {
          toast.error('Forbidden API Route!' );
        }
      })
      .catch(() => {
        console.log('Something went wrong');
      })
  }

  const onServerActionsClick = async () => {
    admin()
    .then((data) => {
      if(data.success) {
        toast.success(data.success);
      } else {
        toast.error(data.error)
      }
    })    
  };

  return ( 
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>
          🔐 Admin Page
        </p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN}>
        <div className='flex flex-row justify-between items-center border shadow-md rounded-lg   bg-slate-100 p-3'>
          <p className='text-sm font-medium'>
            Admin-only API Route 
          </p>
          <Button onClick={onApiRouteClick}>
            Click to test
          </Button>
        </div>

        <div className='flex flex-row items-center justify-between text-center bg-slate-100 p-3 shadow-md border rounded-lg'>
          <p className='text-sm font-medium'>
            Admin-only Server Action
          </p>
          <Button onClick={onServerActionsClick}>
            Click to test
          </Button>
        </div>
        </RoleGate>
      </CardContent>
    </Card>
   );
}
 
export default AdminPage;