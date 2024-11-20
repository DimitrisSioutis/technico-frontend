import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

// Ensure enum matches exactly with backend
enum RepairType {
    Plumbing = 0,
    Electrical = 1,
    Painting = 2,
    Other = 3
}

interface AddRepairProps {
    propertyIdNum: string;
    propertyAddress: string;
}

interface FormData {
    scheduledDate: string;
    type: RepairType;
    description: string;
    cost: number;
    propertyId: string;
    address: string;
}

interface FormErrors {
    scheduledDate?: string;
    type?: string;
    description?: string;
    cost?: string;
}

export default function AddRepair({ propertyIdNum, propertyAddress }: AddRepairProps) {
    const [formData, setFormData] = useState<FormData>({
        scheduledDate: "",
        type: RepairType.Other,
        description: "",
        cost: 0,
        propertyId: propertyIdNum,
        address: propertyAddress
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "cost") {
            setFormData({ ...formData, [name]: parseFloat(value) || 0 });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSelectChange = (value: string) => {
        setFormData({ ...formData, type: Number(value) as RepairType });
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.scheduledDate) {
            newErrors.scheduledDate = "Scheduled date is required";
        }
        if (!formData.description) {
            newErrors.description = "Description is required";
        } else if (formData.description.length > 500) {
            newErrors.description = "Description must be less than 500 characters";
        }
        if (!formData.cost || formData.cost <= 0) {
            newErrors.cost = "Cost must be greater than 0";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function postRepair() {
        try {
            const payload = {
                scheduledDate: new Date(formData.scheduledDate).toISOString(),
                type: formData.type,
                description: formData.description,
                address: formData.address,
                cost: formData.cost,
                propertyId: formData.propertyId,
                // Add Property field explicitly
                property: {
                    id: formData.propertyId,
                    address: formData.address,
                    owner: {
                        id: "current-user-id", // Replace with actual user ID
                    }
                }
            };

            console.log('Sending payload:', JSON.stringify(payload, null, 2));

            const response = await fetch("https://localhost:7166/api/Repair", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
            }

            const result = await response.json();
            console.log('Success response:', result);
            return result;
        } catch (error) {
            console.error('Error details:', error);
            setErrorMessage((error as Error).message);
            throw error;
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) postRepair();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-2/3 mx-auto">
            <div>
                <Label htmlFor="scheduledDate">Scheduled Date</Label>
                {errors.scheduledDate && (
                    <span className="pl-4 text-red-500 text-sm">{errors.scheduledDate}</span>
                )}
                <Input
                    id="scheduledDate"
                    name="scheduledDate"
                    type="datetime-local"
                    value={formData.scheduledDate}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label htmlFor="type">Repair Type</Label>
                <Select
                    onValueChange={handleSelectChange}
                    defaultValue={String(RepairType.Other)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select repair type" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(RepairType)
                            .filter(([key]) => !isNaN(Number(key))) // Only show numeric enum values
                            .map(([key]) => (
                                <SelectItem key={key} value={String(key)}>
                                    {RepairType[Number(key)]}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                {errors.description && (
                    <span className="pl-4 text-red-500 text-sm">{errors.description}</span>
                )}
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="h-24"
                />
            </div>

            <div>
                <Label htmlFor="cost">Cost</Label>
                {errors.cost && (
                    <span className="pl-4 text-red-500 text-sm">{errors.cost}</span>
                )}
                <Input
                    id="cost"
                    name="cost"
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={handleChange}
                />
            </div>

            {errorMessage && (
                <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
            )}

            <Button type="submit" className="w-full flex">
                <Plus className="h-8 w-8 mr-2 text-slate-50" />
                <h3 className="text-lg font-semibold">Add Repair</h3>
            </Button>
        </form>
    );
}