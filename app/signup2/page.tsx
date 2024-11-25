"use client"
import React from "react";
import { useFormState } from "react-dom"; // Import the hook for form state management
import { register } from "../actions/userController"; // Import the action

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardFooter } from "@/components/ui/card";

const SignUp= ({ id }) => {
  const [formState, formAction] = useFormState(register, {}); // Use formState and formAction

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="vatNumber">VAT Number</Label>
        {formState.errors?.vatNumber && (
          <span className="pl-4 text-red-500 text-sm">{formState.errors.vatNumber}</span>
        )}
        <Input id="vatNumber" name="vatNumber" defaultValue={formState.values?.vatNumber || ""} />
      </div>
      <div>
        <Label htmlFor="name">Name</Label>
        {formState.errors?.name && (
          <span className="pl-4 text-red-500 text-sm">{formState.errors.name}</span>
        )}
        <Input id="name" name="name" defaultValue={formState.values?.name || ""} />
      </div>
      <div>
        <Label htmlFor="surname">Surname</Label>
        {formState.errors?.surname && (
          <span className="pl-4 text-red-500 text-sm">{formState.errors.surname}</span>
        )}
        <Input id="surname" name="surname" defaultValue={formState.values?.surname || ""} />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        {formState.errors?.address && (
          <span className="pl-4 text-red-500 text-sm">{formState.errors.address}</span>
        )}
        <Input id="address" name="address" defaultValue={formState.values?.address || ""} />
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        {formState.errors?.phoneNumber && (
          <span className="pl-4 text-red-500 text-sm">{formState.errors.phoneNumber}</span>
        )}
        <Input id="phoneNumber" name="phoneNumber" defaultValue={formState.values?.phoneNumber || ""} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        {formState.errors?.email && (
          <span className="pl-4 text-red-500 text-sm">{formState.errors.email}</span>
        )}
        <Input id="email" name="email" type="email" defaultValue={formState.values?.email || ""} />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        {formState.errors?.password && (
          <span className="pl-4 text-red-500 text-sm">{formState.errors.password}</span>
        )}
        <Input id="password" name="password" type="password" defaultValue={formState.values?.password || ""} />
      </div>

      <CardFooter>
        <Button type="submit" className="w-full">
          {id ? <>Update</> : <>Sign up</>}
        </Button>
      </CardFooter>
    </form>
  );
};

export default SignUp;
