"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Wrench, Hammer} from "lucide-react";

import PropertyRepairs from "@/components/repair/PropertyRepairs";
import AddRepair from "@/components/repair/AddRepair";
import { type Property } from "@/app/layout-types";
import fetchData from "@/app/utils/fetch"

export default function Property() {
  const params = useParams();
  const propertyId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    fetchData<Property>(propertyId,'Property',  setProperty);
  }, [propertyId]);

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
                  <CardTitle className="text-2xl font-bold">{property.address}</CardTitle>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <Hammer className="h-4 w-4 mr-2" />
                    <span>{property.yearOfConstruction}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="properties">Repairs</TabsTrigger>
              <TabsTrigger value="add">Add Repair</TabsTrigger>
            </TabsList>
            
            <TabsContent value="properties">
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
                  <AddRepair propertyId={property.propertyId as string} propertyAddress={property.address as string} />
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
