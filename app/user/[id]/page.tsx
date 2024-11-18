"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


import UserProperties from "@/components/user/UserProperties"
import UserDetails from "@/components/user/UserDetails";
import AddProperty from "@/components/user/AddProperty";

export type Property = {
  id: number;
  address: string;
  yearOfConstruction: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  properties: Property[]; // Added properties field
};

export default function UserPage() {
  const params = useParams();
  const userId = params.id;

  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState("");



  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`https://localhost:7166/api/User/${userId}`, {
          method: "GET",
        });

        if (!response.ok) {
          const error = await response.json();
          console.error("Error fetching user data:", error);
          throw new Error(error.message || "Failed to fetch user data");
        }

        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage((error as Error).message);
      }
    }

    fetchUser();
  }, [userId]); // Dependency array to re-run when userId changes

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

        {user ? (
          <>
            <UserDetails user={user} />
            <UserProperties properties={user.properties} />
            <AddProperty/>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </CardContent>
    </Card>
  );
}
