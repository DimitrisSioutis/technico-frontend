"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom"; 
import { register } from "../../actions/userController"; 
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SignUpForm from "@/components/user/SignUpForm";

const SignUp = () => {

  const initialState = { errors: {}, success: undefined };
  const [formState, formAction] = useFormState(register, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm formAction={formAction} formState={formState} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
