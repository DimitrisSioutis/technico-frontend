import React from 'react'
import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { SimpleProperty } from '@/app/types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProperty } from '@/actions/propertyController';
import { useFormState } from 'react-dom';

interface PropertyViewProps {
  property: SimpleProperty
  onEdit: () => void
}

const PropertyView: React.FC<PropertyViewProps> = ({ property, onEdit }) => {
  const initialState = {
    success: undefined,
    message: undefined,
    propertyId: property.propertyId
  };

  const [formState, formAction] = useFormState(deleteProperty, initialState);

  return (
    <>
      <Link 
        href={`/dashboard/property/${property.propertyId}`} 
        className="block"
      >
        <div className="space-y-2">
          <p className="text-gray-600">
            <strong>Address:</strong> {property.address || 'No address provided'}
          </p>
          <p className="text-gray-600">
            <strong>Year of Construction:</strong> {property.yearOfConstruction}
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
        <AlertDialog>
          <AlertDialogTrigger><Trash2 color="red"/></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your content
                and remove your data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <form action={formAction}>
                <input 
                  type="hidden" 
                  name="propertyId" 
                  value={property.propertyId} 
                />
                <AlertDialogAction asChild>
                  <button 
                    type="submit" 
                    className='hover:bg-red-400'
                  >
                    Delete
                  </button>
                </AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default PropertyView