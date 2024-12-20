import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const OwnerForm = ({ owner, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: owner?.id || null,
    name: owner?.name || '',
    surname: owner?.surname || '',
    email: owner?.email || '',
    vatNumber: owner?.vatNumber || '',
    address: owner?.address || '',
    phoneNumber: owner?.phoneNumber || '',
    password: owner?.phoneNumber || '',
    errors: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [name]: '' 
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.surname.trim()) newErrors.surname = 'Surname is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.vatNumber.trim()) newErrors.vatNumber = 'VAT Number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setFormData(prev => ({
        ...prev,
        errors: validationErrors
      }));
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4">
      <CardHeader>
        <CardTitle>{owner ? 'Edit Owner' : 'Add New Owner'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formData.userId && (
            <input 
              type="hidden" 
              name="userId" 
              value={formData.userId} 
            />
          )}

          {[
            { name: 'vatNumber', label: 'VAT Number' },
            { name: 'name', label: 'Name' },
            { name: 'surname', label: 'Surname' },
            { name: 'address', label: 'Address' },
            { name: 'phoneNumber', label: 'Phone Number' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'password', label: 'Password', type: 'password' }
          ].map(({ name, label, type = 'text' }) => (
            <div key={name}>
              <Label htmlFor={name}>{label}</Label>
              {formData.errors[name] && (
                <span className="pl-4 text-red-500 text-sm">{formData.errors[name]}</span>
              )}
              <Input 
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <CardFooter className="p-0 mt-4 flex space-x-2">
            <Button type="submit" className="w-full">
              {owner ? 'Update Owner' : 'Add Owner'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={onCancel}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default OwnerForm;