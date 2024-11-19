import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface AddPropertyProps {
  id: string;
}

interface FormData {
  address: string;
  yearOfConstruction: number;
  ownerId: string;
}

interface FormErrors {
  address?: string;
  yearOfConstruction?: string;
  ownerId?: string;
}

export default function AddProperty({ id }: AddPropertyProps) {
  const [formData, setFormData] = useState<FormData>({
    address: "",
    yearOfConstruction: 0,
    ownerId: id,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.yearOfConstruction || formData.yearOfConstruction>2030) newErrors.yearOfConstruction = "Year of Construction is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function postProperty() {
    try {
      const response = await fetch("https://localhost:7166/api/Property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong while creating the property");
      }

      console.log(formData)
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      postProperty();
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-md">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                {errors.address && <span className="pl-4 text-red-500 text-sm">{errors.address}</span>}
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="yearOfConstruction">Year of Construction</Label>
                {errors.yearOfConstruction && <span className="pl-4 text-red-500 text-sm">{errors.yearOfConstruction}</span>}
                <Input
                  id="yearOfConstruction"
                  name="yearOfConstruction"
                  value={formData.yearOfConstruction}
                  onChange={handleChange}
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
              )}

              <CardFooter>
                <Button type="submit" className="w-24 m-auto">
                  Add
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
  );
}
