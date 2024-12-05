"use client"

import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Plus} from 'lucide-react';
import { createProperty } from "@/actions/propertyController";

export default function Page({userId}) {
  const [formState, formAction] = useFormState(createProperty, {})

  return (
        <form action={formAction}>
          <input hidden id="userId" name="userId" defaultValue={userId} />
          <div>
            <Label htmlFor="address">Address</Label>
            {formState.errors?.address && (
              <span className="pl-4 text-red-500 text-sm">{formState.errors.address}</span>
            )}
            <Input id="address" name="address" />
          </div>

          <div>
            <Label htmlFor="yearOfConstruction">Year of Construction</Label>
            {formState.errors?.yearOfConstruction && (
              <span className="pl-4 text-red-500 text-sm">{formState.errors.yearOfConstruction}</span>
            )}
            <Input id="yearOfConstruction" name="yearOfConstruction"/>
          </div>
          <div className="h-10">
            {formState.errors && Object.keys(formState.errors).length > 0 && 
              <span className="text-red-500">
                {Object.values(formState.errors).join(", ")}
              </span>
            }
          </div>
          <Button type="submit" className="w-full flex">
            <Plus className="h-8 w-8 mr-2 text-slate-50" />
            <h3 className="text-lg font-semibold">Add Property</h3>
          </Button>
        </form>

  )
}