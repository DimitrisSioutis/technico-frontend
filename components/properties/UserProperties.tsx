"use client"
import React from 'react'
import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';
import { SimpleProperty } from '@/app/layout-types';
import RUDoptions from '../RUDoptions';

interface UserPropertiesProps {
  properties: SimpleProperty[];
  getUserData: () => void;
}

const UserProperties: React.FC<UserPropertiesProps> = ({properties,getUserData}) => {

  if (!properties) {
    return <LoaderCircle/>;
  }

  return (
    <div>
        {properties.length > 0 ? (
        <ul className="space-y-2">
            {properties.map((property) => {
              return (
                <li
                    key={property.propertyId}
                    className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <Link href={`/property/${property.propertyId}`} className="block">
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <strong>Address:</strong> {property.address || 'No address provpropertyIDNumbered'}
                      </p>
                      <p className="text-gray-600">
                        <strong>Year of Construction:</strong>{" "}
                        {property.yearOfConstruction }
                      </p>
                    </div>
                  </Link>
                  <RUDoptions model={'property'} id={property.propertyId} fetch={getUserData}/>
                </li>
              );
            })}
        </ul>
        ) : (
        <p className="text-gray-600">No properties available.</p>
        )}
    </div>
  )
}

export default UserProperties