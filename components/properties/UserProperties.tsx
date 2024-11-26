"use client"
import React from 'react'
import { LoaderCircle } from 'lucide-react';
import { SimpleProperty } from '@/app/types';
import Property from './Property';


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
            {properties.map((property,index) => 
                <Property key={index} property={property} getUserData={getUserData}/>
            )}
        </ul>
        ) : (
        <p className="text-gray-600">No properties available.</p>
        )}
    </div>
  )
}

export default UserProperties