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
 
  if(!userId) redirect('/login')
  const user = await fetchData(userId, "User")
if(user) console.log('use refetched:' + user.name)
  if (!user) return <UserPageSkeleton/>;
  return user.role == 1 ? <Admin user={user}/> : <User user={user}/>;
}