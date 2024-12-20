import React from "react";
import Link from "next/link";
import {  Pencil, Trash2 } from "lucide-react";
import { SimpleProperty } from "@/app/types";
import Alert from "../Alert";
import { deleteProperty } from "@/actions/propertyController";

interface PropertyViewProps {
  property: SimpleProperty;
  onEdit: () => void;
}

const PropertyView: React.FC<PropertyViewProps> = ({ property, onEdit }) => {
  const initialState = {
    success: undefined,
    message: undefined,
    propertyId: property.propertyId,
  };


  return (
    <>
      <Link
        href={`/dashboard/property/${property.propertyId}`}
        className="block"
      >
        <div className="space-y-2">
          <p className="text-gray-600">
            <strong>Address:</strong>{" "}
            {property.address || "No address provided"}
          </p>
          <p className="text-gray-600">
            <strong>Year of Construction:</strong> {property.yearOfConstruction}
          </p>
        </div>
      </Link>
      <div className="flex mt-2">
        <button onClick={onEdit} className="mr-2" title="Edit property">
          <Pencil />
        </button>
        <Alert
          hiddenInput={
            <input
              type="hidden"
              name="propertyId"
              defaultValue={property.propertyId}
            />
          }
          icon={<Trash2/>}
          formAction={deleteProperty}
          buttonLabel={"Delete"}
        />
      </div>
    </>
  );
};

export default PropertyView;
