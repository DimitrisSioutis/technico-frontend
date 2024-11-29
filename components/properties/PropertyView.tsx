// PropertyView.tsx
import React from 'react'
import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { SimpleProperty } from '@/app/types'

interface PropertyViewProps {
  property: SimpleProperty
  onEdit: () => void
  onDelete: () => void
  getUserData: ()=> void
}

const PropertyView: React.FC<PropertyViewProps> = ({ property, onEdit, onDelete , getUserData }) => {
  return (
    <>
      <Link href={`/property/${property.propertyId}`} className="block">
        <div className="space-y-2">
          <p className="text-gray-600">
            <strong>Address:</strong> {property.address || 'No address provided'}
          </p>
          <p className="text-gray-600">
            <strong>Year of Construction:</strong>{" "}
            {property.yearOfConstruction}
          </p>
        </div>
      </Link>
      <div className="flex mt-2">
        <button 
          onClick={onEdit} 
          className="mr-2"
          title="Edit property"
        >
          <Pencil />
        </button>
        <button 
          onClick={() =>{
            console.log('delete button clicked')
            onDelete()
            getUserData();
          }}
          title="Delete property"
        >
          <Trash2 />
        </button>
      </div>
    </>
  )
}

export default PropertyView