"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { type UserFormData, type UserFormErrors, type User } from "@/app/layout-types";

const UpdateUser = () => {
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  const [errors, setErrors] = useState<UserFormErrors>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    vatNumber: "",
    name: "",
    surname: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const response = await fetch(`https://localhost:7166/api/User/${userId}`, {
          method: "GET",
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to fetch user data");
        }

        const userData: User = await response.json();
        setUser(userData);
        
        // Only update form data if we have valid user data
        if (userData) {
          setFormData({
            vatNumber: userData.vatNumber,
            name: userData.name,
            surname: userData.surname,
            address: userData.address,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            password: "", // Leave password empty as it's optional for updates
          });
        }
      } catch (error) {
        setErrorMessage((error as Error).message);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: UserFormErrors = {};

    if (!formData.vatNumber) newErrors.vatNumber = "VAT Number is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone number must be at least 10 digits";
    }
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.password && formData.password.length > 0 && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function updateUser() {
    if (!user?.id) {
      setErrorMessage("Cannot update user: User data is not available");
      return;
    }

    try {
      const updatePayload = { ...formData };
      const response = await fetch(`https://localhost:7166/api/User/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong while updating the user");
      }

      router.push(`/user/${user.id}`);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      updateUser();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md shadow-md p-6">
          <div className="text-center">Loading user data...</div>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md shadow-md p-6">
          <div className="text-center text-red-500">
            {errorMessage || "User not found"}
          </div>
          <Button 
            onClick={() => router.push("/dashboard")} 
            className="w-full mt-4"
          >
            Return to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
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
              <Label htmlFor="password">Password (Optional)</Label>
              {errors.password && <span className="pl-4 text-red-500 text-sm">{errors.password}</span>}
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
            )}

            <CardFooter>
              <Button type="submit" className="w-full">
                Update Profile
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateUser;