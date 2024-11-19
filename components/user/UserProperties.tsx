"use client"
import React from 'react'
import { Property } from '@/app/user/[id]/page';

interface UserPropertiesProps {
  properties: Property[];
}

const UserProperties: React.FC<UserPropertiesProps>  = ({properties}) => {
  return (
    <div>
        { properties && properties.length > 0 ? (
        <ul className="space-y-2">
            {properties.map((property) => (
            <li
                key={property.id}
                className="p-4 border rounded-lg shadow-md"
            >
                <p className="text-gray-600">
                <strong>Address:</strong> {property.address}
                </p>
                <p className="text-gray-600">
                <strong>Year of Construction:</strong>{" "}
                {property.yearOfConstruction}
                </p>
            </li>
            ))}
        </ul>
        ) : (
        <p className="text-gray-600">No properties available.</p>
        )}
    </div>
  )
}

export default UserProperties