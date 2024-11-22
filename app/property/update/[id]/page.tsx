"use client"

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useParams} from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { type PropertyFormData, type FormErrors, type Property } from "@/app/layout-types";

export default function UpdateProperty() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [formData, setFormData] = useState<PropertyFormData>({
    propertyId: id,
    address: "",
    yearOfConstruction: 0,
    ownerID: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProperty() {
      if (!id) {
        setErrorMessage("No property ID provided");
        return;
      }

      try {
        const response = await fetch(`https://localhost:7166/api/Property/${id}`, {
          method: "GET",
        });
        if (!response.ok) {
          console.error('Fetch Property Detailed Error:')
        }

        const propertyData: Property = await response.json();

        if (propertyData) {
          setFormData({
            propertyId: id,
            address: propertyData.address,
            yearOfConstruction: propertyData.yearOfConstruction,
            ownerID: propertyData.ownerID
          });
        }

      } catch (error) {
        const errorMessage = (error as Error).message;
        setErrorMessage(errorMessage);
        console.error('Property Fetch Catch Error:', errorMessage);
      }
    }

    fetchProperty();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'yearOfConstruction' ? Number(value) : value 
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.yearOfConstruction || formData.yearOfConstruction > 2030 || formData.yearOfConstruction < 1800) {
      newErrors.yearOfConstruction = "Please enter a valid year of construction between 1800 and 2030";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const postProperty = async () => {
    setIsLoading(true);
    setErrorMessage("");
  
    try {
      const payload = {
        propertyId: id,
        address: formData.address,
        yearOfConstruction: formData.yearOfConstruction,
        ownerID: formData.ownerID
      };
  
      console.log('Update Property Payload:', payload);
  
      const response = await fetch(`https://localhost:7166/api/Property/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update Property Error:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText
        });
  
        setErrorMessage(errorText || 'Failed to update property');
        return;
      }
  
    } catch (error) {
      const errorMessage = (error as Error).message;
      setErrorMessage(errorMessage);
      console.error('Property Update Catch Error:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      postProperty();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="address">Address</Label>
          {errors.address && <span className="pl-4 text-red-500 text-sm">{errors.address}</span>}
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="yearOfConstruction">Year of Construction</Label>
          {errors.yearOfConstruction && <span className="pl-4 text-red-500 text-sm">{errors.yearOfConstruction}</span>}
          <Input
            id="yearOfConstruction"
            name="yearOfConstruction"
            type="number"
            value={formData.yearOfConstruction}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {errorMessage}
          </div>
        )}

        <Button type="submit" className="w-full flex" disabled={isLoading}>
          {isLoading ? (
            "Updating..."
          ) : (
            <>
              <Plus className="h-8 w-8 mr-2 text-slate-50" />
              <h3 className="text-lg font-semibold">Update Property</h3>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}