import React, { useState } from 'react'
import PropertyView from './PropertyView'
import PropertyEdit from './PropertyEdit'
import { type SimpleProperty } from '@/app/types'
import updateData from '@/app/utils/update'
import deleteData from '@/app/utils/delete'

// Define the PropertyProps interface
interface PropertyProps {
  property: SimpleProperty;
  getUserData: () => void;
}

const Property: React.FC<PropertyProps> = ({ property, getUserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProperty, setEditedProperty] = useState(property);

  const handleEdit = () => setIsEditing(true);
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProperty(property);
  };

  const handleSaveEdit = async () => {
    setIsEditing(false);
    await updateData('Property', property.propertyId, editedProperty);
    getUserData();
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
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          onChange={handleChange}
        />
      ) : (
        <PropertyView 
          property={property} 
          onEdit={handleEdit}
          onDelete={() => deleteData(property.propertyId, 'Property')}
        />
      )}
    </li>
  )
}

export default Property