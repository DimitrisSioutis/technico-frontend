import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardFooter } from "@/components/ui/card";
import { type User } from "@/app/types";

interface FormState {
  errors?: Record<string, string>;
  values?: Partial<User>;
  success?: boolean;
}

interface UserFormProps {
  formAction: (formData: FormData) => void;
  formState: FormState;
  userId?: string;
}

const UserForm: React.FC<UserFormProps> = ({ formAction, formState, userId }) => {
  const formFields: FormField[] = [
    { name: "vatNumber", label: "VAT Number" },
    { name: "name", label: "Name" },
    { name: "surname", label: "Surname" },
    { name: "address", label: "Address" },
    { name: "phoneNumber", label: "Phone Number" },
    { name: "email", label: "Email", type: "email" },
  ];

  return (
    <form action={formAction} className="space-y-4">
      {formFields.map((field) => (
        <React.Fragment key={field.name}>
          <Label htmlFor={field.name}>{field.label}</Label>
          {formState.errors?.[field.name] && (
            <span className="pl-4 text-red-500 text-sm">
              {formState.errors[field.name]}
            </span>
          )}
          <Input
            id={field.name}
            name={field.name}
            type={field.type || "text"}
            defaultValue={formState.values?.[field.name] || ""}
            required
          />
        </React.Fragment>
      ))}

      {userId === undefined && (
        <>
          <Label htmlFor="password">Password</Label>
          {formState.errors?.password && (
            <span className="pl-4 text-red-500 text-sm">
              {formState.errors.password}
            </span>
          )}
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={formState.values?.password || ""}
            required
          />
        </>
      )}

      {userId && <input type="hidden" name="userId" value={userId} />}

      <CardFooter>
        <Button type="submit" className="w-1/2 m-auto">
          {userId ? "Update Profile" : "Sign Up"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default UserForm;
