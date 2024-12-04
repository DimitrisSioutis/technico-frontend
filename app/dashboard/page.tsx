import { getUserCookie } from "@/lib/getUserCookie";
import fetchData from "@/utils/fetch";
import UserProfile from "@/components/user/UserProfile";

export default async function Dashboard() {
  const cookie = getUserCookie();
  const userId = cookie?.userId;  
  const user = await fetchData(userId,"User")

  return (
    <UserProfile user={user}/>
  );
}
