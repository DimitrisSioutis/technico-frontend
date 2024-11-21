import React from 'react'
import { type Repair } from '@/app/layout-types';

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
                    <div key={repair.repairID}>
                      <h1>Type: {repair.type}</h1>
                      <h2>Repair Description: {repair.description}</h2>
                      <p>Cost: {repair.cost}€</p>
                      <hr/>
                    </div>
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