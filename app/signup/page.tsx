"use client";

import React from "react";
import { useFormState } from "react-dom"; 
import { postUser } from "../../actions/userController"; 
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserForm from "@/components/users/clients/Form";

const SignUp = () => {

  const initialState = { errors: {}, success: undefined };
  const [formState, formAction] = useFormState(postUser, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm formAction={formAction} formState={formState} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
