import React from 'react'
import Link from 'next/link';
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
                {repairs.map((property) => {
                  console.log('Rendering property:', property);
                  return (
                    <li
                        key={property?.propertyIDNumber || 'unknown'}
                        className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Link href={`/property/${property?.propertyIDNumber}`} className="block">
                        <div className="space-y-2">
                          <p className="text-gray-600">
                            <strong>Address:</strong> {property?.address || 'No address provpropertyIDNumbered'}
                          </p>
                          <p className="text-gray-600">
                            <strong>Year of Construction:</strong>{" "}
                            {property?.yearOfConstruction || 'N/A'}
                          </p>
                        </div>
                      </Link>
                    </li>
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