// PropertyEdit.tsx
import React, { useRef } from 'react'
import { useFormState } from 'react-dom'
import { Check, X } from 'lucide-react'
import { SimpleProperty } from '@/app/types'
import { createProperty } from '@/actions/propertyController'
import { useUser } from '@/components/context/UserContext'

interface PropertyEditProps {
  editedProperty: SimpleProperty
  onCancel: () => void
  onChange: (field: keyof SimpleProperty, value: any) => void
  onSave: () => void
}

const PropertyEdit: React.FC<PropertyEditProps> = ({ 
  editedProperty, 
  onCancel, 
  onChange,
  onSave
}) => {
  const [formState, formAction] = useFormState(createProperty, {})
  const formRef = useRef<HTMLFormElement>(null)

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    formRef.current?.requestSubmit() 
    onSave();
  };
  
  
  return (
    <div className="space-y-4">
      <form ref={formRef} action={formAction}>
        <input 
          type="hidden" 
          name="propertyId" 
          value={editedProperty.propertyId} 
        />

        <input 
          type="hidden" 
          name="userId" 
          value={editedProperty.ownerID} 
        />

        <div className="property-field">
        
          <label htmlFor="address" className="block mb-2">Address:</label>
          <input
            id="address"
            name="address"
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
            name="yearOfConstruction"
            type="number"
            className="w-full border rounded-md p-2"
            value={editedProperty.yearOfConstruction}
            onChange={(e) => onChange("yearOfConstruction", e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            type="button" 
            className="flex items-center justify-center p-2"
            title="Save changes"
          >
            <Check />
          </button>
          <button 
            onClick={onCancel} 
            type="button"
            className="flex items-center justify-center p-2"
            title="Cancel edit"
          >
            <X/>
          </button>
        </div>
      </form>
    </div>
  )
}

export default PropertyEdit