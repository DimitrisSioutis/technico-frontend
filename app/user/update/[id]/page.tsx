"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { type User } from "@/app/types";
import { useFormState } from "react-dom";
import { register } from "@/app/actions/userController";
import fetchData from "@/utils/fetch";
import SignUpForm from "@/components/user/SignUpForm";

// Refined FormState type
interface FormState {
  errors?: {
    vatNumber?: string;
    name?: string;
    surname?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
  };
  success?: boolean;
}

type UserProps = { params: { id: string } };

const UpdateUser: React.FC<UserProps> = ({ params }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  
  const initialState: FormState = {
    errors: {},
    success: false
  };
  
  const [formState, formAction] = useFormState(
    (state: FormState, formData: FormData) => register(state, formData), 
    initialState
  );

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await fetchData<User | undefined>(params.id, "User");
      if (fetchedUser) {
        setUser(fetchedUser);
      }
    };
    fetchUser();
  }, [params.id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
            <SignUpForm 
              formAction={formAction} 
              formState={{
                errors: formState.errors,
                values: {
                  vatNumber: user.vatNumber,
                  name: user.name,
                  surname: user.surname,
                  address: user.address,
                  phoneNumber: user.phoneNumber,
                  email: user.email,
                  password:user.password
                }
              }} 
              isUpdate={true}
              userId={user.id}
            />
          ) : (
            <p>Loading user data...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateUser;