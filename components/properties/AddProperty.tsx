import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { PropertyData, FormErrors } from "@/app/types";
import createData from "@/utils/create";

export default function AddProperty({id}) {
  const [formData, setFormData] = useState<PropertyData>({
    address: "",
    yearOfConstruction: 0,
    ownerID: id,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.yearOfConstruction || formData.yearOfConstruction > 2030) newErrors.yearOfConstruction = "Year of Construction is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const response = await createData("Property", formData);
      if (response.status === 409) {
        setError(response.data.message);
        return;
      }

    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="address">Address</Label>
        {errors.address && <span className="pl-4 text-red-500 text-sm">{errors.address}</span>}
        <Input id="address" name="address" value={formData.address} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="yearOfConstruction">Year of Construction</Label>
        {errors.yearOfConstruction && (
          <span className="pl-4 text-red-500 text-sm">{errors.yearOfConstruction}</span>
        )}
        <Input id="yearOfConstruction" name="yearOfConstruction" value={formData.yearOfConstruction} onChange={handleChange} />
      </div>

      <div className="h-10">
        {error.length > 0 && <span className="text-red">{error}</span>}
      </div>
      <Button type="submit" className="w-full flex">
        <Plus className="h-8 w-8 mr-2 text-slate-50" />
        <h3 className="text-lg font-semibold">Add Property</h3>
      </Button>
    </form>
  );
}
