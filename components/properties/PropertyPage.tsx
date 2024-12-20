"use client"
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Wrench, Hammer, User } from "lucide-react";
import Link from 'next/link';

import PropertyRepairs from "@/components/repair/Repairs";
import AddRepair from "@/components/repair/AddRepair";

const PropertyPage = ({property, userEmail}) => {
  const [activeTab, setActiveTab] = useState("repairs");

  return (
    <div className="container mx-auto py-6">
    {!property && (
      <Alert variant="destructive" className="mb-6">
        <AlertTitle>Error</AlertTitle>
      </Alert>
    )}

    {property ? (
      <div className="grid gap-6 w-2/4 mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Home className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold flex">
                  <Link href={'/dashboard'} className='flex underline'>
                    <User className='mt-1 pr-1'/>{userEmail}
                  </Link>
                  &nbsp;&nbsp;/{property.address}
                </CardTitle>
                <div className="flex items-center text-muted-foreground mt-1">
                  <Hammer className="h-4 w-4 mr-2" />
                  <span>{property.yearOfConstruction}</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="repairs">Repairs</TabsTrigger>
            <TabsTrigger value="add">Add Repair</TabsTrigger>
          </TabsList>

          <TabsContent value="repairs">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Wrench className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="text-lg font-semibold">Repairs</h3>
                </div>
                <PropertyRepairs repairs={property.repairs} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add">
            <Card>
              <CardContent className="pt-6">
                <AddRepair
                  propertyId={property.propertyId}
                  propertyAddress={property.address}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    ) : (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-24">
            <p className="text-muted-foreground">Loading property data...</p>
          </div>
        </CardContent>
      </Card>
    )}
  </div>
  )
}

export default PropertyPage