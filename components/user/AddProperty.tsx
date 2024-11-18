"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface FormData {
  address: string;
  yearOfConstruction: string;
  ownerId: string;
}

interface FormErrors {
  address?: string;
  yearOfConstruction?: string;
  ownerId?: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    address: "",
    yearOfConstruction: "",
    ownerId: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false); // State to toggle form visibility
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.yearOfConstruction) newErrors.yearOfConstruction = "Year of Construction is required";
    if (!formData.ownerId) newErrors.ownerId = "Owner ID is required";

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

      // Redirect to /user/:user.id
      const user = await response.json();
      router.push(`/user/${user.id}`);
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

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {/* Toggle Button to Show Form */}
      {!showForm ? (
        <Button onClick={toggleForm} className="mb-4">
          Show Form
        </Button>
      ) : (
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

              <div>
                <Label htmlFor="ownerId">Owner ID</Label>
                {errors.ownerId && <span className="pl-4 text-red-500 text-sm">{errors.ownerId}</span>}
                <Input
                  id="ownerId"
                  name="ownerId"
                  value={formData.ownerId}
                  onChange={handleChange}
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
              )}

              <CardFooter>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </CardFooter>

              {/* Close Button to Hide the Form */}
              <Button onClick={toggleForm} className="mt-4 w-full">
                Close Form
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
