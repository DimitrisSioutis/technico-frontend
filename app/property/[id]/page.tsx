"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Wrench, Hammer} from "lucide-react";

import PropertyRepairs from "@/components/repair/PropertyRepairs";
import AddRepair from "@/components/repair/AddRepair";

type Property = {
  propertyId: string;
  address: string;
  yearOfConstruction: number;
  repairs: Repair[];
};

export type Repair = {
  repairID: string;
  description: string;
  propertId: string;
};



export default function Property() {
  const params = useParams();
  const propertyId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [property, setProperty] = useState<Property | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await fetch(`https://localhost:7166/api/Property/${propertyId}`, {
          method: "GET",
        });

        if (!response.ok) {
          const error = await response.json();
          console.error("Error fetching user data:", error);
          throw new Error(error.message || "Failed to fetch user data");
        }

        const data: Property = await response.json();
        setProperty(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage((error as Error).message);
      }
    }

    fetchProperty();
  }, [propertyId]);

  return (
    <div className="container mx-auto py-6">
      {errorMessage && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
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
