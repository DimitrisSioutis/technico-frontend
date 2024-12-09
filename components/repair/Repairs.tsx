import React from 'react'
import { type RepairModel } from '@/app/types';
import Repair from './Repair';

interface PropertyRepairsProps {
    repairs: RepairModel[];
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
                    <Repair repair={repair} key={repair.id}  />
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