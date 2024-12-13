import React, { useState} from "react";
import {type User} from "@/app/types";
import UserProperties from "@/components/properties/UserProperties";
import PropertyForm from "@/components/properties/PropertyForm";
import { User as UserIcon, Home, Plus, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserDetails from "./UserDetails";
import Repairs from "@/components/repair/Repairs"
import UserCard from "./UserCard";


const User = ({ user }: { user: User }) => {
  const userRepairs = user.properties.flatMap(property => property.repairs);

  const TabContentData = [
    {
      value: "repairs",
      icon: <Wrench/>,
      title: "Repairs",
      content: <Repairs repairs={userRepairs} />,
    },
    {
      value: "details",
      icon: <UserIcon/>,
      title: "User Details",
      content: <UserDetails user={user} />,
    },
    {
      value: "properties",
      icon: <Home/>,
      title: "Properties",
      content: <UserProperties properties={user.properties} />,
    },
    {
      value: "add",
      icon: <Plus/>,
      title: "Add Property",
      content: <PropertyForm userId={user.id} />,
    },
  ];

  return (
    <div className="grid gap-6 w-1/2 m-auto my-4">
      <UserCard user={user}/>

      <Tabs defaultValue="repairs"  className="w-full">
        <TabsList className="grid w-full grid-cols-4"> 
        {TabContentData.map((tab, index) => (
          <TabsTrigger key={index} value={tab.value}>{tab.title}</TabsTrigger>
        ))}
        </TabsList>

        {TabContentData.map((tab, index) => (
          <TabsContent key={index} value={tab.value}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {tab.icon}
                  <h3 className="text-lg ml-4 font-semibold">{tab.title}</h3>
                </div>
                {tab.content}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default User;
