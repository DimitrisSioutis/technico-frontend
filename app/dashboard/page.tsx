import { getUserCookie } from "@/lib/getUserCookie";
import UserProfile from "@/components/users/UserProfile";
import { UserProvider } from "@/components/context/UserContext";
import fetchData from "@/utils/fetch";

export default async function Dashboard() {
  const cookie = getUserCookie();
  const userId = cookie?.userId;
  const user = await fetchData(userId,"User")

  return (
      <UserProfile user={user}/>
  );
}