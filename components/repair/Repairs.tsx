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
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {repairs.map((repair) => (
                <Repair repair={repair} key={repair.id} />
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No repairs available.</p>
          )}
        </div>
      )
}

export default PropertyRepairs