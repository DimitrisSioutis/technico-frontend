"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardFooter } from "@/components/ui/card";
import { useFormState } from "react-dom";
import { postUser } from "@/actions/userController";

const Form: React.FC<UserFormProps> = ({ user }) => {
  const formFields: FormField[] = [
    { name: "vatNumber", label: "VAT Number" },
    { name: "name", label: "Name" },
    { name: "surname", label: "Surname" },
    { name: "address", label: "Address" },
    { name: "phoneNumber", label: "Phone Number" },
    { name: "email", label: "Email", type: "email" },
  ];

  const [state, action] = useFormState(postUser, null);

  return (
    <form action={action} className="space-y-4">
      {formFields.map((field) => (
        <React.Fragment key={field.name}>
          <Label htmlFor={field.name}>{field.label}</Label>
          {state?.errors && state.errors[field.name] && (
            <span className="pl-4 text-red-500 text-sm">
              {state.errors[field.name]}
            </span>
          )}
          <Input
            id={field.name}
            name={field.name}
            type={field.type || "text"}
            defaultValue={user?.[field.name] || ""}
            required
          />
        </React.Fragment>
      ))}

      {user.id === undefined && (
        <>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={user?.password || ""}
            required
          />
        </>
      )}

      {user.id && <input type="hidden" name="userId" value={user.id} />}

      <CardFooter>
        <Button type="submit" className="w-1/2 m-auto">
          {user.id ? "Update Profile" : "Sign Up"}
        </Button> 
      </CardFooter>
      
      {state?.errors?.general && (
        <div className="text-red-500 text-sm">{state.errors.general}</div>
      )}
    </form>
  );
};

export default Form;