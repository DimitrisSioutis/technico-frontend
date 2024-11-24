"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { type UserFormData, type User } from "@/app/layout-types";
import fetchData from "@/app/utils/fetch";
import UserForm from "@/components/user/UserForm";

const UpdateUser = () => {
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  // State for the form data
  const [formData, setFormData] = useState<UserFormData>({
    id:userId,
    vatNumber: "",
    name: "",
    surname: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  // Fetch user data and update the state
  useEffect(() => {
    if (userId) {
      fetchData<User>(userId, "User", (data: User) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          vatNumber: data.vatNumber ,
          name: data.name,
          surname: data.surname,
          address: data.address,
          phoneNumber: data.phoneNumber,
          email: data.email,
          password: data.password, 
        }));
      });
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
