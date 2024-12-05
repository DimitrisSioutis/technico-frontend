import { getUserCookie } from "@/lib/getUserCookie";
import UserProfile from "@/components/user/UserProfile";
import { UserProvider } from "@/components/UserContext";

export default async function Dashboard() {
  const cookie = getUserCookie();
  const userId = cookie?.userId; 

  return (
    <UserProvider userId={userId}>
      <UserProfile/>
    </UserProvider>
  );
}