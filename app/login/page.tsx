"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link"; // Import Link for navigation

interface LoginData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter(); // Use Next.js router for navigation

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loginData.email) newErrors.email = "Email is required";
    if (!loginData.password || loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function postLogin() {
    try {
      const response = await fetch("https://localhost:7166/api/User/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong while logging in");
      }

      // Assuming the response returns user data or a success message
      const user = await response.json(); 

      // Redirect to /user/:user.id (or a different route after successful login)
      router.push(`/user/${user.id}`);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      postLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              {errors.email && <span className="pl-4 text-red-500 text-sm">{errors.email}</span>}
              <Input
                id="email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              {errors.password && <span className="pl-4 text-red-500 text-sm">{errors.password}</span>}
              <Input
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
            )}

            <CardFooter>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
          
          <div className="mt-4 text-center">
            <p>
              Don&apos;t have an account?
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
