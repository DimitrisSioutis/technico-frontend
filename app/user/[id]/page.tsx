"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Home, Plus } from "lucide-react";

import UserProperties from "@/components/user/UserProperties";
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
  properties: Property[];
};

export default function UserPage() {
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure userId is a string

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
  }, [userId]);

  return (
    <div className="container mx-auto py-6">
      {errorMessage && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {user ? (
        <div className="grid gap-6">
          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Profile Details</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="add">Add Property</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card>
                <CardContent className="pt-6">
                  <UserDetails user={user} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="properties">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Home className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-lg font-semibold">Properties</h3>
                  </div>
                  <UserProperties properties={user.properties} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="add">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Plus className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-lg font-semibold">Add New Property</h3>
                  </div>
                  <AddProperty id={userId} /> {/* Pass userId as string */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-24">
              <p className="text-muted-foreground">Loading user data...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
