"use client"
import React from 'react'
import { SimpleProperty } from '@/app/types';
import Property from './Property';


interface UserPropertiesProps {
  properties: SimpleProperty[];
}

const UserProperties: React.FC<UserPropertiesProps> = ({properties}) => {
  return (
    <div>
        {properties.length > 0 ? (
        <ul className="space-y-2">
            {properties.map((property,index) => 
                <Property key={index} property={property}/>
            )}
        </ul>
        ) : (
        <p className="text-gray-600">No properties available.</p>
        )}
    </div>
  )
}

export default UserProperties