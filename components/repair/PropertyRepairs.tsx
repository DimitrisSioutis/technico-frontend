import React from 'react'
import { type Repair } from '@/app/property/[id]/page';

interface PropertyRepairsProps {
    repairs: Repair[];
}

const PropertyRepairs: React.FC<PropertyRepairsProps> = ({repairs})  => {

    if (!repairs) {
        return <p className="text-gray-600">Loading repairs...</p>;
      }
    
      return (
        <div>
            {repairs.length > 0 ? (
            <ul className="space-y-2">
                {repairs.map((repair) => {
                  return (
                    repair.description
                  );
                })}
            </ul>
            ) : (
            <p className="text-gray-600">No repairs available.</p>
            )}
        </div>
      )
}

export default PropertyRepairs