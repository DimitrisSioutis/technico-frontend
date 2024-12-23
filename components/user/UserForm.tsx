import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { type UserFormErrors,  type UserFormData } from "@/app/types";
import updateData from "@/utils/update";
import createData from "@/utils/create";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardFooter } from "@/components/ui/card";


interface UserFormProps {
  formData: UserFormData;
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
  id?:string;
}

const UserForm: React.FC<UserFormProps> = ({ formData, setFormData, id }) => {

  const [errors, setErrors] = useState<UserFormErrors>({});
  const router = useRouter()

  const validateForm = (): boolean => {
    const newErrors: UserFormErrors = {};

    if (!formData.vatNumber) newErrors.vatNumber = "VAT Number is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone number must be at least 10 digits";
    }
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      if (id) {
        updateData(id,'User',formData);
      } else {
        createData('User', formData);
      }
      router.push('/user')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="vatNumber">VAT Number</Label>
        {errors.vatNumber && <span className="pl-4 text-red-500 text-sm">{errors.vatNumber}</span>}
        <Input id="vatNumber" name="vatNumber" value={formData.vatNumber} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="name">Name</Label>
        {errors.name && <span className="pl-4 text-red-500 text-sm">{errors.name}</span>}
        <Input id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="surname">Surname</Label>
        {errors.surname && <span className="pl-4 text-red-500 text-sm">{errors.surname}</span>}
        <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        {errors.address && <span className="pl-4 text-red-500 text-sm">{errors.address}</span>}
        <Input id="address" name="address" value={formData.address} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        {errors.phoneNumber && <span className="pl-4 text-red-500 text-sm">{errors.phoneNumber}</span>}
        <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        {errors.email && <span className="pl-4 text-red-500 text-sm">{errors.email}</span>}
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        {errors.password && <span className="pl-4 text-red-500 text-sm">{errors.password}</span>}
        <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
      </div>

      <CardFooter>
        <Button type="submit" className="w-full">
          {id?<>Update</>:<>Sing up</>}
        </Button>
      </CardFooter>
    </form>
  );
};

export default UserForm;
