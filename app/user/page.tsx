"use client"
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye , Trash2 , Pencil} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';

export type User = {
  id: string;
  name: string;
  surname: string;
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
        {users.map((user) => (
          <div key={user.id} className="mb-4 p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-medium">{user.name+' '+user.surname}</h3>
            <p className="text-gray-600">ID: {user.id}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <div className="flex gap-4 py-2">
              <Link href={`/user/${user.id}`}><Eye color="rgb(75 85 99)"/></Link>
              <Link href={`/user/${user.id}`}><Pencil color="rgb(75 85 99)"/></Link>
              <Link href={`/user/${user.id}`}><Trash2 color="rgb(75 85 99)" /></Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}