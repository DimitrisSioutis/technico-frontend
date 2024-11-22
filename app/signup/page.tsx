"use client";
import React, { useState} from "react";
import { Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import { type UserFormData} from "@/app/layout-types";
import UserForm from "@/components/user/UserForm";


export default function SignUp() {
  const [formData, setFormData] = useState<UserFormData>({
    vatNumber: "",
    name: "",
    surname: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm formData={formData} setFormData={setFormData} />
        </CardContent>
      </Card>
    </div>
  );
}
