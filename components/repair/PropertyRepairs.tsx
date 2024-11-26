import React from 'react'
import { type RepairModel } from '@/app/types';
import Repair from '../repair/Repair';

interface PropertyRepairsProps {
    repairs: RepairModel[];
    onRepairUpdated: ()=>void;
}

const PropertyRepairs: React.FC<PropertyRepairsProps> = ({repairs,onRepairUpdated})  => {

      if (!repairs) {
        return <p className="text-gray-600">Loading repairs...</p>;
      }
    
      return (
        <div>
            {repairs.length > 0 ? (
            <ul className="space-y-2">
                {repairs.map((repair) => {
                  return (
                    <Repair repair={repair} key={repair.id} onRepairUpdated={onRepairUpdated} />
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