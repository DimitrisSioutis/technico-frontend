"use client"
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://localhost:7166/api/User', { method: 'GET' });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to fetch user data');
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
    }

    fetchUsers();
  }, []);

  return (
    <Card className="w-full max-w-xl">
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
        {users.map((user) => (
          <div key={user.id} className="mb-4 p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-medium">{user.name}</h3>
            <p className="text-gray-600">ID: {user.id}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <Button className="mt-2">
              <Link href={`/user/${user.id}`}>View Profile</Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}