import React,{useEffect} from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardFooter } from "@/components/ui/card";
import { type User } from "@/app/types";

// Define types for the props
interface FormState {
  errors?: Record<string, string>; // Error messages for each field
  values?: Partial<User>; // Current values of the form fields
  success?: boolean;  // Add this line
}

interface SignUpFormProps {
  formAction: (formData: FormData) => void;
  formState: FormState;
  isUpdate?: boolean;
  userId?: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ formAction, formState, isUpdate = false,userId }) => {
  const router = useRouter();

  useEffect(()=>{
    if(formState.success){
      router.push(`user/${formState.userId}`)
    }
  },[formState])

  return (
    <form action={formAction} className="space-y-4">
      {isUpdate && userId && (
        <input 
          type="hidden" 
          name="userId" 
          value={userId} 
        />
      )}

      <div>
        <Label htmlFor="vatNumber">VAT Number</Label>
        {formState.errors?.vatNumber && (
          <span className="pl-4 text-red-500 text-sm">{formState.errors.vatNumber}</span>
        )}
        <Input 
          id="vatNumber" 
          name="vatNumber" 
          defaultValue={formState.values?.vatNumber || ""} 
          required
        />
      </div>
      <div>
        <Label htmlFor="name">Name</Label>
        {formState.errors?.name && (
          <span className="pl-4 text-red-500 text-sm">{formState.errors.name}</span>
        )}
        <Input 
          id="name" 
          name="name" 
          defaultValue={formState.values?.name || ""} 
          required
        />
      </div>
      <div>
        <Label htmlFor="surname">Surname</Label>
        {formState.errors?.surname && (
          <span className="pl-4 text-red-500 text-sm">{formState.errors.surname}</span>
        )}
        <Input 
          id="surname" 
          name="surname" 
          defaultValue={formState.values?.surname || ""} 
          required
        />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        {formState.errors?.address && (
          <span className="pl-4 text-red-500 text-sm">{formState.errors.address}</span>
        )}
        <Input 
          id="address" 
          name="address" 
          defaultValue={formState.values?.address || ""} 
          required
        />
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        {formState.errors?.phoneNumber && (
          <span className="pl-4 text-red-500 text-sm">{formState.errors.phoneNumber}</span>
        )}
        <Input
          id="phoneNumber"
          name="phoneNumber"
          defaultValue={formState.values?.phoneNumber || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        {formState.errors?.email && (
          <span className="pl-4 text-red-500 text-sm">{formState.errors.email}</span>
        )}
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={formState.values?.email || ""}
          required
        />
      </div>
      

        <div>
          <Label htmlFor="password">Password</Label>
          {formState.errors?.password && (
            <span className="pl-4 text-red-500 text-sm">{formState.errors.password}</span>
          )}
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={formState.values?.password || ""}
            required
          />
        </div>

      <CardFooter>
        <Button type="submit" className="w-full">
          {isUpdate ? "Update Profile" : "Sign Up"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default SignUpForm;