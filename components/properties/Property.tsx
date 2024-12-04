import React, { useState } from 'react'
import PropertyView from './PropertyView'
import PropertyEdit from './PropertyEdit'
import { type SimpleProperty } from '@/app/types'
import updateData from '@/utils/update'
import deleteData from '@/utils/delete'
import { useUserContext } from '../UserContext'

interface PropertyProps {
  property: SimpleProperty;
}

const Property: React.FC<PropertyProps> = ({ property }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProperty, setEditedProperty] = useState(property);
  const {refetch} = useUserContext();

  const handleEdit = () => setIsEditing(true);
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProperty(property);
  };

  const handleSaveEdit = async () => {
    setIsEditing(false);
    await updateData('Property', property.propertyId, editedProperty);
    refetch();
  };

  const handleChange = (field: keyof SimpleProperty, value: any) => {
    setEditedProperty((prevProperty) => ({
      ...prevProperty,
      [field]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      await deleteData('Property', property.propertyId);
      refetch();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
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
          onDelete={handleDelete}
        />
      )}
    </li>
  )
}

export default Property;