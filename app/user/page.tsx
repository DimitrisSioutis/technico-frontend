"use client"
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Users from "@/components/user/Users";
import UsersSkeleton from "@/components/skeletons/UsersSkeleton";
import { type SimpleUser } from "../types";
import fetchAll from "../../utils/fetchAll";

export default function UserPage() {
  const [users, setUsers] = useState<SimpleUser[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await fetchAll<SimpleUser[]>("User");
      setUsers(data);
    } catch (error:any) {
      setErrorMessage(error.message || "Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <UsersSkeleton />;

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <Alert>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <Users users={users} fetchUsers={fetchUsers} />
      </CardContent>
    </Card>
  );
}
