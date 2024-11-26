// PropertyEdit.tsx
import React from 'react'
import { Check, X } from 'lucide-react'
import { SimpleProperty } from '@/app/types'

interface PropertyEditProps {
  editedProperty: SimpleProperty
  onSave: () => void
  onCancel: () => void
  onChange: (field: keyof SimpleProperty, value: any) => void
}

const PropertyEdit: React.FC<PropertyEditProps> = ({ 
  editedProperty, 
  onSave, 
  onCancel, 
  onChange 
}) => {
  return (
    <div className="space-y-4">
      <div className="property-field">
        <label htmlFor="address" className="block mb-2">Address:</label>
        <input
          id="address"
          type="text"
          className="w-full border rounded-md p-2"
          value={editedProperty.address}
          onChange={(e) => onChange("address", e.target.value)}
          required
        />
      </div>
      <div className="property-field">
        <label htmlFor="yearOfConstruction" className="block mb-2">Year of Construction:</label>
        <input
          id="yearOfConstruction"
          type="number"
          className="w-full border rounded-md p-2"
          value={editedProperty.yearOfConstruction}
          onChange={(e) => onChange("yearOfConstruction", e.target.value)}
          required
        />
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={onSave} 
          className="flex items-center justify-center p-2"
          title="Save changes"
        >
          <Check />
        </button>
        <button 
          onClick={onCancel} 
          className="flex items-center justify-center p-2"
          title="Cancel edit"
        >
          <X/>
        </button>
      </div>
    </div>
  )
}

export default PropertyEdit