import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import deleteData from '@/utils/delete';
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

interface Property {
  address: string;
}

interface Owner {
  id: string;
  name: string;
  surname: string;
  properties?: Property[];
}

interface OwnerProps {
  owner: Owner;
  onEdit: (owner: Owner) => void;
  onDelete: () => void;
}

const Owner: React.FC<OwnerProps> = ({ owner, onEdit, onDelete }) => {
  const handleDelete = async (ownerId: string) => {

    try {
      await deleteData("User", ownerId);
    } catch (e) {
      console.error(e);
    } finally {
      onDelete();
    }
  };

  return (
    <TableRow key={owner.id}>
      <TableCell>{owner.name}</TableCell>
      <TableCell>{owner.surname}</TableCell>
      <TableCell>
        {owner.properties?.map((prop) => prop.address).join(', ') || 'No properties'}
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onEdit(owner)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          
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
                  <AlertDialogAction onClick={()=>handleDelete(owner.id)} className='hover:bg-red-400'>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Owner;
