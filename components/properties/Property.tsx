import React, { useState } from 'react'
import PropertyView from './PropertyView'
import PropertyEdit from './PropertyEdit'
import { type SimpleProperty } from '@/app/types'
import deleteData from '@/utils/delete'

interface PropertyProps {
  property: SimpleProperty;
}

const Property: React.FC<PropertyProps> = ({ property }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProperty, setEditedProperty] = useState(property);


  const handleEdit = () => setIsEditing(true);
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProperty(property);
  };

  const handleChange = (field: keyof SimpleProperty, value: any) => {
    setEditedProperty((prevProperty) => ({
      ...prevProperty,
      [field]: value,
    }));
  };



  return (
    <li
      key={property.propertyId}
      className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      {isEditing ? (
        <PropertyEdit 
          editedProperty={editedProperty}
          onCancel={handleCancelEdit}
          onChange={handleChange}
          onSave= {()=>setIsEditing(false)}
        />
      ) : (
        <PropertyView 
          property={property} 
          onEdit={handleEdit}
        />
      )}
    </li>
  )
}

export default Property;