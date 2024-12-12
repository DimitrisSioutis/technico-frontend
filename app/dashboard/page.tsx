import { getUserCookie } from "@/lib/getUserCookie";
import fetchData from "@/utils/fetch";
import { redirect } from "next/navigation";
import UserPageSkeleton from "@/components/skeletons/UsersSkeleton";
import dynamic from 'next/dynamic';

const User = dynamic(() => import('@/components/users/clients/User'), { 
  ssr: false 
});
const Admin = dynamic(() => import('@/components/users/admins/Admin'), { 
  ssr: false 
});

export default async function Dashboard() {
  const cookie = getUserCookie();
  const userId = cookie?.userId;
 
  if(userId){
    const user = await fetchData(userId, "User")
    if (!user) return <UserPageSkeleton/>;
    return (
        user.role == 1 ? <Admin user={user}/> : <User user={user}/>
    );
  }
  
  redirect('/login')
}