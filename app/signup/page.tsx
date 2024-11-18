"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface FormData {
  vatNumber: string;
  name: string;
  surname: string;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface FormErrors {
  vatNumber?: string;
  name?: string;
  surname?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    vatNumber: "",
    name: "",
    surname: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter(); // Use Next.js router for navigation

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.vatNumber) newErrors.vatNumber = "VAT Number is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone number must be at least 10 digits";
    }
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function postUser() {
    try {
      const response = await fetch("https://localhost:7166/api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong while creating the user");
      }

      const user: User = await response.json(); 

      // Redirect to /user/:user.id
      router.push(`/user/${user.id}`);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      postUser();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="vatNumber">VAT Number</Label>
              {errors.vatNumber && <span className="pl-4 text-red-500 text-sm">{errors.vatNumber}</span>}
              <Input
                id="vatNumber"
                name="vatNumber"
                value={formData.vatNumber}
                onChange={handleChange}
              />
              
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              {errors.name && <span className="pl-4 text-red-500 text-sm">{errors.name}</span>}
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              
            </div>
            <div>
              <Label htmlFor="surname">Surname</Label>
              {errors.surname && <span className="pl-4 text-red-500 text-sm">{errors.surname}</span>}
              <Input
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
              
            </div>
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
              <Label htmlFor="phoneNumber">Phone Number</Label>
              {errors.phoneNumber && <span className="pl-4 text-red-500 text-sm">{errors.phoneNumber}</span>}
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              {errors.email && <span className="pl-4 text-red-500 text-sm">{errors.email}</span>}
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              
            </div>
            <div>
              <Label htmlFor="password">Password</Label>{errors.password && <span className="pl-4 text-red-500 text-sm">{errors.password}</span>}
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
