"use client"
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Users from "@/components/user/Users";
import { type SimpleUser } from "../layout-types";

export default function UserPage() {
  const [users, setUsers] = useState<SimpleUser[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  async function fetchUsers() {
    try {
      const response = await fetch('https://localhost:7166/api/User', { method: 'GET' });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch user data');
      }

      const data: SimpleUser[] = await response.json();
      setUsers(data);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }
  
  useEffect(() => {
    fetchUsers();
  }, [users]);

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
        <Users users={users} fetchUsers={fetchUsers}/>
      </CardContent>
    </Card>
  );
}