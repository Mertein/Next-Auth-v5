'use client'
import { ExtendedUser } from "@/next-auth";
import {
  CardContent,
  Card,
  CardHeader,
} from "@/components/ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

const UserInfo = ({
  user,
  label
}: UserInfoProps ) => {
  console.log(user)
  return (  
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          {label}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center rounded-lg   justify-between border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Nombre
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-sm  ">
          {user?.name}
          </p>
        </div>

        <div className="flex items-center rounded-lg   justify-between border p-3 shadow-sm">
          <p className="text-sm font-medium">
            ID
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-sm  ">
          {user?.id}
          </p>
        </div>

        <div className="flex items-center rounded-lg   justify-between border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Email
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-sm  ">
          {user?.email}
          </p>
        </div>

        <div className="flex items-center rounded-lg   justify-between border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Role
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-sm  ">
          {user?.role}
          </p>
        </div>
        

      </CardContent>
    </Card>
    );
}
 
export default UserInfo;