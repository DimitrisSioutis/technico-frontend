"use client"

import React from "react";
import { useFormState} from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { RepairType } from "@/app/types";
import { postRepair } from "@/actions/repairController";

export default function AddRepair({ propertyId, propertyAddress}) {
    const [formState, formAction] = useFormState(postRepair, {})

    return (
        <form action={formAction} className="space-y-4 w-2/3 mx-auto">
            <input 
                hidden
                name="propertyId" 
                defaultValue={propertyId}
            />
            <input 
                hidden
                type="hidden" 
                name="propertyAddress" 
                defaultValue={propertyAddress}
            />
            <div>
                <Label htmlFor="scheduledDate">Scheduled Date</Label>
                {formState.errors?.scheduledDate && (
                    <span className="pl-4 text-red-500 text-sm">
                        {formState.errors.scheduledDate}
                    </span>
                )}
                <Input
                    id="scheduledDate"
                    name="scheduledDate"
                    type="datetime-local"
                />
            </div>

            <div>
                <Label htmlFor="type">Repair Type</Label>
                <Select name="type" defaultValue={String(RepairType.Other)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select repair type" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(RepairType)
                            .filter(([key]) => !isNaN(Number(key)))
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
                {formState.errors?.description && (
                    <span className="pl-4 text-red-500 text-sm">
                        {formState.errors.description}
                    </span>
                )}
                <Textarea
                    id="description"
                    name="description"
                    className="h-24"
                />
            </div>

            <div>
                <Label htmlFor="cost">Cost</Label>
                {formState.errors?.cost && (
                    <span className="pl-4 text-red-500 text-sm">
                        {formState.errors.cost}
                    </span>
                )}
                <Input
                    id="cost"
                    name="cost"
                    type="number"
                    step="0.01"
                />
            </div>

            <Button 
                type="submit" 
                className="w-full flex"
            >
                <Plus className="h-8 w-8 mr-2 text-slate-50" />
                <h3 className="text-lg font-semibold">
                    Add Repair
                </h3>
            </Button>

            {formState.errors?.submit && (
                <div className="text-red-500 text-sm">
                    {formState.errors.submit}
                </div>
            )}
        </form>
    );
}