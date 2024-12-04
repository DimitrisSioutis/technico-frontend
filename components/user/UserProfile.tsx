"use client"
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User as UserIcon, Mail, Home, Plus} from "lucide-react";
import UserProperties from "@/components/properties/UserProperties";
import { logout } from '@/actions/userController';
import AddProperty from '../properties/AddProperty';


const UserProfile = ({user}) => {

    const logOut = () =>{
        logout();
    }
  return (
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
          <button onClick={logOut}>
            Log Out
          </button>
        </div>
      </CardHeader>
    </Card>

    <Tabs defaultValue='properties' className="w-full">
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
              <AddProperty />
            </CardContent>
          </Card>
        </TabsContent>
      
    </Tabs>
  </div>
  )
}

export default UserProfile