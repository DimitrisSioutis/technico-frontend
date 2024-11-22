"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import { type UserFormData,  type User } from "@/app/layout-types";
import UserForm from "@/components/user/UserForm";

const UpdateUser = () => {
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

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
      try {
        const response = await fetch(`https://localhost:7166/api/User/${userId}`, {
          method: "GET",
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to fetch user data");
        }

        const userData: User = await response.json();
        
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
        console.log((error as Error).message);
      }
    }

    if (userId) {
      fetchUser();
    }
  }, [userId]);

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm formData={formData} setFormData={setFormData} id={userId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateUser;