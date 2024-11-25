"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User as UserIcon, Mail, Home, Plus } from "lucide-react";

import UserProperties from "@/components/properties/UserProperties";
import AddProperty from "@/components/properties/AddProperty";

import { type User } from "@/app/layout-types";
import fetchData from "@/app/utils/fetch";

export default function UserPage() {
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>("properties");

  const getUserData = async () => {
    const data = await fetchData<User>(userId, 'User');
    setUser(data || null); // Ensure the value is either User or null
  };

  useEffect(() => {
    if (userId) getUserData();
  }, [userId]);

  const handlePropertyAdded = async () => {
    setActiveTab("properties");
    const data = await fetchData<User>(userId, 'User');
    setUser(data || null); 
  };

  return (
    <div className="container mx-auto py-6">
      {!user && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
        </Alert>
      )}

      {user ? (
        <div className="grid gap-6 w-1/2 m-auto">
          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <UserIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {user.name + " " + user.surname}
                  </CardTitle>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="add">Add Property</TabsTrigger>
            </TabsList>

            <TabsContent value="properties">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Home className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-lg font-semibold">Properties</h3>
                  </div>
                  <UserProperties properties={user.properties} getUserData={getUserData} />
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
                  <AddProperty id={userId} onPropertyAdded={handlePropertyAdded} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-24">
              <p className="text-muted-foreground">Loading User data...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
